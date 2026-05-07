'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { Area, AreaChart, ResponsiveContainer, Bar, BarChart, Cell, Tooltip } from 'recharts';
import { TrendingUp, Users, Eye, Sparkles, Shield, ArrowUpRight, Calendar } from 'lucide-react';
import { ENGAGEMENT_TREND, PLATFORM_REACH } from '@/lib/mockData';
import { SceneLabel } from '@/components/shell';

function MiniDashboard({ active }: { active: MotionValue<number> }) {
  return (
    <div className="h-full w-full overflow-hidden bg-canvas text-ink">
      {/* Browser chrome */}
      <div className="flex h-7 items-center gap-1.5 border-b border-hairline bg-surface/60 px-3 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-danger" />
        <span className="h-2 w-2 rounded-full bg-warm-bright" />
        <span className="h-2 w-2 rounded-full bg-trust" />
        <span className="ml-3 font-mono text-[9px] tracking-widest text-ink-muted">localboost.ai/dashboard</span>
      </div>

      <div className="flex h-[calc(100%-1.75rem)]">
        {/* Mini sidebar */}
        <div className="flex h-full w-12 flex-col items-center gap-2 border-r border-hairline bg-surface/40 py-3">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-warm to-warm-bright" />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-5 w-5 rounded-md ${i === 0 ? 'bg-warm/15' : 'bg-white/[0.04]'}`} />
          ))}
        </div>

        <div className="flex-1 overflow-hidden p-3">
          <motion.div style={{ opacity: active }} className="space-y-2.5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-ink-muted">Welcome back</p>
                <p className="font-display text-sm font-light text-ink">Brew & Bloom Café</p>
              </div>
              <div className="rounded-md bg-warm px-2 py-1 text-[8px] font-medium text-canvas">+ New campaign</div>
            </div>

            {/* Metric row */}
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { icon: Users, val: '24.8K', lbl: 'Reach' },
                { icon: TrendingUp, val: '+24%', lbl: 'Growth' },
                { icon: Eye, val: '8.2K', lbl: 'Visits' },
                { icon: Sparkles, val: '6.8%', lbl: 'Engage' },
              ].map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.div
                    key={m.lbl}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="rounded-md border border-hairline bg-white/[0.025] p-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="h-2.5 w-2.5 text-ink-secondary" />
                      <ArrowUpRight className="h-2 w-2 text-trust" />
                    </div>
                    <p className="mt-1 font-display text-[12px] font-light leading-none text-ink">{m.val}</p>
                    <p className="text-[7px] uppercase tracking-widest text-ink-muted">{m.lbl}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Chart row */}
            <div className="grid grid-cols-3 gap-1.5">
              <div className="col-span-2 rounded-md border border-hairline bg-white/[0.025] p-2">
                <div className="flex items-center justify-between">
                  <p className="text-[8px] font-medium text-ink">Engagement trend</p>
                  <span className="rounded-sm border border-trust/30 bg-trust/10 px-1 text-[7px] font-semibold text-trust">+24.1%</span>
                </div>
                <div className="mt-1 h-14">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={ENGAGEMENT_TREND}>
                      <defs>
                        <linearGradient id="laptopGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#C56F44" stopOpacity={0.55} />
                          <stop offset="100%" stopColor="#C56F44" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="engagement" stroke="#E89368" strokeWidth={1.5} fill="url(#laptopGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-md border border-hairline bg-white/[0.025] p-2">
                <p className="text-[8px] font-medium text-ink">By platform</p>
                <div className="mt-1 h-14">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={PLATFORM_REACH}>
                      <Bar dataKey="reach" radius={[2, 2, 0, 0]}>
                        {PLATFORM_REACH.map((entry, i) => (
                          <Cell key={i} fill={['#4CCBC7', '#C56F44', '#B7E46E', '#A7B1C2'][i % 4]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* AI suggestion */}
            <div className="rounded-md border border-cool/30 bg-cool/[0.06] p-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-2.5 w-2.5 text-cool-bright" />
                <p className="text-[8px] font-medium text-cool-bright">Bloom AI suggests</p>
              </div>
              <p className="mt-0.5 text-[8px] text-ink">Post the lavender latte at 8:30 AM Friday — +24% predicted reach</p>
            </div>

            {/* Compliance highlight (last) */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-md border border-trust/30 bg-trust/[0.06] p-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-2.5 w-2.5 text-trust" />
                  <p className="text-[8px] font-medium text-trust">Compliance · all clear</p>
                </div>
                <span className="font-mono text-[7px] tracking-widest text-trust">6 / 6 OK</span>
              </div>
              <p className="mt-0.5 text-[8px] text-ink">Food permit renewal in 18 days · we&apos;ll prep paperwork</p>
            </motion.div>

            {/* Scheduled posts */}
            <div className="space-y-1">
              {[
                { time: 'Tue 8:30', t: 'Lavender Latte', p: 'IG' },
                { time: 'Wed 11:00', t: 'Cookie Drop', p: 'TikTok' },
              ].map((p) => (
                <div key={p.t} className="flex items-center gap-1.5 rounded-md bg-white/[0.025] px-1.5 py-1">
                  <Calendar className="h-2 w-2 text-ink-muted" />
                  <p className="flex-1 text-[8px] text-ink">{p.t}</p>
                  <p className="text-[7px] text-ink-muted">{p.time}</p>
                  <span className="rounded bg-white/[0.06] px-1 text-[6px] font-medium text-ink-secondary">{p.p}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function LaptopReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const lidRotate = useTransform(scrollYProgress, [0.18, 0.55], [-95, 0]);
  const screenOpacity = useTransform(scrollYProgress, [0.4, 0.65], [0, 1]);
  const dashActive = useTransform(scrollYProgress, [0.5, 0.72], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.55, 0.85], [40, 0]);
  const headlineOp = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);
  const signalOp = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0, 0.6, 0]);

  return (
    <section ref={ref} className="relative h-[320vh] bg-canvas">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-warm/15 via-cool/10 to-trust/8 blur-3xl" />

        {/* Side label */}
        <div className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 md:block">
          <SceneLabel pillar="Insight" vertical />
        </div>

        <div className="relative grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 md:pl-32 lg:grid-cols-2 lg:pl-48">
          {/* Left: copy */}
          <motion.div style={{ y: headlineY, opacity: headlineOp }} className="text-ink">
            <SceneLabel pillar="Insight" index={4} total={5} />
            <h2 className="mt-8 font-display text-5xl font-light leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              The pulse resolves
              <br />
              <em className="italic text-cool-bright">into one operating system.</em>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink-secondary md:text-lg">
              Reach, engagement, conversion, compliance — across every channel, in real time. Bloom AI
              watches the numbers so you can run your business.
            </p>
          </motion.div>

          {/* Right: laptop */}
          <div className="relative flex items-center justify-center perspective-1800">
            {/* Signal lines feeding into the laptop */}
            <motion.svg
              style={{ opacity: signalOp }}
              className="pointer-events-none absolute -inset-32 h-[calc(100%+16rem)] w-[calc(100%+16rem)]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {[
                { from: { x: 8, y: 18 }, tone: 'rgba(76,203,199,0.5)' },
                { from: { x: 92, y: 22 }, tone: 'rgba(197,111,68,0.5)' },
                { from: { x: 96, y: 78 }, tone: 'rgba(183,228,110,0.5)' },
                { from: { x: 6, y: 82 }, tone: 'rgba(76,203,199,0.5)' },
              ].map((s, i) => (
                <motion.path
                  key={i}
                  d={`M ${s.from.x} ${s.from.y} Q 50 ${s.from.y > 50 ? 70 : 30} 50 50`}
                  stroke={s.tone}
                  strokeWidth="0.4"
                  strokeDasharray="2 4"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  animate={{ strokeDashoffset: [-20, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
                />
              ))}
            </motion.svg>

            <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
              {/* Base */}
              <div className="relative h-[18px] w-[420px] rounded-b-2xl bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 shadow-2xl md:h-[22px] md:w-[560px]">
                <div className="absolute left-1/2 top-0 h-1 w-32 -translate-x-1/2 rounded-b-md bg-zinc-950/60" />
              </div>

              {/* Lid */}
              <motion.div
                style={{
                  rotateX: lidRotate,
                  transformOrigin: 'bottom center',
                  transformStyle: 'preserve-3d',
                }}
                className="absolute bottom-[18px] left-0 h-[260px] w-[420px] md:bottom-[22px] md:h-[340px] md:w-[560px]"
              >
                {/* Back face */}
                <div
                  className="absolute inset-0 rounded-t-2xl bg-gradient-to-b from-zinc-800 via-zinc-900 to-black shadow-xl"
                  style={{ transform: 'rotateY(180deg) translateZ(1px)', backfaceVisibility: 'hidden' }}
                >
                  <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-warm/30" />
                </div>

                {/* Screen face */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-t-2xl border-[6px] border-zinc-900 bg-zinc-950 shadow-2xl md:border-[8px]"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <motion.div style={{ opacity: screenOpacity }} className="h-full w-full">
                    <MiniDashboard active={dashActive} />
                  </motion.div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <span className="mono-label">Scroll to open</span>
        </div>
      </div>
    </section>
  );
}
