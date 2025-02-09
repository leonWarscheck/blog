import { useContext } from 'react';

import {
  sectionClicked,
  selectCurrentLevelHighScore,
  selectLevelId,
  selectSection,
} from '../reducer';
import { SymbolTrainerContext } from '../symbol-trainer-page';

export default function MenuTrainer() {
  const { state, dispatch } = useContext(SymbolTrainerContext);

  const highScore = selectCurrentLevelHighScore(state);
  const levelId = selectLevelId(state);
  const section = selectSection(state);

  const formattedLevelAndScore = `${levelId.toString().padStart(2, '0')} / ${highScore.toString().padStart(2, '0')}`;

  const handleTrainerSectionClick = () => {
    dispatch(sectionClicked('trainerSection'));
  };

  const handleToggle = sectionToToggle => {
    if (section === sectionToToggle) {
      dispatch(sectionClicked('trainerSection'));
    } else {
      dispatch(sectionClicked(sectionToToggle));
    }
  };

  return (
    <nav
      aria-label="trainer-menu"
      className="mx-auto mb-2 flex w-full max-w-2xl px-4 text-neutral-500"
    >
      <ul className="flex w-full">
        <li className="font-semibold hover:text-neutral-200">
          <button onClick={handleTrainerSectionClick}>SymbolTrainer</button>
        </li>{' '}
        <li className="ml-auto mr-4 mt-px font-medium hover:text-neutral-200">
          <button onClick={() => handleToggle('levelSection')}>
            Level {formattedLevelAndScore}
          </button>
        </li>
        <li className="mr-4 mt-px font-medium hover:text-neutral-200">
          <button onClick={() => handleToggle('helpSection')}>Help</button>
        </li>{' '}
        <li className="mt-px font-medium hover:text-neutral-200">
          <button onClick={() => handleToggle('saveSection')}>Save</button>
        </li>{' '}
      </ul>
    </nav>
  );
}
