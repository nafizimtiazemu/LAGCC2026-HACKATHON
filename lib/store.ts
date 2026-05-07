'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  SCHEDULED_POSTS,
  COMPLIANCE_ALERTS,
  INFLUENCERS,
  type ScheduledPost,
  type ComplianceAlert,
  type Influencer,
  type GeneratedPost,
} from './mockData';

type OnboardingData = {
  step: number;
  businessName: string;
  category: string;
  location: string;
  hours: string;
  peakHours: string;
  brandColors: string[];
  tone: string;
  audienceAge: string;
  interests: string[];
  audienceType: string;
  goals: string[];
  budget: number;
  uploadedAssets: { name: string; type: string; gradient: string }[];
};

type Store = {
  // Auth-ish
  isAuthed: boolean;
  setAuthed: (v: boolean) => void;

  // Onboarding
  onboarding: OnboardingData;
  setOnboarding: (data: Partial<OnboardingData>) => void;
  resetOnboarding: () => void;

  // Package
  selectedPackage: string | null;
  setPackage: (id: string) => void;

  // Connected socials
  connectedSocials: string[];
  toggleSocial: (id: string) => void;

  // Scheduled posts
  scheduledPosts: ScheduledPost[];
  addScheduledPost: (post: ScheduledPost) => void;
  removeScheduledPost: (id: string) => void;

  // Compliance
  complianceAlerts: ComplianceAlert[];
  resolveAlert: (id: string) => void;

  // Influencers
  influencers: Influencer[];
  toggleInfluencerSaved: (id: string) => void;
  contactInfluencer: (id: string) => void;

  // Generated posts
  generatedPosts: GeneratedPost[];
  addGeneratedPost: (post: GeneratedPost) => void;

  // Notifications counter
  unreadNotifications: number;
  clearNotifications: () => void;
};

const defaultOnboarding: OnboardingData = {
  step: 1,
  businessName: '',
  category: '',
  location: '',
  hours: '',
  peakHours: '',
  brandColors: ['#7C3AED', '#EC4899', '#06B6D4'],
  tone: 'casual',
  audienceAge: '25-44',
  interests: [],
  audienceType: 'Local residents',
  goals: [],
  budget: 850,
  uploadedAssets: [],
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      isAuthed: false,
      setAuthed: (v) => set({ isAuthed: v }),

      onboarding: defaultOnboarding,
      setOnboarding: (data) =>
        set((s) => ({ onboarding: { ...s.onboarding, ...data } })),
      resetOnboarding: () => set({ onboarding: defaultOnboarding }),

      selectedPackage: null,
      setPackage: (id) => set({ selectedPackage: id }),

      connectedSocials: [],
      toggleSocial: (id) =>
        set((s) => ({
          connectedSocials: s.connectedSocials.includes(id)
            ? s.connectedSocials.filter((x) => x !== id)
            : [...s.connectedSocials, id],
        })),

      scheduledPosts: SCHEDULED_POSTS,
      addScheduledPost: (post) =>
        set((s) => ({ scheduledPosts: [...s.scheduledPosts, post] })),
      removeScheduledPost: (id) =>
        set((s) => ({
          scheduledPosts: s.scheduledPosts.filter((p) => p.id !== id),
        })),

      complianceAlerts: COMPLIANCE_ALERTS,
      resolveAlert: (id) =>
        set((s) => ({
          complianceAlerts: s.complianceAlerts.map((a) =>
            a.id === id ? { ...a, resolved: true } : a
          ),
        })),

      influencers: INFLUENCERS,
      toggleInfluencerSaved: (id) =>
        set((s) => ({
          influencers: s.influencers.map((i) =>
            i.id === id ? { ...i, saved: !i.saved } : i
          ),
        })),
      contactInfluencer: (id) =>
        set((s) => ({
          influencers: s.influencers.map((i) =>
            i.id === id ? { ...i, contacted: true } : i
          ),
        })),

      generatedPosts: [],
      addGeneratedPost: (post) =>
        set((s) => ({ generatedPosts: [post, ...s.generatedPosts] })),

      unreadNotifications: 4,
      clearNotifications: () => set({ unreadNotifications: 0 }),
    }),
    {
      name: 'localboost-store',
      partialize: (state) => ({
        isAuthed: state.isAuthed,
        onboarding: state.onboarding,
        selectedPackage: state.selectedPackage,
        connectedSocials: state.connectedSocials,
        scheduledPosts: state.scheduledPosts,
        complianceAlerts: state.complianceAlerts,
        influencers: state.influencers,
        generatedPosts: state.generatedPosts,
      }),
    }
  )
);

export const useAppStore = useStore;

