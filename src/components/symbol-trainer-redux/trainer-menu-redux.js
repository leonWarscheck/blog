import { useContext } from "react";
import { TrainerPageContext } from "../../pages/symbol-trainer-redux"

export default function MenuTrainer() {
  const {state, dispatch} = useContext(TrainerPageContext);
  
  const handleLevelToggle = () => {
    if (section === "levelSection") {
      setSection("trainerSection");
    } else {
      setSection("levelSection");
    }
  };
  const handleInfoToggle = () => {
    if (section === "infoSection") {
      setSection("trainerSection");
    } else {
      setSection("infoSection");
    }
  };
  const handleSaveToggle = () => {
    if (section === "saveSection") {
      setSection("trainerSection");
    } else {
      setSection("saveSection");
    }
  };

  return (
    <nav
      id="menu"
      className=" text-neutral-500 flex max-w-2xl w-full mx-auto px-4 mb-2 "
    >
      <ul className="flex w-full">
        <li className="mr-aut font-semibold text- 2xl hover:text-neutral-200">
          <button onClick={() => setSection("trainerSection")}>
            SymbolTrainer
          </button>
        </li>{" "}
        <li className="ml-auto mr-4 hover:text-neutral-200 mt-px font-medium">
          <button onClick={handleLevelToggle}>
            Level&nbsp;
            {state.levelId.toString().length === 1
              ? state.levelId.toString().padStart(2, "0")
              : state.levelId}
            &nbsp;/&nbsp;
            {state.scores[state.levelId]?.wpm.toString().length === 1
              ? state.scores[state.levelId]?.wpm.toString().padStart(2, "0")
              : state.scores[state.levelId]?.wpm}
          </button>
        </li>
        <li className="hover:text-neutral-200 mt-px font-medium mr-4">
          <button onClick={handleInfoToggle}>Help</button>
        </li>{" "}
        <li className="hover:text-neutral-200 mt-px font-medium">
          <button onClick={handleSaveToggle}>Save</button>
        </li>{" "}
      </ul>
    </nav>
  );
}
