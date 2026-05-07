'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, Volume2, Users, Calendar, Lightbulb, ArrowRight, MapPin, Clock } from 'lucide-react';
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NeighborhoodBackground } from '@/components/neighborhood';
import { POST_TIMES, MOCK_BUSINESS } from '@/lib/mockData';
import { useAppStore } from '@/lib/store';

const VOICE_TAGS = ['Warm', 'Grounded', 'Craft-driven', 'Conversational', 'Local-first'];

const AUDIENCE = [
  { label: 'Morning regulars', share: 38, note: 'commuters, freelancers, students' },
  { label: 'Brunch crowd', share: 28, note: 'weekend social outings' },
  { label: 'Afternoon sit-downs', share: 22, note: 'remote workers' },
  { label: 'Evening events', share: 12, note: 'dates, open mic, study sessions' },
];

const STRATEGY = [
  { title: 'Lead with sensory storytelling', body: 'Texture, steam, light. Coffee shop content lives in mood, not specs.' },
  { title: 'Front-load Friday and Sunday', body: '38% engagement spike. Reels outperform stills 3.4x.' },
  { title: 'Showcase the people behind the bar', body: 'Your team is the brand. Repeat customers come back for who, not what.' },
];

const CAMPAIGNS = [
  { name: 'Lavender Latte Drop', body: 'Limited-edition launch + reel + 10% off first 50.', impact: 'Reach 4.2K · ROI 3.1x', icon: '☕' },
  { name: 'Cookie Sundays', body: 'Brown-butter miso cookies. Behind-the-bake Story.', impact: 'Reach 2.8K · ROI 2.4x', icon: '🍪' },
  { name: 'Open Mic Tuesdays', body: 'Local musicians + free sample drink. UT student crossover.', impact: 'Reach 5.1K · ROI 4.0x', icon: '🎶' },
];

export default function BrandProfilePage() {
  const router = useRouter();
  const { onboarding } = useAppStore();
  const businessName = onboarding.businessName || MOCK_BUSINESS.name;
  const location = onboarding.location || MOCK_BUSINESS.location;

  return (
    <main className="relative min-h-screen overflow-hidden bg-canvas pb-32">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <NeighborhoodBackground mode="ambient" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cool-bright" />
            <p className="mono-label !text-cool-bright">Generated · just now</p>
          </div>
          <h1 className="mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight text-ink md:text-6xl">
            Your brand,
            <br />
            <em className="italic text-warm-bright">mapped.</em>
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="mt-10 p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-warm via-warm-bright to-cool font-display text-3xl font-light text-canvas shadow-lg">
                B&amp;B
              </div>
              <div>
                <h2 className="font-display text-2xl font-light text-ink md:text-3xl">{businessName}</h2>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-ink-secondary">
                  <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{location}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" />Daily 7 AM – 9 PM</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {VOICE_TAGS.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
                </div>
              </div>
              <Button onClick={() => router.push('/packages')}>Continue to plans<ArrowRight className="h-4 w-4" /></Button>
            </div>
          </Card>
        </motion.div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <ProfileCard pillar="Vision" title="Brand voice" icon={<Volume2 className="h-4 w-4 text-warm-bright" />} delay={0.2}>
            <p className="text-sm leading-relaxed text-ink-secondary">
              {businessName} speaks with warmth and craft. Sentences are short. Imagery does the work — coffee
              steam, morning light, hands working. Avoid corporate language. Lean into seasons, neighbors, and small rituals.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {VOICE_TAGS.map((t) => (
                <span key={t} className="rounded-full border border-warm/30 bg-warm/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-warm-bright">
                  {t}
                </span>
              ))}
            </div>
          </ProfileCard>

          <ProfileCard pillar="Vision" title="Audience" icon={<Users className="h-4 w-4 text-cool-bright" />} delay={0.25}>
            <ul className="space-y-3">
              {AUDIENCE.map((a) => (
                <li key={a.label}>
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-sm text-ink">{a.label}</p>
                    <p className="font-display text-base font-light text-warm-bright">{a.share}%</p>
                  </div>
                  <p className="text-[11px] text-ink-muted">{a.note}</p>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                    <motion.div initial={{ width: 0 }} animate={{ width: (a.share * 2.5) + '%' }} transition={{ duration: 0.9 }} className="h-full rounded-full bg-gradient-to-r from-warm to-warm-bright" />
                  </div>
                </li>
              ))}
            </ul>
          </ProfileCard>

          <ProfileCard pillar="Intelligence" title="Content strategy" icon={<Lightbulb className="h-4 w-4 text-cool-bright" />} delay={0.3}>
            <ul className="space-y-3">
              {STRATEGY.map((s) => (
                <li key={s.title} className="rounded-xl border border-hairline bg-white/[0.025] p-3">
                  <p className="text-sm font-medium text-ink">{s.title}</p>
                  <p className="mt-1 text-[12px] text-ink-secondary">{s.body}</p>
                </li>
              ))}
            </ul>
          </ProfileCard>

          <ProfileCard pillar="Insight" title="Recommended posting times" icon={<Calendar className="h-4 w-4 text-warm-bright" />} delay={0.35}>
            <p className="text-sm text-ink-secondary">Engagement score by day. Friday and Sunday are your strongest.</p>
            <div className="mt-4 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={POST_TIMES}>
                  <XAxis dataKey="day" stroke="#758197" fontSize={10} tickLine={false} axisLine={false} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {POST_TIMES.map((entry: any, i) => (
                      <Cell key={i} fill={entry.value > 80 ? '#E89368' : 'rgba(255,255,255,0.12)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ProfileCard>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6">
          <Card className="p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="mono-label">Reach · suggested</p>
                <h3 className="mt-2 font-display text-xl font-light text-ink">Three campaigns to run first</h3>
              </div>
              <Sparkles className="h-5 w-5 text-warm-bright" />
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {CAMPAIGNS.map((c) => (
                <div key={c.name} className="rounded-xl border border-hairline bg-white/[0.025] p-5">
                  <div className="flex items-start justify-between">
                    <span className="text-2xl">{c.icon}</span>
                    <Badge variant="success">{c.impact.split(' · ')[1]}</Badge>
                  </div>
                  <p className="mt-4 font-display text-base font-light text-ink">{c.name}</p>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink-secondary">{c.body}</p>
                  <p className="mt-3 mono-label">{c.impact}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-hairline bg-canvas/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <p className="text-sm text-ink-secondary">Profile saved. Pick a plan to unlock content generation.</p>
          <Button onClick={() => router.push('/packages')}>View plans<ArrowRight className="h-4 w-4" /></Button>
        </div>
      </div>
    </main>
  );
}

function ProfileCard({ pillar, title, icon, delay = 0, children }: { pillar: string; title: string; icon: React.ReactNode; delay?: number; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <Card className="h-full p-6">
        <div className="flex items-center justify-between">
          <p className="mono-label">{pillar}</p>
          {icon}
        </div>
        <h3 className="mt-3 font-display text-xl font-light text-ink">{title}</h3>
        <div className="mt-4">{children}</div>
      </Card>
    </motion.div>
  );
}
