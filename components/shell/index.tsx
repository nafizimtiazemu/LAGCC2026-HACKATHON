'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/* =============================================================
   GlassPanel — smoked glass card. Default for product surfaces.
   ============================================================= */
export function GlassPanel({
  children,
  variant = 'default',
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  variant?: 'default' | 'strong' | 'subtle';
  className?: string;
  as?: any;
}) {
  const cls =
    variant === 'strong' ? 'panel-strong' : variant === 'subtle' ? 'panel-subtle' : 'panel';
  return <Tag className={cn('relative', cls, className)}>{children}</Tag>;
}

/* =============================================================
   SceneLabel — vertical/horizontal pillar label used on landing
   scenes and product page headers.
   ============================================================= */
export function SceneLabel({
  pillar,
  index,
  total,
  vertical = false,
  className = '',
}: {
  pillar: string;
  index?: number;
  total?: number;
  vertical?: boolean;
  className?: string;
}) {
  if (vertical) {
    return (
      <div className={cn('flex flex-col items-start gap-3', className)}>
        <span
          className="font-display font-light italic text-ink/15"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: 'clamp(4rem, 11vw, 8rem)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          {pillar}
        </span>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {index != null && total != null && (
        <span className="mono-label">
          {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      )}
      <span className="h-px w-16 bg-hairline" />
      <span className="mono-label !text-ink-secondary">{pillar}</span>
    </div>
  );
}

/* =============================================================
   RouteHeader — page header used inside dashboard routes
   ============================================================= */
export function RouteHeader({
  pillar,
  title,
  description,
  action,
  meta,
}: {
  pillar?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <div className="mb-8">
      {pillar && (
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-cool" />
          <span className="mono-label">{pillar}</span>
        </div>
      )}
      <div className="mt-3 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl font-light text-ink md:text-4xl">{title}</h1>
          {description && (
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-secondary">{description}</p>
          )}
          {meta && <div className="mt-3">{meta}</div>}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}

/* =============================================================
   MetricCard — uniform metric tile for dashboard/analytics
   ============================================================= */
export function MetricCard({
  label,
  value,
  delta,
  trend = 'neutral',
  hint,
  icon,
  className = '',
  delay = 0,
}: {
  label: string;
  value: ReactNode;
  delta?: string;
  trend?: 'up' | 'down' | 'neutral';
  hint?: string;
  icon?: ReactNode;
  className?: string;
  delay?: number;
}) {
  const trendColor =
    trend === 'up' ? 'text-trust' : trend === 'down' ? 'text-danger' : 'text-ink-muted';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn('panel relative overflow-hidden p-5', className)}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="mono-label">{label}</span>
        {icon && <div className="text-ink-secondary">{icon}</div>}
      </div>
      <p className="mt-4 font-display text-3xl font-light text-ink md:text-4xl">{value}</p>
      <div className="mt-2 flex items-center justify-between">
        {delta && <span className={cn('text-xs font-medium', trendColor)}>{delta}</span>}
        {hint && <span className="text-xs text-ink-muted">{hint}</span>}
      </div>
    </motion.div>
  );
}

/* =============================================================
   TrustBadge — small kite-shape badge with tone semantics
   ============================================================= */
export function TrustBadge({
  tone = 'cool',
  children,
  className = '',
}: {
  tone?: 'cool' | 'warm' | 'trust' | 'danger' | 'muted';
  children: ReactNode;
  className?: string;
}) {
  const map = {
    cool: 'border-cool/30 bg-cool/10 text-cool-bright',
    warm: 'border-warm/30 bg-warm/10 text-warm-bright',
    trust: 'border-trust/30 bg-trust/10 text-trust',
    danger: 'border-danger/30 bg-danger/10 text-danger',
    muted: 'border-hairline bg-white/5 text-ink-secondary',
  } as const;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em]',
        map[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* =============================================================
   ComplianceBadge — risk indicator
   ============================================================= */
export function ComplianceBadge({ risk }: { risk: 'low' | 'medium' | 'high' }) {
  const map = {
    high: { tone: 'danger' as const, label: 'High risk' },
    medium: { tone: 'warm' as const, label: 'Medium risk' },
    low: { tone: 'trust' as const, label: 'Low risk' },
  };
  const m = map[risk];
  return (
    <TrustBadge tone={m.tone}>
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          background:
            risk === 'high' ? '#F26D7D' : risk === 'medium' ? '#E89368' : '#B7E46E',
        }}
      />
      {m.label}
    </TrustBadge>
  );
}

/* =============================================================
   EmptyState
   ============================================================= */
export function EmptyState({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-ink-secondary">
          {icon}
        </div>
      )}
      <p className="font-display text-xl font-light text-ink">{title}</p>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-ink-secondary">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/* =============================================================
   SuggestionStrip — AI suggestion mini-list for dashboard/generator
   ============================================================= */
export function SuggestionStrip({ items }: { items: { icon?: string; title: string; impact?: string; cta?: string }[] }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + i * 0.08 }}
          className="flex items-center gap-3 rounded-xl border border-hairline bg-white/[0.025] px-3 py-2.5 transition hover:border-cool/30 hover:bg-white/[0.04]"
        >
          {item.icon && <span className="text-base">{item.icon}</span>}
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm text-ink">{item.title}</p>
            {item.impact && <p className="text-[11px] text-ink-muted">{item.impact}</p>}
          </div>
          {item.cta && (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cool">
              {item.cta} →
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
