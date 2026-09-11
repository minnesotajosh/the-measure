import { photoSrc } from './paths';
import { distance } from './scoring';

// The data-bg -> image-URL map the crossfade hook animates between.
export function buildScrollImages(style) {
  const travelPhoto = style.lifestyle && style.lifestyle.travel && style.lifestyle.travel.photo;
  const images = {
    photo: photoSrc(style.photo),
    flatlay: photoSrc(style.flatlay),
    travel: photoSrc(travelPhoto, 'w=1600&h=1200&q=80&auto=format&fit=crop'),
  };
  (style.capsule || []).forEach((item, i) => {
    if (item.photo) images['item-' + i] = photoSrc(item.photo);
  });
  Object.keys(images).forEach((k) => {
    if (!images[k]) delete images[k];
  });
  return images;
}

// A handful of internal links to other archetypes -- real crawlable links
// between pages are most of what makes a page graph "SEO." Picks the 6
// closest styles by axis vector, i.e. the ones that actually share
// meaningful traits (formality, structure, etc.) with this one, rather
// than an arbitrary spread across the full list.
export function otherStylePicks(current, all) {
  const AXES = Object.keys(current.vector);
  return all
    .filter((s) => s.key !== current.key)
    .map((s) => ({ style: s, d: distance(current.vector, s.vector, AXES) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 6)
    .map((entry) => entry.style);
}
