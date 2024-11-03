import React from "react";
import levels from "../../data/levels-2.json";
import { saveLastLevel } from "../../utils/trainer-logic";

export default function LevelSection({ setSection, setLevelId, scores, setScores}) {
 



  return (
    <section
      id="level"
      className={`flex grow flex-col `}
    >
      <div className="mx-auto my-auto max-w-2xl  px-4 w-full max-h-[50dvh] overflow-scroll ">
        <ul className=" my-auto w-full space-y- 4">
          {levels.map((level, index) => {
            const score = scores[index]
            return (
              <li key={level.id} className={`w-full ${level.id === 61? "hidden": "flex"}`}>
                <button className={`flex w-full py-2  hover: text-neutral-500 group
                ${(score.wpm >= 60) ? "hover:text-neutral-400" 
                : (score.wpm >= 50) ?  "hover:text-emerald-la" 
                : (score.wpm >= 40) ? "hover:text-yellow-la"
                : (score.wpm >= 30) ?  "hover:text-violet-500"
                : (score.wpm >= 20) ? "hover:text-red-500" 
                : "hover:text-neutral-400"}`}
                onClick={()=>{setSection("trainerSection"); setLevelId(level.id); saveLastLevel(level.id, scores, setScores);}} 
                >
                  <h3 className=" font-bold">
                    <span>Level {level.id} </span>
                  </h3>
                  <h4 className=" flex grow ml-auto">
                    <span className=" ml-2">( {level.case},</span>
                    <span className=" ml-2">
                      {level.length}
                      {level.reverse && ", r"} ) 
                    </span>
                    <span className="ml-auto tracking-wide"> {level.string}</span>{" "}
                    <span className="ml-8 ">WPM</span>
                    <span className="ml-4 font-semibold">{score.wpm.toString().length === 1 ? score.wpm.toString().padStart(2, '0') : score.wpm}</span>
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
