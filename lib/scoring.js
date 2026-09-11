// Ported verbatim from app.js's scoring math, just de-closured so both the
// quiz engine and the results page can call these with explicit arguments.

export function normalized(scores, AXES, BANK) {
  const out = {};
  AXES.forEach((ax) => {
    const v = 5 + 5 * (scores[ax] / BANK[ax].length);
    out[ax] = Math.max(0, Math.min(10, v));
  });
  return out;
}

export function distance(user, vec, AXES) {
  let sum = 0;
  AXES.forEach((ax) => {
    const d = user[ax] - vec[ax];
    sum += d * d;
  });
  return Math.sqrt(sum);
}

export function pctMatch(d, MAX_DIST) {
  return Math.max(0, Math.min(100, Math.round(100 * (1 - d / MAX_DIST))));
}

export function rankStyles(user, STYLES, AXES) {
  return STYLES.map((s) => ({ style: s, d: distance(user, s.vector, AXES) })).sort(
    (a, b) => a.d - b.d
  );
}
