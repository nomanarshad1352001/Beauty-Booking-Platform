import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Lock, Shield, CheckCircle2 } from 'lucide-react';
import { useBookingStore } from '@/lib/stores/bookingStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { services } from '@/lib/data/services';
import { providers } from '@/lib/data/providers';
import { locations } from '@/lib/data/locations';
import { formatCurrency, formatTime, formatDuration } from '@/lib/utils/formatters';
import { format } from 'date-fns';

export function StepPayment() {
  const {
    selectedServiceId,
    selectedProviderId,
    selectedLocationId,
    selectedDate,
    selectedTime,
    clientDetails,
    completePayment,
    prevStep,
  } = useBookingStore();

  const [processing, setProcessing] = useState(false);

  const service = services.find((s) => s.id === selectedServiceId);
  const provider = providers.find((p) => p.id === selectedProviderId);
  const location = locations.find((l) => l.id === selectedLocationId);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      completePayment();
    }, 2500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" size="sm" onClick={prevStep} className="mb-4 -ml-2 rounded-lg">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Secure Your Appointment
          </h2>
          <p className="mt-2 text-[hsl(var(--muted-foreground))]">
            A deposit is required to confirm your booking.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-[hsl(var(--primary))] to-purple-600 px-5 py-3">
              <h3 className="font-semibold text-white text-sm">Booking Summary</h3>
            </div>
            <CardContent className="p-5 pt-5">
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Service', value: service?.name },
                  { label: 'Provider', value: provider?.name },
                  { label: 'Location', value: location?.name },
                  { label: 'Date', value: selectedDate && format(new Date(selectedDate + 'T00:00:00'), 'EEE, MMM d, yyyy') },
                  { label: 'Time', value: selectedTime && formatTime(selectedTime) },
                  { label: 'Duration', value: service && formatDuration(service.duration) },
                  { label: 'Client', value: `${clientDetails?.firstName} ${clientDetails?.lastName}` },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-[hsl(var(--muted-foreground))]">{item.label}</span>
                    <span className="font-medium text-right">{item.value}</span>
                  </div>
                ))}

                <hr className="border-[hsl(var(--border))]" />

                <div className="flex justify-between">
                  <span className="text-[hsl(var(--muted-foreground))]">Total Price</span>
                  <span className="font-medium">{service && formatCurrency(service.price)}</span>
                </div>
                <div className="flex justify-between text-[hsl(var(--primary))] font-bold">
                  <span>Deposit Due Now</span>
                  <span>{service && formatCurrency(service.depositAmount)}</span>
                </div>
                <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))]">
                  <span>Remaining</span>
                  <span>{service && formatCurrency(service.price - service.depositAmount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          <Card>
            <CardContent className="p-5 pt-5">
              <div className="flex items-center gap-2 mb-5">
                <div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10">
                  <CreditCard className="h-5 w-5 text-[hsl(var(--primary))]" />
                </div>
                <h3 className="font-semibold">Payment Details</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Card Number</label>
                  <Input placeholder="4242 4242 4242 4242" defaultValue="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Expiry</label>
                    <Input placeholder="MM / YY" defaultValue="12 / 28" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">CVC</label>
                    <Input placeholder="123" defaultValue="123" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Name on Card</label>
                  <Input defaultValue={`${clientDetails?.firstName ?? ''} ${clientDetails?.lastName ?? ''}`} />
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full rounded-xl h-12 text-base shadow-lg shadow-[hsl(var(--primary))]/20"
                  size="lg"
                >
                  {processing ? (
                    <motion.span
                      className="flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing Payment...
                    </motion.span>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Pay {service && formatCurrency(service.depositAmount)} Deposit
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-4 text-xs text-[hsl(var(--muted-foreground))] pt-2">
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-4 w-4" />
                    <span>SSL Encrypted</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Secure Payment</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
