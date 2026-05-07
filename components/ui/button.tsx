'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cool/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // primary action — copper warmth, premium
        default:
          'bg-warm text-canvas shadow-lg shadow-warm/20 hover:bg-warm-bright hover:shadow-warm/35 hover:-translate-y-0.5 active:translate-y-0',
        // alternate primary — high-contrast white pill (used on dark hero CTAs)
        primary:
          'bg-ink text-canvas shadow-lg shadow-black/30 hover:bg-white hover:-translate-y-0.5',
        // ghost outline
        outline:
          'border border-hairline-strong bg-white/[0.03] text-ink hover:bg-white/[0.06] hover:border-white/20',
        ghost:
          'text-ink-secondary hover:text-ink hover:bg-white/[0.04]',
        glass:
          'panel-subtle text-ink hover:bg-white/[0.06]',
        soft:
          'bg-cool/10 text-cool-bright border border-cool/20 hover:bg-cool/15 hover:border-cool/30',
        danger:
          'bg-danger/15 text-danger border border-danger/30 hover:bg-danger/25',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-7 text-base',
        xl: 'h-14 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
