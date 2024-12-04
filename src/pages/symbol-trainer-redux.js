import { useContext, createContext, useReducer } from "react";
import {
  selectSection,
  initialState,
  symbolTrainerReducer,
  useSagaReducer,
} from "../components/symbol-trainer-redux/reducer";
import { rootSaga } from "../components/symbol-trainer-redux/sagas";
import Head from "next/head";
import dynamic from "next/dynamic";
import TrainerSection from "../components/symbol-trainer-redux/trainer-section-redux";
import LevelSection from "../components/symbol-trainer-redux/level-section-redux";
import HelpSection from "../components/symbol-trainer-redux/help-section-redux";
import IntroSection from "../components/symbol-trainer-redux/intro-section-redux";
import SaveSection from "../components/symbol-trainer-redux/save-section-redux";
import ResponsiveNote from "../components/symbol-trainer-redux/responsive-note-redux";
const MenuTrainer = dynamic(() => import("../components/symbol-trainer-redux/trainer-menu-redux"), {
  ssr: false,
});

export const SymbolTrainerContext = createContext(null);

export default function TrainerPage() {
  const {state, dispatch} = useSagaReducer(rootSaga, symbolTrainerReducer, initialState);

  const section = selectSection(state);

  return (
    <SymbolTrainerContext.Provider value={{ state, dispatch }}>
      <main className="min-h-dv grow flex flex-col bg-neutral-700 ">
      <Head>
        <title>SymbolTrainer</title>
      </Head>
        {section === "trainerSection" && <TrainerSection />}
        {state.section === "levelSection" && <LevelSection />}
        {section === "helpSection" && <HelpSection />}
        {section === "introSection" && <IntroSection />}
        {/* {state.section === "saveSection" && <SaveSection />} */}
        <MenuTrainer />
        <ResponsiveNote />
      </main>
    </SymbolTrainerContext.Provider>
  );
}
