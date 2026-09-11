import Link from 'next/link';
import { pctMatch } from '../../lib/scoring';

function pad(n) {
  return n < 10 ? '0' + n : '' + n;
}

// Each row links straight to that style's real page rather than duplicating
// the full essay/capsule/etc. inline -- that content lives in exactly one
// place, which is also the page search engines index.
export default function CompareList({ ranked, MAX_DIST }) {
  return (
    <div className="compare-list">
      {ranked.map((entry, i) => {
        const style = entry.style;
        const pct = pctMatch(entry.d, MAX_DIST);
        return (
          <Link key={style.key} className="compare-row" href={`/styles/${style.key}`}>
            <span className="compare-rank">{pad(i + 1)}</span>
            <span className="compare-main">
              <span className="compare-name">{style.name}</span>
              {i === 0 ? (
                <span className="compare-tag">Primary</span>
              ) : i === 1 ? (
                <span className="compare-tag">Secondary</span>
              ) : null}
              <span className="compare-bar-track">
                <span className="compare-bar-fill" style={{ width: pct + '%' }} />
              </span>
            </span>
            <span className="compare-pct">{pct}%</span>
            <span className="compare-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        );
      })}
    </div>
  );
}
