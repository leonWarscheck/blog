import React from "react";
import levels from "../../data/levels.json";
import scores from "../../data/scores.json"

export default function LevelSection({ section, setSection }) {
  const colorClasses = [
    "c1: text-neutral-200 c1: group- hover:text-red-500",
    "c1: text-neutral-200 c1: group- hover:text-violet-500",
    "c1: text-neutral-200 c1: group- hover:text-yellow-la",
    "c1: text-neutral-200 c1: group- hover:text-emerald-la",
  ];

  return (
    <section
      id="level"
      className={`${section === "levelSection" ? "flex" : "hidden"} grow`}
    >
      <div className="mx-auto my-auto max-w-2xl px-4 w-full max-h-[50dvh] overflow-scroll">
        <ul className="bg- black my-auto w-full space-y- 4">
          {levels.map((level, index) => {
            const score = scores[index]
            return (
              <li className="flex w-full ">
                <button className={`flex w-full py-2  hover: text-neutral-500 group
                ${(score.wpm >= 80) ? "hover:text-neutral-700" 
                : (score.wpm >= 60) ?  "hover:text-emerald-la" 
                : (score.wpm >= 40) ? "hover:text-yellow-la"
                : (score.wpm >= 20) ?  "hover:text-violet-500"
                : (score.wpm >= 10) ? "hover:text-red-500" 
                : "hover:text-neutral-400"}`}
                onClick={()=>setSection("trainerSection")}
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
                    <span className="ml-auto"> {level.string}</span>{" "}
                    <span className="ml-8 ">WPM</span>
                    <span className="ml-4 font-semibold">{score.wpm}</span>
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
