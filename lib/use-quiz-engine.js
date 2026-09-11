'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { normalized } from './scoring';
import { buildSchema, lsGet, saveProgress, saveResult, LS_PROGRESS } from './storage';

// Drives the quiz flow: current question, running per-axis scores, and
// back/undo history. Ported near-verbatim from app.js's answer()/goBack()/
// finishQuiz(), just as explicit state updates instead of closured
// variables mutated in place.
//
// On mount, if this browser has valid in-progress saved state for the
// current question bank (same schema), the quiz picks up where it left
// off -- the equivalent of clicking "Resume" on the old cover screen,
// just automatic now that /quiz is a real, directly-navigable route.
export function useQuizEngine({ AXES, BANK, questions, TOTAL }) {
  const router = useRouter();
  const schema = buildSchema(TOTAL, AXES);

  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState(() => {
    const s = {};
    AXES.forEach((ax) => {
      s[ax] = 0;
    });
    return s;
  });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = lsGet(LS_PROGRESS);
    if (saved && saved.schema === schema && saved.idx > 0 && saved.idx < TOTAL) {
      setIdx(saved.idx);
      setScores(saved.scores);
      setHistory(saved.history || []);
    }
    // Only ever check once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function answer(dir) {
    const q = questions[idx];
    const nextScores = { ...scores, [q.axis]: scores[q.axis] + dir };
    const nextHistory = [...history, { axis: q.axis, dir }];
    const nextIdx = idx + 1;

    if (nextIdx >= TOTAL) {
      const user = normalized(nextScores, AXES, BANK);
      saveResult(schema, user);
      router.push('/results');
      return;
    }

    setScores(nextScores);
    setHistory(nextHistory);
    setIdx(nextIdx);
    saveProgress(schema, nextIdx, nextScores, nextHistory);
  }

  function goBack() {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    const nextHistory = history.slice(0, -1);
    const nextScores = { ...scores, [last.axis]: scores[last.axis] - last.dir };
    const nextIdx = idx - 1;
    setScores(nextScores);
    setHistory(nextHistory);
    setIdx(nextIdx);
    saveProgress(schema, nextIdx, nextScores, nextHistory);
  }

  return {
    currentQuestion: questions[idx],
    idx,
    total: TOTAL,
    canGoBack: history.length > 0,
    progressPct: (idx / TOTAL) * 100,
    answer,
    goBack,
  };
}
