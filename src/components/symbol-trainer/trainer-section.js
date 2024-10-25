import React, { useEffect, useRef, useState } from "react";
import levels from "../../data/levels.json";
// import scores from "../../data/scores.json";
import { checkWin, checkSpeed, saveScore } from "../../utils/trainer-logic";

export default function TrainerSection({ levelId, scores }) {
  console.log("_________trainer________component cycle start");
  const [inputString, setInputString] = useState("");
  const [levelString, setLevelString] = useState("");
  const [trainerState, setTrainerState] = useState(""); // ready, fail, win
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setLevelString(levels[levelId-1].string);
  }, [levelId]);

  const handleBlur = (e) => {
    inputRef.current.focus();
  };

  useEffect(() => {
    checkWin(
      inputString,
      levelString,
      setInputString,
      setTrainerState,
      inputRef
    );
    checkSpeed(
      inputString,
      levelString,
      trainerState,
      setStartTime,
      setEndTime,
      startTime,
      endTime,
      setWpm
    );
  }, [inputString]);

  // useEffect(() => {
  //   saveScore(wpm, levelId, scores);
  // });

  useEffect(() => {
    console.log("scores in trainer:", scores)
    console.log("scores[levelId-1].wpm", scores?? scores[levelId-1].wpm)
    console.log("trainerState:", trainerState);
  }, [trainerState]);

  return (
    <section
      id="trainer"
      className={`flex grow max-w-2xl mx-auto w-full px-4 mt- 20 `}
    >
      <div className=" relative mx-auto my-auto text-left text-lg overflow-hidden">
        <div className="">
          <input
            ref={inputRef}
            className={`absolute whitespace-pre  ${
              trainerState === "fail" ? "text-neutral-400" : "text-neutral-200"
            } 
            
                ${ (scores[levelId-1]?.wpm >= 60) ? "caret-neutral-700" 
                : (scores[levelId-1]?.wpm >= 55) ?  "*:caret-neutral-600" 
                : (scores[levelId-1]?.wpm >= 50) ?  "caret-emerald-la" 
                : (scores[levelId-1]?.wpm >= 40) ? "caret-yellow-la"
                : (scores[levelId-1]?.wpm >= 30) ?  "caret-violet-500"
                : (scores[levelId-1]?.wpm >= 20) ? "caret-red-500" 
                : "caret-neutral-200"}
            z-10  caret-transparen tracking-widerer my-auto focus:outline-none bg-transparent w-full`}
            type="text"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            // onBlur={handleBlur}
          />
          <p
            id="bg curtain between"
            className="absolute inset- text-neutral-700 tracking-widere whitespace-pre  bg-neutral-700 pointer-events-none  "
          >
            {inputString}
          </p>
        </div>
        <p
          id="space/placeholder"
          className=" tracking-widerer text-neutral-400 whitespace-pre"
        >
          {levelString}
        </p>
      </div>
    </section>
  );
}
