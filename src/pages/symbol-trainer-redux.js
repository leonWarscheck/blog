import React, { useEffect, useState } from "react";
import TrainerSection from "../components/symbol-trainer-redux/trainer-section-redux";
import LevelSection from "../components/symbol-trainer-redux/level-section-redux";
import InfoSection from "../components/symbol-trainer-redux/info-section-redux";
import IntroSection from "../components/symbol-trainer-redux/intro-section-redux";
import SaveSection from "../components/symbol-trainer-redux/save-section-redux";
import MenuTrainer from "../components/symbol-trainer-redux/trainer-menu-redux";
import ResponsiveNote from "../components/symbol-trainer-redux/responsive-note-redux";
import scoresTemplate from "../data/scores-template.json";

export default function TypeSymbols() {
  const [section, setSection] = useState("introSection");
  const [scores, setScores] = useState([]);
  const [levelId, setLevelId] = useState(0);

  useEffect(() => {
    let fetchedScores = localStorage.getItem("scores");
    let parsedScores;

    if (!fetchedScores) {
      // initialize storage
      localStorage.setItem("scores", JSON.stringify(scoresTemplate));
      fetchedScores = localStorage.getItem("scores");

      parsedScores = JSON.parse(fetchedScores);
      setScores(parsedScores);
    } else {
      // trigger sync of storage to scores state
      parsedScores = JSON.parse(fetchedScores);
      setScores(parsedScores);
    }
  }, []);

  useEffect(() => {
    const lastLevel = scores[0]?.lastLevel || 1;
    setLevelId(lastLevel);
  }, [scores]);

  return (
    <main className="min-h-dv grow flex flex-col bg-neutral-700 ">
      {section === "trainerSection" && (
        <TrainerSection {...{ setLevelId, levelId, scores, setScores }} />
      )}
      {section === "levelSection" && (
        <LevelSection {...{ setSection, setLevelId, scores, setScores }} />
      )}
      {section === "infoSection" && <InfoSection />}
      {section === "introSection" && <IntroSection {...{ setSection }} />}

      {section === "saveSection" && <SaveSection {...{ scores, setScores }} />}

      <MenuTrainer {...{ setSection, section, levelId, scores }} />
      <ResponsiveNote />
    </main>
  );
}
