'use client';

import { useEffect } from 'react';

// Ported from the old scroll-effects.js / app.js setupScrollEffects(): every
// major .section-wrap carries a data-bg attribute naming which of the
// style's images belongs behind it. Background opacity is a direct
// function of scroll position (not an on/off toggle) -- crossing the 50vh
// gap between two sections crossfades linearly, landing at an even 50/50
// blend exactly at the gap's midpoint. Recomputed on a rAF-throttled
// scroll/resize listener rather than an IntersectionObserver, since that
// only fires at threshold crossings, not continuously. Which side-nav link
// is "active" is a simpler on/off call, handled by an IntersectionObserver
// watching each section's midline.
export function useScrollCrossfade(images) {
  useEffect(() => {
    const visual = document.getElementById('scrollVisual');
    if (!visual) return undefined;

    visual.hidden = false;
    visual.innerHTML = Object.keys(images)
      .filter((k) => images[k])
      .map(
        (k) =>
          `<div class="scroll-visual-layer" data-layer="${k}" style="background-image:url('${images[k]}')"></div>`
      )
      .join('');
    const layers = visual.querySelectorAll('.scroll-visual-layer');

    // Only sections with a real image participate in the crossfade timeline
    // -- a "none" section just leaves the previous image in place.
    const bgTargets = Array.prototype.slice
      .call(document.querySelectorAll('[data-bg]'))
      .filter((t) => t.dataset.bg !== 'none' && images[t.dataset.bg]);

    function updateBgOpacity() {
      if (!bgTargets.length) return;
      const vCenter = window.innerHeight / 2;
      const rects = bgTargets.map((t) => t.getBoundingClientRect());
      const opacities = {};

      if (vCenter <= rects[0].top) {
        opacities[bgTargets[0].dataset.bg] = 1;
      } else if (vCenter >= rects[rects.length - 1].bottom) {
        opacities[bgTargets[bgTargets.length - 1].dataset.bg] = 1;
      } else {
        for (let i = 0; i < bgTargets.length; i++) {
          if (vCenter >= rects[i].top && vCenter <= rects[i].bottom) {
            opacities[bgTargets[i].dataset.bg] = 1;
            break;
          }
          if (i < bgTargets.length - 1 && vCenter > rects[i].bottom && vCenter < rects[i + 1].top) {
            const progress = (vCenter - rects[i].bottom) / (rects[i + 1].top - rects[i].bottom);
            opacities[bgTargets[i].dataset.bg] = 1 - progress;
            opacities[bgTargets[i + 1].dataset.bg] = progress;
            break;
          }
        }
      }

      layers.forEach((l) => {
        const v = opacities[l.dataset.layer];
        l.style.opacity = v == null ? 0 : v;
      });
    }

    let ticking = false;
    function scrollBgHandler() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateBgOpacity();
        ticking = false;
      });
    }
    window.addEventListener('scroll', scrollBgHandler, { passive: true });
    window.addEventListener('resize', scrollBgHandler);
    updateBgOpacity();

    let navObserver;
    const navLinks = document.querySelectorAll('.side-nav a');
    if (typeof IntersectionObserver !== 'undefined' && navLinks.length) {
      const navTargets = Array.prototype.slice
        .call(navLinks)
        .map((a) => document.getElementById(a.dataset.target))
        .filter(Boolean);
      navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((a) => a.classList.toggle('active', a.dataset.target === entry.target.id));
          });
        },
        { rootMargin: '-20% 0px -70% 0px' }
      );
      navTargets.forEach((t) => navObserver.observe(t));
    }

    return () => {
      window.removeEventListener('scroll', scrollBgHandler);
      window.removeEventListener('resize', scrollBgHandler);
      if (navObserver) navObserver.disconnect();
      visual.hidden = true;
      visual.innerHTML = '';
    };
    // images is a plain object computed fresh per render from static style
    // data; keying off its serialized form avoids re-running this whole
    // effect (and re-attaching scroll listeners) on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(images)]);
}
