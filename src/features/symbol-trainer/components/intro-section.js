import { useContext } from 'react';

import { sectionClicked } from '../reducer';
import { SymbolTrainerContext } from '../symbol-trainer-page';
import useRotatingColors from '../use-rotating-colors';

export default function IntroSection() {
  const { dispatch } = useContext(SymbolTrainerContext);

  const handleHelpSectionClick = () => {
    dispatch(sectionClicked('helpSection'));
  };

  const handleTrainerSectionClick = () => {
    dispatch(sectionClicked('trainerSection'));
  };

  const textColor = useRotatingColors(
    ['text-emerald-la', 'text-violet-500', 'text-red-500', 'text-yellow-la'],
    1111,
  );

  return (
    <section
      aria-label="intro-section"
      className={`mx-auto flex w-full max-w-2xl grow px-4`}
    >
      <div className="mx-auto my-auto flex flex-col text-center">
        <h2
          className={`pointer-events-none mb-2 mt-6 text-2xl font-semibold ${textColor} `}
        >
          Symbol<span className="text-neutral-400">Trainer</span>
        </h2>
        <p className="space-x-2 text-neutral-400">
          <button
            onClick={handleHelpSectionClick}
            className="underline hover:text-neutral-300"
          >
            Instructions / Help
          </button>{' '}
          <button
            onClick={handleTrainerSectionClick}
            className="underline hover:text-neutral-300"
          >
            SymbolTrainer
          </button>
        </p>
      </div>
    </section>
  );
}
