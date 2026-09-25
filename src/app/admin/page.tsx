import { client } from '@/sanity/client';
import { groq } from 'next-sanity';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ShoppingBag, BarChart3, Package, ExternalLink,
  TrendingUp, Clock, CheckCircle2, Truck
} from 'lucide-react';

export const revalidate = 0;

const statsQuery = groq`{
  "totalOrders": count(*[_type == "saleRecord"]),
  "pending": count(*[_type == "saleRecord" && (status == "pending" || !defined(status))]),
  "confirmed": count(*[_type == "saleRecord" && status == "confirmed"]),
  "dispatched": count(*[_type == "saleRecord" && status == "dispatched"]),
  "revenue": math::sum(*[_type == "saleRecord"].orderTotal),
  "recentOrders": *[_type == "saleRecord"] | order(completedAt desc)[0...5] {
    orderId, completedAt, customerName, salonName, orderTotal, status
  }
}`;

function formatDate(dt: string) {
  return new Date(dt).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

const STATUS_COLORS: Record<string, string> = {
  pending:    'bg-yellow-100 text-yellow-700',
  confirmed:  'bg-blue-100 text-blue-700',
  dispatched: 'bg-purple-100 text-purple-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-700',
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ secret?: string }>;
}) {
  const { secret } = await searchParams;
  if (secret !== process.env.ADMIN_DASHBOARD_SECRET) {
    notFound();
  }

  let stats = {
    totalOrders: 0,
    pending: 0,
    confirmed: 0,
    dispatched: 0,
    revenue: 0,
    recentOrders: [] as { orderId: string; completedAt: string; customerName?: string; salonName?: string; orderTotal: number; status?: string }[],
  };

  try {
    stats = await client.fetch(statsQuery);
  } catch {}

  const adminSecret = `?secret=${secret}`;

  const navCards = [
    {
      href: `/admin/orders${adminSecret}`,
      icon: ShoppingBag,
      label: 'Orders',
      desc: 'View, confirm & dispatch all customer orders',
      badge: stats.pending > 0 ? `${stats.pending} pending` : null,
      badgeColor: 'bg-yellow-500',
      color: 'from-amber-50 to-orange-50 border-amber-100',
    },
    {
      href: `/admin/sales${adminSecret}`,
      icon: BarChart3,
      label: 'Sales Analytics',
      desc: 'Revenue breakdown by dealer and product',
      badge: null,
      color: 'from-blue-50 to-indigo-50 border-blue-100',
    },
    {
      href: '/studio',
      icon: Package,
      label: 'Sanity Studio',
      desc: 'Manage products, update order statuses, edit content',
      badge: null,
      color: 'from-purple-50 to-violet-50 border-purple-100',
      external: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F2] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 bg-brand-gold rounded-full" />
            <h1 className="font-serif text-4xl text-brand-dark">Admin Dashboard</h1>
          </div>
          <p className="text-gray-400 text-sm ml-5">LUMIÈRE Professional — Internal Management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'text-brand-dark' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-600' },
            { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle2, color: 'text-blue-600' },
            { label: 'Dispatched', value: stats.dispatched, icon: Truck, color: 'text-purple-600' },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">{s.label}</p>
                  <Icon size={16} className={s.color} />
                </div>
                <p className={`font-serif text-4xl font-light ${s.color}`}>{s.value}</p>
              </div>
            );
          })}
        </div>

        {/* Revenue Banner */}
        <div className="bg-brand-charcoal rounded-2xl p-6 mb-10 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1">Total Revenue</p>
            <p className="font-serif text-4xl text-white">₹{(stats.revenue || 0).toLocaleString('en-IN')}</p>
          </div>
          <TrendingUp className="text-brand-gold opacity-30" size={64} strokeWidth={1} />
        </div>

        {/* Nav Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {navCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                target={card.external ? '_blank' : undefined}
                className={`group relative bg-gradient-to-br ${card.color} rounded-2xl border p-6 hover:shadow-md transition-all duration-300`}
              >
                {card.badge && (
                  <span className={`absolute top-4 right-4 ${card.badgeColor} text-white text-[10px] font-bold px-2 py-1 rounded-full`}>
                    {card.badge}
                  </span>
                )}
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <Icon size={22} className="text-brand-charcoal" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-brand-dark text-lg">{card.label}</h3>
                  {card.external && <ExternalLink size={14} className="text-gray-400" />}
                </div>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{card.desc}</p>
              </Link>
            );
          })}
        </div>

        {/* Recent Orders */}
        {stats.recentOrders.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-50">
              <h3 className="font-semibold text-brand-dark">Recent Orders</h3>
              <Link href={`/admin/orders${adminSecret}`} className="text-xs text-brand-gold font-bold uppercase tracking-widest hover:underline">
                View All →
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {stats.recentOrders.map((order) => {
                const status = order.status || 'pending';
                return (
                  <div key={order.orderId} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-brand-dark">{order.salonName || order.customerName || 'Unknown'}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatDate(order.completedAt)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full capitalize ${STATUS_COLORS[status] || STATUS_COLORS.pending}`}>
                        {status}
                      </span>
                      <span className="font-serif text-brand-dark">₹{order.orderTotal?.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
