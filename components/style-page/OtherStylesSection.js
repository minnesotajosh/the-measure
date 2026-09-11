import Link from 'next/link';

export default function OtherStylesSection({ picks }) {
  return (
    <>
      <div className="other-styles">
        {picks.map((s) => (
          <Link key={s.key} className="other-style" href={`/styles/${s.key}`}>
            {s.name}
          </Link>
        ))}
      </div>
      <div className="btn-row" style={{ marginTop: 40 }}>
        <Link className="btn" href="/">
          Take The Full Interview
        </Link>
      </div>
    </>
  );
}
