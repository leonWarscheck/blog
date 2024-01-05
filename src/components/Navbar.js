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
    <nav>
    <Link href="/"><h1>LeonAndersen</h1></Link>
      <Link href="/about">About</Link>
       <button className="text-red-500" onClick={handleSubscribeClick}>
        Subscribe
      </button>

      {showSubscription && <SubscribeForm onCancel={handleCancel} onSubscribe={handleCancel} />}
    
    </nav>
  );
}
 
export default Navbar;