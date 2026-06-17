import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Star } from 'lucide-react';
import { useBookingStore } from '@/lib/stores/bookingStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { services } from '@/lib/data/services';
import { formatCurrency, formatDuration } from '@/lib/utils/formatters';

export function StepService() {
  const { selectedCategoryId, selectedLocationId, selectService, prevStep } = useBookingStore();

  const availableServices = services.filter(
    (s) => s.categoryId === selectedCategoryId && s.isActive && s.locationIds.includes(selectedLocationId!)
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" size="sm" onClick={prevStep} className="mb-4 -ml-2 rounded-lg">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Select a Service
          </h2>
          <p className="mt-2 text-[hsl(var(--muted-foreground))]">
            Choose the treatment that&apos;s right for you.
          </p>
        </motion.div>
      </div>

      {availableServices.length === 0 ? (
        <Card><CardContent className="p-8 text-center"><p className="text-[hsl(var(--muted-foreground))]">No services available for this selection.</p></CardContent></Card>
      ) : (
        <div className="space-y-4">
          {availableServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <Card
                className="magnetic-hover cursor-pointer border-2 border-transparent hover:border-[hsl(var(--primary))]/30 group overflow-hidden"
                onClick={() => selectService(service.id)}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 aspect-video sm:aspect-square overflow-hidden shrink-0">
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-lg group-hover:text-[hsl(var(--primary))] transition-colors">{service.name}</h3>
                            {service.isPopular && (
                              <Badge className="text-[10px]">
                                <Star className="h-2.5 w-2.5 mr-0.5 fill-current" />
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4">
                          <span className="text-xl font-bold text-[hsl(var(--primary))]">
                            {formatCurrency(service.price)}
                          </span>
                          <span className="text-xs text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))] px-2 py-1 rounded-full">
                            Deposit: {formatCurrency(service.depositAmount)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-[hsl(var(--muted-foreground))]">
                          <Clock className="h-4 w-4" />
                          {formatDuration(service.duration)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
