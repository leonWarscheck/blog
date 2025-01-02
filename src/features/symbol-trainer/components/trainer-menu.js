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

  const handleToggle = sectionToToggle => {
    if (section === sectionToToggle) {
      dispatch(sectionClicked('trainerSection'));
    } else {
      dispatch(sectionClicked(sectionToToggle));
    }
  };

  return (
    <nav
      id="menu"
      className="mx-auto mb-2 flex w-full max-w-2xl px-4 text-neutral-500"
    >
      <ul className="flex w-full">
        <li className="font-semibold hover:text-neutral-200">
          <button onClick={() => dispatch(sectionClicked('trainerSection'))}>
            SymbolTrainer
          </button>
        </li>{' '}
        <li className="ml-auto mr-4 mt-px font-medium hover:text-neutral-200">
          <button onClick={() => handleToggle('levelSection')}>
            Level&nbsp;
            {levelId.toString().length === 1
              ? levelId.toString().padStart(2, '0')
              : levelId}
            &nbsp;/&nbsp;
            {highScore.toString().length === 1
              ? highScore.toString().padStart(2, '0')
              : highScore}
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
