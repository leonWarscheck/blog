import { useState } from "react";
import Link from "next/link";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <button className="group flex gap-1 sm:hidden " onClick={handleMenuOpen}>
        <div
          className={`size-7 rounded-full ${
            menuOpen ? "bg-neutral-500" : "bg-orange-500"
          }`}
        />
        <div
          className={`size-7 rounded-full ${
            menuOpen ? "bg-neutral-500" : "bg-red-500"
          }`}
        />
      </button>

      {menuOpen && (
        <ul className="bg-neutral-800 sm:hidden text-2xl font-semibold absolute left-0 right-0 top-16 px-3 pb-3 w-full ">
          <li className="py-4">
            <Link onClick={handleMenuOpen} className="text-orange-la hover:text-neutral-500" href="/about">
              About
            </Link>
          </li>
          <li className="text-red-500 hover:text-neutral-500 py-4">Subscribe</li>
        </ul>
      )}
    </>
  );
}
