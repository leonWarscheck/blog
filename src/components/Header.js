import Link from "next/link";
import SubscribeForm from "./SubscribeFormHeader";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Menu from "./Menu";

export default function Header({}) {
  const route = useRouter()
  const [showSubscription, setShowSubscription] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const bodyElement = document.querySelector("body");

    if (menuOpen) {
      bodyElement.classList.add("scrollbar-hide");
    } else {
      bodyElement.classList.remove("scrollbar-hide");
    }
  }, [menuOpen]);

  const handleSubscribeClick = () => {
    setShowSubscription(true);
  };

  const handleCancel = () => {
    setShowSubscription(false);
  };

  const handleMenuClose = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 42);
  };

  const handleMenuToggle = () => {
    // setTimeout(() => {
    setMenuOpen(!menuOpen);
    // }, 42);
  };

  return (
    <header className=" h-20 bg-neutral-700 items-center flex fixed w-full ">
      <nav className="max-w-2xl  mx-auto flex flex-grow items-center px-4">
        <Link
          className=" absolute bottom-[25px] c3 font-semibold text-2xl text-neutral-200 hover:text-neutral-400 "
          href="/"
          onClick={handleMenuClose}
        >
          <h1 className="">LeonAndersen</h1>
          {/* <h1 className="">Leon<span className="text-amber-500">Andersen</span><span className="text-red-500">.dev</span></h1> */}
        </Link>
        <ul className="hidden -mb-1 c1:flex gap-x-4 ml-auto  text-neutral-200  font-medium [470]">
          {/* <li>
              <Link
                className="text-xl text-amber-400 hover:text-neutral-400"
                href="/tools"
              >
                Tools
              </Link>
            </li> */}
          <li>
            <Link
              className="text- base sm xl text-orange- 500  hover:text-neutral-400"
              href="/about"
            >
              About
            </Link>
          </li>
          <li className=" flex items-center relative">
            <button
              className="text- sm xl text-red- 500 hover:text-neutral-400"
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
        <Menu
          handleMenuToggle2={handleMenuToggle}
          menuOpen={menuOpen}
          handleMenuClose={handleMenuClose}
        />
      </nav>
    </header>
  );
}
