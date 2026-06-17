import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gem, Globe, ArrowUpRight } from 'lucide-react';
import { PublicHeader } from './PublicHeader';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[hsl(var(--background))]">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <AnimatedSection>
        <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
              <div className="md:col-span-1">
                <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2 mb-4">
                  <Gem className="h-6 w-6 text-[hsl(var(--primary))]" />
                  <span className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Solvé Studio
                  </span>
                </motion.div>
                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                  Premium beauty experiences for the modern aesthetic. PMU, skincare, injectables, and luxury treatments.
                </p>
                <div className="flex gap-3 mt-5">
                  {[Globe, Globe, Globe].map((Icon, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--primary))] hover:text-white transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Services</h4>
                <ul className="space-y-3 text-sm text-[hsl(var(--muted-foreground))]">
                  {['Permanent Makeup', 'Facials & Skincare', 'Injectables', 'Lash Extensions', 'Body Treatments'].map((s) => (
                    <li key={s}>
                      <a href="/book" className="hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-1 group">
                        {s}
                        <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Company</h4>
                <ul className="space-y-3 text-sm text-[hsl(var(--muted-foreground))]">
                  {['About Us', 'Our Artists', 'Locations', 'Careers', 'Press'].map((s) => (
                    <li key={s}>
                      <a href="#" className="hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-1 group">
                        {s}
                        <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Contact</h4>
                <ul className="space-y-3 text-sm text-[hsl(var(--muted-foreground))]">
                  <li>hello@solvestudio.com</li>
                  <li>(212) 555-0134</li>
                  <li>New York • Beverly Hills • Miami</li>
                </ul>
                <div className="mt-5 p-4 rounded-xl bg-[hsl(var(--muted))]/50 border border-[hsl(var(--border))]">
                  <p className="text-xs font-medium mb-1">Hours</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Mon–Fri: 9AM–7PM</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Sat: 10AM–6PM</p>
                </div>
              </div>
            </div>
            <div className="mt-12 border-t border-[hsl(var(--border))] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[hsl(var(--muted-foreground))]">
              <p>© 2024 Solvé Studio. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-[hsl(var(--primary))] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[hsl(var(--primary))] transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-[hsl(var(--primary))] transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </AnimatedSection>
    </div>
  );
}
