import React, { useState } from "react";
import TrainerSection from "../components/symbol-trainer/trainer-section";
import LevelSection from "../components/symbol-trainer/level-section";
import InfoSection from "../components/symbol-trainer/info-section";
import SaveSection from "../components/symbol-trainer/save-section";
import MenuTrainer from "../components/symbol-trainer/menu-trainer";
import ResponsiveNote from "../components/symbol-trainer/responsive-note";

export default function TypeSymbols() {
  const [section, setSection] = useState("trainerSection");
  const [level, setLevel] = useState("8")
  return (
    <main className=" min-h-dv grow flex flex-col bg-neutral-700">
      { section === "trainerSection" && <TrainerSection {...{ level }} />}
      <LevelSection {...{ section, setSection, setLevel }} />
      <InfoSection {...{ section }} />
      <SaveSection {...{ section }} />

      <MenuTrainer {...{ setSection, level }} />
      <ResponsiveNote/>
    </main>
  );
}
