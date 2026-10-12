import { StepBack, StepForward, X, RotateCcw } from 'lucide-react';
import { Sim } from '../hooks/useSimulator';
import { fmtInput } from '../pda/engine';
import InputTape from './InputTape';
import StackVisualizer from './StackVisualizer';
import PDADiagram from './PDADiagram';
import ResultPanel from './ResultPanel';
export default function Presentation({ sim, onExit }: { sim: Sim; onExit: () => void }) {
  const { s, snap, dispatch: d } = sim;
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-[#0a1022] p-6">
      <div className="mx-auto flex max-w-[1800px] flex-col gap-5">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="mr-auto text-3xl font-bold">PDA Simulator — Presentation mode</h1>
          <button className="btn" onClick={() => d({ t: 'input', v: '(())' })}>Guided example ( ( ) )</button>
          <button className="btn" onClick={() => d({ t: 'reset' })}><RotateCcw size={18} />Restart</button>
          <button className="btn" onClick={onExit}><X size={18} />Exit</button>
        </div>
        <div className="panel"><div className="text-lg text-slate-400">Input string: <span className="font-mono text-3xl text-cyan-200">{fmtInput(s.input)}</span></div><div className="mt-4"><InputTape input={s.input} snap={snap} big /></div></div>
        <div className="grid gap-5 lg:grid-cols-[minmax(320px,1fr)_1.4fr]">
          <StackVisualizer stack={snap.stack} big />
          <div className="space-y-5">
            <PDADiagram state={snap.state} transition={snap.transition} />
            <div className="panel"><div className="text-lg text-slate-400">Step {snap.step} · state <span className="font-mono text-violet-300">{snap.state}</span> · operation</div>
              <div className="text-4xl font-bold text-cyan-200">{snap.op}</div><p className="mt-2 text-2xl text-slate-200">{snap.explanation}</p></div>
          </div>
        </div>
        <ResultPanel snap={snap} input={s.input} big />
        <div className="flex justify-center gap-4">
          <button className="btn px-8 py-4 text-xl" disabled={s.cursor === 0} onClick={() => d({ t: 'back' })}><StepBack />Back</button>
          <button className="btn btn-primary px-8 py-4 text-xl" disabled={!!s.error || (snap.done && s.cursor === s.history.length - 1)} onClick={() => d({ t: 'fwd' })}>Next step<StepForward /></button>
        </div>
      </div>
    </div>
  );
}
