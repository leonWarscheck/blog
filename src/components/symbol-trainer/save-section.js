import React from "react";

export default function SaveSection({section}) {
  return (
    <section
      id="save"
      className={`${section === "saveSection" ? "flex" : "hidden"} grow`}
    >
      <p className="my-auto text-center w-full">Saving options.</p>
      {/* <SavetyReminder {...{ reminder }} /> */}
    </section>
  );
}
