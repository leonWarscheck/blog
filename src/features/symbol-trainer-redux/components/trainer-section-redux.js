import { useContext, useRef } from 'react';

import levels from '../levels-redux.json';
import {
  levelChosenByShortcut,
  selectCurrentWpm,
  selectInputString,
  selectIsFail,
  selectIsWin,
  selectLevelId,
  selectLevelString,
  selectTrainerColorClasses,
  userTypedInTrainerInput,
} from '../reducer';
import { SymbolTrainerContext } from '../symbol-trainer-redux-page';
import { useCustomInputFocusBehaviour } from '../use-custom-input-focus-behaviour-redux';
import { useLevelNavigationShortcut } from '../use-level-navigation-shortcut-redux';

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

  const [handleBlur] = useCustomInputFocusBehaviour(inputRef, isWin, isFail);
  useLevelNavigationShortcut(levelId, levels, levelChosenByShortcut, dispatch);

  return (
    <section
      id="trainer"
      className={`mx-auto flex w-full max-w-2xl grow flex-col px-4`}
    >
      <div className="relative mx-auto my-auto flex overflow-hidden text-left font-mono text-lg">
        <div className="">
          <input
            id="trainerInput"
            autoFocus={true}
            onBlur={handleBlur}
            disabled={isWin || isFail}
            ref={inputRef}
            type="text"
            value={inputString}
            onChange={e => dispatch(userTypedInTrainerInput(e.target.value))}
            className={`absolute z-10 my-auto w-full bg-transparent tracking-widerer focus:outline-none ${trainerColorClasses} `}
          />
          <p
            id="'curtain' between levelString and inputString"
            className="pointer-events-none absolute bg-neutral-700 tracking-widerer text-neutral-700"
          >
            {inputString}
          </p>
        </div>
        <p id="space/placeholder" className="tracking-widerer text-neutral-400">
          {levelString}
        </p>
        <p
          className={`ml-4 min-w-6 ${(isWin ? 'block' : 'invisible') + ' ' + trainerColorClasses} `}
        >
          {currentWpm}
        </p>
      </div>
    </section>
  );
}
