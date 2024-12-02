import { useContext, useEffect, useRef, useState } from "react";
{/** todo
 - sagas?:
 -- calc wpm set highscore on win handler
 -- reset differently based on isWin/ isFail state

 -- display wpm not based on isWin state, how?
 -- autofocus always no matter where clicked

 -- changeLevelId shortcut handler => custom Hook
  */}

import {
  inputStringChanged,
  levelIdChanged,
  selectLevelString,
  selectInputString,
  selectIsWin,
  selectIsFail,
  selectCurrentLevelHighScore,
  selectTrainerColorClasses,
  selectCurrentWpm,


} from "./reducer";
import { SymbolTrainerContext } from "../../pages/symbol-trainer-redux";

export default function TrainerSection() {
  const { state, dispatch } = useContext(SymbolTrainerContext);
  const inputRef = useRef(null);
  const levelString = selectLevelString(state)
  const inputString = selectInputString(state)
  const isWin = selectIsWin(state)
  const isFail = selectIsFail(state)
  const trainerColorClasses = selectTrainerColorClasses(state)
  const currentWpm = selectCurrentWpm(state) || null

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <section
      id="trainer"
      className={`flex flex-col grow max-w-2xl mx-auto w-full px-4 mt- 20 relativ`}
    >
      <div className="relative pl- 10 font-mono flex mx-auto my-auto text-left text-lg overflow-hidden">
        <div className="">
          <input
          autoFocus={true}
          onBlur={handleBlur}
          disabled={isWin || isFail}
            ref={inputRef}
            type="text"
            value={inputString}
            onChange={(e) => dispatch(inputStringChanged(e.target.value))}
            className={`absolute whitespace-pr   opacity- z-10 tracking-widerer my-auto focus:outline-none bg-transparent w-full
              ${trainerColorClasses}
              `}
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
        <p
          className={`ml-4  min-w-6
        ${
          (isWin ? "block" : "invisible") +
          " " +
          trainerColorClasses
        }
        `}
        >
          {currentWpm}
        </p>
      </div>
    </section>
  );
}
