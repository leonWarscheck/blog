import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import SubscribeFormFooter from '../features/blog/subscribeform-footer';

export default function Footer() {
  // used to trigger hidden on the SymbolTrainer pages
  const router = useRouter();
  // handles the SubscribeForm opening and closing directly in the footer
  const [showSubscription, setShowSubscription] = useState(false);

  const handleSubscribeClick = () => {
    setShowSubscription(true);
  };

  const handleCancel = () => {
    setShowSubscription(false);
  };
  return (
    <footer
      className={`h-8 bg-neutral-700 text-neutral-300 ${
        (router.asPath === '/symbol-trainer' ||
          router.asPath === '/symbol-trainer-redux') &&
        'hidden'
      } `}
    >
      <nav className="mx-auto flex h-full max-w-2xl grow items-center px-4 c1:hidden">
        <ul className="flex">
          <li className="flex items-center">
            <Link className="text-sm hover:text-neutral-400" href="/imprint">
              Imprint
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="mx-auto hidden h-full max-w-2xl grow items-center px-4 c1:flex">
        <Link className="text-sm hover:text-neutral-400" href="/">
          <h1>LeonWarscheck</h1>
        </Link>
        <ul className="ml-auto hidden space-x-4 c1:flex">
          <li className="flex items-center">
            <Link className="text-sm hover:text-neutral-400" href="/imprint">
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
              <SubscribeFormFooter
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
