import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  LayoutDashboard,
  CalendarDays,
  MapPin,
  Scissors,
  Users,
  Palette,
  Plug,
  Settings,
  LogOut,
  Gem,
  Bell,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuthStore } from '@/lib/stores/authStore';
import { getInitials } from '@/lib/utils/formatters';
import { cn } from '@/utils/cn';
import { useToastStore } from '@/lib/stores/toastStore';

const mobileNavItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Bookings', href: '/admin/bookings', icon: CalendarDays },
  { label: 'Locations', href: '/admin/locations', icon: MapPin },
  { label: 'Services', href: '/admin/services', icon: Scissors },
  { label: 'Providers', href: '/admin/providers', icon: Users },
  { label: 'Branding', href: '/admin/branding', icon: Palette },
  { label: 'Integrations', href: '/admin/integrations', icon: Plug },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { addToast } = useToastStore();
  const location = useLocation();

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[hsl(var(--border))] glass-strong px-4 sm:px-6">
        {/* Mobile Menu Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-[hsl(var(--accent))]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile Logo */}
        <Link to="/admin" className="lg:hidden flex items-center gap-2">
          <Gem className="h-5 w-5 text-[hsl(var(--primary))]" />
          <span className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Solvé
          </span>
        </Link>

        <div className="hidden lg:block" />

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addToast('info', '3 new notifications', 'You have new booking requests.')}
            className="relative p-2 rounded-xl hover:bg-[hsl(var(--accent))] transition-colors"
          >
            <Bell className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--primary))] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
            </span>
          </motion.button>
          <ThemeToggle />
          {user && (
            <div className="flex items-center gap-2.5 ml-1 pl-3 border-l border-[hsl(var(--border))]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-purple-600 text-xs font-bold text-white shadow-md">
                {getInitials(user.name)}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium leading-tight">{user.name}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] capitalize">{user.role}</p>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-72 bg-[hsl(var(--card))] shadow-2xl flex flex-col"
            >
              <div className="flex h-16 items-center justify-between border-b border-[hsl(var(--border))] px-4">
                <Link to="/admin" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <Gem className="h-5 w-5 text-[hsl(var(--primary))]" />
                  <span className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Solvé
                  </span>
                </Link>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-[hsl(var(--accent))]">
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              <nav className="flex-1 overflow-y-auto py-4 px-3">
                <ul className="space-y-1">
                  {mobileNavItems.map((item, idx) => {
                    const isActive =
                      item.href === '/admin'
                        ? location.pathname === '/admin'
                        : location.pathname.startsWith(item.href);
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                      >
                        <Link
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                            isActive
                              ? 'bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]'
                              : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))]'
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="border-t border-[hsl(var(--border))] p-4">
                {user && (
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-purple-600 text-xs font-bold text-white">
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] capitalize">{user.role}</p>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => { setMobileOpen(false); logout(); }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--destructive))] transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
