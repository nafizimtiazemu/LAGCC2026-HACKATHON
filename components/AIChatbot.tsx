'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { delay } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: number;
}

const SUGGESTED = [
  'When should I post next?',
  'Suggest a campaign idea',
  'Compliance reminders',
  'Analyze my engagement',
];

const RESPONSES: Record<string, string> = {
  'when should i post':
    "Best windows this week: Friday 8:30 AM and Sunday 10:30 AM. Engagement spikes ~38% during these times for your category.",
  'suggest a campaign':
    "Try a 'Lavender Latte Drop' — limited-edition launch + reel + 10% off first 50. Estimated reach: 4.2K, projected ROI: 3.1x.",
  campaign:
    "Try a 'Lavender Latte Drop' — limited-edition launch + reel + 10% off first 50. Estimated reach: 4.2K, projected ROI: 3.1x.",
  compliance:
    "Two open items: Food Permit renewal in 18 days, I-9 verification for 2 staff in 9 days. I can prep both — just say go.",
  engagement:
    "Engagement is up 24% week-over-week. Reels are outperforming static posts 3.4x. I'd shift 60% of next week to short-form video.",
  hello: "Hi Alex! I'm Bloom. What's on your plate today?",
  hi: "Hi Alex! I'm Bloom. What's on your plate today?",
  default:
    "Based on your brand profile and recent performance, I'd lean into community-driven content this week. Want me to draft something specific?",
};

function findResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const key of Object.keys(RESPONSES)) {
    if (lower.includes(key)) return RESPONSES[key];
  }
  return RESPONSES.default;
}

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      text: "Hi Alex. I've reviewed your brand profile and the past week's performance. Ask me anything.",
      timestamp: Date.now(),
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    await delay(1100);
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      text: findResponse(text),
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, aiMsg]);
    setTyping(false);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.5 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close Bloom AI' : 'Open Bloom AI'}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-warm via-warm-bright to-warm shadow-2xl shadow-warm/50"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-5 w-5 text-canvas" strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-5 w-5 text-canvas" strokeWidth={2.2} />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cool opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-cool" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            className="panel-strong fixed bottom-24 right-6 z-50 flex h-[560px] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden p-0"
          >
            {/* Header */}
            <div className="relative border-b border-hairline bg-gradient-to-br from-warm/15 via-warm/5 to-cool/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-white/[0.04]">
                  <Sparkles className="h-4 w-4 text-warm-bright" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-light text-ink">Bloom AI</h3>
                    <span className="pulse-dot block h-1.5 w-1.5 rounded-full bg-trust text-trust" />
                  </div>
                  <p className="mono-label">Marketing assistant · online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-5">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-warm text-canvas'
                        : 'border border-hairline bg-white/[0.03] text-ink'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl border border-hairline bg-white/[0.03] px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                        className="block h-1.5 w-1.5 rounded-full bg-warm-bright"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Suggested */}
            {messages.length <= 1 && (
              <div className="border-t border-hairline px-5 py-3">
                <p className="mono-label mb-2">Suggested</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="rounded-full border border-hairline bg-white/[0.03] px-3 py-1.5 text-xs text-ink-secondary transition hover:border-cool/40 hover:bg-cool/10 hover:text-ink"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-hairline p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Bloom anything…"
                  className="flex-1 rounded-xl border border-hairline bg-white/[0.03] px-4 py-2.5 text-sm text-ink placeholder-ink-muted outline-none focus:border-cool/40 focus:ring-2 focus:ring-cool/20"
                />
                <Button type="submit" size="icon" disabled={!input.trim() || typing}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
