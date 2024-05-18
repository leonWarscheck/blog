import Footer from "./Footer";
import Navbar from "./Navbar";
// import { Open_Sans } from 'next/font/google'

// const myFont = Open_Sans({ subsets: ['latin'] })

import localFont from "next/font/local";

const myFont = localFont({
  src: [
    {
      path: "./OpenSans-VariableFont.ttf",
      style: "normal",
    },
    {
      path: "./OpenSans-Italic-VariableFont.ttf",
      style: "italic",
    },
  ],
});

const Layout = ({ children }) => {
  return (
    <div
      // className={`selection:bg-neutral-800 min-h-screen flex flex-col`}
      className={`${myFont.className} selection:bg-neutral-800 min-h-screen flex flex-col`}
    >
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
