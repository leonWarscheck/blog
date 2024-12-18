import { useState, useEffect, useContext } from 'react';
import { SymbolTrainerContext } from '../symbol-trainer-redux-page';
import { sectionClicked } from '../reducer';

export default function IntroSection() {
  const { state, dispatch } = useContext(SymbolTrainerContext);
  const [color, setColor] = useState('emerald-la');

  useEffect(() => {
    const colors = ['emerald-la', 'violet-500', 'red-500', 'yellow-la'];
    let colorIndex = 0;

    const colorInterval = setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length;
      setColor(colors[colorIndex]);
    }, 1111);

    return () => clearInterval(colorInterval);
  }, []);

  return (
    <section
      id="intro"
      className={`mx-auto flex w-full max-w-2xl grow px-4`}
    >
      <div className="mx-auto my-auto flex flex-col text-center">
        <h2 className={`mb-2 mt-6 text-2xl font-semibold ${'text-' + color} `}>
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
