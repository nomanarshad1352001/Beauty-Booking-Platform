import { motion } from 'framer-motion';
import { ArrowLeft, Star } from 'lucide-react';
import { useBookingStore } from '@/lib/stores/bookingStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { providers } from '@/lib/data/providers';
import { cn } from '@/utils/cn';

export function StepProvider() {
  const { selectedLocationId, selectedServiceId, selectProvider, prevStep } = useBookingStore();

  const availableProviders = providers.filter(
    (p) => p.locationId === selectedLocationId && p.isActive && p.serviceIds.includes(selectedServiceId!)
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
            Choose Your Provider
          </h2>
          <p className="mt-2 text-[hsl(var(--muted-foreground))]">
            Select the artist or professional you&apos;d like to book with.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {availableProviders.map((provider, idx) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card
              className="magnetic-hover cursor-pointer border-2 border-transparent hover:border-[hsl(var(--primary))]/30 group"
              onClick={() => selectProvider(provider.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-18 w-18 shrink-0">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-[2px] rounded-full overflow-hidden">
                      <img
                        src={provider.avatarUrl}
                        alt={provider.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg group-hover:text-[hsl(var(--primary))] transition-colors">{provider.name}</h3>
                    <p className="text-sm text-[hsl(var(--primary))] font-medium">{provider.title}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-3.5 w-3.5',
                              i <= Math.floor(provider.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium ml-1">{provider.rating}</span>
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">({provider.reviewCount})</span>
                    </div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2 line-clamp-2">{provider.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {availableProviders.length === 0 && (
        <Card><CardContent className="p-8 text-center"><p className="text-[hsl(var(--muted-foreground))]">No providers available for this selection.</p></CardContent></Card>
      )}
    </div>
  );
}
