import React, { useEffect, useState } from "react";
import TrainerSection from "../components/symbol-trainer/trainer-section";
import LevelSection from "../components/symbol-trainer/level-section";
import InfoSection from "../components/symbol-trainer/info-section";
import SaveSection from "../components/symbol-trainer/save-section";
import MenuTrainer from "../components/symbol-trainer/menu-trainer";
import ResponsiveNote from "../components/symbol-trainer/responsive-note";
// import scores from "../data/scores.json";
import scoresTemplate from "../data/scores-template.json";

export default function TypeSymbols() {
  const [section, setSection] = useState("trainerSection");
  const [scores, setScores] = useState([]);
  const [levelId, setLevelId] = useState(49);

  
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
      // trigger sync of storage to scores
      parsedScores = JSON.parse(fetchedScores);
      setScores(parsedScores);
    }
  }, []);
  
  

  useEffect(() => {
        const lastLevel = scores[48]?.lastLevel || 49; 
        setLevelId(lastLevel);
  }, [scores]);


  return (
    <main className="min-h-dv grow flex flex-col bg-neutral-700">
      {section === "trainerSection" && <TrainerSection {...{ levelId }} />}
      {section === "levelSection" && (
        <LevelSection {...{ setSection, setLevelId }} />
      )}
      {section === "infoSection" && <InfoSection />}
      {section === "saveSection" && <SaveSection {...{}} />}

      <MenuTrainer {...{ setSection, levelId }} />
      <ResponsiveNote />
    </main>
  );
}
