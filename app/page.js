import Link from 'next/link';
import questionData from '../data/questions.json';
import styles from '../data/styles.json';
import { buildQuestions } from '../lib/quiz-data';
import { SITE_URL } from '../lib/paths';
import ResumeBanner from '../components/quiz/ResumeBanner';
import SiteFooter from '../components/shared/SiteFooter';

const { AXES, TOTAL } = buildQuestions(questionData);

export const metadata = {
  title: 'The Measure — A Style Diagnostic',
  alternates: { canonical: SITE_URL + '/' },
};

export default function HomePage() {
  return (
    <>
      <header className="reading-col">
        <div className="kicker eyebrow">
          A Style Diagnostic, in <span>{TOTAL}</span> Questions
        </div>
        <h1>The Measure</h1>
        <div className="dek">
          On the theory that a man&apos;s closet is a confession he keeps making, one garment at a time.
        </div>
        <div className="rule-thin"></div>
        <p className="lead">
          This is not a quiz about what you own. It is a quiz about what you&apos;d choose, given the
          chance, before habit or budget or the weather intervened — your instincts about formality,
          structure, color, history, use, origin, and place, gathered one small forced decision at a
          time. Some questions are about clothes outright. Most are not — they&apos;re about how you
          arrive at a party, keep a to-do list, or feel about the nearest mountain range, on the theory
          that a man&apos;s taste in jackets is just his temperament and his geography, filed under a
          different heading.
        </p>
        <p className="lead">
          Answer honestly and quickly; the second thought is rarely the truer one. At the end you&apos;ll
          see your primary style argued at length, a secondary influence, your reading across every axis
          measured, and — since one style is never the whole story — a full ranked comparison against
          every style on file, so you can look in on the ones that didn&apos;t win.
        </p>
        <div className="stat-row">
          <div className="stat">
            <b>{TOTAL}</b>
            <span>Questions</span>
          </div>
          <div className="stat">
            <b>{styles.length}</b>
            <span>Styles on file</span>
          </div>
          <div className="stat">
            <b>{AXES.length}</b>
            <span>Axes measured</span>
          </div>
        </div>

        <ResumeBanner AXES={AXES} TOTAL={TOTAL} styles={styles} />

        <div className="btn-row">
          <Link className="btn" href="/quiz">
            Begin the Interview
          </Link>
        </div>
      </header>
      <SiteFooter variant="app" />
    </>
  );
}
