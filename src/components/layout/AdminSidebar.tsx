import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  CalendarDays,
  MapPin,
  Scissors,
  Users,
  Palette,
  Plug,
  Settings,
  Gem,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/lib/stores/authStore';
import { getInitials } from '@/lib/utils/formatters';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Bookings', href: '/admin/bookings', icon: CalendarDays },
  { label: 'Locations', href: '/admin/locations', icon: MapPin },
  { label: 'Services', href: '/admin/services', icon: Scissors },
  { label: 'Providers', href: '/admin/providers', icon: Users },
  { label: 'Branding', href: '/admin/branding', icon: Palette },
  { label: 'Integrations', href: '/admin/integrations', icon: Plug },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="hidden lg:flex flex-col border-r border-[hsl(var(--border))] bg-[hsl(var(--card))]"
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-[hsl(var(--border))] px-4">
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <Link to="/admin" className="flex items-center gap-2">
              <Gem className="h-5 w-5 text-[hsl(var(--primary))]" />
              <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Solvé
              </span>
            </Link>
          </motion.div>
        )}
        {collapsed && (
          <Link to="/admin" className="mx-auto">
            <Gem className="h-5 w-5 text-[hsl(var(--primary))]" />
          </Link>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggle}
          className={cn("p-1.5 rounded-lg hover:bg-[hsl(var(--accent))] text-[hsl(var(--muted-foreground))] transition-colors", collapsed && "mx-auto")}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </motion.button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    'relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'text-[hsl(var(--primary))]'
                      : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-bg"
                      className="absolute inset-0 rounded-xl bg-[hsl(var(--primary))]/10"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className="h-5 w-5 shrink-0 relative z-10" />
                  {!collapsed && <span className="relative z-10">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="border-t border-[hsl(var(--border))] p-3">
        {user && !collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 mb-3 px-2"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-purple-600 text-xs font-bold text-white shadow-md">
              {getInitials(user.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] capitalize">{user.role}</p>
            </div>
          </motion.div>
        )}
        <motion.button
          whileHover={{ x: 2 }}
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--destructive))] transition-colors"
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </motion.button>
      </div>
    </motion.aside>
  );
}
