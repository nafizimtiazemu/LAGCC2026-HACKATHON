'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeighborhoodMap } from '@/components/neighborhood/NeighborhoodMap';

const STATS = [
  { count: '42', label: 'Local signals' },
  { count: '18', label: 'Campaign opportunities' },
  { count: '6', label: 'Compliance checks' },
  { count: '3', label: 'Creator matches' },
];

export function IntroLoader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setProgress(100);
      const t = setTimeout(() => {
        setDone(true);
        setTimeout(onDone, 350);
      }, 250);
      return () => clearTimeout(t);
    }
    const start = Date.now();
    const duration = 2400;
    let raf = 0;
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / duration) * 100);
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else
        setTimeout(() => {
          setDone(true);
          setTimeout(onDone, 700);
        }, 400);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] overflow-hidden bg-canvas text-ink"
        >
          {/* Background map dimmed underneath */}
          <div className="absolute inset-0 opacity-25">
            <NeighborhoodMap className="h-full w-full" intensity={0.7} />
          </div>

          {/* Center pulse */}
          <div className="relative flex h-full flex-col">
            <div className="flex flex-1 flex-col items-center justify-center px-6">
              {/* Big radial pulse */}
              <div className="relative mb-12 flex h-32 w-32 items-center justify-center">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute h-full w-full rounded-full border border-warm/30"
                    animate={{ scale: [0.4, 1.6], opacity: [0.55, 0] }}
                    transition={{ duration: 2.4, delay: i * 0.6, repeat: Infinity, ease: 'easeOut' }}
                  />
                ))}
                <div className="relative h-3 w-3 rounded-full bg-warm shadow-[0_0_30px_rgba(232,147,104,0.7)]" />
              </div>

              {/* Counter */}
              <div className="flex items-baseline gap-2">
                <motion.span
                  key={Math.floor(progress / 5)}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  className="font-display text-7xl font-light tabular-nums md:text-8xl"
                >
                  {String(Math.floor(progress)).padStart(2, '0')}
                </motion.span>
                <span className="font-mono text-2xl text-ink-muted">%</span>
              </div>

              <p className="mt-6 mono-label">
                {progress < 100 ? 'Mapping neighborhood signals' : 'Ready'}
              </p>

              {/* Progress hairline */}
              <div className="mt-10 h-px w-72 overflow-hidden bg-white/5 md:w-[420px]">
                <motion.div
                  className="h-full bg-gradient-to-r from-warm via-warm-bright to-cool"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Stat strip */}
            <div className="grid grid-cols-2 border-t border-hairline md:grid-cols-4">
              {STATS.map((s, i) => {
                const threshold = 18 + i * 16;
                const visible = progress > threshold;
                return (
                  <motion.div
                    key={s.label}
                    initial={false}
                    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="border-r border-hairline px-6 py-7 last:border-r-0"
                  >
                    <p className="mono-label">{String(i + 1).padStart(2, '0')} · STATS</p>
                    <p className="mt-3 font-display text-3xl font-light text-ink md:text-4xl">{s.count}</p>
                    <p className="mt-1 text-sm text-ink-secondary">{s.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
