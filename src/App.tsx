import { useState } from 'react';
import { useSimulator } from './hooks/useSimulator';
import Header, { Tab } from './components/Header';
import DashboardStats from './components/DashboardStats';
import InputControls from './components/InputControls';
import InputTape from './components/InputTape';
import StackVisualizer from './components/StackVisualizer';
import PDADiagram from './components/PDADiagram';
import TransitionLog from './components/TransitionLog';
import InstantaneousDescription from './components/InstantaneousDescription';
import ResultPanel from './components/ResultPanel';
import TheoryPanel from './components/TheoryPanel';
import TestCaseLab from './components/TestCaseLab';
import Presentation from './components/Presentation';
export default function App() {
  const sim = useSimulator(); const { s, snap, dispatch } = sim;
  const [tab, setTab] = useState<Tab>('Overview'); const [present, setPresent] = useState(false);
  if (present) return <Presentation sim={sim} onExit={() => setPresent(false)} />;
  return (
    <div>
      <Header tab={tab} setTab={setTab} onReset={() => dispatch({ t: 'reset' })} onPresent={() => { dispatch({ t: 'input', v: '(())' }); setPresent(true); }} />
      <main className="mx-auto max-w-[1700px] space-y-5 px-6 py-6">
        {tab === 'Overview' && <DashboardStats sim={sim} />}
        {tab === 'Simulator' && (<>
          <InputControls sim={sim} />
          <InputTape input={s.error ? '' : s.input} snap={snap} />
          <div className="grid gap-5 lg:grid-cols-[minmax(320px,1fr)_1.6fr]">
            <StackVisualizer stack={snap.stack} />
            <div className="space-y-5"><InstantaneousDescription snap={snap} /><ResultPanel snap={snap} input={s.input} /></div>
          </div>
          <TransitionLog sim={sim} />
        </>)}
        {tab === 'PDA Diagram' && (<><InputControls sim={sim} /><PDADiagram state={snap.state} transition={snap.transition} /><InstantaneousDescription snap={snap} /></>)}
        {tab === 'Theory' && <TheoryPanel />}
        {tab === 'Test Cases' && <TestCaseLab sim={sim} onLoad={i => { dispatch({ t: 'input', v: i }); setTab('Simulator'); }} />}
      </main>
    </div>
  );
}
