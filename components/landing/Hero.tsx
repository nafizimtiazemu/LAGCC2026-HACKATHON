'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown, ArrowRight, Heart, MessageCircle } from 'lucide-react';
// import { NeighborhoodMap } from '@/components/neighborhood/NeighborhoodMap';
import { PulseNode, SignalTrail } from '@/components/neighborhood';

const ROTATING = ['Brand', 'Voice', 'Signal', 'Reach', 'Insight', 'Trust', 'Pulse', 'Growth'];

const CAPABILITIES = [
  { x: 10, y: 15,  label: 'Influencer partnerships', tone: 'cool' as const, delay: 0.6, curve: 0.42 },
  { x: 84, y: 6,  label: 'AI marketing',            tone: 'warm' as const, delay: 0.85, curve: -0.38 },
  { x: 86, y: 92, label: 'Analytics',               tone: 'cool' as const, delay: 1.1, curve: 0.36 },
  { x: 16, y: 90, label: 'Compliance',              tone: 'trust' as const, delay: 1.35, curve: -0.42 },
];

// Floating Instagram-style post cards.
// Positioned in viewport %; top: y < 50, bottom: y > 50.
// All warm/copper-tinted to match the hero palette.
const FLOATING_POSTS = [
  // Two at the top (above headline)
  {
    x: 8,
    y: 8,
    w: 180,
    h: 220,
    rot: -6,
    delay: 0.4,
    floatY: 12,
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=70',
    caption: 'lavender latte sundays',
    likes: '2.4k',
  },
  {
    x: 62,
    y: 5,
    w: 210,
    h: 250,
    rot: 5,
    delay: 0.7,
    floatY: -10,
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=70',
    caption: 'morning at the bar',
    likes: '1.8k',
  },
  // Three at the bottom (below CTA)
  {
    x: 4,
    y: 70,
    w: 195,
    h: 235,
    rot: -8,
    delay: 1.0,
    floatY: 14,
    img: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&q=70',
    caption: 'house roast · slow drip',
    likes: '3.1k',
  },
  {
    x: 38,
    y: 78,
    w: 175,
    h: 215,
    rot: 4,
    delay: 1.25,
    floatY: -12,
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=70',
    caption: 'open mic tuesdays',
    likes: '987',
  },
  {
    x: 70,
    y: 72,
    w: 200,
    h: 240,
    rot: -4,
    delay: 1.5,
    floatY: 10,
    img: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&q=70',
    caption: 'cookie drop weekend',
    likes: '4.2k',
  },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const fade = useTransform(scrollYProgress, [0, 0.9], [3, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const reveal = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section ref={ref} className="relative h-[140vh] overflow-hidden bg-canvas">
      <div className="sticky top-0 flex h-screen flex-col">
        {/* Background neighborhood map */}
        {/* <div className="pointer-events-none absolute inset-0 opacity-40">
          <NeighborhoodMap className="h-full w-full" intensity={0.65} />
        </div> */}

        {/* Floating blurry Instagram posts — warm-tinted, drifting */}
        <div className="pointer-events-none absolute inset-0 z-[1]">
          {FLOATING_POSTS.map((p, i) => (
            <FloatingPost key={i} {...p} fade={fade} />
          ))}
        </div>

        {/* Radial vignette anchors the type */}
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              'radial-gradient(ellipse at 30% 50%, rgba(11,13,18,0) 0%, rgba(11,13,18,0.55) 70%)',
          }}
        />

        {/* Top meta bar */}
        <motion.div
          style={{ opacity: fade }}
          className="relative z-20 flex items-center justify-between px-6 pt-28 md:px-12"
        >
          {/* <span className="mono-label">LocalBoost · MMXXVI</span>
          <span className="mono-label hidden md:inline">AI marketing OS for local business</span>
          <span className="mono-label">v1.0 · Demo</span> */}
        </motion.div>

        {/* Marquee strip */}
        <motion.div
          style={{ opacity: fade }}
          className="relative z-10 mt-10 flex w-full overflow-hidden whitespace-nowrap"
          aria-hidden="true"
        >
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 50, ease: 'linear', repeat: Infinity }}
            className="flex shrink-0 gap-12"
          >
            {[...ROTATING, ...ROTATING, ...ROTATING].map((w, i) => (
              <span
                key={i}
                className="font-display font-light italic text-ink/[0.05]"
                style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
              >
                {w} <span className="not-italic text-ink/[0.03]">·</span>
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Two-column body */}
        <div className="relative z-10 flex flex-1 items-center px-6 md:px-12">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <motion.div style={{ y: headlineY, opacity: fade }} className="relative z-10">
              <h1
                className="font-display font-light leading-[0.95] tracking-tight text-ink"
                style={{ fontSize: 'clamp(3.75rem, 6vw, 5.25rem)' }}
              >
                Your all-in-one
                <br />
                <em className="italic text-warm-bright">Marketing Team</em>
              </h1>

              {/* <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-secondary md:text-lg">
                Powered by influencer partnerships, AI-driven marketing, analytics, and compliance
                management — in one platform that learns your neighborhood.
              </p> */}

              <div className="mt-10 flex flex-wrap items-center gap-5">
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

            <motion.div
              style={{ opacity: fade }}
              className="relative mx-auto aspect-square w-full max-w-[560px] lg:max-w-none"
            >
              <CapabilityNetwork reveal={reveal} />
            </motion.div>
          </div>
        </div>

        {/* Footer band */}
        <motion.div
          style={{ opacity: fade }}
          className="relative z-10 flex items-end justify-between px-6 pb-10 md:px-12"
        >
          {/* <div className="hidden max-w-xs sm:block">
            <p className="mono-label mb-2">Next</p>
            <p className="font-display text-base font-light text-ink/80">
              First, LocalBoost understands where your business lives.
            </p>
          </div> */}
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

function FloatingPost({
  x,
  y,
  w,
  h,
  rot,
  delay,
  floatY,
  img,
  caption,
  likes,
  fade,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rot: number;
  delay: number;
  floatY: number;
  img: string;
  caption: string;
  likes: string;
  fade: MotionValue<number>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ left: `${x}%`, top: `${y}%`, opacity: fade }}
      className="absolute"
    >
      {/* Drift loop wrapper */}
      <motion.div
        animate={{ y: [0, floatY, 0], rotate: [rot, rot + 1.5, rot] }}
        transition={{ duration: 8 + Math.abs(floatY) * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: w, height: h }}
        className="relative"
      >
        {/* Warm-orange glow halo behind card */}
        <div
          className="absolute -inset-8 rounded-[40px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(197,111,68,0.35) 0%, rgba(232,147,104,0.18) 40%, rgba(197,111,68,0) 75%)',
            filter: 'blur(24px)',
          }}
        />

        {/* The post card itself, blurred */}
        <div
          className="relative h-full w-full overflow-hidden rounded-2xl border border-warm/20 bg-panel/80 shadow-2xl shadow-warm/20"
          style={{ filter: 'blur(2.5px)' }}
        >
          {/* Image area */}
          <div className="relative h-[72%] w-full overflow-hidden">
            <img src={img} alt="" className="h-full w-full object-cover" />
            {/* Warm tint overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(197,111,68,0.45) 0%, rgba(232,147,104,0.25) 50%, rgba(197,111,68,0.55) 100%)',
                mixBlendMode: 'multiply',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-canvas/40" />
          </div>

          {/* Caption + meta */}
          <div className="flex h-[28%] flex-col justify-center gap-1.5 px-3">
            <div className="flex items-center gap-2.5 text-warm-bright">
              <Heart className="h-3 w-3" fill="currentColor" />
              <span className="font-mono text-[10px]">{likes}</span>
              <MessageCircle className="ml-1 h-3 w-3" />
            </div>
            <p className="truncate font-display text-[11px] italic text-ink/80">{caption}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CapabilityNetwork({ reveal }: { reveal: MotionValue<number> }) {
  return (
    <div className="relative h-full w-full">
      {[0.42, 0.58, 0.76, 0.96].map((r, i) => (
        <motion.div
          key={i}
          style={{
            opacity: useTransform(reveal, [0, 1], [0, 0.4 - i * 0.07]),
            scale: useTransform(reveal, [0, 1], [0.55, 1]),
            width: `${r * 100}%`,
            height: `${r * 100}%`,
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-warm/15"
        />
      ))}

      <div className="absolute inset-0">
        {CAPABILITIES.map((c, i) => (
          <SignalTrail
            key={i}
            from={{ x: 50, y: 50 }}
            to={{ x: c.x, y: c.y }}
            tone={c.tone}
            delay={c.delay}
            duration={2.6 + i * 0.25}
            curvature={c.curve}
            thickness={1.2}
          />
        ))}
      </div>

      <PulseNode
        x={50}
        y={50}
        tone="warm"
        size="lg"
        hub
        label="LocalBoost"
        delay={0.25}
      />

      {CAPABILITIES.map((c, i) => (
        <PulseNode key={i} x={c.x} y={c.y} tone={c.tone} size="sm" label={c.label} delay={c.delay} />
      ))}
    </div>
  );
}