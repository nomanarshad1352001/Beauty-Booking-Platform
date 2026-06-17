import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Flower2, Eye, Heart, Droplets, Syringe } from 'lucide-react';
import { useBookingStore } from '@/lib/stores/bookingStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { serviceCategories } from '@/lib/data/categories';
import { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Sparkles, Flower2, Syringe, Eye, Heart, Droplets,
};

const gradientMap: Record<string, string> = {
  Sparkles: 'from-pink-500 to-rose-500',
  Flower2: 'from-green-500 to-emerald-500',
  Syringe: 'from-violet-500 to-purple-500',
  Eye: 'from-blue-500 to-cyan-500',
  Heart: 'from-red-500 to-pink-500',
  Droplets: 'from-cyan-500 to-teal-500',
};

export function StepCategory() {
  const { selectCategory, prevStep } = useBookingStore();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" size="sm" onClick={prevStep} className="mb-4 -ml-2 rounded-lg">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            What Are You Looking For?
          </h2>
          <p className="mt-2 text-[hsl(var(--muted-foreground))]">
            Choose a service category to explore our treatments.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {serviceCategories.map((category, idx) => {
          const Icon = iconMap[category.icon] || Sparkles;
          const gradient = gradientMap[category.icon] || 'from-pink-500 to-rose-500';
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
            >
              <Card
                className="magnetic-hover cursor-pointer border-2 border-transparent hover:border-[hsl(var(--primary))]/30 group"
                onClick={() => selectCategory(category.id)}
              >
                <CardContent className="p-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} mb-4 shadow-lg`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-[hsl(var(--primary))] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
