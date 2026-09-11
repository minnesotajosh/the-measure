// GitHub Pages serves this project at /the-measure/. next/link and
// next/navigation apply that basePath automatically, but a plain
// hardcoded string handed to an <img src> does not -- withBasePath()
// covers that gap for anything referencing /public directly.
export const BASE_PATH = '/the-measure';

export const SITE_URL = 'https://minnesotajosh.github.io' + BASE_PATH;

export function withBasePath(path) {
  if (!path) return path;
  return BASE_PATH + (path.startsWith('/') ? path : '/' + path);
}

export function shopSearchUrl(pick) {
  return 'https://www.google.com/search?q=' + encodeURIComponent(pick + ' buy');
}

// A photo object is either {url, generated:true} (one of our own images,
// site-root-relative, e.g. "images/generated/ivy/outfit.jpg") or
// {url, credit, profile} (a real Unsplash photo, full external URL,
// resizable via query params joined with "&" since the URL already
// carries its own "?ixid=..." query string).
export function photoSrc(photo, resize) {
  if (!photo) return null;
  if (photo.generated) return withBasePath(photo.url);
  return photo.url + (resize ? '&' + resize : '');
}
