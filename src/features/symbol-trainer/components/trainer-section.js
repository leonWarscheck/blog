import React, { useEffect, useRef, useState } from "react";
import levels from "../levels.json";
import { saveScore, saveLastLevel, checkUserTyping } from "../helpers";
import { useCustomInputFocusBehaviour } from "../use-custom-input-focus-behaviour";
import { useLevelNavigationShortcut } from "../use-level-navigation-shortcut";
import { useTrainerColorSetter } from "../use-trainer-color-setter";

export default function TrainerSection({
  levelId,
  setLevelId,
  scores,
  setScores,
}) {
  const [inputString, setInputString] = useState("");
  const [levelString, setLevelString] = useState(null);
  const [trainerState, setTrainerState] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const [trainerColorClasses, setTrainerColorClasses] = useState(
    "caret-neutral-200 text-neutral-200"
  );
  const inputRef = useRef(null);

  // loading levelString and saving re-entrypoint (lastLevel)
  useEffect(() => {
    setLevelString(levels[levelId]?.string);
    saveLastLevel(levelId);
  }, [levelId]);

  // main typing trainer logic
  useEffect(() => {
    checkUserTyping(
      levelString,
      inputString,
      setInputString,
      startTime,
      setStartTime,
      setWpm,
      setTrainerState
    );
  }, [inputString]);

  // save wpm score to localStorage AND state (wpm set by checkWin & checkspeed)
  useEffect(() => {
    saveScore(wpm, levelId, scores, setScores);
  }, [wpm]);

  // set color classes for typing, winning and failing dependent on current level highScore
  useTrainerColorSetter(scores, levelId, trainerState, setTrainerColorClasses);

  // changing levels shortcut
  useLevelNavigationShortcut(levelId, setLevelId, levels);

  // always focused (except during win/fail-resets)
  const [handleBlur] = useCustomInputFocusBehaviour(
    inputRef,
    trainerState === "win",
    trainerState === "fail"
  );

  return (
    <section
      id="trainer"
      className={`flex flex-col grow max-w-2xl mx-auto w-full px-4`}
    >
      <div className=" relative font-mono flex mx-auto my-auto text-left text-lg overflow-hidden">
        <div className="">
          <input
            id="trainerInput"
            autoFocus={true}
            onBlur={handleBlur}
            disabled={trainerState === "win" || trainerState === "fail"}
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
