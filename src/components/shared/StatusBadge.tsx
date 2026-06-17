import { Badge } from '@/components/ui/badge';
import { BookingStatus, IntegrationStatus } from '@/lib/types';

const bookingStatusConfig: Record<BookingStatus, { label: string; variant: 'success' | 'warning' | 'secondary' | 'destructive' | 'outline' }> = {
  confirmed: { label: 'Confirmed', variant: 'success' },
  pending: { label: 'Pending', variant: 'warning' },
  completed: { label: 'Completed', variant: 'secondary' },
  cancelled: { label: 'Cancelled', variant: 'destructive' },
  'no-show': { label: 'No Show', variant: 'outline' },
};

const integrationStatusConfig: Record<IntegrationStatus, { label: string; variant: 'success' | 'destructive' | 'outline' }> = {
  connected: { label: 'Connected', variant: 'success' },
  disconnected: { label: 'Disconnected', variant: 'outline' },
  error: { label: 'Error', variant: 'destructive' },
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const config = bookingStatusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function IntegrationStatusBadge({ status }: { status: IntegrationStatus }) {
  const config = integrationStatusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
