'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Menu,
  X,
  LayoutDashboard,
  Sparkles,
  Calendar,
  Users,
  Shield,
  BarChart3,
  Settings as SettingsIcon,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/generator': 'AI Content Generator',
  '/calendar': 'Content Calendar',
  '/influencers': 'Influencer Discovery',
  '/compliance': 'Compliance Center',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
};

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/generator', label: 'Generator', icon: Sparkles },
  { href: '/calendar', label: 'Calendar', icon: Calendar },
  { href: '/influencers', label: 'Influencers', icon: Users },
  { href: '/compliance', label: 'Compliance', icon: Shield },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

const NOTIFICATIONS = [
  { id: '1', title: 'New influencer match', body: 'Maya Chen · 96% audience overlap', time: '2m ago', tone: 'cool' },
  { id: '2', title: 'Compliance reminder', body: 'Food permit renewal due in 18 days', time: '1h ago', tone: 'warm' },
  { id: '3', title: 'Post performance', body: 'Lavender Latte reel hit 4.2K views', time: '3h ago', tone: 'trust' },
];

export function TopNav() {
  const pathname = usePathname();
  const { unreadNotifications, clearNotifications } = useAppStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const title = PAGE_TITLES[pathname] || 'Dashboard';

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-hairline bg-canvas/60 px-4 backdrop-blur-2xl md:px-6">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-white/[0.03] md:hidden"
        >
          <Menu className="h-4 w-4 text-ink" />
        </button>

        <div className="flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">Brew & Bloom Café</p>
          <h1 className="font-display text-lg font-light text-ink md:text-xl">{title}</h1>
        </div>

        {/* Search */}
        <div className="hidden flex-1 max-w-md md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted" />
            <input
              placeholder="Search posts, creators, alerts…"
              className="w-full rounded-xl border border-hairline bg-white/[0.03] py-2 pl-10 pr-4 text-sm text-ink placeholder-ink-muted outline-none transition focus:border-cool/40 focus:ring-2 focus:ring-cool/30"
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              if (!notifOpen) clearNotifications();
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-white/[0.03] transition hover:bg-white/[0.06]"
          >
            <Bell className="h-4 w-4 text-ink-secondary" />
            {unreadNotifications > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-warm font-mono text-[9px] font-bold text-canvas">
                {unreadNotifications}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  className="panel-strong absolute right-0 top-12 z-50 w-80 overflow-hidden p-0"
                >
                  <div className="border-b border-hairline px-4 py-3">
                    <p className="mono-label !text-ink">Notifications</p>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {NOTIFICATIONS.map((n) => (
                      <div
                        key={n.id}
                        className="border-b border-hairline px-4 py-3 transition last:border-0 hover:bg-white/[0.03]"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${
                              n.tone === 'cool'
                                ? 'bg-cool'
                                : n.tone === 'warm'
                                ? 'bg-warm-bright'
                                : 'bg-trust'
                            }`}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-ink">{n.title}</p>
                            <p className="text-[12px] text-ink-secondary">{n.body}</p>
                            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink-muted">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <Link
          href="/settings"
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-warm to-warm-bright font-mono text-xs font-bold text-canvas shadow-md"
        >
          AR
        </Link>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-canvas/70 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 250, damping: 28 }}
              className="fixed inset-y-0 left-0 z-50 w-72 border-r border-hairline bg-surface/95 p-4 backdrop-blur-2xl md:hidden"
            >
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink">LocalBoost</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.04]"
                >
                  <X className="h-4 w-4 text-ink" />
                </button>
              </div>
              <nav className="mt-4 space-y-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                        active ? 'bg-white/[0.05] text-ink' : 'text-ink-secondary hover:bg-white/[0.03]'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
