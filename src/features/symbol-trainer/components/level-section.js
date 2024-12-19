import { useEffect, useRef } from 'react';

import { saveLastLevel } from '../helpers';
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
    if (levelId && levelReferences.current[levelId - 1]) {
      levelReferences.current[levelId - 1].scrollIntoView({
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
            const score = scores?.[index];
            return (
              <li
                key={level.id}
                ref={element => (levelReferences.current[index] = element)}
                className={`w-full ${level.id === 0 ? 'hidden' : 'flex'}`}
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
                    setSection('trainerSection');
                    setLevelId(level.id);
                    saveLastLevel(level.id);
                  }}
                >
                  <h3 className="font-bold">
                    <span>Level {level.id} </span>
                  </h3>
                  <h4 className="ml-auto flex grow">
                    <span className="ml-2">( {level.case},</span>
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
                        : score || '00'}
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
