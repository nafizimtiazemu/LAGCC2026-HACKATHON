'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Check, Calendar, AlertCircle } from 'lucide-react';
import { SceneLabel, ComplianceBadge } from '@/components/shell';

const ITEMS = [
  { title: 'Food permit · renewal', due: 'Due in 18 days', risk: 'medium' as const, status: 'pending' },
  { title: 'Sales tax filing · Q2', due: 'Filed Apr 18', risk: 'low' as const, status: 'done' },
  { title: 'Sign ordinance · review', due: 'Due in 32 days', risk: 'low' as const, status: 'pending' },
  { title: 'Fire safety inspection', due: 'Cleared Mar 04', risk: 'low' as const, status: 'done' },
  { title: 'I-9 verification · 2 staff', due: 'Due in 9 days', risk: 'high' as const, status: 'pending' },
];

export function TrustScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.95], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[150vh] bg-canvas">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 md:block">
          <SceneLabel pillar="Trust" vertical />
        </div>

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-1/2 h-[700px] w-[700px] -translate-y-1/2 translate-x-1/3 rounded-full bg-trust/[0.05] blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:pl-32 lg:grid-cols-[1fr_1.1fr] lg:pl-48">
          <motion.div style={{ opacity }}>
            <h2 className="mt-8 font-display text-5xl font-light leading-[0.95] tracking-tight text-ink md:text-6xl lg:text-7xl">
              Compliance
              <br />
              <em className="italic text-trust">isn&apos;t a footnote.</em>
              <br />
              <span className="text-ink/70">It&apos;s an alert</span>
              <br />
              <span className="text-ink/70">we sent two weeks early.</span>
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-secondary md:text-lg">
              Permits, inspections, sales-tax filings, staff verifications. The platform tracks every
              regulation that affects your storefront, surfaces what&apos;s due, and prepares the paperwork
              before deadlines turn into fines.
            </p>
          </motion.div>

          {/* Visual: timeline-ish list of compliance items */}
          <motion.div style={{ opacity }} className="space-y-3">
            {ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: i * 0.08 + 0.2 }}
                className="panel relative flex items-center gap-4 p-4"
              >
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
                    item.status === 'done'
                      ? 'bg-trust/15 text-trust'
                      : item.risk === 'high'
                      ? 'bg-danger/15 text-danger'
                      : item.risk === 'medium'
                      ? 'bg-warm/15 text-warm-bright'
                      : 'bg-cool/15 text-cool-bright'
                  }`}
                >
                  {item.status === 'done' ? (
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  ) : (
                    <Shield className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink">{item.title}</p>
                  <p className="text-[11px] text-ink-muted flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {item.due}
                  </p>
                </div>
                <ComplianceBadge risk={item.risk} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
