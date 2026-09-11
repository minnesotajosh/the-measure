import styles from '../data/styles.json';
import { SITE_URL } from '../lib/paths';

export const dynamic = 'force-static';

// /quiz and /results are excluded: /quiz is a mid-funnel interaction step,
// not a landing page, and /results is personalized (reads localStorage) --
// empty and worthless to a crawler with no saved state of its own.
export default function sitemap() {
  const urls = [SITE_URL + '/', SITE_URL + '/styles/'].concat(
    styles.map((s) => SITE_URL + '/styles/' + s.key + '/')
  );
  return urls.map((url) => ({ url }));
}
