import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import SubscribeForm from '../features/blog/subscribeform-header';
import Menu from './menu';

export default function Header({}) {
  const router = useRouter();
  const [showSubscription, setShowSubscription] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const bodyElement = document.querySelector('body');

    if (menuOpen) {
      bodyElement.classList.add('scrollbar-hide');
      bodyElement.style.overflow = 'hidden';
    } else {
      bodyElement.classList.remove('scrollbar-hide');
      bodyElement.style.overflow = '';
    }

    return () => {
      bodyElement.style.overflow = '';
    };
  }, [menuOpen]);

  const handleSubscribeClick = () => {
    setShowSubscription(true);
  };

  const handleCancel = () => {
    setShowSubscription(false);
  };

  const handleMenuClose = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 42);
  };

  const handleMenuToggle = () => {
    // setTimeout(() => {
    setMenuOpen(!menuOpen);
    // }, 42);
  };

  return (
    <header
      className={`fixed flex h-20 w-full items-center bg-neutral-700 ${router.route.startsWith('/posts') && 'text-neutral-200'} ${
        (router.asPath === '/symbol-trainer' ||
          router.asPath === '/symbol-trainer-redux') &&
        'text-neutral-500'
      } `}
    >
      <nav className="mx-auto flex max-w-2xl flex-grow items-center px-4 pt-6">
        <Link
          className="absolute text-2xl font-semibold hover:text-neutral-200"
          href="/"
          onClick={handleMenuClose}
        >
          <h1 className="">LeonWarscheck</h1>
        </Link>
        <ul className="-mb-1.5 ml-auto flex gap-x-4 font-medium">
          <li>
            <Link className="hover:text-neutral-200" href="/about">
              About
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-neutral-200"
              href="/symbol-trainer-redux"
            >
              Tools
            </Link>
          </li>
          {/* <li className=" flex items-center relative">
            <button
            className="hover:text-neutral-200 "
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
          </li> */}
        </ul>
        {/* <Menu
          handleMenuToggle2={handleMenuToggle}
          menuOpen={menuOpen}
          handleMenuClose={handleMenuClose}
        /> */}
      </nav>
    </header>
  );
}
