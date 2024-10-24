import React, { useState } from "react";
import TrainerSection from "../components/symbol-trainer/trainer-section";
import LevelSection from "../components/symbol-trainer/level-section";
import InfoSection from "../components/symbol-trainer/info-section";
import SaveSection from "../components/symbol-trainer/save-section";
import MenuTrainer from "../components/symbol-trainer/menu-trainer";
import ResponsiveNote from "../components/symbol-trainer/responsive-note";

export default function TypeSymbols() {
  const [section, setSection] = useState("levelSection");
  return (
    <main className=" min-h-dv grow flex flex-col bg-neutral-700">
      <TrainerSection {...{ section }} />
      <LevelSection {...{ section, setSection }} />
      <InfoSection {...{ section }} />
      <SaveSection {...{ section }} />

      <MenuTrainer {...{ setSection }} />
      <ResponsiveNote/>
    </main>
  );
}
