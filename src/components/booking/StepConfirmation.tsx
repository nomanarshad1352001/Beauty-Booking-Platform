import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, MapPin, Clock, User, Mail, Phone, Download, Share2 } from 'lucide-react';
import { useBookingStore } from '@/lib/stores/bookingStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/data/services';
import { providers } from '@/lib/data/providers';
import { locations } from '@/lib/data/locations';
import { formatCurrency, formatTime, formatDuration } from '@/lib/utils/formatters';
import { format } from 'date-fns';
import { useToastStore } from '@/lib/stores/toastStore';

export function StepConfirmation() {
  const {
    selectedServiceId,
    selectedProviderId,
    selectedLocationId,
    selectedDate,
    selectedTime,
    clientDetails,
    reset,
  } = useBookingStore();
  const { addToast } = useToastStore();

  const service = services.find((s) => s.id === selectedServiceId);
  const provider = providers.find((p) => p.id === selectedProviderId);
  const location = locations.find((l) => l.id === selectedLocationId);

  const confirmationNumber = `SLV-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Animated Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        className="mb-6"
      >
        <div className="relative inline-flex">
          {/* Ripple Rings */}
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-emerald-500/20"
          />
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
            className="absolute inset-0 rounded-full bg-emerald-500/15"
          />
          <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-500/30">
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <CheckCircle2 className="h-10 w-10 text-white" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2
          className="text-3xl sm:text-4xl font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          You&apos;re All Set!
        </h2>
        <p className="mt-3 text-[hsl(var(--muted-foreground))]">
          Your appointment has been confirmed. Check your email for details.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="text-left mt-8 mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 flex items-center justify-between">
            <span className="text-white text-sm font-semibold">Confirmation #{confirmationNumber}</span>
            <span className="text-white/80 text-xs">Confirmed ✓</span>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10">
                    <Calendar className="h-4 w-4 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Date & Time</p>
                    <p className="font-medium text-sm">
                      {selectedDate && format(new Date(selectedDate + 'T00:00:00'), 'EEEE, MMM d, yyyy')}
                    </p>
                    <p className="font-medium text-sm">{selectedTime && formatTime(selectedTime)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10">
                    <MapPin className="h-4 w-4 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Location</p>
                    <p className="font-medium text-sm">{location?.name}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{location?.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10">
                    <User className="h-4 w-4 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Provider</p>
                    <p className="font-medium text-sm">{provider?.name}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{provider?.title}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10">
                    <Clock className="h-4 w-4 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Service</p>
                    <p className="font-medium text-sm">{service?.name}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{service && formatDuration(service.duration)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10">
                    <Mail className="h-4 w-4 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Contact</p>
                    <p className="font-medium text-sm">{clientDetails?.firstName} {clientDetails?.lastName}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{clientDetails?.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10">
                    <Phone className="h-4 w-4 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">Phone</p>
                    <p className="font-medium text-sm">{clientDetails?.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-5 border-[hsl(var(--border))]" />

            <div className="flex items-center justify-between text-sm">
              <span className="text-[hsl(var(--muted-foreground))]">Deposit Paid</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {service && formatCurrency(service.depositAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-[hsl(var(--muted-foreground))]">Balance Due</span>
              <span className="font-bold">{service && formatCurrency(service.price - service.depositAmount)}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" className="rounded-xl" onClick={() => addToast('info', 'Receipt downloaded', 'Your booking receipt has been saved.')}>
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
          <Button variant="outline" className="rounded-xl" onClick={() => addToast('info', 'Link copied', 'Share link has been copied to clipboard.')}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" onClick={reset}>
            <Button variant="ghost">Return to Home</Button>
          </Link>
          <Link to="/book" onClick={reset}>
            <Button className="rounded-xl">Book Another Appointment</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
