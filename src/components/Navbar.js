import Link from "next/link";
import Image from "next/image";
import SubscribeForm from "./SubscribeForm";
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
    <header className="">
      <nav className="h-16 bg-neutral-800">
          <Link
            className="font-semibold text-3xl text-violet-500 hover:text-neutral-400"
            href="/"
          >
            <h1>LeonAndersen</h1>
          </Link>
          <ul className="hidden sm:flex items-center space-x-4 ml-auto  ">
            <li>
              <Link
                className="text-2xl text-orange-la hover:text-neutral-400"
                href="/about"
              >
                About
              </Link>
            </li>
            <li>
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
      </nav>
    </header>
  );
};

export default Navbar;
