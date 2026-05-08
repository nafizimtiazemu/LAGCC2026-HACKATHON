'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NeighborhoodMap } from '@/components/neighborhood/NeighborhoodMap';
import { InfluenceFlowLogo } from '../brand/InfluenceFlowLogo';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-canvas pt-32 md:pt-48">
      {/* Background map */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <NeighborhoodMap className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-warm/15 via-cool/8 to-trust/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pb-32 text-center md:pb-48">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-3xl font-display text-5xl font-light leading-[0.95] tracking-tight text-ink md:text-7xl lg:text-8xl"
        >
          Run the next week
          <br />
          <em className="italic text-warm-bright">of marketing</em>
          <br />
          <span className="text-ink/70">before your morning rush.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-8 max-w-xl text-base text-ink-secondary md:text-lg"
        >
          Five minutes of onboarding. A full marketing operating system in return.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-14 flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <Link
            href="/signup"
            className="group inline-flex items-center gap-3 rounded-full bg-warm px-8 py-4 text-sm font-medium tracking-wide text-canvas shadow-lg shadow-warm/40 transition hover:bg-warm-bright"
          >
            Launch demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/packages" className="mono-label hover:text-ink transition">
            View pricing
          </Link>
        </motion.div>
      </div>

      <footer className="relative border-t border-hairline">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-3">
                <InfluenceFlowLogo className="text-base" />
              </Link>
              <p className="mt-5 max-w-xs text-sm text-ink-secondary">
                AI marketing operating system for small businesses.
              </p>
            </div>

            {/* Link columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {[
                { title: 'Product', items: ['Demo', 'Pricing', 'Generator', 'Analytics'] },
                { title: 'Resources', items: ['Brand profile', 'Calendar', 'Influencers', 'Compliance'] },
                { title: 'Company', items: ['About', 'Careers', 'Contact', 'Press'] },
                { title: 'Legal', items: ['Privacy', 'Terms', 'Security', 'Cookies'] },
              ].map((col) => (
                <div key={col.title}>
                  <p className="mono-label mb-3">{col.title}</p>
                  <ul className="space-y-2.5">
                    {col.items.map((item) => (
                      <li key={item}>
                        <span className="cursor-pointer text-sm text-ink-secondary transition hover:text-ink">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-6 md:flex-row md:items-center">
            <p className="text-xs text-ink-muted">
              © 2026 LocalBoost AI, Inc. All rights reserved.
            </p>
            <p className="font-mono text-[10px] tracking-[0.3em] text-ink-muted uppercase">
              Built with intention
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
