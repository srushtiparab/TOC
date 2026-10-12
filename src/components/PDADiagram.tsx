import { PdaState, TransitionId } from '../pda/engine';
const HOT = '#22d3ee', COLD = '#64748b';
export default function PDADiagram({ state, transition }: { state: PdaState; transition: TransitionId }) {
  const hot = (...ids: TransitionId[]) => ids.includes(transition);
  const col = (...ids: TransitionId[]) => (hot(...ids) ? HOT : COLD);
  const mk = (...ids: TransitionId[]) => `url(#${hot(...ids) ? 'h' : 'a'})`;
  const sw = (...ids: TransitionId[]) => (hot(...ids) ? 4 : 2);
  const circ = (cx: number, cy: number, name: PdaState, label: string, dbl?: boolean) => {
    const on = state === name;
    return (<g>
      <circle cx={cx} cy={cy} r={42} fill={on ? '#0e7490' : '#0f172a'} stroke={on ? HOT : COLD} strokeWidth={on ? 4 : 2} />
      {dbl && <circle cx={cx} cy={cy} r={34} fill="none" stroke={on ? HOT : COLD} strokeWidth={2} />}
      <text x={cx} y={cy + 6} textAnchor="middle" fill="#fff" fontSize="18" fontWeight="700">{label}</text></g>);
  };
  const t = (x: number, y: number, s: string, c: string) => <text x={x} y={y} textAnchor="middle" fill={c} fontSize="15" fontWeight="600">{s}</text>;
  return (
    <div className="panel">
      <h2 className="h2">PDA state diagram</h2>
      <svg viewBox="0 0 660 340" className="w-full" role="img" aria-label="PDA with states q0, q_accept and q_reject">
        <defs>
          <marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill={COLD} /></marker>
          <marker id="h" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill={HOT} /></marker>
        </defs>
        <line x1="20" y1="170" x2="125" y2="170" stroke={COLD} strokeWidth="2" markerEnd="url(#a)" />{t(70, 155, 'start, Z₀', '#94a3b8')}
        <path d="M150 133 C110 30 230 30 192 133" fill="none" stroke={col('T1')} strokeWidth={sw('T1')} markerEnd={mk('T1')} />{t(171, 40, '( , push (', col('T1'))}
        <path d="M150 207 C110 310 230 310 192 207" fill="none" stroke={col('T2')} strokeWidth={sw('T2')} markerEnd={mk('T2')} />{t(171, 325, ') , pop (', col('T2'))}
        <line x1="205" y1="150" x2="490" y2="92" stroke={col('T4')} strokeWidth={sw('T4')} markerEnd={mk('T4')} />
        {t(345, 98, 'End of input,', col('T4'))}{t(345, 116, 'stack = Z₀ → accept', col('T4'))}
        <line x1="205" y1="192" x2="490" y2="250" stroke={col('T3', 'T5')} strokeWidth={sw('T3', 'T5')} markerEnd={mk('T3', 'T5')} />
        {t(350, 216, ') , Z₀ → reject', col('T3'))}{t(350, 276, 'End of input, stack ≠ Z₀ → reject', col('T5'))}
        {circ(170, 170, 'q0', 'q₀')}{circ(530, 70, 'q_accept', 'q_accept', true)}{circ(530, 270, 'q_reject', 'q_reject')}
      </svg>
      <p className="mt-2 text-base text-slate-400">The end-of-input transitions model an end marker: once all symbols are read, the PDA checks whether only Z₀ is left. The highlighted arrow is the transition taken in the current step.</p>
    </div>
  );
}
