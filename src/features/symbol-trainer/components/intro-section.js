import { useState, useEffect } from "react";

export default function IntroSection({ setSection }) {
  const [color, setColor] = useState("emerald-la");

  useEffect(() => {
    const colors = ["emerald-la","violet-500", "red-500","yellow-la"];
    let colorIndex = 0;

    const colorInterval = setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length;
      setColor(colors[colorIndex]);
    }, 1111);

    return () => clearInterval(colorInterval);
  }, []);

  return (
    <section
      id="info"
      className={`flex grow w-full bg- black max-w-2xl mx-auto px-4 `}
    >
      <div className="mx-auto my-auto flex flex-col text-center ">
        <h2 className={`text-2xl  font-semibold mb-2 mt-6 ${"text-" + color} `}>
          Symbol<span className="text-neutral-400">Trainer</span>
        </h2>
        {/* <h3 className="font- semibold mb-2 text-neutral-300 text-xl">
          A Typing Speed Trainer for Symbols and Numbers
        </h3> */}
        <p className="space-x-2 text-neutral-400">
          <button onClick={()=>setSection("infoSection")} className="underline hover:text-neutral-300">Instructions / Help</button>{" "}
          <button onClick={()=>setSection("trainerSection")} className="underline hover:text-neutral-300">SymbolTrainer</button>
        </p>
      </div>
    </section>
  );
}
