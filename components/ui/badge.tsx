import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] transition-colors',
  {
    variants: {
      variant: {
        default: 'border-warm/30 bg-warm/15 text-warm-bright',
        secondary: 'border-hairline bg-white/[0.04] text-ink-secondary',
        success: 'border-trust/30 bg-trust/10 text-trust',
        warning: 'border-warm/30 bg-warm/12 text-warm-bright',
        danger: 'border-danger/30 bg-danger/10 text-danger',
        outline: 'border-hairline-strong text-ink-secondary',
        gradient: 'border-cool/30 bg-cool/12 text-cool-bright',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
