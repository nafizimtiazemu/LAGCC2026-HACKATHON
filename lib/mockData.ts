export const MOCK_BUSINESS = {
  name: 'Brew & Bloom Café',
  category: 'Café & Bakery',
  location: 'Austin, TX',
  hours: '7:00 AM – 9:00 PM',
  peakHours: '8–10 AM, 2–4 PM',
  audience: 'Locals 22–45, remote workers, weekend brunch crowd',
  tone: 'Warm, casual, community-driven',
  budget: 850,
};

export const POST_TIMES = [
  { day: 'Mon', value: 62 },
  { day: 'Tue', value: 75 },
  { day: 'Wed', value: 81 },
  { day: 'Thu', value: 90 },
  { day: 'Fri', value: 96 },
  { day: 'Sat', value: 88 },
  { day: 'Sun', value: 70 },
];

export const ENGAGEMENT_TREND = [
  { week: 'W1', engagement: 1240, reach: 8200 },
  { week: 'W2', engagement: 1680, reach: 10400 },
  { week: 'W3', engagement: 1920, reach: 11800 },
  { week: 'W4', engagement: 2480, reach: 14600 },
  { week: 'W5', engagement: 3120, reach: 17900 },
  { week: 'W6', engagement: 3840, reach: 21300 },
  { week: 'W7', engagement: 4520, reach: 25100 },
  { week: 'W8', engagement: 5380, reach: 29600 },
];

export const PLATFORM_REACH = [
  { platform: 'Instagram', reach: 18400, color: '#EC4899' },
  { platform: 'TikTok', reach: 12200, color: '#06B6D4' },
  { platform: 'Facebook', reach: 8600, color: '#7C3AED' },
  { platform: 'Google', reach: 6100, color: '#10B981' },
];

export const CONVERSION_DATA = [
  { name: 'Saves', value: 32 },
  { name: 'Clicks', value: 28 },
  { name: 'Visits', value: 22 },
  { name: 'Sales', value: 18 },
];

export type Influencer = {
  id: string;
  name: string;
  handle: string;
  niche: string;
  location: string;
  followers: number;
  engagement: number;
  reach: string;
  match: number;
  matchScore: number;
  avatar: string;
  bio: string;
  posts: number;
  audienceMatch: { label: string; value: number }[];
  saved?: boolean;
  contacted?: boolean;
};

export const INFLUENCERS: Influencer[] = [
  {
    id: 'i1',
    name: 'Maya Chen',
    handle: '@mayaeats',
    niche: 'Food & Drink',
    location: 'Austin, TX',
    followers: 48200,
    engagement: 6.4,
    reach: '12–18K',
    match: 96,
    matchScore: 96,
    avatar: 'https://i.pravatar.cc/150?img=47',
    bio: 'Foodie storyteller spotlighting hidden gems in East Austin. Lover of slow brews and slower mornings.',
    posts: 412,
    audienceMatch: [
      { label: 'Age 25–34', value: 92 },
      { label: 'Austin locals', value: 88 },
      { label: 'Coffee lovers', value: 95 },
    ],
  },
  {
    id: 'i2',
    name: 'Diego Ramos',
    handle: '@diegobrews',
    niche: 'Food & Drink',
    location: 'Austin, TX',
    followers: 31700,
    engagement: 8.1,
    reach: '9–14K',
    match: 94,
    matchScore: 94,
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Specialty coffee enthusiast. Reviewing every roaster in Austin one cortado at a time.',
    posts: 287,
    audienceMatch: [
      { label: 'Age 22–34', value: 89 },
      { label: 'Coffee enthusiasts', value: 97 },
      { label: 'ATX locals', value: 84 },
    ],
  },
  {
    id: 'i3',
    name: 'Sarah Whitfield',
    handle: '@sarahworks.remote',
    niche: 'Lifestyle',
    location: 'Austin, TX',
    followers: 22500,
    engagement: 5.8,
    reach: '7–11K',
    match: 91,
    matchScore: 91,
    avatar: 'https://i.pravatar.cc/150?img=44',
    bio: 'Remote work, slow living, and the cafés that make it possible. Newsletter at sarahworks.co',
    posts: 198,
    audienceMatch: [
      { label: 'Remote workers', value: 94 },
      { label: 'Age 28–40', value: 86 },
      { label: 'Austin locals', value: 79 },
    ],
  },
  {
    id: 'i4',
    name: 'Aisha Patel',
    handle: '@aishabakes',
    niche: 'Food & Drink',
    location: 'Austin, TX',
    followers: 67400,
    engagement: 4.9,
    reach: '15–22K',
    match: 89,
    matchScore: 89,
    avatar: 'https://i.pravatar.cc/150?img=45',
    bio: 'Pastry chef + sourdough nerd. Sharing recipes and the bakeries that inspire them.',
    posts: 521,
    audienceMatch: [
      { label: 'Foodies', value: 92 },
      { label: 'Age 25–44', value: 88 },
      { label: 'Texas-wide', value: 71 },
    ],
  },
  {
    id: 'i5',
    name: 'Jordan Park',
    handle: '@jordan.weekends',
    niche: 'Local Austin',
    location: 'Round Rock, TX',
    followers: 18900,
    engagement: 7.2,
    reach: '6–9K',
    match: 87,
    matchScore: 87,
    avatar: 'https://i.pravatar.cc/150?img=33',
    bio: 'Weekend explorer. Brunch, books, and the best of greater Austin.',
    posts: 156,
    audienceMatch: [
      { label: 'Austin metro', value: 96 },
      { label: 'Age 24–35', value: 84 },
      { label: 'Brunch crowd', value: 91 },
    ],
  },
  {
    id: 'i6',
    name: 'Camila Ruiz',
    handle: '@camila.tx',
    niche: 'Lifestyle',
    location: 'Austin, TX',
    followers: 94100,
    engagement: 3.8,
    reach: '20–28K',
    match: 84,
    matchScore: 84,
    avatar: 'https://i.pravatar.cc/150?img=49',
    bio: 'Mom of two, lifestyle creator, and proud Austinite. Sharing the local spots that bring our family joy.',
    posts: 689,
    audienceMatch: [
      { label: 'Parents 30–45', value: 93 },
      { label: 'Austin families', value: 88 },
      { label: 'Weekend outings', value: 82 },
    ],
  },
];

export type GeneratedPost = {
  id: string;
  caption: string;
  hashtags: string[];
  bestTime: string;
  platform: string;
  visualPrompt: string;
  scheduled?: boolean;
  date?: string;
};

export const SAMPLE_POSTS: GeneratedPost[] = [
  {
    id: 'p1',
    caption:
      'Slow mornings, fast Wi-Fi ☕ Pull up a seat — our lavender oat latte is calling your name. Open until 9 today.',
    hashtags: ['#AustinCoffee', '#RemoteWorkLife', '#BrewAndBloom', '#LocalLove'],
    bestTime: 'Today · 8:30 AM',
    platform: 'Instagram',
    visualPrompt: 'Lavender latte on warm wood bar with morning light',
  },
  {
    id: 'p2',
    caption:
      'New on the menu: Brown Butter Miso Cookies. Yes, they\'re as good as they sound. 🍪 Limited batch — get \'em before they\'re gone.',
    hashtags: ['#AustinEats', '#NewMenu', '#BakeryLife'],
    bestTime: 'Tomorrow · 11:00 AM',
    platform: 'TikTok',
    visualPrompt: 'Stack of cookies, golden hour, hand reaching in',
  },
  {
    id: 'p3',
    caption:
      'Saturday brunch hits different here. Reservations open. Bring a friend, leave full and slightly inspired.',
    hashtags: ['#WeekendBrunch', '#ATXFoodie', '#BrunchVibes'],
    bestTime: 'Friday · 5:00 PM',
    platform: 'Instagram',
    visualPrompt: 'Brunch table flat lay, sunny patio',
  },
];

export type ScheduledPost = {
  id: string;
  date: string; // ISO date YYYY-MM-DD
  time: string;
  platform: string; // 'instagram' | 'tiktok' | 'facebook' | 'google'
  title: string;
  caption: string;
  type: string;
  status: 'scheduled' | 'posted' | 'published' | 'draft';
  thumb?: string;
};

const today = new Date();
const iso = (offset: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};

export const SCHEDULED_POSTS: ScheduledPost[] = [
  {
    id: 's1',
    date: iso(0),
    time: '8:30 AM',
    platform: 'instagram',
    title: 'Lavender Latte Friday',
    caption: 'Lavender oat latte mornings ☕',
    type: 'Product launch',
    status: 'scheduled',
    thumb: 'from-purple-200 to-pink-200',
  },
  {
    id: 's2',
    date: iso(0),
    time: '2:15 PM',
    platform: 'tiktok',
    title: 'Behind the Bar',
    caption: 'Behind the bar: how we brew',
    type: 'Behind the scenes',
    status: 'scheduled',
    thumb: 'from-cyan-200 to-blue-200',
  },
  {
    id: 's3',
    date: iso(1),
    time: '11:00 AM',
    platform: 'instagram',
    title: 'Cookie Drop',
    caption: 'Brown butter miso cookies',
    type: 'Product launch',
    status: 'scheduled',
    thumb: 'from-amber-200 to-orange-200',
  },
  {
    id: 's4',
    date: iso(2),
    time: '9:00 AM',
    platform: 'facebook',
    title: 'Roaster Spotlight',
    caption: 'Community spotlight: meet our roaster',
    type: 'Community spotlight',
    status: 'scheduled',
    thumb: 'from-emerald-200 to-teal-200',
  },
  {
    id: 's5',
    date: iso(3),
    time: '4:30 PM',
    platform: 'instagram',
    title: 'Saturday Reservations',
    caption: 'Reservations open for Saturday',
    type: 'Promotion',
    status: 'scheduled',
    thumb: 'from-rose-200 to-pink-200',
  },
  {
    id: 's6',
    date: iso(5),
    time: '10:00 AM',
    platform: 'tiktok',
    title: 'Latte Art Tutorial',
    caption: 'Latte art tutorial — heart edition',
    type: 'Behind the scenes',
    status: 'draft',
    thumb: 'from-violet-200 to-purple-200',
  },
  {
    id: 's7',
    date: iso(7),
    time: '7:30 AM',
    platform: 'instagram',
    title: 'Sunrise Patio',
    caption: 'Sunrise on the patio ☀️',
    type: 'Brand story',
    status: 'scheduled',
    thumb: 'from-yellow-200 to-amber-200',
  },
  {
    id: 's8',
    date: iso(-2),
    time: '8:00 AM',
    platform: 'instagram',
    title: 'Matcha Monday',
    caption: 'Monday motivation: matcha edition',
    type: 'Product launch',
    status: 'published',
    thumb: 'from-green-200 to-emerald-200',
  },
  {
    id: 's9',
    date: iso(-1),
    time: '3:00 PM',
    platform: 'google',
    title: 'Hours Update',
    caption: 'Updated hours and menu',
    type: 'Brand story',
    status: 'published',
    thumb: 'from-blue-200 to-cyan-200',
  },
  {
    id: 's10',
    date: iso(10),
    time: '12:00 PM',
    platform: 'instagram',
    title: 'Open Mic Night',
    caption: 'Open mic night announcement',
    type: 'Event',
    status: 'scheduled',
    thumb: 'from-pink-200 to-rose-200',
  },
];

export type ComplianceAlert = {
  id: string;
  title: string;
  category: string;
  due: string;
  daysLeft: number;
  daysUntilDue: number;
  risk: 'low' | 'medium' | 'high';
  description: string;
  action: string;
  resolved?: boolean;
};

export const COMPLIANCE_ALERTS: ComplianceAlert[] = [
  {
    id: 'c1',
    title: 'Food Handler Permit Renewal',
    category: 'Health & Safety',
    due: 'May 24, 2026',
    daysLeft: 19,
    daysUntilDue: 19,
    risk: 'high',
    description:
      'Texas Food Handler certifications for 2 staff members expire this month. Renewal takes ~2 hours online.',
    action: 'Start renewal',
  },
  {
    id: 'c2',
    title: 'Fire Safety Inspection',
    category: 'Fire Marshal',
    due: 'June 12, 2026',
    daysLeft: 38,
    daysUntilDue: 38,
    risk: 'medium',
    description:
      'Annual fire safety inspection scheduled. Ensure extinguishers tagged and exits unobstructed.',
    action: 'Schedule prep',
  },
  {
    id: 'c3',
    title: 'Storefront Sign Ordinance Review',
    category: 'City of Austin',
    due: 'July 1, 2026',
    daysLeft: 57,
    daysUntilDue: 57,
    risk: 'low',
    description:
      'New chalkboard signage exceeds sidewalk encroachment limits by ~4 inches. Adjust before next inspection.',
    action: 'Review guidelines',
  },
  {
    id: 'c4',
    title: 'Sales Tax Quarterly Filing',
    category: 'Texas Comptroller',
    due: 'May 20, 2026',
    daysLeft: 15,
    daysUntilDue: 15,
    risk: 'high',
    description:
      'Q1 2026 sales tax return due. Estimated liability based on point-of-sale data: $2,840.',
    action: 'Prepare filing',
  },
  {
    id: 'c5',
    title: 'Employee I-9 Verification',
    category: 'HR Compliance',
    due: 'June 30, 2026',
    daysLeft: 56,
    daysUntilDue: 56,
    risk: 'medium',
    description: 'New hire I-9 forms for 1 employee require re-verification.',
    action: 'Verify documents',
  },
];

export const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    posts: 8,
    tagline: 'Perfect for solo founders dipping into social marketing.',
    features: [
      '8 AI-generated posts per month',
      '2 influencer Collaborations',
      'Smart caption writing and trending hashtags',
      'Single-platform publishing',
      'Standard email support',
    ],
    popular: false,
    color: 'from-blue-100 to-cyan-100',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 119,
    posts: 16,
    tagline: 'Most loved by busy local businesses ready to scale.',
    features: [
      '16 AI-generated posts per month',
      '4 Influencer Collaborations',
      'Multi-platform content publishing',
      'AI-powered influencer recommendations',
      'Performance and audience analytics',
      'Priority customer support',
    ],
    popular: true,
    color: 'from-purple-100 to-pink-100',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 199,
    posts: 30,
    tagline: 'Full marketing autopilot with concierge support.',
    features: [
      '31 AI posts per month',
      '8 Influencer collaboration',
      'Full marketing automation tools',
      'Compliance monitoring and renewal alerts',
      'AI marketing and business assistant',
      'Dedicated account success manager',
    ],
    popular: false,
    color: 'from-amber-100 to-rose-100',
  },
];

export const SOCIAL_PLATFORMS = [
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Posts, Reels, and Stories',
    color: 'from-pink-400 to-rose-500',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Page posts and events',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    description: 'Short-form video',
    color: 'from-slate-700 to-slate-900',
  },
  {
    id: 'google',
    name: 'Google Business',
    description: 'Search & Maps presence',
    color: 'from-emerald-400 to-teal-500',
  },
];

export const AI_RECOMMENDATIONS = [
  {
    id: 'r1',
    title: 'Post the lavender latte at 8:30 AM Friday',
    description: 'Your audience engages 38% above average on Friday mornings.',
    reason: 'Your audience engages 38% above average on Friday mornings.',
    impact: '+24% reach',
    cta: 'Schedule now',
    icon: '☕',
  },
  {
    id: 'r2',
    title: 'Run a $40 boost on the cookie reel',
    description: 'Similar bakery content has averaged $0.18 cost per engaged user.',
    reason: 'Similar bakery content has averaged $0.18 cost per engaged user.',
    impact: '~3.4K reach',
    cta: 'Boost post',
    icon: '🍪',
  },
  {
    id: 'r3',
    title: 'Reach out to @mayaeats for a collab',
    description: '96% audience overlap and strong recent café content performance.',
    reason: '96% audience overlap and strong recent café content performance.',
    impact: '+8K potential reach',
    cta: 'Send invite',
    icon: '✨',
  },
];
