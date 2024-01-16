import Link from "next/link";
import { useState } from "react";
import SubscribeForm from './SubscribeFormFooter'
const Footer = () => {
  const [showSubscription, setShowSubscription] = useState(false);
    
  const handleSubscribeClick = () => {
    setShowSubscription(true);
  };

  const handleCancel = () => {
    setShowSubscription(false);
  };
  return (
    <footer className=" relative bg-neutral-800 text-neutral-700 w-full">
   <div className="flex max-w-2xl mx-auto px-4">

   <div className="  flex flex-grow items-center px-4">
          <Link
            className="text-sm hover:text-neutral-500"
            href="/"
          >
            <h1>LeonAndersen</h1>
          </Link>
          <ul className="hidden sm:flex space-x-4 ml-auto pr-6">
            <li>
              <Link
                className=" text-sm hover:text-neutral-500"
                href="/imprint"
              >
                Imprint
              </Link>
            </li>
            <li>
              <button
                className="  text-sm hover:text-neutral-500"
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
   </div>
    </footer>
  );
}
 
export default Footer;