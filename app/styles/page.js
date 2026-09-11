import Link from 'next/link';
import styles from '../../data/styles.json';
import { SITE_URL } from '../../lib/paths';
import Masthead from '../../components/shared/Masthead';

export const metadata = {
  title: 'Every Style Profile | The Measure',
  description: 'All 27 menswear style archetypes from The Measure, each with a full profile: history, capsule wardrobe, and more.',
  alternates: { canonical: SITE_URL + '/styles/' },
};

export default function StylesIndexPage() {
  return (
    <>
      <Masthead brandHref="/" />
      <div className="reading-col">
        <h1 className="r-name" style={{ fontSize: 'clamp(32px,6vw,46px)' }}>
          Every Style Profile
        </h1>
        <div className="r-dek">All 27 archetypes, each with its own page.</div>
        <div className="style-index-list">
          {styles.map((s) => (
            <Link key={s.key} className="style-index-row" href={`/styles/${s.key}`}>
              <span className="style-index-name">{s.name}</span>
              <span className="style-index-dek">{s.dek}</span>
            </Link>
          ))}
        </div>
        <div className="btn-row" style={{ marginTop: 40 }}>
          <Link className="btn" href="/">
            Take The Interview Instead
          </Link>
        </div>
      </div>
    </>
  );
}
