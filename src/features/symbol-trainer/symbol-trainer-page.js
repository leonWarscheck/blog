import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import TrainerSection from './components/trainer-section';
import LevelSection from './components/level-section';
import InfoSection from './components/info-section';
import IntroSection from './components/intro-section';
import SaveSection from './components/save-section';
import MenuTrainer from './components/trainer-menu';
import ResponsiveNote from './components/responsive-note';

export default function SymbolTrainerPage() {
  const [section, setSection] = useState('introSection');
  const [scores, setScores] = useState();
  const [levelId, setLevelId] = useState(1);

  // initial sync from localStorage
  useEffect(() => {
    const lastLevel = JSON.parse(localStorage.getItem('levelId'));
    const scores = JSON.parse(localStorage.getItem('highScores'));
    if (lastLevel) {
      setLevelId(lastLevel);
    }
    setScores(scores);
  }, []);

  return (
    <main className="flex grow flex-col bg-neutral-700">
      <Head>
        <title>SymbolTrainer</title>
      </Head>
      {section === 'trainerSection' && (
        <TrainerSection {...{ setLevelId, levelId, scores, setScores }} />
      )}
      {section === 'levelSection' && (
        <LevelSection
          {...{ setSection, setLevelId, scores, setScores, levelId }}
        />
      )}
      {section === 'infoSection' && <InfoSection />}
      {section === 'introSection' && <IntroSection {...{ setSection }} />}

      {section === 'saveSection' && <SaveSection {...{ scores, setScores }} />}

      <MenuTrainer {...{ setSection, section, levelId, scores }} />
      <ResponsiveNote />
    </main>
  );
}
