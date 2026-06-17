import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/utils/cn';

interface StatCardProps {
  title: string;
  value: string;
  trend: number;
  icon: LucideIcon;
  trendLabel?: string;
  index?: number;
}

export function StatCard({ title, value, trend, icon: Icon, trendLabel = 'vs last month', index = 0 }: StatCardProps) {
  const isPositive = trend >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Card className="magnetic-hover group overflow-hidden hover:border-[hsl(var(--primary))]/30">
        <CardContent className="p-6 relative">
          {/* Subtle shimmer on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer" />

          <div className="flex items-center justify-between relative">
            <div className="space-y-1">
              <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">{title}</p>
              <motion.p
                className="text-2xl sm:text-3xl font-bold"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, delay: 0.2 + index * 0.1 }}
              >
                {value}
              </motion.p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))]/15 to-[hsl(var(--primary))]/5"
            >
              <Icon className="h-6 w-6 text-[hsl(var(--primary))]" />
            </motion.div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-1"
            >
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              )}
              <span className={cn('font-semibold', isPositive ? 'text-emerald-500' : 'text-red-500')}>
                {isPositive ? '+' : ''}{trend}%
              </span>
            </motion.div>
            <span className="text-[hsl(var(--muted-foreground))]">{trendLabel}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
