import React from "react";

export default function TypeSymbols() {
  return (
    <main className=" min-h-dv grow flex flex-col bg-neutral-700">
      {/* <div id="desktop-only-note">Desktop only, don't text while driving. If you practice on a smartphone with a bluetooth keyboard, check "Desktopwebsite" in your browser settings. </div> */}
      <section id="trainer" className="flex grow max-w-2xl mx-auto w-full px-4 mt- 20 ">
        <p className="mt-[42dvh my-auto mx-auto text-neutral-400 text-lg ">
          {" "}
          <span className="text-neutral-200">9#5%%%^&#@@&';;-=_\</span>{" "}
          <span className="font-bold text-xl text-emerald-la animate-pulse">
            |
          </span>
          ?/.,*8&&6^4$
        </p>
      </section>
      {/* <section id="level" className=" flex grow">
        <div className="mx-auto my-auto max-w-3xl max-h-[50dvh] overflow-scroll">
        <ul className="mx-auto my-auto space-y-4">
        <li>Level 1: lowerCase, sm, 21wpm</li>
        <li>Level 2: upperCase, sm, 21wpm</li>
        <li>Level 3: mixedCase, sm, 21wpm</li>
        <li>Level 4: lowerCase, md, 21wpm</li>
        <li>Level 5: upperCase, md, 21wpm</li>
        <li>Level 6: mixedCase, md, 21wpm</li>
        <li>Level 7: lowerCase, lg, 21wpm</li>
        <li>Level 8: upperCase, lg, 21wpm</li>
        <li>Level 9: mixedCase, lg, 21wpm</li>
        <li>Level 10: lowerCase, sm, 42wpm</li>
        <li>Level 11: upperCase, sm, 42wpm</li>
        <li>Level 12: mixedCase, sm, 42wpm</li>
        <li>Level 4: lowerCase, md, 42wpm</li>
        <li>Level 5: upperCase, md, 42wpm</li>
        <li>Level 6: mixedCase, md, 42wpm</li>
        <li>Level 7: lowerCase, lg, 42wpm</li>
        <li>Level 8: upperCase, lg, 42wpm</li>
        <li>Level 9: mixedCase, lg, 42wpm</li>
        <li>Level 9: w/Letters, lg, 42wpm</li>

        </ul>
        </div>
      </section> */}
      <section id="info"></section>
      <section id="save"></section>
        <nav id="menu" className=" text-neutral-500 flex max-w-2xl w-full mx-auto px-4 mb-2 ">
          <ul className="flex w-full">
            <li className="mr-auto font-semibold text- 2xl hover:text-neutral-200">
              SymbolTrainer
            </li>{" "}
            <li className="ml-auto mr-4 hover:text-neutral-200 mt-px font-medium">Level</li>{" "}
            <li className="hover:text-neutral-200 mt-px font-medium mr-4">Info</li>{" "}
            <li className="hover:text-neutral-200 mt-px font-medium">Save</li>{" "}
          </ul>
        </nav>
    </main>
  );
}
