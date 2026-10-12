import { ArrowRight } from 'lucide-react';
import { Sim } from '../hooks/useSimulator';
const PIPE = ['Input String', 'Symbol Processing', 'Stack Operations', 'PDA Decision', 'Final Result'];
export default function DashboardStats({ sim }: { sim: Sim }) {
  const { stats } = sim.s;
  const cards = [['Total test runs', stats.runs, 'text-cyan-300'], ['Accepted inputs', stats.accepted, 'text-emerald-300'], ['Rejected inputs', stats.rejected, 'text-rose-300'], ['Current PDA state', sim.snap.state, 'text-violet-300 font-mono']] as const;
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map(([l, v, c]) => (
          <div key={l} className="panel"><div className="text-base text-slate-400">{l}</div><div className={`mt-1 text-4xl font-bold ${c}`}>{v}</div></div>
        ))}
      </div>
      <p className="text-sm text-slate-400">Counts come from simulations you finish and from Run All Tests. <button className="underline hover:text-white" onClick={() => sim.dispatch({ t: 'clearStats' })}>Clear counts</button></p>
      <div className="panel">
        <h2 className="h2">Why nested parentheses need a stack</h2>
        <p className="max-w-4xl text-lg leading-relaxed text-slate-300">In <span className="font-mono text-cyan-300">((( … )))</span> the machine must remember how many ( are still open, and that number has no upper limit. A finite automaton has only a fixed number of states, so it cannot count without bound. A stack gives the PDA unlimited memory: push each (, pop on each ), and the innermost bracket is always matched first (LIFO).</p>
      </div>
      <div className="panel">
        <h2 className="h2">Processing pipeline</h2>
        <div className="flex flex-wrap items-center gap-3">
          {PIPE.map((p, i) => (
            <div key={p} className="flex items-center gap-3">
              <div className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-4 py-3 text-lg font-medium">{p}</div>
              {i < PIPE.length - 1 && <ArrowRight className="text-violet-300" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
