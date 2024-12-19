import { useContext } from 'react';

import { sectionClicked } from '../reducer';
import { SymbolTrainerContext } from '../symbol-trainer-redux-page';
import useRotatingColors from '../use-rotating-colors-redux';

export default function IntroSection() {
  const { state, dispatch } = useContext(SymbolTrainerContext);

  const color = useRotatingColors(
    ['emerald-la', 'violet-500', 'red-500', 'yellow-la'],
    1111,
  );

  return (
    <section id="intro" className={`mx-auto flex w-full max-w-2xl grow px-4`}>
      <div className="mx-auto my-auto flex flex-col text-center">
        <h2
          className={`pointer-events-none mb-2 mt-6 text-2xl font-semibold ${'text-' + color} `}
        >
          Symbol<span className="text-neutral-400">Trainer</span>
        </h2>
        <p className="space-x-2 text-neutral-400">
          <button
            onClick={() => dispatch(sectionClicked('helpSection'))}
            className="underline hover:text-neutral-300"
          >
            Instructions / Help
          </button>{' '}
          <button
            onClick={() => dispatch(sectionClicked('trainerSection'))}
            className="underline hover:text-neutral-300"
          >
            SymbolTrainer
          </button>
        </p>
      </div>
    </section>
  );
}
