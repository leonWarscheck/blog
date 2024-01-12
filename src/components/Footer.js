import Link from "next/link";
import { useState } from 'react'
import SubscribeForm from './SubscribeForm'
const Footer = () => {
  const [showSubscription, setShowSubscription] = useState(false);
    
  const handleSubscribeClick = () => {
    setShowSubscription(true);
  };

  const handleCancel = () => {
    setShowSubscription(false);
  };
  return (
    <footer className="bg-neutral-800 text-neutral-500 hover:text-neutral-400">
   <Link href="/imprint">Imprint</Link> 
       {/* <button className="text-red-500" onClick={handleSubscribeClick}>
        Subscribe
      </button> */}

      {showSubscription && <SubscribeForm onCancel={handleCancel} onSubscribe={handleCancel} />}
    </footer>
  );
}
 
export default Footer;