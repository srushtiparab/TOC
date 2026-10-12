import { Snapshot, fmtInput, fmtStack } from '../pda/engine';
export default function InstantaneousDescription({ snap }: { snap: Snapshot }) {
  return (
    <div className="panel">
      <h2 className="h2">Instantaneous description (ID)</h2>
      <div className="overflow-x-auto rounded-xl bg-slate-950 px-4 py-3 font-mono text-2xl text-cyan-200">({snap.state}, {fmtInput(snap.remaining)}, {fmtStack(snap.stack)})</div>
      <p className="mt-2 text-base text-slate-300">An ID is the complete configuration of the PDA: (state, remaining input, stack). The stack is written <b>top-first</b>: the leftmost symbol is the top and Z₀ is last. ε means no input is left.</p>
    </div>
  );
}
