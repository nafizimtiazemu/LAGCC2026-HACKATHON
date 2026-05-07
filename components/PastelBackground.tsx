'use client';

/**
 * PastelBackground — kept only as a compatibility export so old pages
 * that still import it don't break. Renders the new ambient
 * NeighborhoodBackground.
 */
import { NeighborhoodBackground } from '@/components/neighborhood';

export function PastelBackground({
  variant = 'default',
}: {
  variant?: 'default' | 'subtle' | 'rich';
}) {
  // All variants now render the calm ambient pulse layer behind the page
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <NeighborhoodBackground mode="ambient" />
    </div>
  );
}
