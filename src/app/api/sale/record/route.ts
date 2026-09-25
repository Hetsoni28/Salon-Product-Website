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
}

export async function POST(req: NextRequest) {
  try {
    const body: SalePayload = await req.json();

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const orderId = uuidv4();
    const completedAt = new Date().toISOString();

    // Compute line totals
    const enrichedItems = body.items.map((item) => ({
      _key: uuidv4(),
      productId: item.productId,
      productName: item.productName,
      productSlug: item.productSlug,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      lineTotal: item.unitPrice * item.quantity,
    }));

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
    };

    // Attach dealer attribution if present
    if (body.dealer) {
      doc.dealerCode = body.dealer.code;
      doc.dealerName = body.dealer.name;
      doc.dealerSlug = body.dealer.slug;
    }

    // 1. Create the sale record
    await writeClient.create(doc);

    // 2. PHASE 18: UPDATE DEALER SALES
    if (body.dealer && body.dealer.code) {
      // Find the dealer document by code
      const dealerDoc = await writeClient.fetch(`*[_type == "dealer" && dealerCode == $code][0]`, { code: body.dealer.code });
      
      if (dealerDoc) {
        // Prepare updated products array
        const existingProducts = dealerDoc.productsSold || [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updatedProducts: any[] = [...existingProducts];

        enrichedItems.forEach((item) => {
          const existingIndex = updatedProducts.findIndex((p) => p.productId === item.productId);
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

        // Patch the dealer document
        await writeClient
          .patch(dealerDoc._id)
          .setIfMissing({ totalSalesAmount: 0, totalItemsSold: 0, productsSold: [] })
          .inc({ totalSalesAmount: orderTotal, totalItemsSold: totalQuantity })
          .set({ productsSold: updatedProducts })
          .commit();
      }
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
