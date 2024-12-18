import Link from 'next/link';

import SubscribeFormMenu from '../features/blog/subscribeform-menu';

export default function Menu({ handleMenuToggle2, menuOpen, handleMenuClose }) {
  return (
    <>
      <button
        className="group ml-auto mt-1.5 flex flex-col gap-[4.5px] pr-2 c1:hidden"
        onClick={handleMenuToggle2}
      >
        <div
          className={`h-[3px] w-8 ${
            menuOpen ? 'bg-neutral-500' : 'bg-neutral-200'
          }`}
        />
        <div
          className={`h-[3px] w-8 ${
            menuOpen ? 'bg-neutral-500' : 'bg-neutral-200'
          }`}
        />
      </button>

      {menuOpen && (
        <div
          className="absolute left-0 right-0 top-16 z-40 flex min-h-[calc(100vh-4rem)] flex-col bg-neutral-700 text-2xl c1:hidden"
          aria-label="Mobile Menu"
        >
          <ul className="mx-auto flex w-full max-w-2xl grow flex-col justify-evenly px-4">
            <li className=" ">
              <Link
                onClick={handleMenuClose}
                className="flex w-full border-r-4 border-yellow-la py-11 text-emerald-la hover:text-neutral-400"
                href="/about"
              >
                About
              </Link>
            </li>

            <li className="relative border-r-4 border-violet-500">
              <SubscribeFormMenu />
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
