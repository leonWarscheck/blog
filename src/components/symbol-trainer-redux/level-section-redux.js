import levels from "../../data/levels-redux.json";
import { sectionChanged, levelIdChanged, selectHighScores } from "./reducer";
import { useContext } from "react";
import { SymbolTrainerContext } from "../../pages/symbol-trainer-redux";

export default function LevelSection({ setSection, setLevelId, scores, setScores}) {
const {state, dispatch} = useContext(SymbolTrainerContext);
const highScores = selectHighScores(state);

const highScorePerLevel = (levelId) => {
 // todo: scroll current level into window 

}

  return (
    <section
      id="level"
      className={`flex grow flex-col `}
    >
      <div className="mx-auto my-auto max-w-2xl  px-4 w-full max-h-[50dvh] overflow-scroll ">
        <ul className=" my-auto w-full space-y- 4">
          {levels.map((level, index) => {
            return (
              <li key={level.id} className={`w-full flex`}>
                <button className={`flex w-full py-2 group hover:text-neutral-400
                ${(highScores[level.id] >= 60) ? "text-neutral-400" 
                : (highScores[level.id] >= 50) ?  "text-emerald-la" 
                : (highScores[level.id] >= 40) ? "text-yellow-la"
                : (highScores[level.id] >= 30) ?  "text-violet-500"
                : (highScores[level.id] >= 20) ? "text-red-500" 
                : "text-neutral-500"}`}
                onClick={()=>{dispatch(sectionChanged("trainerSection")); levelIdChanged(index+1);}} 
                >
                  <h3 className=" font-bold">
                    <span>Level {index+1} </span>
                  </h3>
                  <h4 className=" flex grow ml-auto">
                    <span className=" ml-2">( {level.case},</span>
                    <span className=" ml-2">
                      {level.string.length}
                      {level.reverse && ", r"} ) 
                    </span>
                    <span className="ml-auto tracking-wide"> {level.string}</span>{" "}
                    <span className="ml-8 ">WPM</span>
                    <span className="ml-4 font-semibold">{(highScores[level.id]?.toString().length === 1 ? highScores[level.id]?.toString().padStart(3, '0') : highScores[level.id]) ?? "00"}</span>
                  </h4>
                </button>
              </li>
            );
          })}
        </ul>
      </div> 
    </section>
  );
}
