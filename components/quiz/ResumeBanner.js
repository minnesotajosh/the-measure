'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { rankStyles } from '../../lib/scoring';
import { buildSchema, lsGet, clearSaved, LS_PROGRESS, LS_RESULT } from '../../lib/storage';

// Mirrors app.js's initResumeBanner(): on mount, checks this browser's
// saved quiz state against the current question bank's schema and offers
// to pick back up, either at a finished result or mid-quiz.
export default function ResumeBanner({ AXES, TOTAL, styles }) {
  const router = useRouter();
  const [state, setState] = useState(null); // null = not checked yet / nothing to offer

  useEffect(() => {
    const schema = buildSchema(TOTAL, AXES);
    const savedResult = lsGet(LS_RESULT);
    const savedProgress = lsGet(LS_PROGRESS);

    if (savedResult && savedResult.schema === schema) {
      const ranked = rankStyles(savedResult.user, styles, AXES);
      setState({ kind: 'result', name: ranked[0].style.name });
    } else if (savedProgress && savedProgress.schema === schema && savedProgress.idx > 0 && savedProgress.idx < TOTAL) {
      setState({ kind: 'progress', idx: savedProgress.idx });
    } else {
      if ((savedResult && savedResult.schema !== schema) || (savedProgress && savedProgress.schema !== schema)) {
        clearSaved();
      }
      setState(false);
    }
  }, [AXES, TOTAL, styles]);

  if (!state) return null;

  function dismiss() {
    clearSaved();
    setState(false);
  }

  if (state.kind === 'result') {
    return (
      <div className="resume-banner">
        <p>Last time, you came out as {state.name}.</p>
        <div className="resume-actions">
          <button className="btn" onClick={() => router.push('/results')}>
            View That Result Again
          </button>
          <button className="btn btn-ghost" onClick={dismiss}>
            Start Over Instead
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="resume-banner">
      <p>You left off at question {state.idx + 1} of {TOTAL}.</p>
      <div className="resume-actions">
        <button className="btn" onClick={() => router.push('/quiz')}>
          Resume
        </button>
        <button className="btn btn-ghost" onClick={dismiss}>
          Start Over Instead
        </button>
      </div>
    </div>
  );
}
