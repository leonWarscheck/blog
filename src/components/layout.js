import '../features/blog/vim-scroll';

import localFont from 'next/font/local';

import Footer from './footer';
import Header from './header';

const myFont = localFont({
  src: [
    {
      path: '../styles/fonts/OpenSans-VariableFont.ttf',
      style: 'normal',
    },
    {
      path: '../styles/fonts/OpenSans-Italic-VariableFont.ttf',
      style: 'italic',
    },
  ],
});

export default function Layout({ children }) {
  return (
    <div
      className={`${myFont.className} flex min-h-dvh flex-col selection:bg-neutral-800`}
      role="region"
      aria-label="Main Layout"
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}
