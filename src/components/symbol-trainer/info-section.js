import React from "react";

export default function InfoSection({section}) {
  return (
    <section
      id="info"
      className={`${
        section === "infoSection" ? "flex" : "hidden"
      } grow w-full bg- black`}
    >
      <p className="my-auto text-center w-full">Some instructions.</p>
    </section>
  );
}
