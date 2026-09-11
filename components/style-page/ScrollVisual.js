'use client';

import { useScrollCrossfade } from '../../lib/use-scroll-crossfade';

// Renders nothing itself -- just drives the #scrollVisual layer (in the
// root layout) and the .side-nav active-link spy for whichever page mounts
// it, via a client-only effect.
export default function ScrollVisual({ images }) {
  useScrollCrossfade(images);
  return null;
}
