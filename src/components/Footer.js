import Link from "next/link";
import { useState } from "react";
import SubscribeForm from "./SubscribeFormFooter";
const Footer = () => {
  const [showSubscription, setShowSubscription] = useState(false);

  const handleSubscribeClick = () => {
    setShowSubscription(true);
  };

  const handleCancel = () => {
    setShowSubscription(false);
  };
  return (
    <footer className="  bg-neutral-800 text-neutral-700 w-full">
      <div className="flex max-w-2xl mx-auto px-4">
        <div className=" hidden c1:flex grow  items-center ">
          <Link className="text-sm  hover:text-neutral-500" href="/">
            <h1>LeonAndersen</h1>
          </Link>
          <ul className="hidden c1:flex space-x-4  ml-auto">
            <li className="flex items-center">
              <Link className=" text-sm hover:text-neutral-500" href="/imprint">
                Imprint
              </Link>
            </li>
            <li className="relative flex items-center">
              <button
                className="text-sm hover:text-neutral-500"
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
        </div>
        <div className=" grow c1:hidden items-center ">
      
          <ul className="flex  ">
            <li className="flex items-center ">
              <Link className=" text-sm hover:text-neutral-500" href="/imprint">
                Imprint
              </Link>
            </li>
          
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
