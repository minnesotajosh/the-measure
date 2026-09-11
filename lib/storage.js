// LocalStorage persistence for quiz progress/result, guarded by a schema
// string (TOTAL + axis letters) so a saved run from a previous version of
// the question bank is never misread -- ported verbatim from app.js.

export const LS_PROGRESS = 'measure:progress';
export const LS_RESULT = 'measure:result';
export const LS_THEME = 'measure:theme';

export function buildSchema(TOTAL, AXES) {
  return TOTAL + '|' + AXES.join('');
}

export function lsGet(key) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  } catch (e) {
    return null;
  }
}

export function lsSet(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    /* private mode, quota, etc. */
  }
}

export function lsRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {}
}

export function saveProgress(schema, idx, scores, history) {
  lsSet(LS_PROGRESS, { schema, idx, scores, history });
}

export function saveResult(schema, user) {
  lsSet(LS_RESULT, { schema, user });
}

export function clearSaved() {
  lsRemove(LS_PROGRESS);
  lsRemove(LS_RESULT);
}
