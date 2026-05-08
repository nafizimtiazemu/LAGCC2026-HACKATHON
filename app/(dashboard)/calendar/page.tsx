'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, X, Instagram, Facebook, Music2, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { GlassPanel, RouteHeader, TrustBadge } from '@/components/shell';
import { useAppStore } from '@/lib/store';

const PLATFORMS = [
  { id: 'all', name: 'All' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'tiktok', name: 'TikTok' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'google', name: 'Google' },
];

// Lucide icons mapped to each platform — replaces the 2-letter abbreviation hack
const PLATFORM_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  tiktok: Music2,
  facebook: Facebook,
  google: MapPin,
};

// Tile color schemes — for the avatar squares (queue + dialog)
const PLATFORM_TILE: Record<string, string> = {
  instagram: 'bg-warm/20 text-warm-bright border border-warm/40',
  tiktok: 'bg-cool/15 text-ink border border-hairline-strong',
  facebook: 'bg-cool/20 text-cool-bright border border-cool/40',
  google: 'bg-trust/20 text-trust border border-trust/40',
};

// Pill color schemes — for in-grid event chips
const PLATFORM_PILL: Record<string, string> = {
  instagram: 'bg-warm/25 text-warm-bright border border-warm/40',
  tiktok: 'bg-cool/15 text-ink-secondary border border-hairline-strong',
  facebook: 'bg-cool/25 text-cool-bright border border-cool/40',
  google: 'bg-trust/25 text-trust border border-trust/40',
};

function PlatformIcon({ platform, className = 'h-4 w-4' }: { platform: string; className?: string }) {
  const Icon = PLATFORM_ICON[platform?.toLowerCase()];
  if (!Icon) return null;
  return <Icon className={className} />;
}

function getMonthDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startWeekday = first.getDay();
  const totalDays = last.getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < startWeekday; i++) days.push(null);
  for (let d = 1; d <= totalDays; d++) days.push(d);
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

export default function CalendarPage() {
  const { scheduledPosts } = useAppStore();
  const [filter, setFilter] = useState('all');
  const [current, setCurrent] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [selected, setSelected] = useState<any>(null);

  const days = useMemo(() => getMonthDays(current.year, current.month), [current]);
  const monthName = new Date(current.year, current.month, 1).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const postsByDate = useMemo(() => {
    const map: Record<string, typeof scheduledPosts> = {};
    scheduledPosts
      .filter((p) => filter === 'all' || p.platform === filter)
      .forEach((p) => {
        if (!map[p.date]) map[p.date] = [];
        map[p.date].push(p);
      });
    return map;
  }, [scheduledPosts, filter]);

  const navigate = (delta: number) => {
    setCurrent((c) => {
      const d = new Date(c.year, c.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  return (
    <div className="space-y-6">
      <RouteHeader
        title={
          <>
            Content <span className="italic text-warm-bright">Calendar</span>
          </>
        }
        description={`${scheduledPosts.length} scheduled posts across all channels`}
        action={
          <Link href="/generator">
            <Button>
              <Plus className="h-4 w-4" />
              New campaign
            </Button>
          </Link>
        }
      />

      <GlassPanel className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-white/[0.03] transition hover:bg-white/[0.06]"
            >
              <ChevronLeft className="h-4 w-4 text-ink-secondary" />
            </button>
            <p className="font-display text-xl font-light text-ink min-w-[200px] text-center">{monthName}</p>
            <button
              onClick={() => navigate(1)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-white/[0.03] transition hover:bg-white/[0.06]"
            >
              <ChevronRight className="h-4 w-4 text-ink-secondary" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                onClick={() => setFilter(p.id)}
                className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition ${
                  filter === p.id
                    ? 'border-warm/50 bg-warm/15 text-warm-bright'
                    : 'border-hairline bg-white/[0.025] text-ink-secondary hover:border-warm/30'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-1.5">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="py-2 text-center font-mono text-[10px] uppercase tracking-widest text-ink-muted">
              {d}
            </div>
          ))}
          {days.map((day, i) => {
            if (day === null) return <div key={i} className="aspect-square" />;
            const dateStr = `${current.year}-${String(current.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const posts = postsByDate[dateStr] || [];
            const isToday = dateStr === todayStr;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.005 }}
                className={`relative aspect-square rounded-lg border p-1.5 transition md:p-2 ${
                  isToday
                    ? 'border-warm/40 bg-warm/[0.06]'
                    : 'border-hairline bg-white/[0.015] hover:border-hairline-strong'
                }`}
              >
                <div className={`text-xs font-medium ${isToday ? 'text-warm-bright' : 'text-ink-secondary'}`}>
                  {day}
                </div>
                <div className="mt-1 space-y-1">
                  {posts.slice(0, 2).map((post) => (
                    <button
                      key={post.id}
                      onClick={() => setSelected(post)}
                      className={`flex w-full items-center gap-1 rounded px-1.5 py-1 text-left transition hover:opacity-80 ${
                        PLATFORM_PILL[post.platform?.toLowerCase()] || 'bg-white/5 text-ink border border-hairline'
                      }`}
                    >
                      <PlatformIcon platform={post.platform} className="h-2.5 w-2.5 flex-shrink-0" />
                      <span className="block min-w-0 flex-1 truncate text-[10px] font-medium leading-tight">
                        {post.title}
                      </span>
                    </button>
                  ))}
                  {posts.length > 2 && (
                    <div className="text-[10px] font-mono text-ink-muted">+{posts.length - 2}</div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassPanel>

      {/* Upcoming queue */}
      <GlassPanel className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="mono-label">Queue</span>
            <h3 className="mt-1 font-display text-xl font-light text-ink">Upcoming posts</h3>
          </div>
        </div>
        <div className="mt-5 space-y-2.5">
          {scheduledPosts
            .filter((p) => filter === 'all' || p.platform === filter)
            .slice(0, 8)
            .map((post) => (
              <button
                key={post.id}
                onClick={() => setSelected(post)}
                className="flex w-full items-center gap-4 rounded-xl border border-hairline bg-white/[0.025] p-3 text-left transition hover:border-cool/30 hover:bg-white/[0.04]"
              >
                <div
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${
                    PLATFORM_TILE[post.platform?.toLowerCase()] || 'bg-white/5 text-ink border border-hairline'
                  }`}
                >
                  <PlatformIcon platform={post.platform} className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{post.title}</p>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}{' '}
                    · {post.time}
                  </p>
                </div>
                <TrustBadge tone={post.status === 'published' ? 'trust' : 'muted'}>{post.status}</TrustBadge>
              </button>
            ))}
        </div>
      </GlassPanel>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 rounded-full border border-hairline bg-white/[0.04] p-2 text-ink-secondary transition hover:bg-white/[0.08]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                    PLATFORM_TILE[selected.platform?.toLowerCase()] || 'bg-white/5 text-ink border border-hairline'
                  }`}
                >
                  <PlatformIcon platform={selected.platform} className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-light text-ink">{selected.title}</h3>
                  <p className="mono-label">
                    {selected.platform} · {selected.type}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-hairline bg-white/[0.025] p-3">
                  <p className="mono-label">Scheduled</p>
                  <p className="mt-1 text-sm font-medium text-ink">
                    {new Date(selected.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div className="rounded-xl border border-hairline bg-white/[0.025] p-3">
                  <p className="mono-label">Time</p>
                  <p className="mt-1 text-sm font-medium text-ink">{selected.time}</p>
                </div>
              </div>

              {selected.caption && (
                <div className="mt-4 rounded-xl border border-cool/30 bg-cool/[0.06] p-4">
                  <p className="mono-label !text-cool-bright">Caption preview</p>
                  <p className="mt-2 text-sm text-ink">{selected.caption}</p>
                </div>
              )}

              <div className="mt-5 flex items-center justify-between">
                <TrustBadge tone={selected.status === 'published' ? 'trust' : 'muted'}>{selected.status}</TrustBadge>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button size="sm">View details</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}