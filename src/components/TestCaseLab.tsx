import { CheckCircle2, FlaskConical, XCircle } from 'lucide-react';
import { Sim } from '../hooks/useSimulator';
import { TESTS } from '../pda/engine';
export default function TestCaseLab({ sim, onLoad }: { sim: Sim; onLoad: (i: string) => void }) {
  const res = sim.s.tests; const passed = res?.filter(r => r.pass).length ?? 0;
  return (
    <div className="panel">
      <div className="mb-3 flex flex-wrap items-center gap-4">
        <h2 className="h2 mb-0">Test case laboratory</h2>
        <button className="btn btn-primary" onClick={() => sim.dispatch({ t: 'tests' })}><FlaskConical size={18} />Run All Tests</button>
        {res && <span className="text-xl font-semibold text-cyan-200">Pass rate: {passed}/{res.length} ({Math.round((passed / res.length) * 100)}%)</span>}
      </div>
      <table className="w-full text-left text-lg">
        <thead className="text-slate-400"><tr><th className="py-2">Input</th><th>Expected</th><th>Actual</th><th>Status</th></tr></thead>
        <tbody>{TESTS.map((t, i) => { const r = res?.[i]; return (
          <tr key={i} tabIndex={0} onClick={() => onLoad(t.input)} onKeyDown={e => e.key === 'Enter' && onLoad(t.input)} className="cursor-pointer border-t border-slate-800 hover:bg-slate-800/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400">
            <td className="py-2 font-mono">{t.input === '' ? 'ε (empty)' : t.input}</td><td>{t.expected}</td><td>{r?.actual ?? '—'}</td>
            <td>{r ? (r.pass ? <span className="flex items-center gap-1 text-emerald-300"><CheckCircle2 size={18} />Pass</span> : <span className="flex items-center gap-1 text-rose-300"><XCircle size={18} />Fail</span>) : <span className="text-slate-500">Not run</span>}</td>
          </tr>); })}</tbody>
      </table>
      <p className="mt-2 text-sm text-slate-400">Click a row (or press Enter) to load that input into the simulator.</p>
    </div>
  );
}
