import React, { useEffect, useState } from "react";
import TrainerSection from "../components/symbol-trainer/trainer-section";
import LevelSection from "../components/symbol-trainer/level-section";
import InfoSection from "../components/symbol-trainer/info-section";
import SaveSection from "../components/symbol-trainer/save-section";
import MenuTrainer from "../components/symbol-trainer/menu-trainer";
import ResponsiveNote from "../components/symbol-trainer/responsive-note";
import scoresTemplate from "../data/scores-template.json";

export default function TypeSymbols() {
  const [section, setSection] = useState("trainerSection");
  const [scores, setScores] = useState([]);
  const [levelId, setLevelId] = useState(49);
  
  
  useEffect(() => {
    console.log("______page reload_____");
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
    console.log("setScores")
  }, []);
  
  

  useEffect(() => {
        const lastLevel = scores[48]?.lastLevel || 49; 
        setLevelId(lastLevel);
        console.log(scores[48] , "set lastLevel from scores")
  }, [scores]);


  return (
    <main className="min-h-dv grow flex flex-col bg-neutral-700">
      {section === "trainerSection" && <TrainerSection {...{ levelId , scores, setScores}} />}
      {section === "levelSection" && (
        <LevelSection {...{ setSection, setLevelId, scores, setScores }} />
      )}
      {section === "infoSection" && <InfoSection />}
      {section === "saveSection" && <SaveSection {...{}} />}

      <MenuTrainer {...{ setSection, levelId }} />
      <ResponsiveNote />
    </main>
  );
}
