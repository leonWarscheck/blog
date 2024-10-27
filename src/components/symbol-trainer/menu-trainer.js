import React from "react";

export default function MenuTrainer( {setSection, levelId, scores}) {
  return (
    <nav
      id="menu"
      className=" text-neutral-500 flex max-w-2xl w-full mx-auto px-4 mb-2 "
    >
      <ul className="flex w-full">
        <li className="mr-aut font-semibold text- 2xl hover:text-neutral-200">
          <button onClick={() => setSection("trainerSection")}>
            SymbolTrainer
          </button>
        </li>{" "}
        {/* <li className="mr-auto ml-8">L {levelId} | WPM {scores[levelId-1]?.wpm}</li> */}
        <li className="ml-auto mr-4 hover:text-neutral-200 mt-px font-medium">
          <button onClick={() => setSection("levelSection")}>
          Level&nbsp; 
          {levelId.toString().length === 1 ? levelId.toString().padStart(2, '0') : levelId} 
          {/* {levelId}  */}
          &nbsp;/&nbsp;
          {scores[levelId-1]?.wpm.toString().length === 1 ? scores[levelId-1]?.wpm.toString().padStart(2, '0') : scores[levelId-1]?.wpm} 
          </button>
        </li>
        <li className="hover:text-neutral-200 mt-px font-medium mr-4">
          <button onClick={() => setSection("infoSection")}>Info</button>
        </li>{" "}
        <li className="hover:text-neutral-200 mt-px font-medium">
          <button onClick={() => setSection("saveSection")}>Save</button>
        </li>{" "}
      </ul>
    </nav>
  );
}
