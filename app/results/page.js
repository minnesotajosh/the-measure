'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import questionData from '../../data/questions.json';
import styleData from '../../data/styles.json';
import { buildQuestions } from '../../lib/quiz-data';
import { rankStyles } from '../../lib/scoring';
import { buildSchema, lsGet, clearSaved, LS_RESULT } from '../../lib/storage';
import { SITE_URL } from '../../lib/paths';
import Masthead from '../../components/shared/Masthead';
import SiteFooter from '../../components/shared/SiteFooter';
import AxisMeters from '../../components/results/AxisMeters';
import SecondaryMatchTeaser from '../../components/results/SecondaryMatchTeaser';
import CompareList from '../../components/results/CompareList';
import ShareLinkButton from '../../components/results/ShareLinkButton';

const { AXES, AXIS_META, TOTAL, MAX_DIST } = buildQuestions(questionData);

export default function ResultsPage() {
  const router = useRouter();
  const [ranked, setRanked] = useState(undefined); // undefined = not checked yet, null = nothing saved
  const [user, setUser] = useState(null);

  useEffect(() => {
    const schema = buildSchema(TOTAL, AXES);
    const saved = lsGet(LS_RESULT);
    if (saved && saved.schema === schema) {
      setUser(saved.user);
      setRanked(rankStyles(saved.user, styleData, AXES));
    } else {
      setRanked(null);
    }
  }, []);

  if (ranked === undefined || ranked === null) {
    // Static export can't run the localStorage check server-side, so this
    // (or the brief instant before the effect above resolves) has no
    // result to show yet -- render the shell immediately either way so
    // the page never ships blank, rather than waiting on client JS.
    return (
      <>
        <Masthead rightText="The Reading" />
        <div className="reading-col">
          <div className="hero-title">
            <h1 className="r-name">{ranked === null ? 'No Result Yet' : 'Loading Your Result…'}</h1>
            <div className="r-dek">
              {ranked === null ? 'Take the interview to find your style.' : ''}
            </div>
          </div>
          {ranked === null ? (
            <div className="btn-row">
              <Link className="btn" href="/quiz">
                Begin the Interview
              </Link>
            </div>
          ) : null}
        </div>
        <SiteFooter variant="app" />
      </>
    );
  }

  const primary = ranked[0].style;
  const secondary = ranked[1].style;
  const shareUrl = SITE_URL + '/styles/' + primary.key + '/';

  function retake() {
    clearSaved();
    router.push('/');
  }

  return (
    <>
      <Masthead rightText="The Reading" />
      <div className="reading-col">
        <div className="hero-title">
          <div className="r-eyebrow eyebrow">Your Primary Style</div>
          <h1 className="r-name">{primary.name}</h1>
          <div className="r-dek">{primary.dek}</div>
        </div>

        <section className="section-wrap">
          <div className="content-block">
            <p className="dropcap">{primary.essay[0]}</p>
          </div>
        </section>

        <section className="section-wrap">
          <div className="section-title">The Reading, By the Numbers</div>
          <div className="content-block">
            <div className="section-note">
              Where you fell on every axis measured — not just the two that decided your result.
            </div>
            <AxisMeters AXES={AXES} AXIS_META={AXIS_META} user={user} />
          </div>
        </section>

        <div className="btn-row" style={{ marginTop: 32, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="btn" href={`/styles/${primary.key}`}>
            Read The Full Profile
          </Link>
          <ShareLinkButton url={shareUrl} />
        </div>

        <SecondaryMatchTeaser style={secondary} />

        <section className="section-wrap last-section">
          <div className="section-title">How You Compare</div>
          <div className="content-block">
            <div className="section-note">
              Every style on file, ranked by fit. Each links to its full profile page — including the
              ones you didn&apos;t get, worth a look on their own.
            </div>
            <CompareList ranked={ranked} MAX_DIST={MAX_DIST} />
          </div>
        </section>

        <div className="btn-row" style={{ marginTop: 48 }}>
          <button className="btn btn-ghost" onClick={retake}>
            Retake the Interview
          </button>
        </div>
      </div>
      <SiteFooter variant="app" />
    </>
  );
}
