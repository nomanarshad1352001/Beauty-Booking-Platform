import { motion } from 'framer-motion';
import { useBookingStore } from '@/lib/stores/bookingStore';
import { BookingStep } from '@/lib/types';
import { cn } from '@/utils/cn';
import { Check } from 'lucide-react';

const steps: { key: BookingStep; label: string }[] = [
  { key: 'client-type', label: 'Welcome' },
  { key: 'location', label: 'Location' },
  { key: 'category', label: 'Category' },
  { key: 'service', label: 'Service' },
  { key: 'provider', label: 'Provider' },
  { key: 'datetime', label: 'Date & Time' },
  { key: 'details', label: 'Details' },
  { key: 'payment', label: 'Payment' },
];

export function BookingProgress() {
  const { getCurrentStepIndex } = useBookingStore();
  const currentIndex = getCurrentStepIndex();
  const percentage = (currentIndex / steps.length) * 100;

  return (
    <div className="w-full">
      {/* Desktop progress */}
      <div className="hidden md:flex items-center justify-center gap-0">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          return (
            <div key={step.key} className="flex items-center">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.15 : 1,
                    backgroundColor: isCompleted ? 'hsl(346, 77%, 50%)' : isCurrent ? 'hsl(346, 77%, 50%)' : 'transparent',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold',
                    isCompleted
                      ? 'text-white shadow-md shadow-[hsl(var(--primary))]/25'
                      : isCurrent
                      ? 'text-white shadow-md shadow-[hsl(var(--primary))]/25'
                      : 'border-2 border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]'
                  )}
                >
                  {isCompleted ? (
                    <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 400 }}>
                      <Check className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    index + 1
                  )}
                </motion.div>
                <span
                  className={cn(
                    'mt-2 text-[10px] font-medium whitespace-nowrap transition-colors',
                    isCurrent ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="relative h-[2px] w-8 lg:w-14 mx-1.5 mt-[-14px] bg-[hsl(var(--border))] rounded-full overflow-hidden">
                  <motion.div
                    initial={false}
                    animate={{ width: index < currentIndex ? '100%' : '0%' }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="absolute inset-y-0 left-0 bg-[hsl(var(--primary))] rounded-full"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile progress bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-[hsl(var(--primary))]">
            {steps[currentIndex]?.label ?? 'Complete'}
          </span>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            Step {Math.min(currentIndex + 1, steps.length)} of {steps.length}
          </span>
        </div>
        <div className="h-2.5 rounded-full bg-[hsl(var(--muted))] overflow-hidden">
          <motion.div
            initial={false}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-purple-500"
          />
        </div>
      </div>
    </div>
  );
}
