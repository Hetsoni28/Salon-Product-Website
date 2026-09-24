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

    // Validate secret — prevents accidental or malicious calls
    const expectedSecret = process.env.SALE_RECORD_SECRET;
    if (!expectedSecret || body.secret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
    const doc: Record<string, unknown> = {
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

    await writeClient.create(doc);

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
