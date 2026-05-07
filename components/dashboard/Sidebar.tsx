'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Sparkles,
  Calendar,
  Users,
  Shield,
  BarChart3,
  Settings as SettingsIcon,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, pillar: 'Vision' },
  { href: '/generator', label: 'Generator', icon: Sparkles, pillar: 'Intelligence' },
  { href: '/calendar', label: 'Calendar', icon: Calendar, pillar: 'Reach' },
  { href: '/influencers', label: 'Influencers', icon: Users, pillar: 'Reach' },
  { href: '/compliance', label: 'Compliance', icon: Shield, pillar: 'Trust' },
  { href: '/analytics', label: 'Analytics', icon: BarChart3, pillar: 'Insight' },
  { href: '/settings', label: 'Settings', icon: SettingsIcon, pillar: '—' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { selectedPackage } = useAppStore();
  const pkgName = selectedPackage
    ? selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)
    : 'Growth';

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-hairline bg-surface/40 backdrop-blur-2xl md:flex md:flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-hairline px-6">
        <div className="relative">
          <div className="h-7 w-7 rounded-md bg-gradient-to-br from-warm to-warm-bright" />
          <span className="pulse-dot absolute -right-1 -top-1 block h-2 w-2 rounded-full bg-cool text-cool" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink">LocalBoost</span>
      </div>

      {/* Pillar groups */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 1 }}
                className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  active
                    ? 'bg-white/[0.05] text-ink'
                    : 'text-ink-secondary hover:bg-white/[0.03] hover:text-ink'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-warm"
                  />
                )}
                <Icon className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
                {item.pillar !== '—' && active && (
                  <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                    {item.pillar}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Plan card */}
      <div className="m-3 panel p-4">
        <div className="flex items-center justify-between">
          <span className="mono-label">{pkgName} plan</span>
          <span className="pulse-dot block h-1.5 w-1.5 rounded-full bg-trust text-trust" />
        </div>
        <p className="mt-3 font-display text-base font-light text-ink">11 of 16 posts used</p>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.05]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '68%' }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-warm to-warm-bright"
          />
        </div>
        <Link
          href="/packages"
          className="mt-3 block text-center font-mono text-[10px] uppercase tracking-[0.2em] text-cool-bright transition hover:text-cool"
        >
          Upgrade →
        </Link>
      </div>
    </aside>
  );
}
