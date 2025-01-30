import dynamic from 'next/dynamic';
import Head from 'next/head';
import { createContext, useEffect } from 'react';

import HelpSection from './components/help-section';
import IntroSection from './components/intro-section';
import LevelSection from './components/level-section';
import ResponsiveNote from './components/responsive-note';
import SaveSection from './components/save-section';

import {
  initialState,
  loadSymbolTrainer,
  selectSection,
  symbolTrainerReducer,
  useSagaReducer,
} from './reducer';
import { rootSaga } from './sagas';

const MenuTrainer = dynamic(() => import('./components/trainer-menu'), {
  ssr: false,
});
const TrainerSection = dynamic(
  () => import('./components/trainer-section'),
  {
    ssr: false,
  },
);

export const SymbolTrainerContext = createContext('');

export default function TrainerPage() {
  const { state, dispatch } = useSagaReducer(
    rootSaga,
    symbolTrainerReducer,
    initialState,
  );

  // todo: maybe switch to url based approach in the future
  const section = selectSection(state);

  useEffect(() => {
    dispatch(loadSymbolTrainer());
  }, []);

  return (
    <SymbolTrainerContext.Provider value={{ state, dispatch }}>
      <main className="flex grow flex-col bg-neutral-700">
        <Head>
          <title>SymbolTrainer</title>
        </Head>
        {section === 'trainerSection' && <TrainerSection />}
        {section === 'levelSection' && <LevelSection />}
        {section === 'helpSection' && <HelpSection />}
        {section === 'introSection' && <IntroSection />}
        {section === 'saveSection' && <SaveSection />}
        <MenuTrainer />
        <ResponsiveNote />
      </main>
    </SymbolTrainerContext.Provider>
  );
}
