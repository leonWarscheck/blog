import Link from 'next/link'
import Image from 'next/image'
import SubscribeForm from './SubscribeForm'
import { useState } from 'react'

const Navbar = () => {
  const [showSubscription, setShowSubscription] = useState(false);
    
  const handleSubscribeClick = () => {
    setShowSubscription(true);
  };

  const handleCancel = () => {
    setShowSubscription(false);
  };

  return (
    <nav className='bg-neutral-800 p-3 fixed w-full top-0'>
    <div className='mx-auto max-w-2xl flex pr-10 '>


    <Link className=' font-semibold text-3xl text-violet-500' href="/"><h1>LeonAndersen</h1></Link>
       <ul className='flex items-center space-x-4 ml-auto '>
        <li>
        <Link className='text-2xl text-orange-500'  href="/about">About</Link>
        </li>
        <li>
       <button className='text-2xl text-red-500' onClick={handleSubscribeClick}>
        Subscribe
      </button>

      {showSubscription && <SubscribeForm onCancel={handleCancel} onSubscribe={handleCancel} />}
        </li>
       </ul>
    </div>
    
    </nav>
  );
}
 
export default Navbar;