import React from "react";

export default function LevelSection({ section }) {
  return (
    <section
      id="level"
      className={`${section === "levelSection" ? "flex" : "hidden"} grow`}
    >
      <div className="mx-auto my-auto max-w-3xl max-h-[50dvh] overflow-scroll">
        <ul className="mx-auto my-auto space-y-4">
          <li>Level 1: lowerCase, sm, 21wpm</li>
        </ul>
      </div>
    </section>
  );
}
