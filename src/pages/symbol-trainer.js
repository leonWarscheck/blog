import React, { useEffect, useState } from "react";
import Head from "next/head";
import TrainerSection from "../features/symbol-trainer/components/trainer-section";
import LevelSection from "../features/symbol-trainer/components/level-section";
import InfoSection from "../features/symbol-trainer/components/info-section";
import IntroSection from "../features/symbol-trainer/components/intro-section";
import SaveSection from "../features/symbol-trainer/components/save-section";
import MenuTrainer from "../features/symbol-trainer/components/trainer-menu";
import ResponsiveNote from "../features/symbol-trainer/components/responsive-note";

export default function SymbolTrainerPage() {
  const [section, setSection] = useState("introSection");
  const [scores, setScores] = useState([]);
  const [levelId, setLevelId] = useState(0);

  // initial sync from localStorage
  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem("highScores"));
    const lastLevel = JSON.parse(localStorage.getItem("levelId"));

    setScores(scores);
    setLevelId(lastLevel);
  }, []);

  return (
    <main className="min-h-dv grow flex flex-col bg-neutral-700 ">
      <Head>
        <title>SymbolTrainer</title>
      </Head>
      {section === "trainerSection" && (
        <TrainerSection {...{ setLevelId, levelId, scores, setScores }} />
      )}
      {section === "levelSection" && (
        <LevelSection
          {...{ setSection, setLevelId, scores, setScores, levelId }}
        />
      )}
      {section === "infoSection" && <InfoSection />}
      {section === "introSection" && <IntroSection {...{ setSection }} />}

      {section === "saveSection" && <SaveSection {...{ scores, setScores }} />}

      <MenuTrainer {...{ setSection, section, levelId, scores }} />
      <ResponsiveNote />
    </main>
  );
}
