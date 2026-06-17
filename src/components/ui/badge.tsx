import { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
        {
          'border-transparent bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]':
            variant === 'default',
          'border-transparent bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]':
            variant === 'secondary',
          'border-transparent bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))]':
            variant === 'destructive',
          'text-[hsl(var(--foreground))]': variant === 'outline',
          'border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400':
            variant === 'success',
          'border-transparent bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400':
            variant === 'warning',
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
