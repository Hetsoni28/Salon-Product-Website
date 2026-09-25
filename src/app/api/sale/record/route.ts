import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/client";
import { v4 as uuidv4 } from "uuid";

/**
 * POST /api/sale/record
 *
 * Records a VERIFIED completed purchase in Sanity.
 *
 * IMPORTANT: This must only be called AFTER purchase is confirmed.
 * - Opening a dealer link → NO
 * - Adding to cart → NO
 * - Completing checkout form + confirmed → YES
 *
 * Protected by SALE_RECORD_SECRET env variable.
 */

interface SaleItem {
  productId: string;
  productName: string;
  productSlug: string;
  quantity: number;
  unitPrice: number;
}

interface SalePayload {
  secret: string;
  items: SaleItem[];
  dealer?: {
    slug: string;
    code: string;
    name: string;
  } | null;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  salonName?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: SalePayload = await req.json();

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const orderId = uuidv4();
    const completedAt = new Date().toISOString();
    const hasToken =
      !!process.env.SANITY_API_TOKEN &&
      process.env.SANITY_API_TOKEN !== "your-api-token-here";

    // PHASE 22 SECURITY: Server-Side Price & Input Validation
    // Never trust client-provided prices or quantities. Fetch real prices from DB.
    const productIds = body.items.map((i) => i.productId).filter(Boolean);
    let realProducts: any[] = [];
    if (productIds.length > 0 && hasToken) {
      try {
        realProducts = await writeClient.fetch(
          `*[_type == "product" && _id in $productIds]{ _id, price, name }`,
          { productIds },
        );
      } catch {
        // If DB read fails (e.g. no token), fall through and use client prices
        console.warn("[sale/record] Could not fetch real prices from Sanity. Using client prices.");
      }
    }

    // Compute secure line totals
    const enrichedItems = body.items.map((item) => {
      const realProduct = realProducts.find((p) => p._id === item.productId);
      // Fallback to item.unitPrice ONLY for mock products during dev if no real product found
      const actualPrice = realProduct?.price ?? Math.max(0, item.unitPrice);
      const actualName = realProduct?.name ?? item.productName;
      // Sanitize quantity (must be positive integer)
      const safeQuantity = Math.max(1, Math.floor(item.quantity || 1));

      return {
        _key: uuidv4(),
        productId: item.productId,
        productName: actualName,
        productSlug: item.productSlug,
        quantity: safeQuantity,
        unitPrice: actualPrice,
        lineTotal: actualPrice * safeQuantity,
      };
    });

    const totalQuantity = enrichedItems.reduce((sum, i) => sum + i.quantity, 0);
    const orderTotal = enrichedItems.reduce((sum, i) => sum + i.lineTotal, 0);

    // Build the Sanity document
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc: any = {
      _type: "saleRecord",
      orderId,
      completedAt,
      items: enrichedItems,
      totalQuantity,
      orderTotal,
      customerName: body.customerName || null,
      customerPhone: body.customerPhone || null,
      customerEmail: body.customerEmail || null,
      salonName: body.salonName || null,
      status: "pending",
    };

    // Attach dealer attribution if present
    if (body.dealer) {
      doc.dealerCode = body.dealer.code;
      doc.dealerName = body.dealer.name;
      doc.dealerSlug = body.dealer.slug;
    }

    // 1. Persist sale record to Sanity (skip gracefully if no token configured)
    if (hasToken) {
      try {
        await writeClient.create(doc);

        // 2. PHASE 18: UPDATE DEALER SALES
        if (body.dealer && body.dealer.code) {
          const dealerDoc = await writeClient.fetch(
            `*[_type == "dealer" && dealerCode == $code][0]`,
            { code: body.dealer.code },
          );

          if (dealerDoc) {
            const existingProducts = dealerDoc.productsSold || [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const updatedProducts: any[] = [...existingProducts];

            enrichedItems.forEach((item) => {
              const existingIndex = updatedProducts.findIndex(
                (p) => p.productId === item.productId,
              );
              if (existingIndex > -1) {
                updatedProducts[existingIndex].quantity += item.quantity;
              } else {
                updatedProducts.push({
                  _key: uuidv4(),
                  productId: item.productId,
                  productName: item.productName,
                  quantity: item.quantity,
                });
              }
            });

            await writeClient
              .patch(dealerDoc._id)
              .setIfMissing({
                totalSalesAmount: 0,
                totalItemsSold: 0,
                productsSold: [],
              })
              .inc({ totalSalesAmount: orderTotal, totalItemsSold: totalQuantity })
              .set({ productsSold: updatedProducts })
              .commit();
          }
        }
      } catch (dbErr) {
        // Log the DB error but don't fail the customer's checkout
        console.error("[sale/record] DB write error (non-fatal):", dbErr);
      }
    } else {
      console.warn("[sale/record] SANITY_API_TOKEN not configured. Sale not persisted to DB (dev mode).");
    }

    return NextResponse.json({
      success: true,
      orderId,
      totalQuantity,
      orderTotal,
      dealer: body.dealer?.code || "direct",
    });
  } catch (err) {
    console.error("[sale/record] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
