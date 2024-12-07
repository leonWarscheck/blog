import levels from "../levels.json";
import { useRef, useEffect } from "react";
import { saveLastLevel, getLevelSectionColor } from "../helper-functions";
export default function LevelSection({
  setSection,
  setLevelId,
  scores,
  levelId,
}) {
  const levelRefs = useRef([]);

  // auto scroll to (current) levelId
  useEffect(() => {
    if (levelId && levelRefs.current[levelId - 1]) {
      levelRefs.current[levelId - 1].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [levelId]);

  return (
    <section id="level" className={`flex grow flex-col `}>
      <div className="mx-auto my-auto max-w-2xl  px-4 w-full max-h-[50dvh] overflow-scroll ">
        <ul className=" my-auto w-full space-y- 4">
          {levels.map((level, index) => {
            const score = scores[index];
            return (
              <li
                key={level.id}
                ref={(el) => (levelRefs.current[index] = el)}
                className={`w-full ${level.id === 0 ? "hidden" : "flex"}`}
              >
                <button
                  className={`flex w-full py-2 group hover:text-neutral-400
                ${getLevelSectionColor(score)}`}
                  onClick={() => {
                    setSection("trainerSection");
                    setLevelId(level.id);
                    saveLastLevel(level.id);
                  }}
                >
                  <h3 className=" font-bold">
                    <span>Level {level.id} </span>
                  </h3>
                  <h4 className=" flex grow ml-auto">
                    <span className=" ml-2">( {level.case},</span>
                    <span className=" ml-2">
                      {level.string.length}
                      {level.reverse && ", r"} )
                    </span>
                    <span className="ml-auto tracking-wide">
                      {" "}
                      {level.string}
                    </span>{" "}
                    <span className="ml-8 ">WPM</span>
                    <span className="ml-4 font-semibold">
                      {score?.toString().length === 1
                        ? score?.toString().padStart(2, "0")
                        : score
                        ? score
                        : "00"}
                    </span>
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
