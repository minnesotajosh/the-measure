import { photoSrc } from './paths';

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
// between pages are most of what makes a page graph "SEO." Picks 6 spread
// across the list, deterministic but varied, rather than always the same
// neighbors.
export function otherStylePicks(current, all) {
  const others = all.filter((s) => s.key !== current.key);
  const picks = [];
  for (let i = 0; i < 6; i++) {
    picks.push(others[(others.indexOf(current) + i * 4 + 3) % others.length] || others[i]);
  }
  const seen = {};
  return picks.filter((s) => {
    if (!s || seen[s.key]) return false;
    seen[s.key] = 1;
    return true;
  });
}
