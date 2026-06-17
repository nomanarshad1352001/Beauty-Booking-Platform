import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Gem } from 'lucide-react';
import { useBookingStore } from '@/lib/stores/bookingStore';
import { BookingProgress } from '@/components/booking/BookingProgress';
import { StepClientType } from '@/components/booking/StepClientType';
import { StepLocation } from '@/components/booking/StepLocation';
import { StepCategory } from '@/components/booking/StepCategory';
import { StepService } from '@/components/booking/StepService';
import { StepProvider } from '@/components/booking/StepProvider';
import { StepDateTime } from '@/components/booking/StepDateTime';
import { StepDetails } from '@/components/booking/StepDetails';
import { StepPayment } from '@/components/booking/StepPayment';
import { StepConfirmation } from '@/components/booking/StepConfirmation';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

const stepComponents = {
  'client-type': StepClientType,
  location: StepLocation,
  category: StepCategory,
  service: StepService,
  provider: StepProvider,
  datetime: StepDateTime,
  details: StepDetails,
  payment: StepPayment,
  confirmation: StepConfirmation,
};

export function Booking() {
  const { currentStep, reset } = useBookingStore();

  useEffect(() => {
    return () => { /* keep state alive for back nav */ };
  }, [reset]);

  const StepComponent = stepComponents[currentStep];

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Header */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-40 border-b border-[hsl(var(--border))] glass-strong"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div whileHover={{ rotate: 15 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Gem className="h-5 w-5 text-[hsl(var(--primary))]" />
            </motion.div>
            <span className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Solvé
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </motion.header>

      {/* Progress */}
      <div className="border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
          <BookingProgress />
        </div>
      </div>

      {/* Step Content with animated transitions */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 40, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -40, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <StepComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
