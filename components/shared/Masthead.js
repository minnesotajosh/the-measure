import Link from 'next/link';

// brandHref: if given, "The Measure" is a link back to it; otherwise plain
// text (used on the pages that already are the app's home/quiz/results).
// rightHref+rightLabel render a linked meta item; rightText renders plain
// text instead.
export default function Masthead({ brandHref, rightHref, rightLabel, rightText }) {
  return (
    <div className="masthead">
      <div className="masthead-inner">
        {brandHref ? (
          <Link className="brand" href={brandHref} style={{ textDecoration: 'none', color: 'inherit' }}>
            The Measure
          </Link>
        ) : (
          <span className="brand">The Measure</span>
        )}
        <span className="meta">
          {rightHref ? (
            <Link href={rightHref} style={{ color: 'inherit' }}>
              {rightLabel}
            </Link>
          ) : (
            rightText
          )}
        </span>
      </div>
    </div>
  );
}
