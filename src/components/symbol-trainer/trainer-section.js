import React, { useEffect, useRef, useState } from "react";
import levels from "../../data/levels.json";

export default function TrainerSection({ level }) {
  const [inputValue, setInputValue] = useState("");
  const levelString = levels[level - 1].string;
  console.log("ls:", levelString);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleBlur = (e) => {
    inputRef.current.focus();
  };

  return (
    <section
      id="trainer"
      className={`flex grow max-w-2xl mx-auto w-full px-4 mt- 20 `}
    >
      <div className=" relative mx-auto my-auto text-left text-lg overflow-hidden">
        <div className="">
          <input
            ref={inputRef}
            className="absolute whitespace-pr   text-neutral-200 z-20 caret-emerald-la tracking-widest my-auto focus:outline-none bg-transparent w-full"
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlur}
          />
          <p id="bg curtain between" className="absolute inset-  text-neutral-700 tracking-widest whitespace-pr  bg-neutral-700 pointer-events-none ">
            {inputValue}
          </p>
        </div>
        <p id="space/placeholder" className=" tracking-widest text-neutral-400 whitespace-pre">
          {levelString}
        </p>
      </div>
    </section>
  );
}
