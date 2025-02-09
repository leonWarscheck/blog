import { useContext, useEffect, useRef } from 'react';

import levels from '../levels.json';
import {
  selectHighScores,
  selectLevelId,
  sectionClicked,
  levelClicked,
} from '../reducer';
import { SymbolTrainerContext } from '../symbol-trainer-page';
import LevelSectionListItem from './level-section-list-item';

export default function LevelSection() {
  const { state, dispatch } = useContext(SymbolTrainerContext);
  const levelId = selectLevelId(state);
  const highScores = selectHighScores(state);
  const levelReferences = useRef([]);

  // Auto scrolls to (current) levelId.
  useEffect(() => {
    if (levelId && levelReferences.current[levelId]) {
      levelReferences.current[levelId].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [levelId]);

  const handleLevelClick = listItemLevelId => {
    dispatch(sectionClicked('trainerSection'));
    dispatch(levelClicked(listItemLevelId));
  };

  return (
    <section aria-label="level-section" className="flex grow flex-col">
      <div className="mx-auto my-auto max-h-[50dvh] w-full max-w-2xl overflow-scroll px-4">
        <ul className="my-auto w-full">
          {levels.map(listItemLevel => (
            <LevelSectionListItem
              key={listItemLevel.id}
              listItemLevel={listItemLevel}
              highScores={highScores}
              onLevelClick={() => handleLevelClick(listItemLevel.id)}
              ref={element =>
                (levelReferences.current[listItemLevel.id] = element)
              }
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
