import React, { useEffect, useRef, useState } from 'react';

import { checkUserTyping, saveLastLevel, saveScore } from '../helpers';
import levels from '../levels.json';
import { useCustomInputFocusBehaviour } from '../use-custom-input-focus-behaviour';
import { useLevelNavigationShortcut } from '../use-level-navigation-shortcut';
import { useTrainerColorSetter } from '../use-trainer-color-setter';

export default function TrainerSection({
  levelId,
  setLevelId,
  scores,
  setScores,
}) {
  const [inputString, setInputString] = useState('');
  const [levelString, setLevelString] = useState(null);
  const [trainerState, setTrainerState] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const [trainerColorClasses, setTrainerColorClasses] = useState(
    'caret-neutral-200 text-neutral-200',
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
      setTrainerState,
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
    trainerState === 'win',
    trainerState === 'fail',
  );

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
            disabled={trainerState === 'win' || trainerState === 'fail'}
            ref={inputRef}
            type="text"
            value={inputString}
            onChange={e => setInputString(e.target.value)}
            className={`absolute z-10 my-auto w-full bg-transparent tracking-widerer focus:outline-none ${trainerColorClasses} `}
          />
          <p
            id="bg curtain between"
            className="pointer-events-none absolute bg-neutral-700 tracking-widerer text-neutral-700"
          >
            {inputString}
          </p>
        </div>
        <p id="space/placeholder" className="tracking-widerer text-neutral-400">
          {levelString}
        </p>
        <p
          className={`ml-4 min-w-6 ${
            (trainerState === 'win' ? 'block' : 'invisible') +
            ' ' +
            trainerColorClasses
          } `}
        >
          {wpm}
        </p>
      </div>
    </section>
  );
}
