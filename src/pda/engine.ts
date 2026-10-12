export type PdaState = 'q0' | 'q_accept' | 'q_reject';
export type StackSym = '(' | 'Z₀';
export type TransitionId = 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | null;
export type Verdict = 'accepted' | 'rejected_close' | 'rejected_open' | null;
export interface Snapshot {
  step: number; pos: number; symbol: string | null; remaining: string; state: PdaState;
  stackBefore: StackSym[]; stack: StackSym[]; op: string; explanation: string;
  transition: TransitionId; verdict: Verdict; done: boolean; errorPos: number | null;
}
export const VERDICT_TEXT: Record<Exclude<Verdict, null>, string> = {
  accepted: 'ACCEPTED — Balanced parentheses',
  rejected_close: 'REJECTED — Closing bracket without a matching opening bracket',
  rejected_open: 'REJECTED — Unmatched opening bracket remains',
};
export const validate = (s: string): string | null => {
  const bad = [...s].find(c => c !== '(' && c !== ')');
  return bad === undefined ? null : `Invalid character "${bad === ' ' ? 'space' : bad}". Use only ( and ) — leave the field empty for the empty string.`;
};
/** Stack is stored bottom-first; it is DISPLAYED top-first, e.g. "((Z₀" (top is leftmost). */
export const fmtStack = (st: StackSym[]) => [...st].reverse().join('');
export const fmtInput = (s: string) => (s === '' ? 'ε' : s);

export function initial(input: string): Snapshot {
  return { step: 0, pos: 0, symbol: null, remaining: input, state: 'q0', stackBefore: ['Z₀'], stack: ['Z₀'],
    op: 'START', explanation: 'The PDA starts in q₀ with only Z₀ on the stack.', transition: null, verdict: null, done: false, errorPos: null };
}
export function next(s: Snapshot, input: string): Snapshot {
  if (s.done) return s;
  const before = s.stack, step = s.step + 1;
  if (s.pos < input.length) {
    const c = input[s.pos];
    const b = { step, pos: s.pos + 1, symbol: c, remaining: input.slice(s.pos + 1), stackBefore: before };
    if (c === '(') {
      const st: StackSym[] = [...before, '('];
      return { ...b, state: 'q0', stack: st, op: 'PUSH (', explanation: 'Opening bracket read: push ( onto the stack.', transition: 'T1', verdict: null, done: false, errorPos: null };
    }
    if (before[before.length - 1] === '(') {
      return { ...b, state: 'q0', stack: before.slice(0, -1), op: 'POP (', explanation: 'Closing bracket read and ( is on top: pop it.', transition: 'T2', verdict: null, done: false, errorPos: null };
    }
    return { ...b, state: 'q_reject', stack: before, op: 'REJECT', explanation: `Closing bracket at position ${s.pos + 1} but only Z₀ is on the stack: no opening bracket to match.`, transition: 'T3', verdict: 'rejected_close', done: true, errorPos: s.pos };
  }
  const b = { step, pos: s.pos, symbol: null, remaining: '', stackBefore: before, stack: before, errorPos: null };
  if (before.length === 1)
    return { ...b, state: 'q_accept', op: 'ACCEPT', explanation: 'End of input and the stack is back to Z₀: every ( was matched.', transition: 'T4', verdict: 'accepted', done: true };
  return { ...b, state: 'q_reject', op: 'REJECT', explanation: `End of input but ${before.length - 1} opening bracket(s) remain on the stack.`, transition: 'T5', verdict: 'rejected_open', done: true };
}
export function runAll(input: string): Snapshot[] {
  const h = [initial(input)];
  while (!h[h.length - 1].done) h.push(next(h[h.length - 1], input));
  return h;
}
export const EXAMPLES = ['()', '(())', '(()())', '((()))', '(()', '())', ')(', ''];
export const TESTS: { input: string; expected: 'accepted' | 'rejected' }[] = [
  ['()', 'a'], ['(())', 'a'], ['(()())', 'a'], ['((()))', 'a'], ['', 'a'],
  ['(()', 'r'], ['())', 'r'], [')(', 'r'], ['((())', 'r'], ['())(()', 'r'],
].map(([input, e]) => ({ input, expected: e === 'a' ? 'accepted' : 'rejected' }));
