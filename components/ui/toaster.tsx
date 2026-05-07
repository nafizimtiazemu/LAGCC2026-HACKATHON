'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastVariant = 'default' | 'success' | 'info' | 'error';

interface ToastItem {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
}

const TOAST_EVENT = 'localboost:toast';

export function toast(opts: { title?: string; description?: string; variant?: ToastVariant }) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: opts }));
}

const VARIANT_STYLES: Record<ToastVariant, { icon: any; tone: string }> = {
  default: { icon: Info, tone: 'border-hairline-strong text-ink-secondary' },
  success: { icon: Check, tone: 'border-trust/40 text-trust' },
  info: { icon: Info, tone: 'border-cool/40 text-cool-bright' },
  error: { icon: AlertCircle, tone: 'border-danger/40 text-danger' },
};

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const item: ToastItem = {
        id: Math.random().toString(36).slice(2, 9),
        title: detail.title,
        description: detail.description,
        variant: detail.variant ?? 'default',
      };
      setToasts((prev) => [...prev, item]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== item.id)), 4200);
    };
    window.addEventListener(TOAST_EVENT, handler);
    return () => window.removeEventListener(TOAST_EVENT, handler);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[200] flex flex-col gap-2 sm:max-w-sm">
      <AnimatePresence>
        {toasts.map((t) => {
          const v = VARIANT_STYLES[t.variant ?? 'default'];
          const Icon = v.icon;
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className={cn('panel-strong pointer-events-auto flex items-start gap-3 p-4', v.tone)}
            >
              <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.04]">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                {t.title && <p className="text-sm font-medium text-ink">{t.title}</p>}
                {t.description && <p className="mt-0.5 text-xs text-ink-secondary">{t.description}</p>}
              </div>
              <button
                onClick={() => setToasts((p) => p.filter((x) => x.id !== t.id))}
                className="flex-shrink-0 text-ink-muted transition hover:text-ink"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
