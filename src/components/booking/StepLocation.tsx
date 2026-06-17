import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowLeft } from 'lucide-react';
import { useBookingStore } from '@/lib/stores/bookingStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { locations } from '@/lib/data/locations';

export function StepLocation() {
  const { selectLocation, prevStep } = useBookingStore();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" size="sm" onClick={prevStep} className="mb-4 -ml-2 rounded-lg">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Choose a Location
          </h2>
          <p className="mt-2 text-[hsl(var(--muted-foreground))]">
            Select the studio nearest to you.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {locations.filter((l) => l.isActive).map((location, idx) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card
              className="magnetic-hover cursor-pointer overflow-hidden border-2 border-transparent hover:border-[hsl(var(--primary))]/30 group"
              onClick={() => selectLocation(location.id)}
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={location.imageUrl}
                  alt={location.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <CardContent className="p-5">
                <h3 className="font-semibold text-lg group-hover:text-[hsl(var(--primary))] transition-colors">{location.name}</h3>
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-start gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{location.address}, {location.city}, {location.state} {location.zip}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span>Mon–Fri: {location.hours.monday.open}–{location.hours.monday.close}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
