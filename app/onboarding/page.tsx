'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles, MapPin, Clock, Palette, Users, Target, Check, Building2, Image as ImageIcon } from 'lucide-react';
import { GlassPanel } from '@/components/shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useAppStore } from '@/lib/store';
import { delay } from '@/lib/utils';
import { toast } from '@/components/ui/toaster';
import { NeighborhoodBackground } from '@/components/neighborhood';

const STEPS = [
  { id: 'business', label: 'Business', icon: Building2 },
  { id: 'brand', label: 'Brand', icon: Palette },
  { id: 'assets', label: 'Assets', icon: ImageIcon },
  { id: 'audience', label: 'Audience', icon: Users },
  { id: 'goals', label: 'Goals', icon: Target },
];

const TONES = ['Professional', 'Casual', 'Luxury', 'Playful', 'Bold', 'Warm'];
const AUDIENCE_AGES = ['18–24', '25–34', '35–44', '45–54', '55+'];
const GOAL_OPTIONS = ['Foot traffic', 'Online orders', 'Email signups', 'Brand awareness', 'Repeat visits', 'New customers'];
const SAMPLE_ASSETS = [
  { id: 'a1', name: 'storefront.jpg', size: '2.4 MB' },
  { id: 'a2', name: 'menu-board.jpg', size: '1.8 MB' },
  { id: 'a3', name: 'lavender-latte.jpg', size: '3.1 MB' },
  { id: 'a4', name: 'team-photo.jpg', size: '2.2 MB' },
];

const STAGES = [
  { label: 'Analyzing brand inputs', detail: 'Tone · audience · positioning' },
  { label: 'Building business profile', detail: 'Mapping you into the network' },
  { label: 'Generating creative direction', detail: 'Posting times · campaign hooks' },
  { label: 'Optimizing for local context', detail: 'Austin-specific signal patterns' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { onboarding, setOnboarding } = useAppStore();
  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [stage, setStage] = useState(0);

  const update = (k: string, v: any) => setOnboarding({ ...onboarding, [k]: v });
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleFinish = async () => {
    setGenerating(true);
    for (let i = 0; i < STAGES.length; i++) {
      setStage(i);
      await delay(900);
    }
    toast({ variant: 'success', title: 'Brand profile ready', description: 'Bloom learned your business.' });
    router.push('/brand-profile');
  };

  const progress = ((step + 1) / STEPS.length) * 100;
  const goalsList: string[] = onboarding.goals || [];
  const assetsList: string[] = ((onboarding.uploadedAssets as unknown) as string[]) || [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-canvas">
      <div className="pointer-events-none absolute inset-0">
        <NeighborhoodBackground mode="ambient" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-20">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <span className="mono-label">Step 02 · Onboarding</span>
          <h1 className="mt-4 font-display text-4xl font-light tracking-tight text-ink md:text-5xl">
            Let&apos;s map your <em className="italic text-warm-bright">business.</em>
          </h1>
          <p className="mt-3 text-sm text-ink-secondary">Five short questions. We&apos;ll do the rest.</p>
        </motion.div>

        <div className="mt-10 mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const active = i === step;
              const done = i < step;
              return (
                <div key={s.id} className="flex flex-1 items-center gap-2">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
                      active
                        ? 'border-warm/50 bg-warm/15 text-warm-bright'
                        : done
                        ? 'border-trust/40 bg-trust/10 text-trust'
                        : 'border-hairline bg-white/[0.025] text-ink-muted'
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <span
                    className={`hidden font-mono text-[10px] uppercase tracking-widest md:inline ${active ? 'text-ink' : 'text-ink-muted'}`}
                  >
                    {s.label}
                  </span>
                  {i < STEPS.length - 1 && <div className="h-px flex-1 bg-hairline" />}
                </div>
              );
            })}
          </div>
          <div className="mt-3 h-px overflow-hidden bg-white/[0.04]">
            <motion.div className="h-full bg-gradient-to-r from-warm to-warm-bright" animate={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <GlassPanel className="p-8">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="business" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                  <p className="mono-label">01 · Business basics</p>
                  <h2 className="mt-2 font-display text-2xl font-light text-ink">Tell us about your storefront</h2>

                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label>Business name</Label>
                      <Input value={onboarding.businessName} onChange={(e) => update('businessName', e.target.value)} placeholder="Brew & Bloom Café" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Input value={onboarding.category} onChange={(e) => update('category', e.target.value)} placeholder="Café · Coffee · Bakery" />
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input value={onboarding.location} onChange={(e) => update('location', e.target.value)} placeholder="Austin, TX" />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Hours</Label>
                        <Input value={onboarding.hours} onChange={(e) => update('hours', e.target.value)} placeholder="Mon–Sun 7 AM – 9 PM" />
                      </div>
                      <div className="space-y-2">
                        <Label>Peak hours</Label>
                        <Input value={onboarding.peakHours} onChange={(e) => update('peakHours', e.target.value)} placeholder="8–10 AM · 2–4 PM" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="brand" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                  <p className="mono-label">02 · Brand</p>
                  <h2 className="mt-2 font-display text-2xl font-light text-ink">How does your brand sound?</h2>

                  <div className="mt-6 space-y-5">
                    <div className="space-y-2">
                      <Label>Brand colors (hex)</Label>
                      <Input
                        value={Array.isArray(onboarding.brandColors) ? onboarding.brandColors.join(' · ') : (onboarding.brandColors as string) || ''}
                        onChange={(e) => update('brandColors', e.target.value.split(/\s*·\s*|\s*,\s*/).filter(Boolean))}
                        placeholder="#C56F44 · #4CCBC7 · #B7E46E"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Tone</Label>
                      <div className="flex flex-wrap gap-1.5">
                        {TONES.map((t) => (
                          <button
                            key={t}
                            onClick={() => update('tone', t)}
                            className={`rounded-full border px-3 py-1.5 text-xs transition ${
                              onboarding.tone === t
                                ? 'border-warm/40 bg-warm/15 text-warm-bright'
                                : 'border-hairline bg-white/[0.025] text-ink-secondary hover:bg-white/[0.04]'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="assets" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                  <p className="mono-label">03 · Assets</p>
                  <h2 className="mt-2 font-display text-2xl font-light text-ink">Upload a few photos</h2>
                  <p className="mt-1 text-sm text-ink-secondary">Use these sample assets for the demo, or drag your own.</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {SAMPLE_ASSETS.map((a) => {
                      const added = assetsList.includes(a.id);
                      return (
                        <button
                          key={a.id}
                          onClick={() => {
                            update('uploadedAssets', added ? assetsList.filter((x) => x !== a.id) : [...assetsList, a.id]);
                          }}
                          className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                            added ? 'border-trust/40 bg-trust/10' : 'border-hairline bg-white/[0.025] hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-warm/30 via-warm/15 to-cool/15">
                            <ImageIcon className="h-4 w-4 text-ink" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-sm text-ink">{a.name}</p>
                            <p className="font-mono text-[10px] text-ink-muted">{a.size}</p>
                          </div>
                          {added ? <Check className="h-4 w-4 text-trust" /> : <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">Add</span>}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="audience" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                  <p className="mono-label">04 · Audience</p>
                  <h2 className="mt-2 font-display text-2xl font-light text-ink">Who do you serve?</h2>

                  <div className="mt-6 space-y-5">
                    <div className="space-y-2">
                      <Label>Primary age range</Label>
                      <div className="flex flex-wrap gap-1.5">
                        {AUDIENCE_AGES.map((a) => (
                          <button
                            key={a}
                            onClick={() => update('audienceAge', a)}
                            className={`rounded-full border px-3 py-1.5 text-xs transition ${
                              onboarding.audienceAge === a
                                ? 'border-cool/40 bg-cool/12 text-cool-bright'
                                : 'border-hairline bg-white/[0.025] text-ink-secondary hover:bg-white/[0.04]'
                            }`}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Audience interests</Label>
                      <Input value={onboarding.interests} onChange={(e) => update('interests', e.target.value)} placeholder="specialty coffee · slow living · local art" />
                    </div>
                    <div className="space-y-2">
                      <Label>Audience type</Label>
                      <Input value={onboarding.audienceType} onChange={(e) => update('audienceType', e.target.value)} placeholder="remote workers, students, creatives" />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="goals" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                  <p className="mono-label">05 · Goals</p>
                  <h2 className="mt-2 font-display text-2xl font-light text-ink">What does success look like?</h2>

                  <div className="mt-6 space-y-5">
                    <div className="space-y-2">
                      <Label>Top goals (pick a few)</Label>
                      <div className="flex flex-wrap gap-1.5">
                        {GOAL_OPTIONS.map((g) => {
                          const active = goalsList.includes(g);
                          return (
                            <button
                              key={g}
                              onClick={() => update('goals', active ? goalsList.filter((x) => x !== g) : [...goalsList, g])}
                              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                                active ? 'border-warm/40 bg-warm/15 text-warm-bright' : 'border-hairline bg-white/[0.025] text-ink-secondary hover:bg-white/[0.04]'
                              }`}
                            >
                              {g}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Monthly marketing budget</Label>
                        <span className="font-display text-base font-light text-ink">${onboarding.budget || 850}</span>
                      </div>
                      <Slider defaultValue={[onboarding.budget || 850]} min={100} max={5000} step={50} onValueChange={(v) => update('budget', v[0])} />
                      <div className="flex justify-between font-mono text-[10px] text-ink-muted">
                        <span>$100</span>
                        <span>$5,000</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between">
              <Button variant="ghost" onClick={prev} disabled={step === 0}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={next}>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleFinish} disabled={generating}>
                  <Sparkles className="h-4 w-4" />
                  Generate AI brand profile
                </Button>
              )}
            </div>
          </GlassPanel>

          <GlassPanel variant="subtle" className="h-fit p-6 lg:sticky lg:top-8">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-cool-bright" />
              <p className="mono-label !text-cool-bright">Live preview</p>
            </div>
            <h3 className="mt-3 font-display text-xl font-light text-ink">{onboarding.businessName || 'Your business'}</h3>
            <p className="mt-1 font-mono text-[11px] text-ink-muted">{onboarding.category || 'Category not set'}</p>

            <div className="mt-5 space-y-3 text-sm">
              {onboarding.location && (
                <div className="flex items-start gap-2 text-ink-secondary">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  <span>{onboarding.location}</span>
                </div>
              )}
              {onboarding.hours && (
                <div className="flex items-start gap-2 text-ink-secondary">
                  <Clock className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  <span>{onboarding.hours}</span>
                </div>
              )}
              {onboarding.tone && (
                <div className="flex items-start gap-2 text-ink-secondary">
                  <Palette className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  <span>{onboarding.tone} tone</span>
                </div>
              )}
              {onboarding.audienceAge && (
                <div className="flex items-start gap-2 text-ink-secondary">
                  <Users className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  <span>Ages {onboarding.audienceAge}</span>
                </div>
              )}
              {goalsList.length > 0 && (
                <div className="flex items-start gap-2 text-ink-secondary">
                  <Target className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  <span>{goalsList.join(', ')}</span>
                </div>
              )}
            </div>

            {assetsList.length > 0 && (
              <div className="mt-5">
                <p className="mono-label">Assets · {assetsList.length}</p>
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {assetsList.map((id) => (
                    <div key={id} className="aspect-square rounded-md bg-gradient-to-br from-warm/30 via-warm/15 to-cool/15" />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 rounded-xl border border-hairline bg-white/[0.025] p-3">
              <p className="mono-label !text-warm-bright">AI confidence</p>
              <p className="mt-2 font-display text-2xl font-light text-ink">{Math.min(100, 30 + step * 18)}%</p>
              <p className="mt-1 text-xs text-ink-muted">We&apos;re learning. Each answer sharpens the profile.</p>
            </div>
          </GlassPanel>
        </div>
      </div>

      <AnimatePresence>
        {generating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas/95 backdrop-blur-md">
            <div className="text-center">
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute h-full w-full rounded-full border border-warm/30"
                    animate={{ scale: [0.5, 1.6], opacity: [0.6, 0] }}
                    transition={{ duration: 2.4, delay: i * 0.6, repeat: Infinity, ease: 'easeOut' }}
                  />
                ))}
                <Sparkles className="h-7 w-7 text-warm-bright" />
              </div>
              <p className="mt-8 font-display text-2xl font-light text-ink">{STAGES[stage]?.label}</p>
              <p className="mt-2 mono-label">{STAGES[stage]?.detail}</p>
              <div className="mx-auto mt-8 h-px w-72 overflow-hidden bg-white/[0.06]">
                <motion.div className="h-full bg-gradient-to-r from-warm to-warm-bright" animate={{ width: `${((stage + 1) / STAGES.length) * 100}%` }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
