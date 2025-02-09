import { useContext, useRef } from 'react';

import { fontMono } from '../../../styles/fonts/fonts';
import levels from '../levels.json';
import {
  levelChosenByShortcut,
  selectCurrentWpm,
  selectInputString,
  selectIsFail,
  selectIsWin,
  selectLevelId,
  selectLevelString,
  selectTrainerStateColor,
  userTypedInTrainerInput,
} from '../reducer';
import { SymbolTrainerContext } from '../symbol-trainer-page';
import { useCustomInputFocusBehaviour } from '../use-custom-input-focus-behaviour';
import { useLevelNavigationShortcut } from '../use-level-navigation-shortcut';

export default function TrainerSection() {
  const { state, dispatch } = useContext(SymbolTrainerContext);
  const inputRef = useRef(null);

  const levelString = selectLevelString(state);
  const inputString = selectInputString(state);
  const isWin = selectIsWin(state);
  const isFail = selectIsFail(state);
  const trainerColorClasses = selectTrainerStateColor(state);
  const currentWpm = selectCurrentWpm(state);
  const levelId = selectLevelId(state);

  const handleInputChange = event => {
    dispatch(userTypedInTrainerInput(event.target.value));
  };

  // The following hooks are not managed via sagas, because they are handling
  // DOM-events:
  const [handleBlur] = useCustomInputFocusBehaviour(inputRef, isWin, isFail);
  useLevelNavigationShortcut(levelId, levels, levelChosenByShortcut, dispatch);

  const dynamicCurrentWpmScoreClasses = isWin ? 'block' : 'invisible';

  return (
    <section
      id="trainer"
      aria-label="trainer-section"
      className={`${fontMono} mx-auto flex w-full max-w-2xl grow flex-col px-4`}
    >
      <div className="relative mx-auto my-auto flex overflow-hidden text-left text-lg">
        <div
        // The main concept here is the `inputString` of the user typing and a
        // same sized background `curtain` overlaying the `levelString`. The
        // font is a monospaced font (all characters have the same width), to
        // ensure a mismatching character correctly covers the underlying
        // `levelstring` character. This also makes the typing motion more
        // consistent.
        >
          <input
            autoFocus={true}
            onBlur={handleBlur}
            disabled={isWin || isFail}
            ref={inputRef}
            type="text"
            value={inputString}
            onChange={handleInputChange}
            className={`absolute z-10 my-auto w-full bg-transparent tracking-widerer focus:outline-none ${trainerColorClasses} `}
          />
          <p className="pointer-events-none absolute bg-neutral-700 tracking-widerer text-neutral-700">
            {inputString}
          </p>
        </div>
        <p className="tracking-widerer text-neutral-400">{levelString}</p>
        <p
          aria-label="current-wpm-score"
          className={`ml-4 min-w-6 ${dynamicCurrentWpmScoreClasses} ${trainerColorClasses}`}
        >
          {currentWpm}
        </p>
      </div>
    </section>
  );
}
