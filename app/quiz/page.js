'use client';

import questionData from '../../data/questions.json';
import { buildQuestions } from '../../lib/quiz-data';
import { useQuizEngine } from '../../lib/use-quiz-engine';
import Masthead from '../../components/shared/Masthead';
import SiteFooter from '../../components/shared/SiteFooter';
import ChoiceButton from '../../components/quiz/ChoiceButton';

const { AXES, BANK, questions, TOTAL } = buildQuestions(questionData);

function pad(n) {
  return n < 10 ? '0' + n : '' + n;
}

export default function QuizPage() {
  const engine = useQuizEngine({ AXES, BANK, questions, TOTAL });
  const q = engine.currentQuestion;

  return (
    <>
      <div id="railWrap">
        <div id="rail" style={{ width: engine.progressPct + '%' }} />
      </div>
      <Masthead rightText={'No. ' + pad(engine.idx + 1) + ' — of ' + TOTAL} />
      <div className="reading-col">
        <div className="qhead">
          <div className="qnum">{'Question ' + pad(engine.idx + 1)}</div>
          <div className="qtext fade-in" key={engine.idx}>
            Which is closer to true?
          </div>
        </div>
        <div className="choices">
          <ChoiceButton letter="A" text={q.a} onClick={() => engine.answer(1)} />
          <ChoiceButton letter="B" text={q.b} onClick={() => engine.answer(-1)} />
        </div>
        <div className="qfoot">
          <button disabled={!engine.canGoBack} onClick={engine.goBack}>
            ← Previous
          </button>
          <span className="dots">{Math.round(engine.progressPct) + '% through'}</span>
        </div>
      </div>
      <SiteFooter variant="app" />
    </>
  );
}
