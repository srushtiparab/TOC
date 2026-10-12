import { AnimatePresence, motion } from 'framer-motion';
import { StackSym } from '../pda/engine';
export default function StackVisualizer({ stack, big }: { stack: StackSym[]; big?: boolean }) {
  const items = stack.map((sym, i) => ({ sym, i })).reverse(); // top first
  const h = big ? 'h-16 text-4xl' : 'h-12 text-2xl';
  return (
    <div className="panel">
      <div className="flex items-center justify-between"><h2 className="h2 mb-0">Stack</h2><span className="rounded-full bg-violet-500/20 px-3 py-1 text-base text-violet-200">Depth: {stack.length - 1}</span></div>
      <p className="mb-3 text-sm text-slate-400">Top is drawn at the top; Z₀ marks the bottom.</p>
      <div className={`mx-auto flex flex-col gap-1 ${big ? 'w-64' : 'w-48'} min-h-[120px]`}>
        <AnimatePresence initial={false} mode="popLayout">
          {items.map(({ sym, i }) => {
            const top = i === stack.length - 1, base = sym === 'Z₀';
            return (
              <motion.div key={i} layout initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}
                className={`relative flex items-center justify-center rounded-lg border-2 font-mono font-bold ${h} ${base ? 'border-slate-500 bg-slate-800 text-slate-300' : 'border-cyan-400 bg-cyan-500/20 text-cyan-100'}`}>
                {sym}
                {top && <span className="absolute -right-24 text-base font-sans font-semibold text-violet-300">← Top</span>}
                {base && <span className="absolute -left-20 text-sm font-sans text-slate-500">bottom</span>}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
