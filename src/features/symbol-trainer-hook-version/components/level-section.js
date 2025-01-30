import { useEffect, useRef } from 'react';
import { pipe } from 'ramda';

import levels from '../levels.json';
export default function LevelSection({
  setSection,
  setLevelId,
  scores,
  levelId,
}) {
  const levelReferences = useRef([]);

  // auto scroll to (current) levelId
  useEffect(() => {
    if (levelId && levelReferences.current[levelId]) {
      levelReferences.current[levelId].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [levelId]);

  const handleLevelClicked = level => {
    console.log('level', level);
    setSection('trainerSection');
    setLevelId(level.id);
  };

  const createLevelRef = (element, level) => {
    levelReferences.current[level.id] = element;
  };

  const getFormattedScore = score => {
    return score?.toString().length === 1
      ? score?.toString().padStart(3, '0')
      : score || '00';
  };
  const getLevelScore = level => {
    return scores?.[level.id];
  };
  const getColorByScore = score => {
    return score >= 60
      ? 'text-neutral-400'
      : score >= 50
        ? 'text-emerald-la'
        : score >= 40
          ? 'text-yellow-la'
          : score >= 30
            ? 'text-violet-500'
            : score >= 20
              ? 'text-red-500'
              : 'text-neutral-500';
  };
  const getColorByLevelScore = level => {
    return pipe(getLevelScore, getColorByScore)(level);
  };
  const getFormattedLevelScore = level => {
    return pipe(getLevelScore, getFormattedScore)(level);
  };

  return (
    <section aria-label="level-section" className={`flex grow flex-col`}>
      <div className="mx-auto my-auto max-h-[50dvh] w-full max-w-2xl overflow-scroll px-4">
        <ul className="my-auto w-full">
          {levels.map(level => {
            return (
              <li
                key={level.id}
                ref={element => createLevelRef(element, level)}
                className={`w-full`}
              >
                <button
                  className={`group flex w-full py-2 ${getColorByLevelScore(
                    level
                  )}`}
                  onClick={() => handleLevelClicked(level)}
                >
                  <h3 className="font-bold">
                    <span>Level {level.id} </span>
                  </h3>
                  <h4 className="ml-auto flex grow">
                    <span className="ml-2">({level.case},</span>
                    <span className="ml-2">
                      {level.string.length}
                      {level.reverse && ', r'} )
                    </span>
                    <span className="ml-auto tracking-wide">
                      {level.string}
                    </span>
                    <span className="ml-8">WPM</span>
                    <span className="ml-4 font-semibold">
                      {getFormattedLevelScore(level)}
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
