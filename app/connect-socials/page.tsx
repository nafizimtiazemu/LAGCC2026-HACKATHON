'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, Music2, MapPin, Check, Loader2, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { GlassPanel, TrustBadge } from '@/components/shell';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { delay } from '@/lib/utils';
import { toast } from '@/components/ui/toaster';
import { NeighborhoodBackground } from '@/components/neighborhood';

const SOCIALS = [
  { id: 'instagram', name: 'Instagram', handle: '@brewandbloom', description: 'Visual storytelling for your café aesthetic', icon: Instagram },
  { id: 'facebook', name: 'Facebook', handle: 'Brew & Bloom Café', description: 'Reach local community & event attendees', icon: Facebook },
  { id: 'tiktok', name: 'TikTok', handle: '@brewbloomatx', description: 'Short-form video for Gen Z customers', icon: Music2 },
  { id: 'google', name: 'Google Business', handle: 'brewandbloom.co', description: 'Show up in local searches & maps', icon: MapPin },
];

const SETUP_TASKS = [
  'Logo synced to all platforms',
  'AI bio generated and optimized',
  'Posting calendar initialized',
  'Smart scheduling enabled',
  'Brand voice synced across channels',
];

export default function ConnectSocialsPage() {
  const router = useRouter();
  const { connectedSocials, toggleSocial } = useAppStore();
  const [loading, setLoading] = useState<string | null>(null);

  const handleConnect = async (id: string, name: string) => {
    if (connectedSocials.includes(id)) {
      toggleSocial(id);
      toast({ variant: 'info', title: 'Disconnected', description: name + ' unlinked.' });
      return;
    }
    setLoading(id);
    await delay(1400);
    toggleSocial(id);
    setLoading(null);
    toast({ variant: 'success', title: name + ' connected', description: 'AI is syncing your brand assets.' });
  };

  const hasConnected = connectedSocials.length > 0;

  return (
    <main className="relative min-h-screen overflow-hidden bg-canvas">
      <div className="pointer-events-none absolute inset-0">
        <NeighborhoodBackground mode="ambient" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-24">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
          <span className="mono-label">Step 6 · channels</span>
          <h1 className="mt-6 font-display text-4xl font-light leading-tight tracking-tight text-ink md:text-5xl">
            Connect your <em className="italic text-warm-bright">channels.</em>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-ink-secondary md:text-lg">
            Link your accounts so LocalBoost can post, schedule, and analyze on your behalf. All actions are simulated for this demo.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {SOCIALS.map((social, i) => {
            const Icon = social.icon;
            const isConnected = connectedSocials.includes(social.id);
            const isLoading = loading === social.id;

            return (
              <motion.div
                key={social.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <GlassPanel className={'p-6 transition ' + (isConnected ? 'border-trust/40' : '')}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-hairline bg-white/[0.04]">
                        <Icon className="h-5 w-5 text-ink-secondary" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-light text-ink">{social.name}</h3>
                        <p className="font-mono text-[11px] text-ink-muted">{social.handle}</p>
                      </div>
                    </div>
                    {isConnected && (
                      <TrustBadge tone="trust">
                        <Check className="h-3 w-3" />
                        Simulated
                      </TrustBadge>
                    )}
                  </div>

                  <p className="mt-4 text-sm text-ink-secondary">{social.description}</p>

                  <div className="mt-6">
                    <Button
                      variant={isConnected ? 'outline' : 'default'}
                      className="w-full"
                      disabled={isLoading}
                      onClick={() => handleConnect(social.id, social.name)}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Connecting…
                        </>
                      ) : isConnected ? (
                        'Disconnect'
                      ) : (
                        <>
                          Connect {social.name}
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {hasConnected && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-12"
            >
              <GlassPanel className="overflow-hidden p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-warm/[0.06] via-canvas to-cool/[0.06]" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-hairline bg-white/[0.04]">
                      <Sparkles className="h-4 w-4 text-warm-bright" />
                    </div>
                    <div>
                      <p className="mono-label">Setup checklist</p>
                      <h3 className="mt-1 font-display text-xl font-light text-ink">AI is preparing your account</h3>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2">
                    {SETUP_TASKS.map((task, i) => (
                      <motion.li
                        key={task}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.12 + 0.2 }}
                        className="flex items-center gap-3 rounded-xl border border-hairline bg-white/[0.025] p-3"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.12 + 0.4, type: 'spring', stiffness: 200 }}
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-trust/40 bg-trust/15"
                        >
                          <Check className="h-3 w-3 text-trust" strokeWidth={3} />
                        </motion.div>
                        <span className="text-sm text-ink">{task}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                      <Shield className="h-3.5 w-3.5" />
                      Encrypted · never shared
                    </div>
                    <Button size="lg" onClick={() => router.push('/dashboard')}>
                      Continue to dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
