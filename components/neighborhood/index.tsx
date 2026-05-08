'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
// import { NeighborhoodMap } from './NeighborhoodMap';

type Tone = 'warm' | 'cool' | 'trust' | 'neutral';

const TONES: Record<Tone, { fill: string; ring: string; glow: string }> = {
  warm: { fill: '#C56F44', ring: 'rgba(197,111,68,0.35)', glow: 'rgba(232,147,104,0.55)' },
  cool: { fill: '#4CCBC7', ring: 'rgba(76,203,199,0.35)', glow: 'rgba(111,226,221,0.55)' },
  trust: { fill: '#B7E46E', ring: 'rgba(183,228,110,0.35)', glow: 'rgba(183,228,110,0.55)' },
  neutral: { fill: '#F3EEE5', ring: 'rgba(255,255,255,0.20)', glow: 'rgba(255,255,255,0.45)' },
};

/**
 * PulseNode — a labeled point on the neighborhood map. Renders as
 * absolutely-positioned div containing concentric SVG rings + label.
 * Position is given in % of parent. Use inside a positioned container.
 */
export function PulseNode({
  x,
  y,
  label,
  sublabel,
  tone = 'cool',
  size = 'md',
  pulse = true,
  delay = 0,
  hub = false,
  className = '',
}: {
  x: number; // 0-100 (%)
  y: number; // 0-100 (%)
  label?: string;
  sublabel?: string;
  tone?: Tone;
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  delay?: number;
  hub?: boolean;
  className?: string;
}) {
  const t = TONES[tone];
  const r = size === 'sm' ? 4 : size === 'lg' ? 7 : 5;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 ${className}`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="relative">
        {/* Outer rings — pulse */}
        {pulse && (
          <>
            <motion.span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ border: `1px solid ${t.ring}`, width: r * 4, height: r * 4 }}
              animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
              transition={{ duration: 2.6, delay, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ border: `1px solid ${t.ring}`, width: r * 4, height: r * 4 }}
              animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
              transition={{ duration: 2.6, delay: delay + 1.3, repeat: Infinity, ease: 'easeOut' }}
            />
          </>
        )}

        {/* Glow */}
        {hub && (
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
            style={{ background: t.glow, width: r * 8, height: r * 8, opacity: 0.5 }}
          />
        )}

        {/* Core dot */}
        <span
          className="relative block rounded-full"
          style={{
            width: r * 2,
            height: r * 2,
            background: t.fill,
            boxShadow: `0 0 12px ${t.glow}`,
          }}
        />

        {/* Label */}
        {label && (
          <div className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap text-center">
            <p className="font-mono text-[9px] tracking-[0.24em] text-ink/80 uppercase">{label}</p>
            {sublabel && (
              <p className="mt-0.5 text-[10px] text-ink-muted">{sublabel}</p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/**
 * SignalTrail — animated path between two points (% coords). Renders
 * as an SVG path with stroke-dashoffset animation, looped or one-shot.
 */
export function SignalTrail({
  from,
  to,
  curvature = 0.25,
  tone = 'cool',
  delay = 0,
  duration = 2.4,
  loop = true,
  thickness = 1,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  curvature?: number; // 0-1 — how curved
  tone?: Tone;
  delay?: number;
  duration?: number;
  loop?: boolean;
  thickness?: number;
}) {
  const t = TONES[tone];
  // Compute control point perpendicular to midpoint
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = -dy / (len || 1);
  const ny = dx / (len || 1);
  const cx = mx + nx * curvature * 30;
  const cy = my + ny * curvature * 30;

  const d = `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Static base path — visible web line */}
      <path
        d={d}
        stroke={t.ring}
        strokeWidth={thickness * 0.9}
        fill="none"
        vectorEffect="non-scaling-stroke"
        opacity={0.7}
      />
      {/* Soft outer glow */}
      <path
        d={d}
        stroke={t.fill}
        strokeWidth={thickness * 2.4}
        fill="none"
        vectorEffect="non-scaling-stroke"
        opacity={0.18}
        style={{ filter: 'blur(2px)' }}
      />
      {/* Animated travelling pulse */}
      <motion.path
        d={d}
        stroke={t.fill}
        strokeWidth={thickness * 1.4}
        fill="none"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          loop
            ? { strokeDashoffset: [-100, 0], opacity: [0.4, 1, 0.4] }
            : { pathLength: 1, opacity: 1 }
        }
        transition={{
          duration,
          delay,
          repeat: loop ? Infinity : 0,
          ease: 'linear',
        }}
      />
    </svg>
  );
}

/**
 * NeighborhoodBackground — assembled background ready to drop into a
 * section or layout. Combines map, signals, nodes. Mode determines density.
 *
 * - 'hero':    full intensity, animated, used on landing
 * - 'ambient': low intensity, static, used in product layout
 */
export function NeighborhoodBackground({
  mode = 'hero',
  children,
  showNodes = true,
  showSignals = true,
}: {
  mode?: 'hero' | 'ambient';
  children?: React.ReactNode;
  showNodes?: boolean;
  showSignals?: boolean;
}) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const intensity = mode === 'ambient' ? 0.5 : 1;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Layer 0: base canvas tone (already set on body) */}
      {/* Layer 1: neighborhood map */}
      {/* <div className="absolute inset-0 opacity-100">
        <NeighborhoodMap
          className={`h-full w-full ${mode === 'hero' ? 'opacity-60' : 'opacity-30'}`}
          intensity={intensity}
        />
      </div> */}

      {/* Layer 2: signal trails */}
      {showSignals && !reduced && mode === 'hero' && (
        <div className="absolute inset-0">
          <SignalTrail from={{ x: 50, y: 50 }} to={{ x: 18, y: 22 }} tone="cool" delay={0.5} />
          <SignalTrail from={{ x: 50, y: 50 }} to={{ x: 84, y: 18 }} tone="warm" delay={1.1} />
          <SignalTrail from={{ x: 50, y: 50 }} to={{ x: 78, y: 78 }} tone="trust" delay={0.2} curvature={-0.3} />
          <SignalTrail from={{ x: 50, y: 50 }} to={{ x: 22, y: 75 }} tone="cool" delay={1.6} curvature={-0.25} />
        </div>
      )}

      {/* Layer 3: pulse nodes */}
      {showNodes && (
        <div className="absolute inset-0">
          {mode === 'hero' && (
            <>
              <PulseNode x={50} y={50} tone="warm" size="lg" hub label="Brew & Bloom" sublabel="hub · 01" delay={0.2} />
              <PulseNode x={18} y={22} tone="cool" size="sm" delay={0.7} />
              <PulseNode x={84} y={18} tone="cool" size="sm" delay={1.0} />
              <PulseNode x={78} y={78} tone="trust" size="sm" delay={1.3} />
              <PulseNode x={22} y={75} tone="cool" size="sm" delay={1.6} />
              <PulseNode x={62} y={28} tone="neutral" size="sm" pulse={false} delay={2.0} />
              <PulseNode x={36} y={62} tone="neutral" size="sm" pulse={false} delay={2.2} />
            </>
          )}
          {mode === 'hero' && (
            <>
              <PulseNode x={12} y={18} tone="cool" size="sm" pulse={false} delay={0} />
              <PulseNode x={88} y={22} tone="warm" size="sm" pulse={false} delay={0.2} />
              <PulseNode x={82} y={82} tone="trust" size="sm" pulse={false} delay={0.4} />
              <PulseNode x={16} y={78} tone="cool" size="sm" pulse={false} delay={0.6} />
            </>
          )}
        </div>
      )}

      {/* Layer 4: subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\'/></filter><rect width=\'160\' height=\'160\' filter=\'url(%23n)\'/></svg>")',
        }}
      />

      {children}
    </div>
  );
}
