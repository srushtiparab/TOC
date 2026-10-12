import { useEffect, useReducer } from 'react';
import { EXAMPLES, TESTS, Snapshot, initial, next, runAll, validate } from '../pda/engine';
export interface Stats { runs: number; accepted: number; rejected: number }
export interface TestRow { input: string; expected: string; actual: string; pass: boolean }
interface S { input: string; error: string | null; history: Snapshot[]; cursor: number; running: boolean; speed: number; counted: boolean; stats: Stats; tests: TestRow[] | null; ex: number }
type A = { t: 'input'; v: string } | { t: 'fwd' } | { t: 'back' } | { t: 'goto'; i: number } | { t: 'reset' } | { t: 'run' } | { t: 'pause' }
  | { t: 'speed'; v: number } | { t: 'tests' } | { t: 'clearStats' } | { t: 'example' };
const zero: Stats = { runs: 0, accepted: 0, rejected: 0 };
const fresh = (input: string, s: S): S => ({ ...s, input, error: validate(input), history: [initial(validate(input) ? '' : input)], cursor: 0, running: false, counted: false });
const init: S = fresh('(())', { input: '', error: null, history: [], cursor: 0, running: false, speed: 1, counted: false, stats: zero, tests: null, ex: 0 });

function reducer(s: S, a: A): S {
  switch (a.t) {
    case 'input': return fresh(a.v, s);
    case 'example': return { ...fresh(EXAMPLES[s.ex], s), ex: (s.ex + 1) % EXAMPLES.length };
    case 'reset': return fresh(s.input, s);
    case 'speed': return { ...s, speed: a.v };
    case 'pause': return { ...s, running: false };
    case 'clearStats': return { ...s, stats: zero, tests: null };
    case 'back': return s.cursor > 0 ? { ...s, cursor: s.cursor - 1, running: false } : { ...s, running: false };
    case 'goto': return { ...s, cursor: Math.min(Math.max(a.i, 0), s.history.length - 1), running: false };
    case 'run': {
      if (s.error) return s;
      const base = s.history[s.cursor].done ? fresh(s.input, s) : s;
      return { ...base, running: true };
    }
    case 'fwd': {
      if (s.error) return s;
      if (s.cursor < s.history.length - 1) return { ...s, cursor: s.cursor + 1 };
      const cur = s.history[s.cursor];
      if (cur.done) return { ...s, running: false };
      const n = next(cur, s.input);
      const stats = n.done && !s.counted
        ? { runs: s.stats.runs + 1, accepted: s.stats.accepted + (n.verdict === 'accepted' ? 1 : 0), rejected: s.stats.rejected + (n.verdict === 'accepted' ? 0 : 1) }
        : s.stats;
      return { ...s, history: [...s.history, n], cursor: s.cursor + 1, running: n.done ? false : s.running, counted: s.counted || n.done, stats };
    }
    case 'tests': {
      const rows = TESTS.map(t => { const f = runAll(t.input).at(-1)!; const actual = f.verdict === 'accepted' ? 'accepted' : 'rejected'; return { input: t.input, expected: t.expected, actual, pass: actual === t.expected }; });
      const acc = rows.filter(r => r.actual === 'accepted').length;
      return { ...s, tests: rows, stats: { runs: s.stats.runs + rows.length, accepted: s.stats.accepted + acc, rejected: s.stats.rejected + rows.length - acc } };
    }
  }
}
export function useSimulator() {
  const [s, dispatch] = useReducer(reducer, init);
  useEffect(() => {
    if (!s.running) return;
    const id = window.setTimeout(() => dispatch({ t: 'fwd' }), 900 / s.speed);
    return () => window.clearTimeout(id); // one timer at a time: no concurrent runs, no stale updates
  }, [s.running, s.cursor, s.speed, s.history]);
  return { s, dispatch, snap: s.history[s.cursor] };
}
export type Sim = ReturnType<typeof useSimulator>;
