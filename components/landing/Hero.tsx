'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { NeighborhoodBackground } from '@/components/neighborhood';

const ROTATING = ['Brand', 'Voice', 'Signal', 'Reach', 'Insight', 'Trust', 'Pulse', 'Growth'];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const mapScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={ref} className="relative h-[130vh] overflow-hidden bg-canvas">
      <div className="sticky top-0 flex h-screen flex-col">
        {/* Neighborhood background field */}
        <motion.div style={{ scale: mapScale }} className="absolute inset-0">
          <NeighborhoodBackground mode="hero" />
        </motion.div>

        {/* Top meta bar */}
        <motion.div
          style={{ opacity: fade }}
          className="relative z-10 flex items-center justify-between px-6 pt-28 md:px-12"
        >
          <span className="mono-label">LocalBoost · MMXXVI</span>
          <span className="mono-label hidden md:inline">AI marketing OS for local business</span>
          <span className="mono-label">v1.0 · Demo</span>
        </motion.div>

        {/* Marquee of pillar words */}
        <motion.div
          style={{ opacity: fade }}
          className="relative z-10 mt-12 flex w-full overflow-hidden whitespace-nowrap"
        >
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 50, ease: 'linear', repeat: Infinity }}
            className="flex shrink-0 gap-12"
          >
            {[...ROTATING, ...ROTATING, ...ROTATING].map((w, i) => (
              <span
                key={i}
                className="font-display font-light italic text-ink/[0.07]"
                style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
              >
                {w} <span className="not-italic text-ink/[0.04]">·</span>
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Headline + CTA */}
        <div className="relative z-10 flex flex-1 items-center px-6 md:px-12">
          <motion.div style={{ y: headlineY, opacity: fade }} className="max-w-5xl">
            <h1 className="font-display text-5xl font-light leading-[0.95] tracking-tight text-ink md:text-7xl lg:text-[6.5rem]">
              Your neighborhood is
              <br />
              <em className="italic text-warm-bright">already sending signals.</em>
              <br />
              <span className="text-ink/70">We turn them into growth.</span>
            </h1>

            <p className="mt-10 max-w-2xl text-base leading-relaxed text-ink-secondary md:text-lg">
              LocalBoost AI learns your business, maps your audience, creates campaigns, schedules
              content, matches local creators, tracks performance, and watches compliance risks before
              they become problems.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-5">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-3 rounded-full bg-warm px-7 py-3.5 text-sm font-medium tracking-wide text-canvas shadow-lg shadow-warm/30 transition hover:-translate-y-0.5 hover:bg-warm-bright hover:shadow-warm/50"
              >
                Launch demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#vision"
                className="group inline-flex items-center gap-3 border-b border-hairline-strong pb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-secondary transition hover:border-cool/60 hover:text-ink"
              >
                See the pulse
                <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom: peek into next section */}
        <motion.div
          style={{ opacity: fade }}
          className="relative z-10 flex items-end justify-between px-6 pb-10 md:px-12"
        >
          <div className="hidden max-w-xs sm:block">
            <p className="mono-label mb-2">Next</p>
            <p className="font-display text-base font-light text-ink/80">
              First, LocalBoost understands where your business lives.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <span className="mono-label">Scroll</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-12 w-px bg-gradient-to-b from-warm/80 via-warm/30 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
