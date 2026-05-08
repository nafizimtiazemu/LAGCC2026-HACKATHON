'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassPanel } from '@/components/shell';
import { NeighborhoodBackground } from '@/components/neighborhood';
import { useAppStore } from '@/lib/store';
import { delay } from '@/lib/utils';
import { toast } from '@/components/ui/toaster';
import { InfluenceFlowLogo } from '@/components/brand/InfluenceFlowLogo';

export default function SignupPage() {
  const router = useRouter();
  const { setAuthed } = useAppStore();
  const [name, setName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex@brewandbloom.co');
  const [password, setPassword] = useState('••••••••••');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await delay(1400);
    setAuthed(true);
    toast({ variant: 'success', title: 'Welcome to LocalBoost', description: "Let's map your business." });
    router.push('/onboarding');
  };

  const handleOAuth = (provider: string) => {
    toast({ variant: 'info', title: `${provider} sign-in`, description: 'Demo mode · routing through standard onboarding.' });
    setTimeout(() => router.push('/onboarding'), 800);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-canvas">
      <NeighborhoodBackground mode="hero" />

      {/* Back link */}
      <Link
        href="/"
        className="absolute left-6 top-6 z-20 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-secondary transition hover:text-ink md:left-12 md:top-8"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Home
      </Link>

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        {/* Left: atmospheric brand panel */}
        <div className="hidden flex-col justify-between p-12 lg:flex">
          <div />
          <div className="max-w-md">
            <span className="mono-label">Welcome</span>
            <h1 className="mt-6 font-display text-5xl font-light leading-[0.95] tracking-tight text-ink">
              Five minutes
              <br />
              <em className="italic text-warm-bright">to a working</em>
              <br />
              marketing OS.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-secondary">
              We&apos;ll learn your business, map your audience, and prepare your first week of content.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                ['2,400', 'Local businesses'],
                ['180K', 'Posts generated'],
                ['94%', 'Retention'],
              ].map(([v, l]) => (
                <div key={l as string} className="border-l border-hairline pl-3">
                  <p className="font-display text-xl font-light text-ink">{v}</p>
                  <p className="mt-0.5 mono-label">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
          </div>
        </div>

        {/* Right: auth card */}
        <div className="flex items-center justify-center p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md"
          >
            <GlassPanel variant="strong" className="p-8">
              <Link href="/" className="flex items-center gap-3">
                <InfluenceFlowLogo className="text-base" />
              </Link>

              <h2 className="mt-8 font-display text-3xl font-light text-ink">Sign Up</h2>
              <p className="mt-2 text-sm text-ink-secondary">
                Already have an account?{' '}
                <Link href="/signup" className="text-warm-bright hover:text-warm">
                  Sign in
                </Link>
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating account…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Create account
                    </>
                  )}
                </Button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-hairline" />
                <span className="mono-label">Or continue with</span>
                <span className="h-px flex-1 bg-hairline" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" type="button" onClick={() => handleOAuth('Google')}>
                  Google
                </Button>
                <Button variant="outline" type="button" onClick={() => handleOAuth('Apple')}>
                  Apple
                </Button>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
