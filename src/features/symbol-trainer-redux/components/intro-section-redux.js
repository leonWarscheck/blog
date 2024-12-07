import { useState, useEffect, useContext } from "react";
import { SymbolTrainerContext } from "../../../pages/symbol-trainer-redux";
import { sectionClicked } from "../reducer";

export default function IntroSection() {
  const { state, dispatch } = useContext(SymbolTrainerContext);
  const [color, setColor] = useState("emerald-la");

  useEffect(() => {
    const colors = ["emerald-la", "violet-500", "red-500", "yellow-la"];
    let colorIndex = 0;

    const colorInterval = setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length;
      setColor(colors[colorIndex]);
    }, 1234);

    return () => clearInterval(colorInterval);
  }, []);

  return (
    <section
      id="intro"
      className={`flex grow w-full bg- black max-w-2xl mx-auto px-4 `}
    >
      <div className="mx-auto my-auto flex flex-col text-center ">
        <h2 className={`text-2xl  font-semibold mb-2 mt-6 ${"text-" + color} `}>
          Symbol<span className="text-neutral-400">Trainer</span>
        </h2>
        <p className="space-x-2 text-neutral-400">
          <button
            onClick={() => dispatch(sectionClicked("helpSection"))}
            className="underline hover:text-neutral-300"
          >
            Instructions / Help
          </button>{" "}
          <button
            onClick={() => dispatch(sectionClicked("trainerSection"))}
            className="underline hover:text-neutral-300"
          >
            SymbolTrainer
          </button>
        </p>
      </div>
    </section>
  );
}
