'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  RefreshCw,
  Edit,
  CalendarPlus,
  Loader2,
  Check,
  Hash,
  Clock,
  Heart,
  MessageCircle,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { GlassPanel, RouteHeader, TrustBadge } from '@/components/shell';
import { useAppStore } from '@/lib/store';
import { delay } from '@/lib/utils';
import { toast } from '@/components/ui/toaster';
import { SAMPLE_POSTS } from '@/lib/mockData';

const CAMPAIGN_TYPES = ['Product launch', 'Promotion', 'Event', 'Brand story', 'Behind the scenes', 'Community spotlight'];
const TONES = ['Casual', 'Professional', 'Playful', 'Luxury', 'Bold', 'Warm'];
const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', glyph: 'IG' },
  { id: 'tiktok', name: 'TikTok', glyph: 'TT' },
  { id: 'facebook', name: 'Facebook', glyph: 'FB' },
  { id: 'google', name: 'Google Business', glyph: 'GB' },
];

const SAMPLE_OUTPUT = {
  caption:
    "Slow Sundays call for Lavender Lattes.\n\nEach cup is hand-crafted with house-made lavender syrup, oat milk steamed to silk, and a sprinkle of edible petals. Made for the moments you choose yourself.\n\nAvailable all weekend. Tag a friend who needs this.",
  hashtags: ['#BrewAndBloom', '#LavenderLatte', '#AustinCoffee', '#LocalCoffeeShop', '#SlowSunday', '#CoffeeArt', '#ATXEats'],
  bestTime: 'Sun · 10:30 AM CST',
  metrics: { reach: '4.2K', engagement: '8.3%', conversion: '3.1x' },
  imageUrl: 'https://images.unsplash.com/photo-1502462041640-b3d7e50d0662?w=800&q=80',
};

export default function GeneratorPage() {
  const { addScheduledPost, addGeneratedPost } = useAppStore();
  const [campaignType, setCampaignType] = useState('Product launch');
  const [tone, setTone] = useState('Casual');
  const [platform, setPlatform] = useState('instagram');
  const [cta, setCta] = useState('Try it this weekend');
  const [details, setDetails] = useState(
    'Limited-edition Lavender Latte launching Friday — house-made lavender syrup, oat milk, edible flower garnish.',
  );
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<typeof SAMPLE_OUTPUT | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setOutput(null);
    await delay(2200);
    setOutput(SAMPLE_OUTPUT);
    setLoading(false);
    toast({ variant: 'success', title: 'Content generated', description: 'Review the draft and approve to schedule.' });
  };

  const handleSchedule = () => {
    addScheduledPost({
      id: Date.now().toString(),
      title: `${campaignType} · ${tone}`,
      platform,
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '10:30 AM',
      status: 'scheduled',
      caption: output?.caption.split('\n')[0] || '',
      type: campaignType,
    });
    addGeneratedPost(SAMPLE_POSTS[0]);
    toast({ variant: 'success', title: 'Post scheduled', description: 'Queued for the optimal time window.' });
    setOutput(null);
  };

  return (
    <div className="space-y-6">
      <RouteHeader
        pillar="Intelligence · 02"
        title={
          <>
            AI <span className="italic text-cool-bright">Content Generator</span>
          </>
        }
        description="Describe the campaign — Bloom writes the caption, picks hashtags, and finds the optimal time."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Brief */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
          <GlassPanel className="p-6">
            <div className="flex items-center gap-2">
              <span className="mono-label">Brief</span>
            </div>
            <h3 className="mt-1 font-display text-xl font-light text-ink">Tell us about the campaign</h3>

            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label>Campaign type</Label>
                <div className="flex flex-wrap gap-2">
                  {CAMPAIGN_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setCampaignType(t)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                        campaignType === t
                          ? 'border-warm/50 bg-warm/15 text-warm-bright'
                          : 'border-hairline bg-white/[0.025] text-ink-secondary hover:border-warm/30 hover:text-ink'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tone</Label>
                <div className="flex flex-wrap gap-2">
                  {TONES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                        tone === t
                          ? 'border-cool/50 bg-cool/15 text-cool-bright'
                          : 'border-hairline bg-white/[0.025] text-ink-secondary hover:border-cool/30 hover:text-ink'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Platform</Label>
                <div className="grid grid-cols-2 gap-2">
                  {PLATFORMS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPlatform(p.id)}
                      className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition ${
                        platform === p.id
                          ? 'border-warm/40 bg-warm/10 text-ink'
                          : 'border-hairline bg-white/[0.025] text-ink-secondary hover:border-warm/20'
                      }`}
                    >
                      <span className="font-mono text-[10px] tracking-widest text-ink-muted">{p.glyph}</span>
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cta">Call to action</Label>
                <Input id="cta" value={cta} onChange={(e) => setCta(e.target.value)} placeholder="Visit our shop…" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Offer details</Label>
                <Textarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} rows={4} />
              </div>

              <Button size="lg" className="w-full" onClick={handleGenerate} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Output */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GlassPanel className="flex flex-col items-center justify-center p-16">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-hairline bg-white/[0.04]"
                  >
                    <Sparkles className="h-6 w-6 text-warm-bright" />
                  </motion.div>
                  <p className="mt-6 font-display text-xl font-light text-ink">Crafting your content…</p>
                  <div className="mt-4 space-y-2 text-sm text-ink-secondary">
                    {['Analyzing brand voice', 'Drafting caption', 'Selecting hashtags', 'Calculating optimal time'].map((step, i) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.4 }}
                        className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest"
                      >
                        <Loader2 className="h-3 w-3 animate-spin text-cool-bright" />
                        {step}
                      </motion.div>
                    ))}
                  </div>
                </GlassPanel>
              </motion.div>
            )}

            {!loading && !output && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <GlassPanel className="flex flex-col items-center justify-center p-16 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-hairline bg-white/[0.04]">
                    <Sparkles className="h-6 w-6 text-cool-bright" />
                  </div>
                  <p className="mt-6 font-display text-xl font-light text-ink">Ready to create</p>
                  <p className="mt-2 max-w-sm text-sm text-ink-secondary">
                    Fill in your brief and we&apos;ll generate platform-optimized content with the best posting time.
                  </p>
                </GlassPanel>
              </motion.div>
            )}

            {output && !loading && (
              <motion.div key="output" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <GlassPanel className="overflow-hidden p-6">
                  <div className="flex items-center justify-between">
                    <TrustBadge tone="trust">
                      <Check className="h-3 w-3" />
                      Generated
                    </TrustBadge>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                      <Clock className="h-3 w-3" />
                      Best time:{' '}
                      <span className="text-cool-bright">{output.bestTime}</span>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <div>
                      <div className="aspect-square overflow-hidden rounded-xl border border-hairline">
                        <img src={output.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                      </div>
                      <div className="mt-3 flex items-center justify-between rounded-xl border border-hairline bg-white/[0.025] p-3">
                        <div className="flex items-center gap-3">
                          <Heart className="h-4 w-4 text-warm-bright" />
                          <MessageCircle className="h-4 w-4 text-ink-muted" />
                          <Send className="h-4 w-4 text-ink-muted" />
                        </div>
                        <span className="mono-label">Preview</span>
                      </div>
                    </div>

                    <div>
                      <p className="mono-label">Caption</p>
                      <p className="mt-3 whitespace-pre-line font-display text-base font-light leading-relaxed text-ink">
                        {output.caption}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl border border-cool/30 bg-cool/[0.06] p-4">
                    <div className="flex items-center gap-2">
                      <Hash className="h-3.5 w-3.5 text-cool-bright" />
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cool-bright">Hashtags</p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {output.hashtags.map((h) => (
                        <span
                          key={h}
                          className="rounded-full border border-hairline bg-white/[0.04] px-2.5 py-1 text-xs text-ink"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      { lbl: 'Predicted reach', val: output.metrics.reach },
                      { lbl: 'Engagement', val: output.metrics.engagement },
                      { lbl: 'ROI estimate', val: output.metrics.conversion },
                    ].map((m) => (
                      <div key={m.lbl} className="rounded-xl border border-hairline bg-white/[0.025] p-3 text-center">
                        <p className="font-mono text-[9px] uppercase tracking-widest text-ink-muted">{m.lbl}</p>
                        <p className="mt-1 font-display text-xl font-light text-ink">{m.val}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Button variant="outline" onClick={handleGenerate}>
                      <RefreshCw className="h-4 w-4" />
                      Regenerate
                    </Button>
                    <Button variant="outline">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button className="ml-auto" onClick={handleSchedule}>
                      <CalendarPlus className="h-4 w-4" />
                      Approve & Schedule
                    </Button>
                  </div>
                </GlassPanel>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
