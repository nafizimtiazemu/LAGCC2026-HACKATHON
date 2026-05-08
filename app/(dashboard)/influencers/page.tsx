'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, Eye, X, MapPin, TrendingUp, Users as UsersIcon, Sparkles, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { GlassPanel, RouteHeader, TrustBadge } from '@/components/shell';
import { useAppStore } from '@/lib/store';
import { formatNumber } from '@/lib/utils';
import { toast } from '@/components/ui/toaster';

const NICHES = ['All', 'Food & Drink', 'Lifestyle', 'Local Austin', 'Wellness', 'Photography'];

export default function InfluencersPage() {
  const { influencers, toggleInfluencerSaved, contactInfluencer } = useAppStore();
  const [niche, setNiche] = useState('All');
  const [selected, setSelected] = useState<typeof influencers[number] | null>(null);

  const filtered = useMemo(() => {
    if (niche === 'All') return influencers;
    return influencers.filter((i) => i.niche === niche);
  }, [influencers, niche]);

  const handleContact = (id: string, name: string) => {
    contactInfluencer(id);
    toast({ variant: 'success', title: 'Collaboration sent', description: `Outreach drafted for ${name}.` });
  };

  return (
    <div className="space-y-6">
      <RouteHeader
        title={
          <>
            Creator <span className="italic text-warm-bright">Match Network</span>
          </>
        }
        description="Curated creators that match your brand voice and local Austin audience."
      />

      <GlassPanel className="p-4">
        <div className="flex items-center gap-3 overflow-x-auto">
          <Filter className="h-4 w-4 flex-shrink-0 text-ink-muted" />
          {NICHES.map((n) => (
            <button
              key={n}
              onClick={() => setNiche(n)}
              className={`flex-shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition ${
                niche === n
                  ? 'border-warm/50 bg-warm/15 text-warm-bright'
                  : 'border-hairline bg-white/[0.025] text-ink-secondary hover:border-warm/30'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </GlassPanel>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((inf, i) => (
          <motion.div
            key={inf.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -3 }}
          >
            <GlassPanel className="overflow-hidden p-0">
              {/* Top strip */}
              <div className="relative h-20 border-b border-hairline bg-gradient-to-br from-warm/10 via-warm/5 to-transparent">
                <button
                  onClick={() => toggleInfluencerSaved(inf.id)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-canvas/60 backdrop-blur-md transition hover:bg-canvas"
                >
                  <Heart className={`h-4 w-4 ${inf.saved ? 'fill-warm-bright text-warm-bright' : 'text-ink-secondary'}`} />
                </button>
                <div className="absolute left-3 top-3">
                  <TrustBadge tone="cool">
                    <Sparkles className="h-3 w-3" />
                    {inf.matchScore}% match
                  </TrustBadge>
                </div>
              </div>

              <div className="px-5 pb-5">
                <div className="-mt-9 mb-3">
                  <img src={inf.avatar} alt={inf.name} className="h-16 w-16 rounded-2xl border-4 border-canvas" />
                </div>

                <div>
                  <h3 className="font-display text-lg font-light text-ink">{inf.name}</h3>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">{inf.handle}</p>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-hairline bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-secondary">
                    {inf.niche}
                  </span>
                  <span className="flex items-center gap-1 rounded-full border border-hairline bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-secondary">
                    <MapPin className="h-2.5 w-2.5" />
                    {inf.location}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-hairline bg-white/[0.025] p-3 text-center">
                  <div>
                    <p className="mono-label">Reach</p>
                    <p className="mt-0.5 font-display text-sm font-light text-ink">{formatNumber(inf.followers)}</p>
                  </div>
                  <div className="border-x border-hairline">
                    <p className="mono-label">Engage</p>
                    <p className="mt-0.5 font-display text-sm font-light text-ink">{inf.engagement}%</p>
                  </div>
                  <div>
                    <p className="mono-label">Posts</p>
                    <p className="mt-0.5 font-display text-sm font-light text-ink">{inf.posts}</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    disabled={inf.contacted}
                    onClick={() => handleContact(inf.id, inf.name)}
                  >
                    <Send className="h-3.5 w-3.5" />
                    {inf.contacted ? 'Sent' : 'Collab'}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setSelected(inf)}>
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </Button>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 rounded-full border border-hairline bg-white/[0.04] p-2 text-ink-secondary transition hover:bg-white/[0.08]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-4">
                <img src={selected.avatar} alt={selected.name} className="h-16 w-16 rounded-2xl border-2 border-hairline" />
                <div className="flex-1">
                  <h3 className="font-display text-xl font-light text-ink">{selected.name}</h3>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">{selected.handle}</p>
                  <div className="mt-2 flex gap-2">
                    <TrustBadge tone="cool">{selected.matchScore}% match</TrustBadge>
                    <TrustBadge tone="muted">{selected.niche}</TrustBadge>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-ink-secondary">{selected.bio}</p>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-hairline bg-white/[0.025] p-3 text-center">
                  <UsersIcon className="mx-auto h-4 w-4 text-cool-bright" />
                  <p className="mt-1 mono-label">Followers</p>
                  <p className="font-display text-base font-light text-ink">{formatNumber(selected.followers)}</p>
                </div>
                <div className="rounded-xl border border-hairline bg-white/[0.025] p-3 text-center">
                  <TrendingUp className="mx-auto h-4 w-4 text-warm-bright" />
                  <p className="mt-1 mono-label">Engagement</p>
                  <p className="font-display text-base font-light text-ink">{selected.engagement}%</p>
                </div>
                <div className="rounded-xl border border-hairline bg-white/[0.025] p-3 text-center">
                  <Sparkles className="mx-auto h-4 w-4 text-trust" />
                  <p className="mt-1 mono-label">Avg posts</p>
                  <p className="font-display text-base font-light text-ink">{selected.posts}</p>
                </div>
              </div>

              <div className="mt-5">
                <p className="mono-label">Audience overlap</p>
                <div className="mt-3 space-y-2.5">
                  {selected.audienceMatch.map((a) => (
                    <div key={a.label} className="flex items-center gap-3">
                      <span className="w-32 flex-shrink-0 text-xs text-ink-secondary">{a.label}</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${a.value}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-warm to-warm-bright"
                        />
                      </div>
                      <span className="w-10 text-right font-mono text-[11px] text-ink">{a.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => toggleInfluencerSaved(selected.id)}>
                  <Heart className={`h-4 w-4 ${selected.saved ? 'fill-warm-bright text-warm-bright' : ''}`} />
                  {selected.saved ? 'Saved' : 'Save'}
                </Button>
                <Button
                  className="flex-1"
                  disabled={selected.contacted}
                  onClick={() => {
                    handleContact(selected.id, selected.name);
                    setSelected(null);
                  }}
                >
                  <Send className="h-4 w-4" />
                  {selected.contacted ? 'Already sent' : 'Send invite'}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
