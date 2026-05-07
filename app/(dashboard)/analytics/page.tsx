'use client';

import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import { TrendingUp, Users, Eye, MousePointerClick, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';
import { GlassPanel, RouteHeader, MetricCard, TrustBadge } from '@/components/shell';
import { ENGAGEMENT_TREND, PLATFORM_REACH, CONVERSION_DATA, POST_TIMES } from '@/lib/mockData';
import { formatNumber } from '@/lib/utils';

const CAMPAIGNS = [
  { name: 'Lavender Latte launch', reach: 8400, engagement: 7.8, status: 'live' as const },
  { name: 'Cookie Drop Sunday', reach: 5200, engagement: 6.4, status: 'completed' as const },
  { name: 'Roaster Spotlight', reach: 3800, engagement: 5.1, status: 'completed' as const },
  { name: 'Open Mic Night', reach: 2100, engagement: 4.2, status: 'scheduled' as const },
];

const RADIAL = [{ name: 'Goal progress', value: 76, fill: '#C56F44' }];

const TOOLTIP_STYLE = {
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.14)',
  background: 'rgba(20,25,35,0.92)',
  backdropFilter: 'blur(12px)',
  color: '#F3EEE5',
  fontSize: 12,
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <RouteHeader
        pillar="Insight · 04"
        title={
          <>
            <span className="italic text-cool-bright">Analytics</span>
          </>
        }
        description="Last 30 days · Brew & Bloom Café"
        action={
          <div className="flex items-center gap-2 rounded-xl border border-hairline bg-white/[0.03] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-ink-secondary">
            <Calendar className="h-3.5 w-3.5" />
            Apr 6 – May 5
          </div>
        }
      />

      {/* KPI row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total reach"
          value="45.3K"
          delta="+24.1%"
          trend="up"
          icon={<Users className="h-4 w-4" />}
          delay={0}
        />
        <MetricCard
          label="Engagement rate"
          value="6.8%"
          delta="+1.4 pp"
          trend="up"
          icon={<TrendingUp className="h-4 w-4" />}
          delay={0.05}
        />
        <MetricCard
          label="Profile visits"
          value="8.2K"
          delta="+18%"
          trend="up"
          icon={<Eye className="h-4 w-4" />}
          delay={0.1}
        />
        <MetricCard
          label="Click-through"
          value="3.1%"
          delta="-0.2 pp"
          trend="down"
          icon={<MousePointerClick className="h-4 w-4" />}
          delay={0.15}
        />
      </div>

      {/* Engagement trend + Goal progress */}
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <GlassPanel className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="mono-label">Trend</span>
                <h3 className="mt-1 font-display text-xl font-light text-ink">Engagement & reach</h3>
              </div>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-warm-bright" /> <span className="text-ink-secondary">Engagement</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-cool" /> <span className="text-ink-secondary">Reach</span>
                </span>
              </div>
            </div>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ENGAGEMENT_TREND}>
                  <defs>
                    <linearGradient id="aGradAn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C56F44" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#C56F44" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="bGradAn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4CCBC7" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#4CCBC7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 6" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="week" stroke="#758197" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#758197" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Area type="monotone" dataKey="reach" stroke="#4CCBC7" strokeWidth={2} fill="url(#bGradAn)" />
                  <Area type="monotone" dataKey="engagement" stroke="#E89368" strokeWidth={2.5} fill="url(#aGradAn)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <GlassPanel className="h-full p-6">
            <div>
              <span className="mono-label">Goal</span>
              <h3 className="mt-1 font-display text-xl font-light text-ink">Monthly reach goal</h3>
            </div>
            <div className="relative mt-2 flex h-56 items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="72%" outerRadius="100%" barSize={18} data={RADIAL} startAngle={90} endAngle={-270}>
                  <RadialBar dataKey="value" cornerRadius={20} fill="#C56F44" background={{ fill: 'rgba(255,255,255,0.05)' }} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-display text-4xl font-light text-ink">76%</p>
                <p className="mono-label mt-1">of 60K goal</p>
              </div>
            </div>
            <div className="mt-2 rounded-xl border border-hairline bg-white/[0.025] p-3 text-center">
              <p className="text-xs text-ink-secondary">14.7K to go · 12 days left</p>
            </div>
          </GlassPanel>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <GlassPanel className="p-6">
            <span className="mono-label">By platform</span>
            <h3 className="mt-1 font-display text-xl font-light text-ink">Reach distribution</h3>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PLATFORM_REACH}>
                  <CartesianGrid strokeDasharray="2 6" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="platform" stroke="#758197" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#758197" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Bar dataKey="reach" radius={[12, 12, 0, 0]}>
                    {PLATFORM_REACH.map((_, i) => (
                      <Cell key={i} fill={['#C56F44', '#4CCBC7', '#B7E46E', '#A7B1C2'][i % 4]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <GlassPanel className="p-6">
            <span className="mono-label">By weekday</span>
            <h3 className="mt-1 font-display text-xl font-light text-ink">Best posting times</h3>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={POST_TIMES}>
                  <CartesianGrid strokeDasharray="2 6" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="day" stroke="#758197" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#758197" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <defs>
                    <linearGradient id="postBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E89368" />
                      <stop offset="100%" stopColor="#C56F44" />
                    </linearGradient>
                  </defs>
                  <Bar dataKey="value" radius={[12, 12, 0, 0]} fill="url(#postBar)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassPanel>
        </motion.div>
      </div>

      {/* Campaign performance */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <GlassPanel className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="mono-label">Campaigns</span>
              <h3 className="mt-1 font-display text-xl font-light text-ink">Performance</h3>
            </div>
            <TrustBadge tone="muted">Last 30 days</TrustBadge>
          </div>
          <div className="mt-5 space-y-3">
            {CAMPAIGNS.map((c) => (
              <div key={c.name} className="rounded-xl border border-hairline bg-white/[0.025] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-ink">{c.name}</p>
                      <TrustBadge tone={c.status === 'live' ? 'trust' : c.status === 'scheduled' ? 'muted' : 'cool'}>
                        {c.status}
                      </TrustBadge>
                    </div>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                      Reach <span className="text-ink">{formatNumber(c.reach)}</span> · Engagement{' '}
                      <span className="text-ink">{c.engagement}%</span>
                    </p>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(c.reach / 9000) * 100}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-gradient-to-r from-warm to-warm-bright"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </motion.div>

      {/* Conversion funnel */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
        <GlassPanel className="p-6">
          <span className="mono-label">Funnel</span>
          <h3 className="mt-1 font-display text-xl font-light text-ink">Impression → in-store visit</h3>
          <div className="mt-6 space-y-3">
            {CONVERSION_DATA.map((c, i) => {
              const max = CONVERSION_DATA[0].value;
              const pct = (c.value / max) * 100;
              return (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.07 }}
                  className="flex items-center gap-4"
                >
                  <span className="w-20 text-xs font-medium text-ink-secondary">{c.name}</span>
                  <div className="h-9 flex-1 overflow-hidden rounded-xl border border-hairline bg-white/[0.025]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: 0.6 + i * 0.07 }}
                      className="flex h-full items-center justify-end bg-gradient-to-r from-warm to-warm-bright px-4 text-xs font-semibold text-canvas"
                    >
                      {c.value}%
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
