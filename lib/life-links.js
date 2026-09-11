export const LIFE_LABELS = {
  travel: "Where They'd Go", reading: "What They'd Read", music: "What They'd Listen To",
  home: "How They'd Furnish a Room", pastimes: "How They'd Spend a Saturday"
};

// Travel is featured on its own, with its photo, above the grid -- the
// remaining four form a plain single-column, four-row list.
export const LIFE_GRID_ORDER = ['reading', 'music', 'home', 'pastimes'];

// Each links out to whichever real service actually fits it, built from a
// short search query. Pastimes has no outbound link.
export const LIFE_LINKS = {
  reading: { label: 'Find it on Amazon', build: (q) => 'https://www.amazon.com/s?k=' + encodeURIComponent(q) },
  music: { label: 'Listen on YouTube', build: (q) => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q) },
  home: { label: 'See more on Pinterest', build: (q) => 'https://www.pinterest.com/search/pins/?q=' + encodeURIComponent(q) }
};

export const VARIANT_LABELS = {
  hot: "In Hot Weather", cold: "In Cold Weather", rain: "In the Rain",
  snow: "In the Snow", dressedUp: "Dressing It Up"
};
export const VARIANT_ORDER = ['hot', 'cold', 'rain', 'snow', 'dressedUp'];
