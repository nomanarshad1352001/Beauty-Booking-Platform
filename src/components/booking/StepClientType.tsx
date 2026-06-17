import { motion } from 'framer-motion';
import { UserPlus, UserCheck, Sparkles } from 'lucide-react';
import { useBookingStore } from '@/lib/stores/bookingStore';
import { Card, CardContent } from '@/components/ui/card';

export function StepClientType() {
  const { setClientType } = useBookingStore();

  return (
    <div className="max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
          className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-purple-600 mb-5 shadow-lg shadow-[hsl(var(--primary))]/25"
        >
          <Sparkles className="h-8 w-8 text-white" />
        </motion.div>
        <h2
          className="text-3xl sm:text-4xl font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Welcome to <span className="gradient-text">Solvé</span>
        </h2>
        <p className="mt-3 text-[hsl(var(--muted-foreground))] text-lg">
          Let&apos;s get started with your booking. Are you new here?
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          {
            icon: UserPlus,
            title: "I'm New Here",
            desc: "First time? We'll make sure your experience is perfect from start to finish.",
            isNew: true,
            gradient: 'from-pink-500 to-rose-500',
          },
          {
            icon: UserCheck,
            title: 'Welcome Back',
            desc: "Great to see you again! Let's book your next appointment.",
            isNew: false,
            gradient: 'from-violet-500 to-purple-500',
          },
        ].map((option, i) => (
          <motion.div
            key={option.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
          >
            <Card
              className="magnetic-hover cursor-pointer border-2 border-transparent hover:border-[hsl(var(--primary))]/30 group"
              onClick={() => setClientType(option.isNew)}
            >
              <CardContent className="p-8 text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className={`mx-auto flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br ${option.gradient} mb-5 shadow-lg`}
                >
                  <option.icon className="h-9 w-9 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[hsl(var(--primary))] transition-colors">
                  {option.title}
                </h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {option.desc}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
