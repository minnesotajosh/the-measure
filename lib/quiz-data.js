// Builds the same round-robin-interleaved question list app.js built at
// boot time, so every axis's topic rotates every question rather than
// running through one axis at a time.
export function buildQuestions(questionData) {
  const AXES = Object.keys(questionData.axes);
  const AXIS_META = questionData.axes; // { A: {label, poles, image}, ... }
  const BANK = questionData.bank;

  const QPA = Math.min(...AXES.map((ax) => BANK[ax].length));
  const questions = [];
  for (let i = 0; i < QPA; i++) {
    AXES.forEach((ax) => {
      const item = BANK[ax][i];
      questions.push({ axis: ax, a: item.a, b: item.b });
    });
  }
  const TOTAL = questions.length;
  const MAX_DIST = Math.sqrt(AXES.length * 100); // worst-case distance across all axes (0-10 each)

  return { AXES, AXIS_META, BANK, questions, TOTAL, MAX_DIST };
}
