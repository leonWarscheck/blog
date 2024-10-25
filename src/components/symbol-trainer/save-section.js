import React from "react";

export default function SaveSection({}) {
  return (
    <section
      id="save"
      className={`flex grow `}
    >
      <div className=" flex flex-col max-w-2xl px-4 mx-auto w-full max-h-[30dvh] my-auto text-neutral-400">

      <h2 className="text-xl font-bold text-center mb-2"> Additional Saving Options</h2>
      <p className="text-center mb-4">Your scores get auto-saved in the browser's local storage. Often this can be enough. Risk of
          loss depends on your browser settings and behavior. Use this backup feature if you want to be extra safe:</p>
        <div className="flex justify-center gap-4">
      <button className="bg-neutral- hover:text-neutral-500 underline rounded-sm flex">Download Backup File</button>
      <button className="bg-neutral- hover:text-neutral-500 underline  rounded-sm flex">Import Backup File</button>
        </div>
      </div>
      {/* <p className="my-auto text-center w-full">Saving options.</p> */}
      {/* <SavetyReminder {...{ reminder }} /> */}
    </section>
  );
}
