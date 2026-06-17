import { motion } from 'framer-motion';
import { CalendarDays, DollarSign, Users, Star, ArrowUpRight } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { dashboardStats, monthlyChartData, categoryRevenue, weeklyChartData } from '@/lib/data/analytics';
import { bookings } from '@/lib/data/bookings';
import { clients } from '@/lib/data/clients';
import { services } from '@/lib/data/services';
import { providers } from '@/lib/data/providers';
import { formatCurrency, formatDate, formatTime } from '@/lib/utils/formatters';
import { BookingStatusBadge } from '@/components/shared/StatusBadge';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const upcomingBookings = bookings
    .filter((b) => b.status === 'confirmed' || b.status === 'pending')
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your business."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Bookings"
          value={dashboardStats.totalBookings.toString()}
          trend={dashboardStats.bookingsTrend}
          icon={CalendarDays}
          index={0}
        />
        <StatCard
          title="Revenue"
          value={formatCurrency(dashboardStats.totalRevenue)}
          trend={dashboardStats.revenueTrend}
          icon={DollarSign}
          index={1}
        />
        <StatCard
          title="New Clients"
          value={dashboardStats.newClients.toString()}
          trend={dashboardStats.clientsTrend}
          icon={Users}
          index={2}
        />
        <StatCard
          title="Avg Rating"
          value={dashboardStats.avgRating.toFixed(1)}
          trend={dashboardStats.ratingTrend}
          icon={Star}
          index={3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Revenue Overview</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">
                View Report
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyChartData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(346, 77%, 50%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(346, 77%, 50%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-[hsl(var(--border))]" />
                    <XAxis dataKey="name" className="text-xs" tick={{ fill: 'hsl(240, 3.8%, 46.1%)' }} />
                    <YAxis className="text-xs" tick={{ fill: 'hsl(240, 3.8%, 46.1%)' }} tickFormatter={(v) => `$${v / 1000}k`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }}
                      formatter={(value) => [formatCurrency(Number(value)), 'Revenue']}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(346, 77%, 50%)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>By Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryRevenue} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                      {categoryRevenue.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }}
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {categoryRevenue.slice(0, 4).map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
                      <span className="text-[hsl(var(--muted-foreground))]">{item.name}</span>
                    </div>
                    <span className="font-medium">{formatCurrency(item.value)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Weekly Bookings Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>This Week&apos;s Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-[hsl(var(--border))]" />
                  <XAxis dataKey="name" className="text-xs" tick={{ fill: 'hsl(240, 3.8%, 46.1%)' }} />
                  <YAxis className="text-xs" tick={{ fill: 'hsl(240, 3.8%, 46.1%)' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }}
                  />
                  <Bar dataKey="bookings" fill="hsl(346, 77%, 50%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upcoming Bookings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Appointments</CardTitle>
            <Link to="/admin/bookings">
              <Button variant="ghost" size="sm" className="text-xs">
                View All
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[hsl(var(--border))]">
                    <th className="text-left py-3 px-2 font-medium text-[hsl(var(--muted-foreground))]">Client</th>
                    <th className="text-left py-3 px-2 font-medium text-[hsl(var(--muted-foreground))]">Service</th>
                    <th className="text-left py-3 px-2 font-medium text-[hsl(var(--muted-foreground))] hidden md:table-cell">Provider</th>
                    <th className="text-left py-3 px-2 font-medium text-[hsl(var(--muted-foreground))]">Date & Time</th>
                    <th className="text-left py-3 px-2 font-medium text-[hsl(var(--muted-foreground))]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingBookings.map((booking, idx) => {
                    const client = clients.find((c) => c.id === booking.clientId);
                    const service = services.find((s) => s.id === booking.serviceId);
                    const provider = providers.find((p) => p.id === booking.providerId);
                    return (
                      <motion.tr
                        key={booking.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + idx * 0.06 }}
                        className="border-b border-[hsl(var(--border))] last:border-0 hover:bg-[hsl(var(--muted))]/30 transition-colors"
                      >
                        <td className="py-3 px-2">
                          <div className="font-medium">{client?.firstName} {client?.lastName}</div>
                          <div className="text-xs text-[hsl(var(--muted-foreground))]">{client?.email}</div>
                        </td>
                        <td className="py-3 px-2">{service?.name}</td>
                        <td className="py-3 px-2 hidden md:table-cell">{provider?.name}</td>
                        <td className="py-3 px-2">
                          <div>{formatDate(booking.date)}</div>
                          <div className="text-xs text-[hsl(var(--muted-foreground))]">{formatTime(booking.startTime)}</div>
                        </td>
                        <td className="py-3 px-2">
                          <BookingStatusBadge status={booking.status} />
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
