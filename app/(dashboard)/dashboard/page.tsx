'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import {
  TrendingUp,
  Users,
  Calendar as CalendarIcon,
  Wallet,
  Target,
  Sparkles,
  Shield,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  RouteHeader,
  MetricCard,
  GlassPanel,
  ComplianceBadge,
  TrustBadge,
  SuggestionStrip,
} from '@/components/shell';
import {
  ENGAGEMENT_TREND,
  SCHEDULED_POSTS,
  AI_RECOMMENDATIONS,
  INFLUENCERS,
  COMPLIANCE_ALERTS,
} from '@/lib/mockData';
import { formatNumber } from '@/lib/utils';

const PLATFORM_GLYPH: Record<string, string> = {
  instagram: 'IG',
  tiktok: 'TT',
  facebook: 'FB',
  google: 'GB',
};

export default function DashboardPage() {
  const upcoming = SCHEDULED_POSTS.filter((p) => p.status === 'scheduled').slice(0, 4);
  const topInfluencers = INFLUENCERS.slice(0, 3);
  const topAlerts = COMPLIANCE_ALERTS.filter((a) => !a.resolved).slice(0, 2);

  return (
    <div className="space-y-6">
      <RouteHeader
        pillar="Vision · 01"
        title={
          <>
            Welcome back, <span className="italic text-warm-bright">Alex</span>
          </>
        }
        description="Your weekly pulse across reach, growth, scheduling, compliance, and budget."
        action={
          <Link href="/generator">
            <Button>
              <Sparkles className="h-4 w-4" />
              New campaign
            </Button>
          </Link>
        }
      />

      {/* Metrics row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <MetricCard
          label="Estimated reach"
          value="24.8K"
          delta="+12.4%"
          trend="up"
          hint="last 30 days"
          icon={<Users className="h-4 w-4" />}
          delay={0}
        />
        <MetricCard
          label="Engagement growth"
          value="+24%"
          delta="vs last month"
          trend="up"
          icon={<TrendingUp className="h-4 w-4" />}
          delay={0.05}
        />
        <MetricCard
          label="Scheduled posts"
          value="12"
          hint="next 30 days"
          icon={<CalendarIcon className="h-4 w-4" />}
          delay={0.1}
        />
        <MetricCard
          label="Plan usage"
          value="11/16"
          hint="68% used"
          icon={<Target className="h-4 w-4" />}
          delay={0.15}
        />
        <MetricCard
          label="Budget remaining"
          value="$420"
          hint="of $850"
          icon={<Wallet className="h-4 w-4" />}
          delay={0.2}
        />
      </div>

      {/* Engagement chart + AI suggestions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <GlassPanel className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="mono-label">Insight · 04</span>
                <h3 className="mt-1 font-display text-xl font-light text-ink">Engagement trend</h3>
                <p className="text-sm text-ink-secondary">Last 8 weeks across all channels</p>
              </div>
              <TrustBadge tone="trust">+24.1%</TrustBadge>
            </div>
            <div className="mt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ENGAGEMENT_TREND} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C56F44" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#C56F44" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 6" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="week" stroke="#758197" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#758197" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,0.14)',
                      background: 'rgba(20,25,35,0.92)',
                      backdropFilter: 'blur(12px)',
                      color: '#F3EEE5',
                    }}
                  />
                  <Area type="monotone" dataKey="engagement" stroke="#E89368" strokeWidth={2.5} fill="url(#dashGrad)" />
                  <Area type="monotone" dataKey="reach" stroke="#4CCBC7" strokeWidth={1.5} fill="transparent" strokeDasharray="3 3" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex gap-5 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-warm-bright" />
                <span className="text-ink-secondary">Engagement</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-cool" />
                <span className="text-ink-secondary">Reach</span>
              </span>
            </div>
          </GlassPanel>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <GlassPanel className="h-full p-6">
            <div className="flex items-center gap-2">
              <span className="mono-label">Intelligence · 02</span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cool-bright" />
              <h3 className="font-display text-xl font-light text-ink">AI recommendations</h3>
            </div>
            <div className="mt-5">
              <SuggestionStrip
                items={AI_RECOMMENDATIONS.map((r) => ({
                  icon: r.icon,
                  title: r.title,
                  impact: r.impact,
                  cta: r.cta,
                }))}
              />
            </div>
          </GlassPanel>
        </motion.div>
      </div>

      {/* Upcoming posts + Compliance */}
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2">
          <GlassPanel className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="mono-label">Reach · 03</span>
                <h3 className="mt-1 font-display text-xl font-light text-ink">Upcoming posts</h3>
              </div>
              <Link href="/calendar" className="mono-label hover:text-ink transition">
                View calendar →
              </Link>
            </div>
            <div className="mt-5 space-y-2.5">
              {upcoming.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-4 rounded-xl border border-hairline bg-white/[0.025] p-3 transition hover:border-cool/30 hover:bg-white/[0.04]"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-hairline bg-white/[0.03] font-mono text-[10px] font-semibold tracking-widest text-ink-secondary">
                    {PLATFORM_GLYPH[post.platform] || post.platform.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{post.title}</p>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ·{' '}
                      {post.time} · {post.platform}
                    </p>
                  </div>
                  <TrustBadge tone="muted">{post.status}</TrustBadge>
                </div>
              ))}
            </div>
          </GlassPanel>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <GlassPanel className="h-full p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="mono-label">Trust · 05</span>
                <h3 className="mt-1 flex items-center gap-2 font-display text-xl font-light text-ink">
                  <Shield className="h-4 w-4 text-trust" />
                  Compliance
                </h3>
              </div>
              <Link href="/compliance" className="mono-label hover:text-ink transition">
                See all →
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {topAlerts.map((alert) => (
                <div key={alert.id} className="rounded-xl border border-hairline bg-white/[0.025] p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle
                      className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                        alert.risk === 'high' ? 'text-danger' : 'text-warm-bright'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink">{alert.title}</p>
                      <p className="mt-0.5 text-[11px] text-ink-muted">Due in {alert.daysUntilDue} days</p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <ComplianceBadge risk={alert.risk} />
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </motion.div>
      </div>

      {/* Influencers */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <GlassPanel className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="mono-label">Reach · 03</span>
              <h3 className="mt-1 font-display text-xl font-light text-ink">Top creator matches</h3>
              <p className="text-sm text-ink-secondary">Curated based on your audience profile</p>
            </div>
            <Link href="/influencers" className="mono-label hover:text-ink transition">
              View all →
            </Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {topInfluencers.map((inf) => (
              <div
                key={inf.id}
                className="rounded-xl border border-hairline bg-white/[0.025] p-4 transition hover:border-warm/30 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3">
                  <img src={inf.avatar} alt={inf.name} className="h-10 w-10 rounded-lg" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{inf.name}</p>
                    <p className="truncate text-[11px] text-ink-muted">{inf.handle}</p>
                  </div>
                  <TrustBadge tone="cool">{inf.matchScore}%</TrustBadge>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-ink-muted">
                  <span>👥 {formatNumber(inf.followers)}</span>
                  <span>📈 {inf.engagement}%</span>
                  <span className="font-mono uppercase tracking-widest">{inf.niche}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
