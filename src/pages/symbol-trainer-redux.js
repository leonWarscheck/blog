import { useContext, createContext, useReducer, useEffect } from "react";
import {
  loadSymbolTrainer,
  selectSection,
  initialState,
  symbolTrainerReducer,
  useSagaReducer,
} from "../features/symbol-trainer-redux/reducer";
import { rootSaga } from "../features/symbol-trainer-redux/sagas";
import Head from "next/head";
import dynamic from "next/dynamic";
import LevelSection from "../features/symbol-trainer-redux/components/level-section-redux";
import HelpSection from "../features/symbol-trainer-redux/components/help-section-redux";
import IntroSection from "../features/symbol-trainer-redux/components/intro-section-redux";
import SaveSection from "../features/symbol-trainer-redux/components/save-section-redux";
import ResponsiveNote from "../features/symbol-trainer-redux/components/responsive-note-redux";
const MenuTrainer = dynamic(
  () => import("../features/symbol-trainer-redux/components/trainer-menu-redux"),
  {
    ssr: false,
  }
);
const TrainerSection = dynamic(
  () => import("../features/symbol-trainer-redux/components/trainer-section-redux"),
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
