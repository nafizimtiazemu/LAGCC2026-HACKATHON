'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Hash, Clock, Image as ImageIcon, Type, Megaphone } from 'lucide-react';
import { SceneLabel } from '@/components/shell';

const INPUTS = [
  { icon: Type, label: 'Brand voice', meta: 'warm · grounded · craft' },
  { icon: ImageIcon, label: 'Menu photos', meta: '24 assets uploaded' },
  { icon: Megaphone, label: 'Past flyers', meta: '6 references parsed' },
  { icon: Sparkles, label: 'Audience goals', meta: 'morning regulars · brunch' },
];

const OUTPUTS = [
  {
    title: 'Caption',
    body: 'Slow Sundays call for Lavender Lattes. Hand-crafted with house syrup and oat milk steamed to silk.',
    tag: 'Instagram · Sun 10:30 AM',
  },
  {
    title: 'Campaign idea',
    body: '"Lavender Latte Drop" — limited-edition launch + reel + 10% off first 50 orders.',
    tag: 'Predicted reach 4.2K',
  },
  {
    title: 'Hashtags',
    body: '#BrewAndBloom · #LavenderLatte · #AustinCoffee · #SlowSunday',
    tag: 'Optimized for ATX',
  },
  {
    title: 'Post timing',
    body: 'Friday 8:30 AM · Sunday 10:30 AM · Wednesday 2:15 PM',
    tag: '+38% engagement',
  },
];

export function IntelligenceScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.95], [0, 1, 1, 0]);
  const reveal = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);

  return (
    <section ref={ref} className="relative h-[220vh] bg-canvas">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Side label */}
        <div className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 md:block">
          <SceneLabel pillar="Intelligence" vertical />
        </div>

        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-1/2 h-[700px] w-[700px] -translate-y-1/2 translate-x-1/3 rounded-full bg-cool/[0.06] blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:pl-32 lg:pl-48">
          <motion.div style={{ opacity }}>
            <SceneLabel pillar="Intelligence" index={2} total={5} />
            <h2 className="mt-8 max-w-3xl font-display text-5xl font-light leading-[0.95] tracking-tight text-ink md:text-6xl lg:text-7xl">
              Then it turns scattered details
              <br />
              <em className="italic text-cool-bright">into campaigns that sound like you.</em>
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-secondary md:text-lg">
              No prompts to learn. No strategy decks. Bloom AI absorbs your raw business signals and
              routes them into the assets a local marketer would otherwise spend a week producing.
            </p>
          </motion.div>

          {/* Flow diagram */}
          <motion.div style={{ opacity }} className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto_1fr]">
            {/* Inputs column */}
            <div className="space-y-3">
              <p className="mono-label">Inputs</p>
              {INPUTS.map((input, i) => {
                const Icon = input.icon;
                return (
                  <motion.div
                    key={input.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                    className="panel flex items-center gap-3 p-3"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-hairline bg-white/[0.03]">
                      <Icon className="h-4 w-4 text-ink-secondary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-ink">{input.label}</p>
                      <p className="text-[11px] text-ink-muted truncate">{input.meta}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Routing arrow column */}
            <div className="hidden items-center justify-center lg:flex">
              <Routing />
            </div>

            {/* Outputs column */}
            <div className="space-y-3">
              <p className="mono-label">Outputs</p>
              {OUTPUTS.map((out, i) => (
                <motion.div
                  key={out.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  className="panel relative overflow-hidden p-4"
                >
                  <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-warm via-cool to-trust" />
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cool-bright">{out.title}</p>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {out.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink">{out.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Routing() {
  return (
    <svg viewBox="0 0 100 360" className="h-72 w-24" aria-hidden="true">
      <defs>
        <linearGradient id="route-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(197,111,68,0.5)" />
          <stop offset="50%" stopColor="rgba(76,203,199,0.7)" />
          <stop offset="100%" stopColor="rgba(76,203,199,0.4)" />
        </linearGradient>
      </defs>
      {[40, 130, 220, 310].map((y, i) => (
        <g key={i}>
          <path
            d={`M 0 ${y} C 30 ${y}, 50 180, 100 180`}
            stroke="url(#route-grad)"
            strokeWidth="1.2"
            fill="none"
            opacity={0.5}
          />
        </g>
      ))}
      {/* center hub */}
      <circle cx="50" cy="180" r="6" fill="rgba(76,203,199,0.2)" />
      <circle cx="50" cy="180" r="3" fill="#4CCBC7" />
    </svg>
  );
}
