export default function IntroSection({ setSection }) {
  
 const color = useRotatingColors(['emerald-la', 'violet-500', 'red-500', 'yellow-la'], 1111)

  return (
    <section id="info" className={`mx-auto flex w-full max-w-2xl grow px-4`}>
      <div className="mx-auto my-auto flex flex-col text-center">
        <h2 className={`mb-2 mt-6 text-2xl pointer-events-none font-semibold ${'text-' + color} `}>
          Symbol<span className="text-neutral-400">Trainer</span>
        </h2>
        <p className="space-x-2 text-neutral-400">
          <button
            onClick={() => setSection('infoSection')}
            className="underline hover:text-neutral-300"
          >
            Instructions / Help
          </button>{' '}
          <button
            onClick={() => setSection('trainerSection')}
            className="underline hover:text-neutral-300"
          >
            SymbolTrainer
          </button>
        </p>
      </div>
    </section>
  );
}
