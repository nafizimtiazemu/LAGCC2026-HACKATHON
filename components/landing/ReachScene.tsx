'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, Facebook, Music2, MapPin } from 'lucide-react';
import { SceneLabel } from '@/components/shell';

const PLATFORMS = [
  { x: 18, y: 18, icon: Instagram, label: 'Instagram', tone: 'warm' },
  { x: 82, y: 18, icon: Music2, label: 'TikTok', tone: 'cool' },
  { x: 18, y: 82, icon: Facebook, label: 'Facebook', tone: 'cool' },
  { x: 82, y: 82, icon: MapPin, label: 'Google Business', tone: 'trust' },
];

const CREATORS = [
  { name: 'Maya Chen', handle: '@mayaeats', match: 96, niche: 'Food & Drink', avatar: 'https://i.pravatar.cc/100?img=47' },
  { name: 'Diego Ramos', handle: '@diegobrews', match: 94, niche: 'Coffee', avatar: 'https://i.pravatar.cc/100?img=12' },
  { name: 'Sarah Whitfield', handle: '@sarahworks', match: 91, niche: 'Lifestyle', avatar: 'https://i.pravatar.cc/100?img=44' },
];

export function ReachScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.95], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[160vh] bg-canvas">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 md:block">
          <SceneLabel pillar="Reach" vertical />
        </div>

        {/* Ambient warm glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-1/2 h-[700px] w-[700px] -translate-y-1/2 -translate-x-1/3 rounded-full bg-warm/[0.06] blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:pl-32 lg:grid-cols-2 lg:pl-48">
          {/* Copy */}
          <motion.div style={{ opacity }} className="flex flex-col items-center text-center">
          <h2 className="mt-8 font-display text-5xl font-light leading-[0.65] tracking-tight text-ink md:text-6xl lg:text-7xl">
            Every <em className="font-light italic text-warm-bright">product</em>,
            <br />
            Every <em className="font-light italic text-warm-bright">service</em>,
            <br />
            Every <em className="font-light italic text-warm-bright">post</em>.
          </h2>
            <p className="mt-6 max-w-xl font-display text-xl font-light italic leading-snug text-ink-secondary md:text-2xl">
              They will live rent-free in your client&apos;s mind.
            </p>
          </motion.div>

          {/* Visual */}
          <motion.div style={{ opacity }} className="relative aspect-square w-full max-w-[540px] mx-auto">
            <ReachDiagram />
          </motion.div>
        </div>

        {/* Floating creator strip */}
        <motion.div
          style={{ opacity }}
          className="pointer-events-none absolute bottom-12 left-0 right-0 mx-auto hidden max-w-3xl px-6 lg:block"
        >
          <div className="panel flex items-center gap-4 p-3">
            <span className="mono-label !text-ink whitespace-nowrap">Live matches</span>
            <div className="flex flex-1 items-center gap-3 overflow-hidden">
              {CREATORS.map((c, i) => (
                <motion.div
                  key={c.handle}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="flex flex-1 items-center gap-3 rounded-lg bg-white/[0.03] p-2"
                >
                  <img src={c.avatar} alt={c.name} className="h-9 w-9 rounded-lg" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{c.name}</p>
                    <p className="truncate text-[11px] text-ink-muted">{c.niche}</p>
                  </div>
                  <span className="rounded-full border border-trust/30 bg-trust/10 px-2 py-0.5 font-mono text-[10px] tracking-widest text-trust">
                    {c.match}%
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ReachDiagram() {
  return (
    <div className="relative h-full w-full">
      {/* SVG branches — solid lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="branch-warm" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(197,111,68,0.8)" />
            <stop offset="100%" stopColor="rgba(197,111,68,0.2)" />
          </linearGradient>
        </defs>
        {PLATFORMS.map((p, i) => (
          <motion.path
            key={i}
            d={`M 50 50 Q ${(50 + p.x) / 2} ${(50 + p.y) / 2 - 10} ${p.x} ${p.y}`}
            stroke="url(#branch-warm)"
            strokeWidth="0.7"
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.15 }}
          />
        ))}
      </svg>

      {/* Hub: campaign — exactly centered, on top */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="panel-strong relative flex h-32 w-32 flex-col items-center justify-center rounded-2xl">
          <div className="absolute -inset-4 rounded-3xl bg-warm/15 blur-2xl" />
          <p className="relative mono-label !text-warm-bright">Campaign</p>
          <p className="relative mt-2 text-center font-display text-base font-light leading-tight text-ink">
            Lavender
            <br />
            Latte Drop
          </p>
        </div>
      </motion.div>

      {/* Platform nodes — solid pulse-style tiles */}
      {PLATFORMS.map((p, i) => {
        const Icon = p.icon;
        const ringColor =
          p.tone === 'warm'
            ? 'rgba(197,111,68,0.55)'
            : p.tone === 'trust'
            ? 'rgba(183,228,110,0.55)'
            : 'rgba(76,203,199,0.55)';
        const glowColor =
          p.tone === 'warm'
            ? 'rgba(232,147,104,0.4)'
            : p.tone === 'trust'
            ? 'rgba(183,228,110,0.35)'
            : 'rgba(111,226,221,0.4)';
        return (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <div className="relative">
              {/* Pulse rings */}
              <span
                className="absolute inset-0 rounded-2xl blur-xl opacity-60"
                style={{ background: glowColor }}
              />
              {/* Glow */}
              <span
                className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl blur-md"
                style={{ background: glowColor, opacity: 0.6 }}
              />
              {/* Solid icon tile */}
              <div
                className="relative flex h-16 w-16 items-center justify-center rounded-2xl border bg-panel shadow-lg"
                style={{ borderColor: ringColor }}
              >
                <Icon className="h-5 w-5 text-ink" />
                <span className="pulse-dot absolute -right-1 -top-1 block h-2 w-2 rounded-full bg-cool text-cool" />
              </div>
            </div>
            <p className="mt-3 whitespace-nowrap text-center font-mono text-[9px] uppercase tracking-[0.2em] text-ink">
              {p.label}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}