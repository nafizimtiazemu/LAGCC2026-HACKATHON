'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertCircle, Clock, Check, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  GlassPanel,
  RouteHeader,
  ComplianceBadge,
  MetricCard,
  EmptyState,
  TrustBadge,
} from '@/components/shell';
import { useAppStore } from '@/lib/store';
import { toast } from '@/components/ui/toaster';

export default function CompliancePage() {
  const { complianceAlerts, resolveAlert } = useAppStore();
  const [filter, setFilter] = useState<'all' | 'open' | 'resolved'>('open');

  const filtered = complianceAlerts.filter((a) =>
    filter === 'all' ? true : filter === 'open' ? !a.resolved : a.resolved,
  );

  const open = complianceAlerts.filter((a) => !a.resolved);
  const high = open.filter((a) => a.risk === 'high').length;
  const medium = open.filter((a) => a.risk === 'medium').length;
  const low = open.filter((a) => a.risk === 'low').length;

  const handleResolve = (id: string, title: string) => {
    resolveAlert(id);
    toast({ variant: 'success', title: 'Marked resolved', description: `${title} cleared from your queue.` });
  };

  return (
    <div className="space-y-6">
      <RouteHeader
        pillar="Trust · 05"
        title={
          <>
            Compliance <span className="italic text-trust">Center</span>
          </>
        }
        description="Permits, inspections, and regulatory deadlines — surfaced two weeks before they bite."
      />

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-4">
        <MetricCard label="Open items" value={open.length} icon={<AlertCircle className="h-4 w-4" />} delay={0} />
        <MetricCard
          label="High risk"
          value={high}
          icon={<Shield className="h-4 w-4 text-danger" />}
          delay={0.05}
        />
        <MetricCard
          label="Medium risk"
          value={medium}
          icon={<Clock className="h-4 w-4 text-warm-bright" />}
          delay={0.1}
        />
        <MetricCard
          label="Low risk"
          value={low}
          icon={<Check className="h-4 w-4 text-trust" />}
          delay={0.15}
        />
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'open', label: `Open (${open.length})` },
          { id: 'resolved', label: `Resolved (${complianceAlerts.length - open.length})` },
          { id: 'all', label: 'All' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] transition ${
              filter === f.id
                ? 'border-trust/50 bg-trust/15 text-trust'
                : 'border-hairline bg-white/[0.025] text-ink-secondary hover:border-trust/30'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Alerts */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((alert, i) => {
            const days = alert.daysUntilDue ?? alert.daysLeft;
            const tone =
              alert.risk === 'high' ? 'danger' : alert.risk === 'medium' ? 'warm' : 'trust';

            return (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ delay: i * 0.04 }}
              >
                <GlassPanel className={`p-6 ${alert.resolved ? 'opacity-60' : ''}`}>
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex flex-1 items-start gap-4">
                      <div
                        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border ${
                          alert.risk === 'high'
                            ? 'border-danger/30 bg-danger/10 text-danger'
                            : alert.risk === 'medium'
                            ? 'border-warm/30 bg-warm/10 text-warm-bright'
                            : 'border-trust/30 bg-trust/10 text-trust'
                        }`}
                      >
                        <Shield className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-lg font-light text-ink">{alert.title}</h3>
                          <ComplianceBadge risk={alert.risk} />
                          {alert.resolved && <TrustBadge tone="muted">Resolved</TrustBadge>}
                        </div>
                        <p className="mt-1 mono-label">{alert.category}</p>
                        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{alert.description}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3 w-3" />
                            Due {alert.due}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3 w-3" />
                            {days} days remaining
                          </span>
                        </div>
                      </div>
                    </div>
                    {!alert.resolved && (
                      <div className="flex flex-col gap-2 md:items-end">
                        <Button onClick={() => handleResolve(alert.id, alert.title)}>
                          <Check className="h-4 w-4" />
                          Mark resolved
                        </Button>
                        <Button variant="outline" size="sm">
                          {alert.action}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                </GlassPanel>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <GlassPanel>
            <EmptyState
              icon={<Check className="h-6 w-6 text-trust" />}
              title="All clear"
              description="Nothing to act on right now. We'll alert you when something needs attention."
            />
          </GlassPanel>
        )}
      </div>

      {/* AI helper card */}
      <GlassPanel className="p-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-cool/10">
              <Sparkles className="h-5 w-5 text-cool-bright" />
            </div>
            <div>
              <h3 className="font-display text-lg font-light text-ink">Need help with a filing?</h3>
              <p className="mt-1 text-sm text-ink-secondary">
                Bloom AI prepares documents and walks you through the next steps for any open item.
              </p>
            </div>
          </div>
          <Button variant="outline">Ask Bloom AI</Button>
        </div>
      </GlassPanel>
    </div>
  );
}
