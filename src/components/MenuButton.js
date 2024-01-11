import { useState } from "react";
import Link from "next/link";

export default function Menu(){
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };
    return(
        <div className=" block sm:hidden ml-auto">
          <div >
            <button onClick={handleMenuOpen}>
              <div
                className="w-20 h-9 bg-no-repeat "
                style={{ backgroundImage: `url('/BurgerDots.svg')` }}>
              </div>
            </button>
          </div>

          {menuOpen && (
            <div className="bg-neutral-500 absolute z-40 w-full">
                <ul className="text-neutral-800 text-xl font-semibold  ">
                  <li><Link className='text-2xl  hover:text-orange-la text-neutral-800'  href="/about">About</Link></li>
                  <li>Subscribe</li>
                </ul>
            </div>
          )}
      </div>
    )
}






