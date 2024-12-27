import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header({}) {
  const router = useRouter();

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
              href="/symbol-trainer"
            >
              Tools
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
