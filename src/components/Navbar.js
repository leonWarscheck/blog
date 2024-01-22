import Link from "next/link";
import Image from "next/image";
import SubscribeForm from "./SubscribeFormNavbar";
import { useState } from "react";
import Menu from "./Menu";

const Navbar = () => {
  const [showSubscription, setShowSubscription] = useState(false);

  const handleSubscribeClick = () => {
    setShowSubscription(true);
  };

  const handleCancel = () => {
    setShowSubscription(false);
  };

  return (
    <header className="relative ">
      <nav className="h-16 bg-neutral-800 items-center flex fixed w-full ">
        <div className=" max-w-2xl  mx-auto flex flex-grow items-center px-4">
          <Link
            className=" absolute bottom-4 font-semibold text-3xl text-violet-500 hover:text-neutral-400"
            href="/"
          >
            <h1 className="">LeonAndersen</h1>
          </Link>
          <ul className="hidden  c1:flex space-x-4 ml-auto ">
            <li>
              <Link
                className="text-2xl text-amber-400 hover:text-neutral-400"
                href="/tools"
              >
                Tools
              </Link>
            </li>
            <li>
              <Link
                className="text-2xl text-orange-500 hover:text-neutral-400"
                href="/about"
              >
                About
              </Link>
            </li>
            <li className=" flex items-center relative">
              <button
                className="text-2xl text-red-500 hover:text-neutral-400"
                onClick={handleSubscribeClick}
            >
                Subscribe
              </button>
              {showSubscription && (
                <SubscribeForm
                  onCancel={handleCancel}
                  onSubscribe={handleCancel}
                />
              )}
            </li>
          </ul>
          <Menu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
