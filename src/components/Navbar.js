import Link from "next/link";
import SubscribeForm from "./SubscribeFormNavbar";
import { useState, useEffect } from "react";

import Menu from "./Menu";

const Navbar = ({  }) => {
  const [showSubscription, setShowSubscription] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(
    ()=>{
      
      const bodyElement = document.querySelector('body');

      if(menuOpen){
        bodyElement.classList.add("scrollbar-hide")
      }else{

        bodyElement.classList.remove("scrollbar-hide")
      }
    }
    ,[menuOpen]
  )

  const handleSubscribeClick = () => {
    setShowSubscription(true);
  };

  const handleCancel = () => {
    setShowSubscription(false);
  };

  const handleMenuClose = () => {
    console.log('handleMenuClose called');
    setTimeout(()=>{
    setMenuOpen(false);
    },0);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };


  return (
    <header className="relative">
      <nav className="h-12 bg-neutral-800 items-center flex fixed w-full ">
        <div className=" max-w-2xl  mx-auto flex flex-grow items-center px-4">
          <Link
            className=" absolute bottom-c3 font-semibold text-2xl text-violet-500 hover:text-neutral-400"
            href="/" 
            onClick={handleMenuClose}
          >
            <h1 className="">LeonAndersen</h1>
          </Link>
          <ul className="hidden  c1:flex space-x-4 ml-auto ">
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
                className="text-xl text-orange-500 hover:text-neutral-400"
                href="/about"
              >
                About
              </Link>
            </li>
            <li className=" flex items-center relative">
              <button
                className="text-xl text-red-500 hover:text-neutral-400"
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
          <Menu handleMenuToggle2={handleMenuToggle} menuOpen={menuOpen} handleMenuClose={handleMenuClose} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
