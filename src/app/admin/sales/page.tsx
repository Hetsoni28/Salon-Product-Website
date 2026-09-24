import { client } from "@/sanity/client";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";

export const revalidate = 30; // Refresh every 30s

// Simple admin protection — check secret query param
// Usage: /admin/sales?secret=YOUR_ADMIN_SECRET
export default async function SalesDashboard({
  searchParams,
}: {
  searchParams: Promise<{ secret?: string }>;
}) {
  const { secret } = await searchParams;
  if (secret !== process.env.ADMIN_DASHBOARD_SECRET) {
    notFound();
  }

  // ── Aggregated Sales by Dealer ─────────────────────────────────
  const records = await client.fetch(groq`
    *[_type == "saleRecord"] | order(completedAt desc) {
      orderId,
      completedAt,
      dealerName,
      dealerCode,
      dealerSlug,
      totalQuantity,
      orderTotal,
      items[] {
        productName,
        productSlug,
        quantity,
        unitPrice,
        lineTotal,
      }
    }
  `);

  // ── Group by dealer ────────────────────────────────────────────
  const dealerMap: Record<
    string,
    {
      name: string;
      code: string;
      slug: string;
      totalItems: number;
      totalRevenue: number;
      products: Record<string, { name: string; qty: number; revenue: number }>;
    }
  > = {};

  for (const record of records) {
    const key = record.dealerCode || "direct";
    if (!dealerMap[key]) {
      dealerMap[key] = {
        name: record.dealerName || "Direct / No Dealer",
        code: key,
        slug: record.dealerSlug || "",
        totalItems: 0,
        totalRevenue: 0,
        products: {},
      };
    }
    dealerMap[key].totalItems += record.totalQuantity || 0;
    dealerMap[key].totalRevenue += record.orderTotal || 0;

    for (const item of record.items || []) {
      const pid = item.productSlug || item.productName;
      if (!dealerMap[key].products[pid]) {
        dealerMap[key].products[pid] = {
          name: item.productName,
          qty: 0,
          revenue: 0,
        };
      }
      dealerMap[key].products[pid].qty += item.quantity;
      dealerMap[key].products[pid].revenue += item.lineTotal || 0;
    }
  }

  const dealers = Object.values(dealerMap).sort(
    (a, b) => b.totalItems - a.totalItems,
  );

  const grandTotalItems = dealers.reduce((s, d) => s + d.totalItems, 0);
  const grandTotalRevenue = dealers.reduce((s, d) => s + d.totalRevenue, 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-[#2D2D2D] text-white px-8 py-6">
        <h1 className="text-2xl font-serif tracking-wide">
          LUMIÈRE — Sales Dashboard
        </h1>
        <p className="text-white/50 text-sm mt-1">
          Dealer Attribution · Verified Purchases Only
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Grand Totals */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Dealers Active", value: dealers.length },
            {
              label: "Total Items Sold",
              value: grandTotalItems.toLocaleString("en-IN"),
            },
            {
              label: "Total Revenue",
              value: `₹${grandTotalRevenue.toLocaleString("en-IN")}`,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center"
            >
              <p className="text-3xl font-bold text-[#2D2D2D]">{s.value}</p>
              <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Dealer Breakdown */}
        {dealers.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <p className="text-gray-400 text-lg">
              No completed sales recorded yet.
            </p>
            <p className="text-gray-300 text-sm mt-2">
              Sales are recorded only when a purchase is verified.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {dealers.map((dealer) => (
              <div
                key={dealer.code}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* Dealer Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100">
                  <div>
                    <span className="font-semibold text-[#2D2D2D] text-lg">
                      {dealer.name}
                    </span>
                    <span className="ml-3 text-xs bg-[#C8A882] text-white px-2 py-0.5 rounded-full font-mono">
                      {dealer.code}
                    </span>
                    {dealer.slug && (
                      <span className="ml-2 text-xs text-gray-400">
                        /d/{dealer.slug}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-[#2D2D2D]">
                      {dealer.totalItems} items
                    </p>
                    <p className="text-sm text-gray-400">
                      ₹{dealer.totalRevenue.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Product Breakdown */}
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs uppercase tracking-widest text-gray-400 border-b border-gray-50">
                      <th className="px-6 py-3 text-left">Product</th>
                      <th className="px-6 py-3 text-right">Qty Sold</th>
                      <th className="px-6 py-3 text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(dealer.products)
                      .sort((a, b) => b.qty - a.qty)
                      .map((p) => (
                        <tr
                          key={p.name}
                          className="border-b border-gray-50 hover:bg-gray-50/50"
                        >
                          <td className="px-6 py-3 text-gray-700">{p.name}</td>
                          <td className="px-6 py-3 text-right font-mono font-semibold text-[#2D2D2D]">
                            {p.qty}
                          </td>
                          <td className="px-6 py-3 text-right text-gray-500">
                            ₹{p.revenue.toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-xs text-gray-300 pb-4">
          Auto-refreshes every 30 seconds · Data sourced from Sanity CMS
        </p>
      </div>
    </div>
  );
}
