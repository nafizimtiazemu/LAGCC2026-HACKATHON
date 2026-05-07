'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-500 ${
          scrolled ? 'border-b border-hairline bg-canvas/80 backdrop-blur-xl' : ''
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="h-7 w-7 rounded-md bg-gradient-to-br from-warm to-warm-bright" />
              <span className="pulse-dot absolute -right-1 -top-1 block h-2 w-2 rounded-full bg-cool text-cool" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink">LocalBoost</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {[
              { href: '/packages', label: 'Pricing' },
              { href: '/dashboard', label: 'Demo' },
              { href: '/signup', label: 'Sign in' },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-secondary transition hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/signup"
              className="rounded-full border border-hairline-strong bg-white/[0.04] px-5 py-2 font-mono text-[11px] uppercase tracking-[0.3em] text-ink backdrop-blur-md transition hover:border-warm/40 hover:bg-warm/10"
            >
              Launch demo
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? <X className="h-5 w-5 text-ink" /> : <Menu className="h-5 w-5 text-ink" />}
          </button>
        </div>
      </motion.nav>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-canvas md:hidden"
        >
          {[
            { href: '/packages', label: 'Pricing' },
            { href: '/dashboard', label: 'Demo' },
            { href: '/signup', label: 'Sign in' },
            { href: '/signup', label: 'Launch demo' },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-mono text-base uppercase tracking-[0.3em] text-ink"
            >
              {l.label}
            </Link>
          ))}
        </motion.div>
      )}
    </>
  );
}
