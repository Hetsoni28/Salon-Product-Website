"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { 
  TrendingUp, Users, Package, DollarSign, Award, 
  ArrowUpRight, ShoppingBag, LayoutDashboard, Settings, LogOut
} from 'lucide-react';

export interface DealerStat {
  name: string;
  code: string;
  slug: string;
  totalItems: number;
  totalRevenue: number;
  products: Record<string, { name: string; qty: number; revenue: number }>;
}

export interface Order {
  orderId: string;
  completedAt: string;
  dealerName?: string;
  dealerCode?: string;
  totalQuantity: number;
  orderTotal: number;
}

interface DashboardClientProps {
  grandTotalRevenue: number;
  grandTotalItems: number;
  dealerCount: number;
  dealers: DealerStat[];
  recentOrders: Order[];
}

const COLORS = ['#C8A882', '#A8845E', '#D9BFA0', '#2D2D2D', '#9C9C9C'];

export const DashboardClient: React.FC<DashboardClientProps> = ({
  grandTotalRevenue,
  grandTotalItems,
  dealerCount,
  dealers,
  recentOrders
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Prepare chart data (Top 5 dealers by revenue)
  const chartData = dealers
    .slice(0, 5)
    .map(d => ({
      name: d.name,
      Revenue: d.totalRevenue,
      Items: d.totalItems
    }));

  return (
    <div className="min-h-screen bg-brand-cream font-sans flex flex-col md:flex-row">
      {/* Sidebar - Fixed on desktop, sticky on mobile */}
      <aside className="sticky top-0 z-50 md:fixed md:inset-y-0 md:left-0 w-full md:w-64 bg-brand-charcoal text-white flex flex-col md:h-screen shadow-2xl md:shadow-none border-r border-white/5 shrink-0">
        <div className="p-4 md:p-6 border-b border-white/10 flex items-center justify-between md:block shrink-0">
          <div>
            <h2 className="font-serif text-xl md:text-2xl tracking-widest text-brand-gold">
              LUMIÈRE
            </h2>
            <p className="text-[10px] md:text-xs text-white/50 tracking-widest uppercase mt-0.5 md:mt-1">
              Admin Portal
            </p>
          </div>
        </div>
        <nav className="flex-1 p-2 md:p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-shrink-0 flex items-center gap-3 px-4 py-2.5 md:py-3 rounded-xl transition-all text-sm ${activeTab === "overview" ? "bg-brand-gold text-white shadow-lg" : "text-white/70 hover:bg-white/5"}`}
          >
            <LayoutDashboard size={18} /> <span className="hidden md:inline">Overview</span>
          </button>
          <button
            onClick={() => setActiveTab("dealers")}
            className={`flex-shrink-0 flex items-center gap-3 px-4 py-2.5 md:py-3 rounded-xl transition-all text-sm ${activeTab === "dealers" ? "bg-brand-gold text-white shadow-lg" : "text-white/70 hover:bg-white/5"}`}
          >
            <Users size={18} /> <span className="hidden md:inline">Dealer Leaderboard</span>
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex-shrink-0 flex items-center gap-3 px-4 py-2.5 md:py-3 rounded-xl transition-all text-sm ${activeTab === "orders" ? "bg-brand-gold text-white shadow-lg" : "text-white/70 hover:bg-white/5"}`}
          >
            <ShoppingBag size={18} /> <span className="hidden md:inline">Recent Orders</span>
          </button>
        </nav>
        <div className="hidden md:block p-4 border-t border-white/10 shrink-0">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white transition-colors text-sm">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content - offset on desktop by sidebar width */}
      <main className="flex-1 md:ml-64 p-4 md:p-10 min-h-screen">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          
          <header className="mb-10 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-serif text-brand-dark mb-2">Sales Dashboard</h1>
              <p className="text-gray-500 font-light">Monitor dealer performance and verified purchases.</p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-brand-charcoal">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="text-xs text-brand-gold uppercase tracking-widest mt-1">Live Updates</p>
            </div>
          </header>

          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Total Revenue', value: `₹${grandTotalRevenue.toLocaleString('en-IN')}`, icon: DollarSign, trend: '+12.5%' },
                  { label: 'Items Sold', value: grandTotalItems.toLocaleString('en-IN'), icon: Package, trend: '+8.2%' },
                  { label: 'Active Dealers', value: dealerCount, icon: Award, trend: '+2' },
                ].map((metric, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                    key={metric.label} 
                    className="bg-white rounded-3xl p-6 shadow-sm border border-brand-divider relative overflow-hidden group hover:border-brand-gold transition-colors"
                  >
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-brand-cream rounded-full group-hover:scale-110 transition-transform duration-500" />
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-brand-cream rounded-xl text-brand-gold">
                          <metric.icon size={22} />
                        </div>
                        <span className="flex items-center text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          <TrendingUp size={12} className="mr-1"/> {metric.trend}
                        </span>
                      </div>
                      <p className="text-3xl font-serif text-brand-dark mb-1">{metric.value}</p>
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{metric.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <div className="xl:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-brand-divider">
                  <h3 className="text-lg font-serif text-brand-dark mb-6">Top 5 Dealers by Revenue</h3>
                  <div className="h-[300px] w-full">
                    {chartData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0E8DF" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B6B6B' }} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B6B6B' }} tickFormatter={(val) => `₹${val/1000}k`} />
                          <Tooltip 
                            cursor={{ fill: '#FAF7F2' }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                          />
                          <Bar dataKey="Revenue" radius={[6, 6, 0, 0]}>
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        <ShoppingBag size={48} className="mb-2 opacity-20" />
                        <p>No sales data available yet</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent Orders Mini */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-brand-divider flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-serif text-brand-dark">Recent Activity</h3>
                    <button onClick={() => setActiveTab('orders')} className="text-brand-gold hover:text-brand-gold-dark p-2">
                      <ArrowUpRight size={20} />
                    </button>
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-hide">
                    {recentOrders.length > 0 ? recentOrders.slice(0, 5).map((order) => (
                      <div key={order.orderId} className="flex items-center justify-between p-3 rounded-2xl hover:bg-brand-cream transition-colors border border-transparent hover:border-brand-divider">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-brand-charcoal text-white flex items-center justify-center text-sm font-serif">
                            {order.dealerName ? order.dealerName.charAt(0) : 'D'}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-brand-dark">{order.dealerName || 'Direct Order'}</p>
                            <p className="text-xs text-gray-500">{order.totalQuantity} items</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-brand-gold">₹{order.orderTotal.toLocaleString('en-IN')}</p>
                          <p className="text-[10px] text-gray-400">
                            {new Date(order.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    )) : (
                      <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
                        No recent orders.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dealers' && (
            <div className="bg-white rounded-3xl shadow-sm border border-brand-divider overflow-hidden">
              <div className="p-8 border-b border-brand-divider">
                <h3 className="text-2xl font-serif text-brand-dark">Dealer Leaderboard</h3>
                <p className="text-gray-500 font-light mt-1">Ranked by total revenue generated.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-cream text-xs uppercase tracking-widest text-brand-charcoal">
                      <th className="px-8 py-4 font-semibold">Rank</th>
                      <th className="px-8 py-4 font-semibold">Dealer</th>
                      <th className="px-8 py-4 font-semibold">Code</th>
                      <th className="px-8 py-4 font-semibold text-right">Items Sold</th>
                      <th className="px-8 py-4 font-semibold text-right">Total Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-divider">
                    {dealers.length > 0 ? dealers.map((dealer, idx) => (
                      <tr key={dealer.code} className="hover:bg-brand-cream/50 transition-colors group">
                        <td className="px-8 py-5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-brand-gold text-white' : idx === 1 ? 'bg-gray-300 text-brand-dark' : idx === 2 ? 'bg-[#cd7f32] text-white' : 'bg-brand-cream text-gray-500'}`}>
                            {idx + 1}
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <p className="font-medium text-brand-dark">{dealer.name}</p>
                          {dealer.slug && <p className="text-xs text-gray-500 group-hover:text-brand-gold transition-colors">/d/{dealer.slug}</p>}
                        </td>
                        <td className="px-8 py-5">
                          <span className="bg-gray-100 text-brand-charcoal text-xs px-2 py-1 rounded font-mono">{dealer.code}</span>
                        </td>
                        <td className="px-8 py-5 text-right font-medium text-gray-700">{dealer.totalItems}</td>
                        <td className="px-8 py-5 text-right font-bold text-brand-gold">₹{dealer.totalRevenue.toLocaleString('en-IN')}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-8 py-12 text-center text-gray-400">
                          No dealers have made sales yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-3xl shadow-sm border border-brand-divider overflow-hidden">
               <div className="p-8 border-b border-brand-divider">
                <h3 className="text-2xl font-serif text-brand-dark">Complete Order History</h3>
                <p className="text-gray-500 font-light mt-1">All verified purchases across the platform.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-cream text-xs uppercase tracking-widest text-brand-charcoal">
                      <th className="px-8 py-4 font-semibold">Order ID</th>
                      <th className="px-8 py-4 font-semibold">Date & Time</th>
                      <th className="px-8 py-4 font-semibold">Attribution</th>
                      <th className="px-8 py-4 font-semibold text-right">Items</th>
                      <th className="px-8 py-4 font-semibold text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-divider">
                    {recentOrders.length > 0 ? recentOrders.map((order) => (
                      <tr key={order.orderId} className="hover:bg-brand-cream/50 transition-colors">
                        <td className="px-8 py-4 font-mono text-xs text-gray-500">{order.orderId.split('-')[0]}</td>
                        <td className="px-8 py-4 text-sm text-gray-700">
                          {new Date(order.completedAt).toLocaleDateString('en-IN')} <span className="text-gray-400 ml-1">{new Date(order.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </td>
                        <td className="px-8 py-4">
                          {order.dealerName ? (
                            <span className="inline-flex items-center gap-1.5 bg-brand-gold/10 text-brand-gold text-xs px-2.5 py-1 rounded-full font-medium">
                              <Award size={12} /> {order.dealerName} ({order.dealerCode})
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">Direct</span>
                          )}
                        </td>
                        <td className="px-8 py-4 text-right text-sm text-gray-700">{order.totalQuantity}</td>
                        <td className="px-8 py-4 text-right font-bold text-brand-dark">₹{order.orderTotal.toLocaleString('en-IN')}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-8 py-12 text-center text-gray-400">
                          No orders recorded yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};
