'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Crown, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { GlassPanel, TrustBadge } from '@/components/shell';
import { NeighborhoodBackground } from '@/components/neighborhood';
import { useAppStore } from '@/lib/store';
import { PACKAGES } from '@/lib/mockData';
import { toast } from '@/components/ui/toaster';

const ICONS = { Starter: Sparkles, Growth: Zap, Premium: Crown };

export default function PackagesPage() {
  const router = useRouter();
  const { setPackage } = useAppStore();
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSelect = (id: string) => {
    setSelected(id);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (!selected) return;
    setPackage(selected);
    toast({
      variant: 'success',
      title: 'Plan activated',
      description: `${PACKAGES.find((p) => p.id === selected)?.name} plan is live. Let's connect your channels.`,
    });
    setConfirmOpen(false);
    setTimeout(() => router.push('/connect-socials'), 400);
  };

  const selectedPkg = PACKAGES.find((p) => p.id === selected);

  return (
    <main className="relative min-h-screen overflow-hidden bg-canvas">
      <NeighborhoodBackground mode="hero" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
          <span className="mono-label">Plan · Choose</span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-light leading-[0.95] tracking-tight text-ink md:text-7xl">
            Pricing built for <em className="italic text-warm-bright">growing</em> local businesses
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-secondary md:text-lg">
            Pick the plan that fits your stage. Upgrade or downgrade anytime as your business grows.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PACKAGES.map((pkg, i) => {
            const Icon = ICONS[pkg.name as keyof typeof ICONS];
            const isPopular = pkg.popular;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                onHoverStart={() => setHovered(pkg.id)}
                onHoverEnd={() => setHovered(null)}
                className="relative"
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                    <TrustBadge tone="warm">★ Most popular</TrustBadge>
                  </div>
                )}

                <motion.div
                  animate={{
                    y: hovered === pkg.id ? -6 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <GlassPanel
                    variant={isPopular ? 'strong' : 'default'}
                    className={`relative h-full overflow-hidden p-8 ${
                      isPopular ? 'ring-1 ring-warm/30' : ''
                    }`}
                  >
                    {isPopular && (
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-warm/12 via-warm/5 to-transparent" />
                    )}

                    <div className="relative">
                      <div className="mb-6 flex items-center gap-3">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-white/[0.04]`}>
                          <Icon className={`h-5 w-5 ${isPopular ? 'text-warm-bright' : 'text-ink-secondary'}`} />
                        </div>
                        <h3 className="font-display text-2xl font-light text-ink">{pkg.name}</h3>
                      </div>

                      <p className="mb-6 text-sm text-ink-secondary leading-relaxed">{pkg.tagline}</p>

                      <div className="mb-8 flex items-baseline gap-2">
                        <span className="font-display text-5xl font-light text-ink">${pkg.price}</span>
                        <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">/month</span>
                      </div>

                      <ul className="mb-8 space-y-2.5">
                        {pkg.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-sm text-ink-secondary">
                            <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-trust/15">
                              <Check className="h-2.5 w-2.5 text-trust" strokeWidth={3} />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        variant={isPopular ? 'default' : 'outline'}
                        size="lg"
                        className="w-full"
                        onClick={() => handleSelect(pkg.id)}
                      >
                        Select {pkg.name}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </GlassPanel>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-16 text-center">
          <p className="mono-label">Cancel anytime · 14-day money-back · No hidden fees</p>
        </motion.div>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-md">
          {selectedPkg && (
            <>
              <button
                onClick={() => setConfirmOpen(false)}
                className="absolute right-4 top-4 rounded-full border border-hairline bg-white/[0.04] p-2 text-ink-secondary transition hover:bg-white/[0.08]"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-warm/30 bg-warm/10"
                >
                  <Sparkles className="h-7 w-7 text-warm-bright" />
                </motion.div>
                <h3 className="font-display text-2xl font-light text-ink">Confirm {selectedPkg.name}</h3>
                <p className="mt-2 text-sm text-ink-secondary">
                  Activate the <span className="text-ink">{selectedPkg.name}</span> plan for{' '}
                  <span className="text-warm-bright">${selectedPkg.price}/month</span>.
                </p>
                <div className="mt-6 rounded-xl border border-hairline bg-white/[0.025] p-4 text-left">
                  <p className="mono-label">What&apos;s included</p>
                  <ul className="mt-2 space-y-1.5">
                    {selectedPkg.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-ink-secondary">
                        <Check className="h-3.5 w-3.5 text-warm-bright" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setConfirmOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={handleConfirm}>
                    Activate plan
                  </Button>
                </div>
                <p className="mt-4 mono-label">Demo mode · No charges will be made</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
