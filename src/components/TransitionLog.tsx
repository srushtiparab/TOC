import { Sim } from '../hooks/useSimulator';
import { fmtInput, fmtStack } from '../pda/engine';
export default function TransitionLog({ sim }: { sim: Sim }) {
  const { s, dispatch } = sim; const rows = s.history.slice(0, s.cursor + 1);
  return (
    <div className="panel overflow-x-auto">
      <h2 className="h2">Transition log</h2>
      <table className="w-full min-w-[900px] text-left text-base">
        <thead className="text-slate-400"><tr>{['Step', 'Symbol', 'Remaining', 'State', 'Stack before', 'Operation', 'Stack after', 'Explanation'].map(h => <th key={h} className="px-2 py-2 font-medium">{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} onClick={() => dispatch({ t: 'goto', i })} className={`cursor-pointer border-t border-slate-800 ${i === s.cursor ? 'bg-cyan-500/15 font-medium' : 'hover:bg-slate-800/60'}`}>
              <td className="px-2 py-2">{r.step}</td><td className="px-2 font-mono">{i === 0 ? '—' : r.symbol ?? 'end'}</td>
              <td className="px-2 font-mono">{fmtInput(r.remaining)}</td><td className="px-2 font-mono">{r.state}</td>
              <td className="px-2 font-mono">{i === 0 ? '—' : fmtStack(r.stackBefore)}</td><td className="px-2 font-semibold text-cyan-200">{r.op}</td>
              <td className="px-2 font-mono">{fmtStack(r.stack)}</td><td className="px-2 text-slate-300">{r.explanation}</td>
            </tr>))}
        </tbody>
      </table>
      <p className="mt-2 text-sm text-slate-400">Click any row to jump to that step. Stacks are written top-first.</p>
    </div>
  );
}
