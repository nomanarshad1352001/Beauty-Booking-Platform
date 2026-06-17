import { DashboardStats, ChartDataPoint } from '@/lib/types';

export const dashboardStats: DashboardStats = {
  totalBookings: 248,
  totalRevenue: 89420,
  newClients: 34,
  avgRating: 4.8,
  bookingsTrend: 12.5,
  revenueTrend: 18.3,
  clientsTrend: 8.2,
  ratingTrend: 0.3,
};

export const monthlyChartData: ChartDataPoint[] = [
  { name: 'Jan', bookings: 32, revenue: 11200 },
  { name: 'Feb', bookings: 28, revenue: 9800 },
  { name: 'Mar', bookings: 35, revenue: 12600 },
  { name: 'Apr', bookings: 42, revenue: 15400 },
  { name: 'May', bookings: 48, revenue: 17800 },
  { name: 'Jun', bookings: 63, revenue: 22620 },
];

export const weeklyChartData: ChartDataPoint[] = [
  { name: 'Mon', bookings: 8, revenue: 2950 },
  { name: 'Tue', bookings: 12, revenue: 4200 },
  { name: 'Wed', bookings: 10, revenue: 3800 },
  { name: 'Thu', bookings: 14, revenue: 5100 },
  { name: 'Fri', bookings: 11, revenue: 4400 },
  { name: 'Sat', bookings: 6, revenue: 1900 },
  { name: 'Sun', bookings: 2, revenue: 270 },
];

/** Revenue breakdown by service category */
export const categoryRevenue = [
  { name: 'Permanent Makeup', value: 32400, fill: 'hsl(346, 77%, 50%)' },
  { name: 'Injectables', value: 22100, fill: 'hsl(280, 65%, 60%)' },
  { name: 'Facials', value: 14200, fill: 'hsl(200, 70%, 50%)' },
  { name: 'Lashes', value: 9800, fill: 'hsl(160, 60%, 45%)' },
  { name: 'Skincare', value: 7200, fill: 'hsl(30, 80%, 55%)' },
  { name: 'Body', value: 3720, fill: 'hsl(240, 50%, 60%)' },
];
