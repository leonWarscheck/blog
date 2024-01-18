import { useState } from "react";
import Link from "next/link";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <button className="group flex ml-auto gap-1 c1:hidden pr-2" onClick={handleMenuOpen}>
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
              <div className="bg-neutral-800 flex flex-col  c1:hidden text-2xl  font-semibold absolute left-0 right-0 top-16 min-h-[calc(100vh-4rem)]    ">
        <ul className=" w-full px-4 max-w-2xl mx-auto flex flex-col grow justify-evenly ">
              <li className=" ">
            <Link onClick={handleMenuOpen} className=" text-orange-la w-full py-28 border-r-4 border-orange-la flex hover:text-neutral-400" href="/about">
              About
            </Link>
          </li>
          <li className="bg-neutral-800 ">
            <button className="text-red-500 w-full   py-28 border-r-4 border-red-500 flex hover:text-neutral-400">Subscribe</button></li>
        
              </ul>
        </div>
      )}
    </>
  );
}
