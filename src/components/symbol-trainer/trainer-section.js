import React, { useEffect, useRef, useState } from "react";
import levels from "../../data/levels.json";
import {
  checkWin,
  checkSpeed,
  saveScore,
  saveLastLevel,
} from "../../utils/trainer-logic";

export default function TrainerSection({
  setLevelId,
  levelId,
  scores,
  setScores,
}) {
  const [inputString, setInputString] = useState("");
  const [levelString, setLevelString] = useState(null);
  const [trainerState, setTrainerState] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const inputRef = useRef(null);

  // level setup and re-entrypoint save
  useEffect(() => {
    setLevelString(levels[levelId].string);
    saveLastLevel(levelId, scores, setScores);
  }, [levelId]);

  // always focused (except during win/fail-resets)
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  // main typing check logic
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

  // save wpm score to localStorage (wpm set by checkWin & checkspeed)
  useEffect(() => {
    saveScore(wpm, levelId, scores, setScores);
  }, [wpm]);

  // change level shortcut
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key === "k" &&
        levelId >= 2
      ) {
        console.log("levelId:", levelId);
        const previousLevel = levelId - 1;
        setLevelId(previousLevel);
      } else if (
        (event.metaKey || event.ctrlKey) &&
        event.key === "j" &&
        levelId <= scores.length - 2
      ) {
        console.log("levelId:", levelId);
        const nextLevel = levelId + 1;
        setLevelId(nextLevel);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [levelId]);

  return (
    <section
      id="trainer"
      className={`flex flex-col grow max-w-2xl mx-auto w-full px-4 mt- 20  `}
    >
      <div className=" relative font-mono flex mx-auto my-auto text-left text-lg overflow-hidden">
        <div className="">
          <input
            ref={inputRef}
            type="text"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            className={`absolute z-10 whitespace-pr   opacity-  tracking-widerer my-auto focus:outline-none bg-transparent w-full
                ${
                  trainerState !== "fail" &&
                  (scores[levelId]?.wpm >= 60
                    ? "caret-neutral-200 text-neutral-200"
                    : scores[levelId]?.wpm >= 50
                    ? "caret-emerald-la text-emerald-la"
                    : scores[levelId]?.wpm >= 40
                    ? "caret-yellow-la text-yellow-la"
                    : scores[levelId]?.wpm >= 30
                    ? "caret-violet-500 text-violet-500"
                    : scores[levelId]?.wpm >= 20
                    ? "caret-red-500 text-red-500"
                    : "caret-neutral-200 text-neutral-200")
                } ${trainerState === "fail" ? "text-neutral-400" : ""} 
                
              `}
          />
          <p
            id="bg curtain between"
            className="absolute z-10 inset- text-neutral-700 tracking-widerer whitespace-pr  bg-neutral-700 pointer-events-none  "
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
        <p
          className={` ${
            trainerState === "win" ? "block" : "invisible"
          } ml-4  min-w-6
        ${
          scores[levelId]?.wpm >= 60
            ? " text-neutral-200"
            : scores[levelId]?.wpm >= 50
            ? "text-emerald-la"
            : scores[levelId]?.wpm >= 40
            ? "text-yellow-la"
            : scores[levelId]?.wpm >= 30
            ? "text-violet-500"
            : scores[levelId]?.wpm >= 20
            ? "text-red-500"
            : " text-neutral-200"
        }
        `}
        >
          {wpm}
        </p>
      </div>
    </section>
  );
}
