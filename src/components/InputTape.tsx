import { Snapshot } from '../pda/engine';
export default function InputTape({ input, snap, big }: { input: string; snap: Snapshot; big?: boolean }) {
  const sz = big ? 'h-24 w-20 text-5xl' : 'h-16 w-14 text-3xl';
  return (
    <div className={big ? '' : 'panel'}>
      {!big && <h2 className="h2">Input tape</h2>}
      <div className="flex flex-wrap items-end gap-2">
        {input === '' ? (
          <div className="rounded-xl border-2 border-cyan-400 bg-cyan-500/15 px-5 py-4 text-2xl text-cyan-200">Empty input (ε){!snap.done && <span className="ml-3 text-base">▲ read-head</span>}</div>
        ) : [...input].map((c, i) => {
          const cur = i === snap.pos && !snap.done, past = i < snap.pos, bad = snap.errorPos === i;
          const cls = bad ? 'border-rose-400 bg-rose-500/25 text-rose-100' : cur ? 'border-cyan-300 bg-cyan-400/25 text-white scale-110' : past ? 'border-slate-700 bg-slate-800 text-slate-500' : 'border-slate-500 bg-slate-900 text-slate-100';
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className={`flex items-center justify-center rounded-xl border-2 font-mono font-bold transition ${sz} ${cls}`}>{c}</div>
              <span className="text-sm text-slate-500">{i + 1}</span>
              <span className={`text-base text-cyan-300 ${cur ? '' : 'invisible'}`}>▲ head</span>
            </div>
          );
        })}
      </div>
      {!big && <p className="mt-2 text-sm text-slate-400"><span className="text-slate-500">■</span> processed &nbsp; <span className="text-cyan-300">■</span> current (next to read) &nbsp; <span className="text-slate-200">■</span> unprocessed &nbsp; <span className="text-rose-300">■</span> offending symbol</p>}
    </div>
  );
}
