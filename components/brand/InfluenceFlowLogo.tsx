'use client';

import { cn } from '@/lib/utils';

type Props = {
  /** Render variant: full lockup, just the IF mark, or wordmark only */
  variant?: 'full' | 'mark' | 'wordmark';
  /** Show the "Connect · Create · Grow" tagline (full variant only) */
  showTagline?: boolean;
  /** Tailwind/utility classes for sizing & color overrides */
  className?: string;
};

/**
 * InfluenceFlow brand lockup.
 * - The "I" and "Influence" use --text-primary (cream) so it works on dark BG
 * - The "F" mark and "Flow" use --accent-warm (copper) — matches the design system
 * - All sizing is driven by font-size on the wrapper. Set `text-{size}` and the
 *   mark scales with it (1em tall).
 */
export function InfluenceFlowLogo({
  variant = 'full',
  showTagline = false,
  className,
}: Props) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      {(variant === 'full' || variant === 'mark') && <IFMark />}

      {(variant === 'full' || variant === 'wordmark') && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1em] font-medium tracking-tight">
            <span className="text-ink">Influence</span>
            <span className="text-warm-bright">Flow</span>
          </span>
          {showTagline && (
            <span className="mt-1 font-mono text-[0.32em] uppercase tracking-[0.32em] text-ink-muted">
              Connect <span className="text-warm-bright">·</span> Create{' '}
              <span className="text-warm-bright">·</span> Grow
            </span>
          )}
        </span>
      )}
    </span>
  );
}

/**
 * The IF monogram, drawn as inline SVG so it inherits color and scales
 * with font-size. The "I" pillar is solid; the "F" arm bends into a
 * wing shape (matches your reference logo).
 */
function IFMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-[1.15em] w-[1.15em] flex-shrink-0', className)}
      aria-hidden="true"
    >
      {/* The "I" pillar — cream */}
      <rect x="10" y="8" width="14" height="48" rx="2" fill="var(--text-primary)" />

      {/* The "F" — copper, with the upper bar curving into a wing */}
      <path
        d="
          M 28 8
          L 50 8
          C 56 8 58 14 54 18
          L 36 22
          L 36 30
          L 50 30
          C 54 30 54 36 50 36
          L 36 36
          L 36 56
          L 28 56
          Z
        "
        fill="var(--accent-warm)"
      />
      {/* Wing accent — gives the F that swooping right edge */}
      <path
        d="
          M 50 8
          C 58 8 60 16 56 22
          L 48 26
          C 50 18 50 12 50 8
          Z
        "
        fill="var(--accent-warm-2)"
        opacity="0.85"
      />
    </svg>
  );
}