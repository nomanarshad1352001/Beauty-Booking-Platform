import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookingStatusBadge } from '@/components/shared/StatusBadge';
import { bookings } from '@/lib/data/bookings';
import { clients } from '@/lib/data/clients';
import { services } from '@/lib/data/services';
import { providers } from '@/lib/data/providers';
import { locations } from '@/lib/data/locations';
import { formatCurrency, formatDate, formatTime } from '@/lib/utils/formatters';
import { BookingStatus } from '@/lib/types';
import { cn } from '@/utils/cn';

const statusFilters: { label: string; value: BookingStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'No Show', value: 'no-show' },
];

export function Bookings() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const client = clients.find((c) => c.id === booking.clientId);
      const service = services.find((s) => s.id === booking.serviceId);
      const provider = providers.find((p) => p.id === booking.providerId);

      const matchesSearch =
        !search ||
        client?.firstName.toLowerCase().includes(search.toLowerCase()) ||
        client?.lastName.toLowerCase().includes(search.toLowerCase()) ||
        client?.email.toLowerCase().includes(search.toLowerCase()) ||
        service?.name.toLowerCase().includes(search.toLowerCase()) ||
        provider?.name.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filteredBookings.length / pageSize);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <PageHeader
        title="Bookings"
        description="View and manage all appointments."
        action={
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            New Booking
          </Button>
        }
      />

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              <Input
                placeholder="Search bookings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter className="h-4 w-4 text-[hsl(var(--muted-foreground))] shrink-0" />
              {statusFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={statusFilter === filter.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setStatusFilter(filter.value);
                    setCurrentPage(1);
                  }}
                  className="whitespace-nowrap"
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50">
                  <th className="text-left py-3 px-4 font-medium text-[hsl(var(--muted-foreground))]">Client</th>
                  <th className="text-left py-3 px-4 font-medium text-[hsl(var(--muted-foreground))]">Service</th>
                  <th className="text-left py-3 px-4 font-medium text-[hsl(var(--muted-foreground))]">Provider</th>
                  <th className="text-left py-3 px-4 font-medium text-[hsl(var(--muted-foreground))]">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-[hsl(var(--muted-foreground))]">Date & Time</th>
                  <th className="text-left py-3 px-4 font-medium text-[hsl(var(--muted-foreground))]">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-[hsl(var(--muted-foreground))]">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBookings.map((booking) => {
                  const client = clients.find((c) => c.id === booking.clientId);
                  const service = services.find((s) => s.id === booking.serviceId);
                  const provider = providers.find((p) => p.id === booking.providerId);
                  const location = locations.find((l) => l.id === booking.locationId);
                  return (
                    <tr
                      key={booking.id}
                      className="border-b border-[hsl(var(--border))] last:border-0 hover:bg-[hsl(var(--muted))]/30 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium">{client?.firstName} {client?.lastName}</div>
                        <div className="text-xs text-[hsl(var(--muted-foreground))]">{client?.email}</div>
                      </td>
                      <td className="py-3 px-4">{service?.name}</td>
                      <td className="py-3 px-4">{provider?.name}</td>
                      <td className="py-3 px-4 text-[hsl(var(--muted-foreground))]">{location?.name}</td>
                      <td className="py-3 px-4">
                        <div>{formatDate(booking.date)}</div>
                        <div className="text-xs text-[hsl(var(--muted-foreground))]">
                          {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{formatCurrency(booking.totalPrice)}</div>
                        <div className="text-xs text-[hsl(var(--muted-foreground))]">
                          Paid: {formatCurrency(booking.depositPaid)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <BookingStatusBadge status={booking.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-[hsl(var(--border))] px-4 py-3">
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Showing {(currentPage - 1) * pageSize + 1} to{' '}
                {Math.min(currentPage * pageSize, filteredBookings.length)} of {filteredBookings.length}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => p - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={cn('w-8', currentPage !== page && 'hidden sm:inline-flex')}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
