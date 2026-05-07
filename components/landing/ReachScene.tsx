'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, Facebook, Music2, MapPin } from 'lucide-react';
import { SceneLabel } from '@/components/shell';

const PLATFORMS = [
  { x: 22, y: 22, icon: Instagram, label: 'Instagram', tone: 'warm' },
  { x: 78, y: 22, icon: Music2, label: 'TikTok', tone: 'cool' },
  { x: 22, y: 78, icon: Facebook, label: 'Facebook', tone: 'cool' },
  { x: 78, y: 78, icon: MapPin, label: 'Google Business', tone: 'trust' },
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
    <section ref={ref} className="relative h-[220vh] bg-canvas">
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
          <motion.div style={{ opacity }}>
            <SceneLabel pillar="Reach" index={3} total={5} />
            <h2 className="mt-8 font-display text-5xl font-light leading-[0.95] tracking-tight text-ink md:text-6xl lg:text-7xl">
              Every post,
              <br />
              <span className="text-ink/70">every platform,</span>
              <br />
              <em className="italic text-warm-bright">every creator</em>
              <br />
              <span className="text-ink/70">becomes part</span>
              <br />
              <span className="text-ink/70">of one local system.</span>
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-secondary md:text-lg">
              One campaign branches across channels. Local creators with real audience overlap orbit
              around it. Outreach is one tap away.
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
      {/* SVG branches */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="branch-warm" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(197,111,68,0.7)" />
            <stop offset="100%" stopColor="rgba(197,111,68,0)" />
          </linearGradient>
        </defs>
        {PLATFORMS.map((p, i) => (
          <motion.path
            key={i}
            d={`M 50 50 Q ${(50 + p.x) / 2} ${(50 + p.y) / 2 - 10} ${p.x} ${p.y}`}
            stroke="rgba(197,111,68,0.4)"
            strokeWidth="0.4"
            strokeDasharray="3 5"
            fill="none"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.15 }}
          />
        ))}
      </svg>

      {/* Hub: campaign */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="panel-strong relative flex h-32 w-32 flex-col items-center justify-center rounded-2xl">
          <div className="absolute -inset-4 rounded-3xl bg-warm/15 blur-2xl" />
          <p className="relative mono-label !text-warm-bright">Campaign</p>
          <p className="relative mt-2 text-center font-display text-base font-light text-ink leading-tight">
            Lavender
            <br />
            Latte Drop
          </p>
        </div>
      </motion.div>

      {/* Platform nodes */}
      {PLATFORMS.map((p, i) => {
        const Icon = p.icon;
        return (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <div className="panel relative flex h-16 w-16 items-center justify-center rounded-xl">
              <Icon className="h-5 w-5 text-ink-secondary" />
              <span className="pulse-dot absolute -right-1 -top-1 block h-2 w-2 rounded-full bg-cool text-cool" />
            </div>
            <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted whitespace-nowrap">
              {p.label}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
