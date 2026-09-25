import { client } from '@/sanity/client';
import { groq } from 'next-sanity';
import Link from 'next/link';
import { ShoppingBag, Phone, User, Store, Clock, CheckCircle2, Truck, Package, XCircle, ArrowRight } from 'lucide-react';

export const revalidate = 0; // Always fresh

interface OrderItem {
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

interface Order {
  _id: string;
  orderId: string;
  completedAt: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  salonName?: string;
  orderTotal: number;
  totalQuantity: number;
  status?: string;
  dealerName?: string;
  items?: OrderItem[];
}

const ordersQuery = groq`
  *[_type == "saleRecord"] | order(completedAt desc) {
    _id,
    orderId,
    completedAt,
    customerName,
    customerPhone,
    customerEmail,
    salonName,
    orderTotal,
    totalQuantity,
    status,
    dealerName,
    items[] {
      productName,
      quantity,
      unitPrice,
      lineTotal,
    }
  }
`;

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending:    { label: 'Pending',    color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Clock },
  confirmed:  { label: 'Confirmed',  color: 'bg-blue-100 text-blue-700 border-blue-200',       icon: CheckCircle2 },
  dispatched: { label: 'Dispatched', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: Truck },
  delivered:  { label: 'Delivered',  color: 'bg-green-100 text-green-700 border-green-200',    icon: Package },
  cancelled:  { label: 'Cancelled',  color: 'bg-red-100 text-red-700 border-red-200',          icon: XCircle },
};

function formatDate(dt: string) {
  return new Date(dt).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

function buildWAMessage(order: Order) {
  const items = order.items
    ?.map((i) => `  - ${i.productName} × ${i.quantity} @ ₹${i.unitPrice}`)
    .join('\n');
  const msg = `Hello ${order.customerName || order.salonName},\n\nYour order with LUMIÈRE Professional has been *confirmed*! 🎉\n\n*Order Summary:*\n${items}\n\n*Total: ₹${order.orderTotal}*\n\nWe will dispatch your products shortly. Thank you for choosing LUMIÈRE!`;
  return `https://wa.me/91${order.customerPhone?.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
}

export default async function AdminOrdersPage() {
  let orders: Order[] = [];
  try {
    orders = await client.fetch(ordersQuery);
  } catch {
    orders = [];
  }

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => !o.status || o.status === 'pending').length,
    confirmed: orders.filter((o) => o.status === 'confirmed').length,
    revenue: orders.reduce((s, o) => s + ((o.orderTotal as number) || 0), 0),
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-8 bg-brand-gold rounded-full" />
              <h1 className="font-serif text-4xl text-brand-dark">Orders</h1>
            </div>
            <p className="text-gray-400 text-sm ml-5">All customer orders — confirm and dispatch from here</p>
          </div>
          <Link href="/studio" className="inline-flex items-center gap-2 text-sm text-brand-gold font-semibold hover:underline">
            Open Sanity Studio <ArrowRight size={16} />
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total Orders', value: stats.total, color: 'text-brand-dark' },
            { label: 'Pending', value: stats.pending, color: 'text-yellow-600' },
            { label: 'Confirmed', value: stats.confirmed, color: 'text-blue-600' },
            { label: 'Revenue', value: `₹${stats.revenue.toLocaleString('en-IN')}`, color: 'text-green-600' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{s.label}</p>
              <p className={`font-serif text-3xl font-light ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <ShoppingBag className="text-gray-200 mb-6" size={64} strokeWidth={1} />
            <h2 className="font-serif text-2xl text-gray-400 mb-2">No orders yet</h2>
            <p className="text-gray-300 text-sm">Orders will appear here once customers complete checkout.</p>
          </div>
        ) : (
          <div className="space-y-4">
          {orders.map((order) => {
              const status = order.status || 'pending';
              const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
              const Icon = cfg.icon;
              const waLink = order.customerPhone ? buildWAMessage(order) : null;

              return (
                <div key={order._id as string} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center shrink-0">
                        <ShoppingBag className="text-brand-gold" size={20} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-mono text-xs text-gray-400 mb-0.5">#{(order.orderId as string)?.slice(0, 12).toUpperCase()}</p>
                        <p className="text-sm text-gray-500">{formatDate(order.completedAt as string)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${cfg.color}`}>
                        <Icon size={13} /> {cfg.label}
                      </span>
                      <span className="font-serif text-xl text-brand-dark">
                        ₹{(order.orderTotal as number)?.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Order Body */}
                  <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Customer Info */}
                    <div className="space-y-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 mb-3">Customer</p>
                      {order.customerName && (
                        <div className="flex items-center gap-2 text-sm text-brand-dark">
                          <User size={14} className="text-gray-300 shrink-0" />
                          <span className="font-medium">{order.customerName as string}</span>
                        </div>
                      )}
                      {order.salonName && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Store size={14} className="text-gray-300 shrink-0" />
                          <span>{order.salonName as string}</span>
                        </div>
                      )}
                      {order.customerPhone && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone size={14} className="text-gray-300 shrink-0" />
                          <span>{order.customerPhone as string}</span>
                        </div>
                      )}
                      {order.dealerName && (
                        <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-brand-gold/10 text-brand-gold text-[10px] font-bold uppercase tracking-widest rounded-full">
                          Dealer: {order.dealerName as string}
                        </div>
                      )}
                    </div>

                    {/* Items */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 mb-3">Items ({order.totalQuantity as number})</p>
                      <div className="space-y-2">
                        {(order.items as { productName: string; quantity: number; unitPrice: number }[])?.map((item, i) => (
                          <div key={i} className="flex justify-between items-center text-sm">
                            <span className="text-gray-600 truncate mr-2">{item.productName} × {item.quantity}</span>
                            <span className="text-brand-dark font-medium shrink-0">₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 justify-start">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 mb-1">Actions</p>

                      {waLink && (
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-[#25D366] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#1DA851] transition-colors shadow-sm"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          Confirm via WhatsApp
                        </a>
                      )}

                      <a
                        href={`/studio/structure/saleRecord;${order._id as string}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-gray-200 text-brand-charcoal text-[11px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
                      >
                        Update Status in Studio
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
