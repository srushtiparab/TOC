const Block = ({ t, children }: { t: string; children: React.ReactNode }) => <div className="panel"><h2 className="h2 text-cyan-200">{t}</h2><div className="text-lg leading-relaxed text-slate-300">{children}</div></div>;
const M = ({ children }: { children: React.ReactNode }) => <code className="rounded bg-slate-950 px-2 py-1 font-mono text-cyan-200">{children}</code>;
export default function TheoryPanel() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Block t="What is a PDA?">A Pushdown Automaton is a finite-state machine equipped with a stack. It uses the stack to remember unmatched opening brackets.</Block>
      <Block t="What is a stack?">A Last-In, First-Out (LIFO) data structure. The most recently pushed opening bracket is the first one removed.</Block>
      <Block t="Why use a PDA?">Balanced parentheses require remembering an arbitrary number of unmatched opening brackets. A finite automaton with only finitely many states cannot recognize the general balanced-parentheses language.</Block>
      <Block t="Formal language"><M>L = {'{'} w ∈ {'{'} (, ) {'}'}* | w is balanced {'}'}</M></Block>
      <Block t="Example grammar"><M>S → (S)S | ε</M><p className="mt-3">This context-free grammar generates exactly the balanced-parentheses strings, which is why a PDA (the machine model for CFLs) can recognise them.</p></Block>
      <Block t="Complexity"><p><b>Time:</b> O(n). <b>Auxiliary space:</b> O(n) in the worst case.</p><p className="mt-3">Each input symbol is processed once, and the stack can grow to the input length (for example <M>((((</M>).</p></Block>
      <Block t="Transitions used in this simulator">
        <ol className="list-decimal space-y-1 pl-6">
          <li>q₀, <M>(</M>, any top → push <M>(</M>, stay in q₀</li>
          <li>q₀, <M>)</M>, top <M>(</M> → pop, stay in q₀</li>
          <li>q₀, <M>)</M>, top Z₀ → q_reject</li>
          <li>End of input, stack = Z₀ → q_accept</li>
          <li>End of input, stack ≠ Z₀ → q_reject</li>
        </ol></Block>
    </div>
  );
}
