import { Presentation, RotateCcw } from 'lucide-react';
export const TABS = ['Overview', 'Simulator', 'PDA Diagram', 'Theory', 'Test Cases'] as const;
export type Tab = typeof TABS[number];
export default function Header({ tab, setTab, onReset, onPresent }: { tab: Tab; setTab: (t: Tab) => void; onReset: () => void; onPresent: () => void }) {
  return (
    <header className="border-b border-slate-700/60 bg-slate-950/60 px-6 py-4">
      <div className="mx-auto flex max-w-[1700px] flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">PDA Simulator</h1>
          <p className="text-lg text-slate-300">Matching Opening and Closing Brackets</p>
        </div>
        <span className="rounded-full border border-violet-400/60 bg-violet-500/15 px-4 py-1 text-base font-medium text-violet-200">Theory of Computation | FA2</span>
        <div className="flex gap-2">
          <button className="btn" onClick={onPresent}><Presentation size={18} />Presentation mode</button>
          <button className="btn" onClick={onReset}><RotateCcw size={18} />Reset</button>
        </div>
      </div>
      <nav className="mx-auto mt-4 flex max-w-[1700px] flex-wrap gap-2" aria-label="Sections">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} aria-current={tab === t}
            className={`rounded-lg px-4 py-2 text-base font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 ${tab === t ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'}`}>{t}</button>
        ))}
      </nav>
    </header>
  );
}
