import { client } from '@/sanity/client';
import { groq } from 'next-sanity';
import { notFound } from 'next/navigation';
import { DashboardClient } from './DashboardClient';

import { cookies } from 'next/headers';
import { LoginForm } from './LoginForm';

export const revalidate = 30; // Refresh every 30s

export default async function SalesDashboard({
  searchParams,
}: {
  searchParams: Promise<{ secret?: string }>;
}) {
  const { secret } = await searchParams;
  const cookieStore = await cookies();
  const hasCookie = cookieStore.get('admin_session')?.value === 'authenticated';
  const hasSecret = secret === process.env.ADMIN_DASHBOARD_SECRET;

  if (!hasCookie && !hasSecret) {
    return <LoginForm />;
  }

  // Fetch all sale records
  const records = await client.fetch(groq`
    *[_type == "saleRecord"] | order(completedAt desc) {
      _id,
      orderId,
      completedAt,
      dealerName,
      dealerCode,
      dealerSlug,
      totalQuantity,
      orderTotal,
      customerName,
      customerPhone,
      salonName,
      status,
      items[] {
        productName,
        productSlug,
        quantity,
        unitPrice,
        lineTotal,
      }
    }
  `);

  const dealerMap: Record<string, any> = {};

  for (const record of records) {
    const key = record.dealerCode || 'direct';
    if (!dealerMap[key]) {
      dealerMap[key] = {
        name: record.dealerName || 'Direct / No Dealer',
        code: key,
        slug: record.dealerSlug || '',
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
        dealerMap[key].products[pid] = { name: item.productName, qty: 0, revenue: 0 };
      }
      dealerMap[key].products[pid].qty += item.quantity;
      dealerMap[key].products[pid].revenue += item.lineTotal || 0;
    }
  }

  const dealers = Object.values(dealerMap).sort((a, b) => b.totalItems - a.totalItems);

  const grandTotalItems = dealers.reduce((s, d) => s + d.totalItems, 0);
  const grandTotalRevenue = dealers.reduce((s, d) => s + d.totalRevenue, 0);

  return (
    <DashboardClient 
      grandTotalRevenue={grandTotalRevenue}
      grandTotalItems={grandTotalItems}
      dealerCount={dealers.length}
      dealers={dealers}
      recentOrders={records}
    />
  );
}
