import React, { useEffect, useState } from "react";
import TrainerSection from "../components/symbol-trainer/trainer-section";
import LevelSection from "../components/symbol-trainer/level-section";
import InfoSection from "../components/symbol-trainer/info-section";
import InfoHint from "../components/symbol-trainer/info-hint";
import SaveSection from "../components/symbol-trainer/save-section";
import MenuTrainer from "../components/symbol-trainer/menu-trainer";
import ResponsiveNote from "../components/symbol-trainer/responsive-note";
import scoresTemplate from "../data/scores-template-2.json";
import { notNewUser } from "../utils/trainer-logic";

export default function TypeSymbols() {
  const [section, setSection] = useState("trainerSection");
  const [scores, setScores] = useState([]);
  const [levelId, setLevelId] = useState(61);
  
  
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
        const lastLevel = scores[60]?.lastLevel || 1; 
        setLevelId(lastLevel);
        console.log(scores[60] , "set lastLevel from scores")
        if (scores[60]?.newUser){setSection("infoSection"); notNewUser( scores, setScores);}else{setSection("trainerSection")}
  }, [scores]);


  return (
    <main className="min-h-dv grow flex flex-col bg-neutral-700">
      {section === "trainerSection" && <TrainerSection {...{ levelId , scores, setScores}} />}
      {section === "levelSection" && (
        <LevelSection {...{ setSection, setLevelId, scores, setScores }} />
      )}
      {section === "infoSection" && <InfoSection />}
      {section === "infoHint" && <InfoHint />}

      {section === "saveSection" && <SaveSection {...{scores, setScores}} />}

      <MenuTrainer {...{ setSection, section, levelId, scores }} />
      <ResponsiveNote />
    </main>
  );
}
