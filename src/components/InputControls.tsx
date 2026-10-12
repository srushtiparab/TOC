import { Play, Pause, StepForward, StepBack, RotateCcw, Shuffle, AlertCircle } from 'lucide-react';
import { Sim } from '../hooks/useSimulator';
import { EXAMPLES } from '../pda/engine';
export default function InputControls({ sim }: { sim: Sim }) {
  const { s, dispatch: d, snap } = sim; const off = !!s.error;
  return (
    <div className="panel space-y-4">
      <label className="block">
        <span className="mb-1 block text-base text-slate-300">Input string (only ( and ); empty = ε)</span>
        <input value={s.input} onChange={e => d({ t: 'input', v: e.target.value })} spellCheck={false} aria-invalid={off}
          placeholder="e.g. (()())" className="w-full rounded-xl border border-slate-600 bg-slate-950 px-4 py-3 font-mono text-3xl tracking-widest text-cyan-200 focus:border-cyan-400 focus:outline-none" />
      </label>
      {s.error && <p role="alert" className="flex items-center gap-2 rounded-lg bg-rose-500/15 px-3 py-2 text-base text-rose-200"><AlertCircle size={18} />{s.error}</p>}
      <div className="flex flex-wrap items-center gap-2">
        {s.running
          ? <button className="btn btn-primary" onClick={() => d({ t: 'pause' })}><Pause size={18} />Pause</button>
          : <button className="btn btn-primary" disabled={off} onClick={() => d({ t: 'run' })}><Play size={18} />Run Automatically</button>}
        <button className="btn" disabled={off || s.cursor === 0} onClick={() => d({ t: 'back' })}><StepBack size={18} />Step Backward</button>
        <button className="btn" disabled={off || (snap.done && s.cursor === s.history.length - 1)} onClick={() => d({ t: 'fwd' })}><StepForward size={18} />Step Forward</button>
        <button className="btn" onClick={() => d({ t: 'reset' })}><RotateCcw size={18} />Reset Simulation</button>
        <button className="btn" onClick={() => d({ t: 'example' })}><Shuffle size={18} />Load Example</button>
        <label className="ml-auto flex items-center gap-2 text-base text-slate-300">Speed
          <select value={s.speed} onChange={e => d({ t: 'speed', v: Number(e.target.value) })} className="rounded-lg border border-slate-600 bg-slate-800 px-2 py-2">
            <option value={0.5}>0.5×</option><option value={1}>1×</option><option value={2}>2×</option>
          </select>
        </label>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="Examples">
        {EXAMPLES.map(e => <button key={e || 'eps'} onClick={() => d({ t: 'input', v: e })} className="rounded-lg border border-violet-400/40 bg-violet-500/10 px-3 py-1 font-mono text-lg text-violet-100 hover:bg-violet-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400">{e || 'ε (empty)'}</button>)}
      </div>
    </div>
  );
}
