import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Snapshot, VERDICT_TEXT } from '../pda/engine';
export default function ResultPanel({ snap, input, big }: { snap: Snapshot; input: string; big?: boolean }) {
  if (!snap.verdict) return <div className="panel flex items-center gap-3 text-lg text-slate-300"><Loader2 className="text-cyan-300" />No verdict yet. Step through or run the input to the end.</div>;
  const ok = snap.verdict === 'accepted';
  const where = snap.verdict === 'rejected_close' ? `Input position ${snap.errorPos! + 1} (the symbol "${input[snap.errorPos!]}").` : snap.verdict === 'rejected_open' ? `End of input (position ${input.length}). ${snap.stack.length - 1} opening bracket(s) still on the stack.` : input === '' ? 'Empty input: Z₀ was already the only stack symbol.' : `All ${input.length} symbols read; stack returned to Z₀.`;
  return (
    <div role="status" className={`panel flex items-start gap-4 ${ok ? 'border-emerald-400/70 bg-emerald-500/10' : 'border-rose-400/70 bg-rose-500/10'}`}>
      {ok ? <CheckCircle2 size={big ? 48 : 36} className="shrink-0 text-emerald-300" /> : <XCircle size={big ? 48 : 36} className="shrink-0 text-rose-300" />}
      <div><div className={`font-bold ${big ? 'text-3xl' : 'text-xl'} ${ok ? 'text-emerald-200' : 'text-rose-200'}`}>{VERDICT_TEXT[snap.verdict]}</div>
        <div className="mt-1 text-lg text-slate-200">{where}</div><div className="text-base text-slate-400">{snap.explanation}</div></div>
    </div>
  );
}
