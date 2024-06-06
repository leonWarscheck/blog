import Footer from "./Footer";
import Header from "./Header";
import "../utils/vimScroll";
// import { Open_Sans } from 'next/font/google'

// const myFont = Open_Sans({ subsets: ['latin'] })

import localFont from "next/font/local";

const myFont = localFont({
  src: [
    {
      path: "../styles/fonts/OpenSans-VariableFont.ttf",
      style: "normal",
    },
    {
      path: "../styles/fonts/OpenSans-Italic-VariableFont.ttf",
      style: "italic",
    },
  ],
});

export default function Layout({ children }) {
  return (
    <div
      className={`${myFont.className} selection:bg-neutral-800 min-h-dvh flex flex-col`}
      role="region"
      aria-label="Main Layout"
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}
