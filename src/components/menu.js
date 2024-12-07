import Link from "next/link";
import SubscribeFormMenu from "../features/blog/subscribeform-menu";

export default function Menu({ handleMenuToggle2, menuOpen, handleMenuClose }) {
  return (
    <>
      <button
        className="group flex flex-col ml-auto  mt-1.5 1 gap-[4.5px] c1:hidden pr-2"
        onClick={handleMenuToggle2}
      >
        <div
          className={`size- h-[3px] w-8 rounded-f ${
            menuOpen ? "bg-neutral-500" : "bg-neutral-200"
          }`}
        />
        <div
          className={`size- h-[3px] w-8 rounded-f ${
            menuOpen ? "bg-neutral-500" : "bg-neutral-200"
          }`}
        />
      </button>

      {menuOpen && (
        <div
          className="bg-neutral-700  flex flex-col  c1:hidden text-2xl  font- absolute z-40 left-0 right-0 top-16 min-h-[calc(100vh-4rem)] "
          aria-label="Mobile Menu"
        >
          <ul className=" w-full px-4 max-w-2xl mx-auto flex flex-col grow justify-evenly ">
            <li className=" ">
              <Link
                onClick={handleMenuClose}
                className=" text-emerald-la w-full py-11 border-r-4 border-yellow-la flex hover:text-neutral-400"
                href="/about"
              >
                About
              </Link>
            </li>

            <li className="relative border-r-4  border-violet-500">
              <SubscribeFormMenu />
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
