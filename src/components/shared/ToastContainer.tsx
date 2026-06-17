import { motion, AnimatePresence } from 'framer-motion';
import { useToastStore } from '@/lib/stores/toastStore';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/cn';

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const colorMap = {
  success: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/80',
  error: 'border-red-500 bg-red-50 dark:bg-red-950/80',
  info: 'border-blue-500 bg-blue-50 dark:bg-blue-950/80',
  warning: 'border-amber-500 bg-amber-50 dark:bg-amber-950/80',
};

const iconColorMap = {
  success: 'text-emerald-600 dark:text-emerald-400',
  error: 'text-red-600 dark:text-red-400',
  info: 'text-blue-600 dark:text-blue-400',
  warning: 'text-amber-600 dark:text-amber-400',
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = iconMap[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={cn(
                'flex items-start gap-3 rounded-xl border-l-4 p-4 shadow-xl backdrop-blur-sm',
                colorMap[toast.type]
              )}
            >
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, delay: 0.1 }}
              >
                <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', iconColorMap[toast.type])} />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">{toast.title}</p>
                {toast.description && (
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{toast.description}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
