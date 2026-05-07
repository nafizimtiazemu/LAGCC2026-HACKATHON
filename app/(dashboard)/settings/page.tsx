'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Building2, Image as ImageIcon, CreditCard, Shield, Bell, LogOut, Check, ArrowRight, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { GlassPanel, RouteHeader, TrustBadge } from '@/components/shell';
import { useAppStore } from '@/lib/store';
import { PACKAGES, MOCK_BUSINESS } from '@/lib/mockData';
import { toast } from '@/components/ui/toaster';

function SectionHeader({ icon, pillar, title, description }: { icon: React.ReactNode; pillar: string; title: string; description: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-hairline bg-white/[0.03]">
        {icon}
      </div>
      <div>
        <span className="mono-label">{pillar}</span>
        <h3 className="mt-0.5 font-display text-lg font-light text-ink">{title}</h3>
        <p className="text-sm text-ink-secondary">{description}</p>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { selectedPackage, setPackage } = useAppStore();
  const [name, setName] = useState(MOCK_BUSINESS.name);
  const [category, setCategory] = useState(MOCK_BUSINESS.category);
  const [location, setLocation] = useState(MOCK_BUSINESS.location);
  const [hours, setHours] = useState(MOCK_BUSINESS.hours);
  const [bio, setBio] = useState(
    'Cozy neighborhood café serving specialty coffee, fresh pastries, and house-made syrups. Open daily 7 AM – 9 PM.',
  );
  const [notifPush, setNotifPush] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifWeekly, setNotifWeekly] = useState(false);

  const currentPkg = selectedPackage ? PACKAGES.find((p) => p.id === selectedPackage) : PACKAGES[1];

  const handleSave = () => {
    toast({ variant: 'success', title: 'Settings saved', description: 'Your business profile has been updated.' });
  };

  const handlePackageChange = (id: string) => {
    setPackage(id);
    toast({ variant: 'info', title: 'Plan updated', description: `Switched to ${PACKAGES.find((p) => p.id === id)?.name}.` });
  };

  return (
    <div className="space-y-6">
      <RouteHeader
        title={
          <>
            <span className="italic text-ink-secondary">Settings</span>
          </>
        }
        description="Profile, plan, notifications, and data — all calm, all in one place."
      />

      {/* Business profile */}
      <GlassPanel className="p-6">
        <SectionHeader
          icon={<Building2 className="h-5 w-5 text-warm-bright" />}
          pillar="Vision · 01"
          title="Business profile"
          description="This information powers your AI brand voice."
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="biz-name">Business name</Label>
            <Input id="biz-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="biz-cat">Category</Label>
            <Input id="biz-cat" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="biz-loc">Location</Label>
            <Input id="biz-loc" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="biz-hours">Hours</Label>
            <Input id="biz-hours" value={hours} onChange={(e) => setHours(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="biz-bio">Bio</Label>
            <Textarea id="biz-bio" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave}>
            <Check className="h-4 w-4" />
            Save changes
          </Button>
        </div>
      </GlassPanel>

      {/* Brand assets */}
      <GlassPanel className="p-6">
        <SectionHeader
          icon={<ImageIcon className="h-5 w-5 text-cool-bright" />}
          pillar="Vision · 01"
          title="Brand assets"
          description="Logo, colors, and brand voice configuration."
        />

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-hairline bg-white/[0.025] p-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-warm via-warm-bright to-cool">
              <div className="flex h-full items-center justify-center">
                <span className="font-display text-3xl font-light text-canvas">B&B</span>
              </div>
            </div>
            <p className="mt-3 mono-label">Logo</p>
            <Button variant="outline" size="sm" className="mt-2 w-full">
              Update logo
            </Button>
          </div>

          <div className="md:col-span-2 rounded-xl border border-hairline bg-white/[0.025] p-4">
            <p className="mono-label">Brand colors</p>
            <div className="mt-3 flex gap-2">
              {['#C56F44', '#E89368', '#4CCBC7', '#B7E46E'].map((c) => (
                <div key={c} className="flex-1">
                  <div className="aspect-square rounded-lg shadow-sm" style={{ backgroundColor: c }} />
                  <p className="mt-1.5 text-center font-mono text-[10px] tracking-widest text-ink-muted">{c}</p>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <p className="mono-label">Brand voice</p>
              <p className="mt-1 text-sm text-ink">Warm · Casual · Community-driven</p>
              <Link
                href="/brand-profile"
                className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-cool-bright hover:text-cool"
              >
                Re-run brand profile <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Plan + billing */}
      <GlassPanel className="p-6">
        <div className="flex items-center justify-between">
          <SectionHeader
            icon={<CreditCard className="h-5 w-5 text-warm-bright" />}
            pillar="Plan"
            title="Plan & billing"
            description="Manage your subscription and payment method."
          />
          <Link href="/packages">
            <Button variant="outline" size="sm">
              All plans
            </Button>
          </Link>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {PACKAGES.map((p) => {
            const isCurrent = currentPkg?.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handlePackageChange(p.id)}
                className={`relative rounded-xl border p-4 text-left transition ${
                  isCurrent
                    ? 'border-warm/50 bg-warm/10'
                    : 'border-hairline bg-white/[0.025] hover:border-warm/30'
                }`}
              >
                {isCurrent && (
                  <div className="absolute right-3 top-3">
                    <TrustBadge tone="cool">Current</TrustBadge>
                  </div>
                )}
                <p className="mono-label">{p.name}</p>
                <p className="mt-1 font-display text-2xl font-light text-ink">
                  ${p.price}
                  <span className="ml-1 font-mono text-xs text-ink-muted">/mo</span>
                </p>
                <p className="mt-2 text-xs text-ink-secondary">{p.posts} posts/month</p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-hairline bg-white/[0.025] p-4">
            <p className="mono-label">Next charge</p>
            <p className="mt-1 font-display text-base font-light text-ink">June 5, 2026</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-secondary">
              <Wallet className="h-3 w-3" />${currentPkg?.price ?? 119}.00 · Visa ending 4242
            </p>
          </div>
          <div className="rounded-xl border border-hairline bg-white/[0.025] p-4">
            <p className="mono-label">Usage this period</p>
            <p className="mt-1 font-display text-base font-light text-ink">
              11 of {currentPkg?.posts ?? 16} posts used
            </p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.05]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-warm to-warm-bright"
                style={{ width: '68%' }}
              />
            </div>
          </div>
        </div>

        <p className="mt-4 mono-label">Demo mode · No charges will be made</p>
      </GlassPanel>

      {/* Notifications */}
      <GlassPanel className="p-6">
        <SectionHeader
          icon={<Bell className="h-5 w-5 text-cool-bright" />}
          pillar="Preferences"
          title="Notifications"
          description="Choose how you'd like to be alerted."
        />

        <div className="mt-6 space-y-3">
          {[
            { label: 'Push notifications', sub: 'Real-time updates on posts and replies', value: notifPush, set: setNotifPush },
            { label: 'Email alerts', sub: 'Daily digest and high-priority compliance', value: notifEmail, set: setNotifEmail },
            { label: 'Weekly performance summary', sub: 'Friday afternoons with top metrics', value: notifWeekly, set: setNotifWeekly },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between rounded-xl border border-hairline bg-white/[0.025] p-4">
              <div>
                <p className="text-sm font-medium text-ink">{n.label}</p>
                <p className="text-xs text-ink-secondary">{n.sub}</p>
              </div>
              <Switch checked={n.value} onCheckedChange={n.set} />
            </div>
          ))}
        </div>
      </GlassPanel>

      {/* Data protection */}
      <GlassPanel className="overflow-hidden p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-trust/8 via-cool/4 to-transparent" />
        <div className="relative flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-trust/30 bg-trust/10">
            <Shield className="h-5 w-5 text-trust" />
          </div>
          <div className="flex-1">
            <span className="mono-label">Trust · 05</span>
            <h3 className="mt-1 font-display text-lg font-light text-ink">Your data is protected</h3>
            <p className="mt-1 text-sm text-ink-secondary">
              LocalBoost uses end-to-end encryption and never sells your business data. You own your content,
              analytics, and customer insights.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <TrustBadge tone="trust">SOC 2 Type II</TrustBadge>
              <TrustBadge tone="trust">GDPR compliant</TrustBadge>
              <TrustBadge tone="trust">CCPA compliant</TrustBadge>
            </div>
          </div>
        </div>
      </GlassPanel>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex justify-end">
        <Link href="/">
          <Button variant="ghost" className="text-ink-muted hover:text-danger">
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
