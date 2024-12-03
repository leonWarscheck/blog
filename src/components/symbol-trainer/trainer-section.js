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
  const [trainerColorClasses, setTrainerColorClasses] = useState(
    "caret-neutral-200 text-neutral-200"
  );
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

  useEffect(() => {
    if (trainerState !== "fail") {
      const trainerColor =
        scores[levelId]?.wpm >= 60
          ? "neutral-200"
          : scores[levelId]?.wpm >= 50
          ? "emerald-la"
          : scores[levelId]?.wpm >= 40
          ? "yellow-la"
          : scores[levelId]?.wpm >= 30
          ? "violet-500"
          : scores[levelId]?.wpm >= 20
          ? "red-500 "
          : "neutral-200";
      if (trainerState === "win") {
        setTrainerColorClasses("text-" + trainerColor);
      } else {
        setTrainerColorClasses(
          "text-" + trainerColor + " caret-" + trainerColor
        );
      }
    } else {
      setTrainerColorClasses("text-neutral-400");
    }
  }, [scores[levelId], trainerState]);

  // change level shortcut
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key === "ArrowUp" &&
        levelId >= 2
      ) {
        console.log("levelId:", levelId);
        const previousLevel = levelId - 1;
        setLevelId(previousLevel); //check rest in reducer
      } else if (
        (event.metaKey || event.ctrlKey) &&
        event.key === "ArrowDown" &&
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
      className={`flex flex-col grow max-w-2xl mx-auto w-full px-4`}
    >
      <div className=" relative font-mono flex mx-auto my-auto text-left text-lg overflow-hidden">
        <div className="">
          <input
            ref={inputRef}
            type="text"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            className={`absolute whitespace-pr z-10 tracking-widerer my-auto focus:outline-none bg-transparent w-full
                ${trainerColorClasses}
                `}
          />
          <p
            id="bg curtain between"
            className="absolute text-neutral-700 tracking-widerer whitespace-pr  bg-neutral-700 pointer-events-none  "
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
          className={`ml-4  min-w-6 ${
            (trainerState === "win" ? "block" : "invisible") +
            " " +
            trainerColorClasses
          }
        `}
        >
          {wpm}
        </p>
      </div>
    </section>
  );
}
