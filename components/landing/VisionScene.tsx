'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { NeighborhoodMap } from '@/components/neighborhood/NeighborhoodMap';
import { PulseNode, SignalTrail } from '@/components/neighborhood';
import { SceneLabel } from '@/components/shell';

const NEIGHBOURS = [
  { x: 22, y: 28, label: 'Morning commuters', tone: 'cool' as const, delay: 0.4 },
  { x: 78, y: 22, label: 'UT students', tone: 'cool' as const, delay: 0.6 },
  { x: 82, y: 70, label: 'Brunch crowd', tone: 'cool' as const, delay: 0.8 },
  { x: 28, y: 75, label: 'Local salons', tone: 'warm' as const, delay: 1.0 },
  { x: 14, y: 50, label: 'Live events', tone: 'trust' as const, delay: 1.2 },
];

export function VisionScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const reveal = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.95], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.5], [40, 0]);

  return (
    <section id="vision" ref={ref} className="relative h-[220vh] bg-canvas">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <NeighborhoodMap className="h-full w-full" intensity={0.9} />
        </div>

        {/* Side label */}
        <div className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 md:block">
          <SceneLabel pillar="Vision" vertical />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:pl-32 lg:grid-cols-2 lg:pl-48">
          {/* Copy */}
          <motion.div style={{ opacity, y }}>
            <SceneLabel pillar="Vision" index={1} total={5} />
            <h2 className="mt-8 font-display text-5xl font-light leading-[0.95] tracking-tight text-ink md:text-6xl lg:text-7xl">
              First, we understand
              <br />
              <em className="italic text-warm-bright">where your business lives.</em>
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-secondary md:text-lg">
              LocalBoost reads your block, your hours, your neighbors, and the shifts of the people
              moving past your door. Your storefront is not a list of attributes — it is a node in a
              living network. The platform starts there.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
              {[
                ['142', 'Daily foot-traffic windows'],
                ['8.4K', 'Local audience reachable'],
                ['12', 'Adjacent businesses'],
                ['3', 'Recurring local events'],
              ].map(([v, l]) => (
                <div key={l as string} className="border-l border-hairline pl-4">
                  <p className="font-display text-2xl font-light text-ink">{v}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div style={{ opacity }} className="relative aspect-square w-full max-w-[520px] mx-auto">
            <VisualNetwork reveal={reveal} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function VisualNetwork({ reveal }: { reveal: MotionValue<number> }) {
  return (
    <div className="relative h-full w-full">
      {/* Concentric rings around the hub */}
      {[0.4, 0.55, 0.72, 0.92].map((r, i) => (
        <motion.div
          key={i}
          style={{
            opacity: useTransform(reveal, [0, 1], [0, 0.5 - i * 0.08]),
            scale: useTransform(reveal, [0, 1], [0.6, 1]),
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-warm/15"
          initial={false}
          // size scaled by r
        >
          <div style={{ width: `${r * 460}px`, height: `${r * 460}px` }} />
        </motion.div>
      ))}

      {/* Signal trails from hub to neighbors */}
      <div className="absolute inset-0">
        {NEIGHBOURS.map((n, i) => (
          <SignalTrail
            key={i}
            from={{ x: 50, y: 50 }}
            to={{ x: n.x, y: n.y }}
            tone={n.tone}
            delay={n.delay}
            duration={2.6 + i * 0.2}
            curvature={i % 2 ? 0.3 : -0.25}
          />
        ))}
      </div>

      {/* Hub: Brew & Bloom */}
      <PulseNode x={50} y={50} tone="warm" size="lg" hub label="Brew & Bloom" sublabel="hub · 01" delay={0.2} />

      {/* Neighbors */}
      {NEIGHBOURS.map((n, i) => (
        <PulseNode key={i} x={n.x} y={n.y} tone={n.tone} size="sm" label={n.label} delay={n.delay} />
      ))}
    </div>
  );
}
