import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import SubscribeForm from "./subscribeform-footer";

export default function Footer() {
  const router = useRouter();
  const [showSubscription, setShowSubscription] = useState(false);

  const handleSubscribeClick = () => {
    setShowSubscription(true);
  };

  const handleCancel = () => {
    setShowSubscription(false);
  };
  return (
    <footer className={` bg-neutral-700 text-neutral-300 h-8 ${(router.asPath ===  "/symbol-trainer" || router.asPath === "/symbol-trainer-redux" ) && "hidden"} `}>
      <nav className="c1:hidden max-w-2xl mx-auto px-4 flex grow items-center h-full">
        <ul className="flex">
          <li className="flex items-center">
            <Link className=" text-sm hover:text-neutral-400" href="/imprint">
              Imprint
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="hidden c1:flex grow max-w-2xl mx-auto px-4  items-center h-full ">
        <Link className="text-sm  hover:text-neutral-400" href="/">
          <h1>LeonWarscheck</h1>
        </Link>
        <ul className="hidden c1:flex space-x-4  ml-auto ">
          <li className="flex items-center">
            <Link className=" text-sm hover:text-neutral-400" href="/imprint">
              Imprint
            </Link>
          </li>
          <li className="relative flex items-center">
            <button
              className="text-sm hover:text-neutral-400"
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
      </nav>
    </footer>
  );
}
