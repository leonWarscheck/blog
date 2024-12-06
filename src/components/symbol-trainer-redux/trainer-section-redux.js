import { useContext, useEffect, useRef, useState } from "react";
import {
  userTypedInTrainerInput,
  levelIdChanged,
  selectLevelString,
  selectInputString,
  selectIsWin,
  selectIsFail,
  selectTrainerColorClasses,
  selectCurrentWpm,
  selectLevelId,
} from "./reducer";
import { SymbolTrainerContext } from "../../pages/symbol-trainer-redux";
import levels from "../../data/levels-redux.json";
import { useLevelNavigation } from "./use-level-navigation-hook";
import { useCustomInputFocus } from "./use-custom-input-focus";

export default function TrainerSection() {
  const { state, dispatch } = useContext(SymbolTrainerContext);
  const inputRef = useRef(null);

  const levelString = selectLevelString(state);
  const inputString = selectInputString(state);
  const isWin = selectIsWin(state);
  const isFail = selectIsFail(state);
  const trainerColorClasses = selectTrainerColorClasses(state);
  const currentWpm = selectCurrentWpm(state);
  const levelId = selectLevelId(state);
  console.log("currentwpm: ", currentWpm);

  const [handleBlur] = useCustomInputFocus(inputRef, isWin, isFail);
  useLevelNavigation(levelId, levels, levelIdChanged, dispatch);

  return (
    <section
      id="trainer"
      className={`flex flex-col grow max-w-2xl mx-auto w-full px-4`}
    >
      <div className="relative font-mono flex mx-auto my-auto text-left text-lg overflow-hidden">
        <div className="">
          <input
            autoFocus={true}
            onBlur={handleBlur}
            disabled={isWin || isFail}
            ref={inputRef}
            type="text"
            value={inputString}
            onChange={(e) => dispatch(userTypedInTrainerInput(e.target.value))}
            className={`absolute whitespace-pr z-10 tracking-widerer my-auto focus:outline-none bg-transparent w-full
              ${trainerColorClasses}
              `}
          />
          <p
            id="bg curtain between"
            className="absolute text-neutral-700 tracking-widerer whitespace-pr  bg-neutral-700 pointer-events-none "
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
        ${(isWin ? "block" : "invisible") + " " + trainerColorClasses}
        `}
        >
          {currentWpm}
        </p>
      </div>
    </section>
  );
}
