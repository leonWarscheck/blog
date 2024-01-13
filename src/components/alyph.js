import { useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-full flex-col">
      <header className=" fixed w-full">
        <nav className="flex relative h-12 items-center justify-between bg-neutral-800 ">
          <h1>Leon Andersen</h1>

          <button className="flex gap-1" onClick={() => setIsOpen(true)}>
            <div className="size-5 rounded-full bg-purple-500" />
            <div className="size-5 rounded-full bg-orange-500" />
          </button>

          {isOpen && (
            <ul className="absolute  top-10 border border-border bg-gray-600 ">
              <li>Subscribe</li>
              <li>About</li>
            </ul>
          )}
        </nav>
      </header>

      <main className="flex h-full flex-col">Hello!</main>

      <footer>This is the footer</footer>
    </div>
  );
}
