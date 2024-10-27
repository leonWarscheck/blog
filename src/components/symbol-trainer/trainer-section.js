import React, { useEffect, useRef, useState } from "react";
import levels from "../../data/levels.json";
import { checkWin, checkSpeed, saveScore, getProgressString } from "../../utils/trainer-logic";

export default function TrainerSection({ levelId, scores, setScores }) {
  const [inputString, setInputString] = useState("");
  const [levelString, setLevelString] = useState(null);
  const [progressString, setProgressString] = useState("");
  const [trainerState, setTrainerState] = useState(""); // ready, fail, win
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const inputRef = useRef(null);
  
  useEffect(() => {
    console.log("_________trainer________");
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setLevelString(levels[levelId - 1].string);
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

  useEffect(()=>{
    console.log("daRealIS:", inputString)
    getProgressString(levelString, inputString, setProgressString);
  }, [inputString])

//  useEffect(()=>{
//     setWpm(scores[levelId-1]?.wpm)
//  }, [scores])

  useEffect(() => {
    saveScore(wpm, levelId, scores, setScores);
  }, [wpm]);

  useEffect(() => {
    // console.log("scores in trainer:", scores);
    // console.log("scores[levelId-1].wpm", scores[levelId - 1]?.wpm);
    console.log("trainerState:", trainerState);
  }, [trainerState]);

  useEffect(() => {
    console.log("levelString:", levelString);
  }, [levelString]);

  return (
    <section
      id="trainer"
      className={`flex grow max-w-2xl mx-auto w-full px-4 mt- 20 `}
    >
      <div className=" relative font-mono flex mx-auto my-auto text-left text-lg overflow-hidden">
        <div className="">
          <input
            ref={inputRef}
            className={`absolute whitespace-pr  
            
                ${(trainerState === "ready" || trainerState === "win" ) &&
                  (scores[levelId - 1]?.wpm >= 60
                    ? "caret-neutral-800 text-neutral-800"
                    : scores[levelId - 1]?.wpm >= 55
                    ? "caret-neutral-600 text-neutral-600"
                    : scores[levelId - 1]?.wpm >= 50
                    ? "caret-emerald-la text-emerald-la"
                    : scores[levelId - 1]?.wpm >= 40
                    ? "caret-yellow-la text-yellow-la"
                    : scores[levelId - 1]?.wpm >= 30
                    ? "caret-violet-500 text-violet-500"
                    : scores[levelId - 1]?.wpm >= 20
                    ? "caret-red-500 text-red-500"
                    : "caret-neutral-200 text-neutral-200")
                } ${
              trainerState === "fail" ? "text-neutral-400" : ""
            } 
            z-10  ${trainerState === "win" && "caret-transparent"} opacity-  tracking-widerer my-auto focus:outline-none bg-transparent w-full`}
            type="text"
            value={inputString}
            // value={progressString? progressString : ""}
            // value={trainerState=== "win" ? progressString+"WPM "+wpm : progressString}
            onChange={(e) => setInputString(e.target.value)}
            onBlur={(event)=> {event.isTrusted ? console.log("---------------trusted") : console.log("---------------------NOT trusted")}}
          />
          <p
            id="bg curtain between"
            className="absolute inset- text-neutral-700 tracking-widerer whitespace-pr  bg-neutral-700 pointer-events-none  "
          >
            {inputString}
          </p>
        </div>
        <p
          id="space/placeholder"
          className=" tracking-widerer text-neutral-400 whitespace-pr"
        >
          {levelString}
        </p>
        <p className={` ${trainerState === "win" ? "block" : "invisible"} ml-4  min-w-6
        ${
          scores[levelId - 1]?.wpm >= 60
            ? " text-neutral-800"
            : scores[levelId - 1]?.wpm >= 55
            ? " text-neutral-600"
            : scores[levelId - 1]?.wpm >= 50
            ? "text-emerald-la"
            : scores[levelId - 1]?.wpm >= 40
            ? "text-yellow-la"
            : scores[levelId - 1]?.wpm >= 30
            ? "text-violet-500"
            : scores[levelId - 1]?.wpm >= 20
            ? "text-red-500"
            : " text-neutral-200"
        }
        `}>{wpm}</p>
      </div>
    </section>
  );
}
