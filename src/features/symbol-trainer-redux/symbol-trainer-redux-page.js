import { useContext, createContext, useReducer, useEffect } from "react";
import {
  loadSymbolTrainer,
  selectSection,
  initialState,
  symbolTrainerReducer,
  useSagaReducer,
} from "./reducer";
import { rootSaga } from "./sagas";
import Head from "next/head";
import dynamic from "next/dynamic";
import LevelSection from "./components/level-section-redux";
import HelpSection from "./components/help-section-redux";
import IntroSection from "./components/intro-section-redux";
import SaveSection from "./components/save-section-redux";
import ResponsiveNote from "./components/responsive-note-redux";
const MenuTrainer = dynamic(
  () => import("./components/trainer-menu-redux"),
  {
    ssr: false,
  }
);
const TrainerSection = dynamic(
  () => import("./components/trainer-section-redux"),
  {
    ssr: false,
  }
);

export const SymbolTrainerContext = createContext(null);

export default function TrainerPage() {
  const { state, dispatch } = useSagaReducer(
    rootSaga,
    symbolTrainerReducer,
    initialState
  );

  const section = selectSection(state);

  useEffect(() => {
    dispatch(loadSymbolTrainer());
  }, []);

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
        {state.section === "saveSection" && <SaveSection />}
        <MenuTrainer />
        <ResponsiveNote />
      </main>
    </SymbolTrainerContext.Provider>
  );
}
