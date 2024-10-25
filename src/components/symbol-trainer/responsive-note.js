import React from "react";

export default function ResponsiveNote() {
  return (
    <div
      id="desktop-only-note"
      className="absolute bg-neutral-700 text-neutral-400 text-center px-4 py-60 z-30  w-full flex-col sm:hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <h3 className="text-xl font-bold">SymbolTrainer is Desktop Only</h3>{" "}
      <br />{" "}
      <p className="max-w-xl mx-auto">
        If you practice on a smartphone with a bluetooth keyboard, just go horizontal.
      </p>{" "}
    </div>
  );
}
