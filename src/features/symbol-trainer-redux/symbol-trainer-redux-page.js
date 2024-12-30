import dynamic from 'next/dynamic';
import Head from 'next/head';
import { createContext, useEffect } from 'react';

import HelpSection from './components/help-section-redux';
import IntroSection from './components/intro-section-redux';
import LevelSection from './components/level-section-redux';
import ResponsiveNote from './components/responsive-note-redux';
import SaveSection from './components/save-section-redux';

import {
  initialState,
  loadSymbolTrainer,
  selectSection,
  symbolTrainerReducer,
  useSagaReducer,
} from './reducer';
import { rootSaga } from './sagas';

const MenuTrainer = dynamic(() => import('./components/trainer-menu-redux'), {
  ssr: false,
});
const TrainerSection = dynamic(
  () => import('./components/trainer-section-redux'),
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
