import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[88px] w-full rounded-xl border border-hairline-strong bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink-muted transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cool/50 focus-visible:border-cool/40',
        'disabled:cursor-not-allowed disabled:opacity-50 resize-none',
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';

export { Textarea };
