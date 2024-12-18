import levels from '../levels-redux.json';
import {
  sectionClicked,
  levelClicked,
  selectHighScores,
  selectLevelId,
} from '../reducer';
import { useContext, useRef, useEffect } from 'react';
import { SymbolTrainerContext } from '../symbol-trainer-redux-page';

export default function LevelSection() {
  const { state, dispatch } = useContext(SymbolTrainerContext);
  const highScores = selectHighScores(state);
  const levelId = selectLevelId(state);

  const levelRefs = useRef([]);

  // auto scroll to (current) levelId
  useEffect(() => {
    if (levelId && levelRefs.current[levelId]) {
      levelRefs.current[levelId].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [levelId]);

  return (
    <section id="level" className={`flex grow flex-col`}>
      <div className="mx-auto my-auto max-h-[50dvh] w-full max-w-2xl overflow-scroll px-4">
        <ul className="my-auto w-full">
          {levels.map((level, index) => {
            const score = highScores?.[level.id];
            return (
              <li
                key={level.id}
                ref={el => (levelRefs.current[index] = el)}
                className={`flex w-full`}
              >
                <button
                  className={`group flex w-full py-2 hover:text-neutral-400 ${
                    score >= 60
                      ? 'text-neutral-400'
                      : score >= 50
                        ? 'text-emerald-la'
                        : score >= 40
                          ? 'text-yellow-la'
                          : score >= 30
                            ? 'text-violet-500'
                            : score >= 20
                              ? 'text-red-500'
                              : 'text-neutral-500'
                  }`}
                  onClick={() => {
                    dispatch(sectionClicked('trainerSection'));
                    dispatch(levelClicked(index + 1));
                  }}
                >
                  <h3 className="font-bold">
                    <span>Level {index + 1} </span>
                  </h3>
                  <h4 className="ml-auto flex grow">
                    <span className="ml-2">({level.case},</span>
                    <span className="ml-2">
                      {level.string.length}
                      {level.reverse && ', r'} )
                    </span>
                    <span className="ml-auto tracking-wide">
                      {' '}
                      {level.string}
                    </span>{' '}
                    <span className="ml-8">WPM</span>
                    <span className="ml-4 font-semibold">
                      {score?.toString().length === 1
                        ? score?.toString().padStart(3, '0')
                        : score
                          ? score
                          : '00'}
                    </span>
                  </h4>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
