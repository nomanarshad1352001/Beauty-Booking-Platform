import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Gem } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/authStore';
import { useThemeStore } from '@/lib/stores/themeStore';
import { ToastContainer } from '@/components/shared/ToastContainer';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';

// Pages
import { Landing } from '@/pages/Landing';
import { Booking } from '@/pages/Booking';
import { Login } from '@/pages/Login';
import { Signup } from '@/pages/Signup';
import { NotFound } from '@/pages/NotFound';

// Admin Pages
import { Dashboard } from '@/pages/admin/Dashboard';
import { Bookings } from '@/pages/admin/Bookings';
import { Locations } from '@/pages/admin/Locations';
import { Services } from '@/pages/admin/Services';
import { Providers } from '@/pages/admin/Providers';
import { Branding } from '@/pages/admin/Branding';
import { Integrations } from '@/pages/admin/Integrations';
import { Settings } from '@/pages/admin/Settings';

/** Premium loading screen shown on initial app load */
function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 1800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[hsl(var(--background))]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 w-20 h-20 rounded-full border-2 border-transparent border-t-[hsl(var(--primary))] border-r-[hsl(var(--primary))]/30"
          />
          <div className="w-20 h-20 flex items-center justify-center">
            <Gem className="h-8 w-8 text-[hsl(var(--primary))]" />
          </div>
        </div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-xl font-bold tracking-tight"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Solvé Studio
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.6 }}
        className="mt-1 text-xs text-[hsl(var(--muted-foreground))]"
      >
        Premium Beauty Booking
      </motion.p>
    </motion.div>
  );
}

function App() {
  const { initialize: initAuth } = useAuthStore();
  const { initialize: initTheme } = useThemeStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initAuth();
    initTheme();
  }, [initAuth, initTheme]);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BrowserRouter>
            <Routes>
              {/* Public Routes with Layout */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Landing />} />
              </Route>

              {/* Booking Flow (Standalone) */}
              <Route path="/book" element={<Booking />} />

              {/* Auth Routes (Standalone) */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Admin Routes with Layout */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="locations" element={<Locations />} />
                <Route path="services" element={<Services />} />
                <Route path="providers" element={<Providers />} />
                <Route path="branding" element={<Branding />} />
                <Route path="integrations" element={<Integrations />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* 404 */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>

            {/* Global Toast Notifications */}
            <ToastContainer />
          </BrowserRouter>
        </motion.div>
      )}
    </>
  );
}

export default App;
