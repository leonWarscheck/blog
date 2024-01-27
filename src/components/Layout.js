import Footer from "./Footer";
import Navbar from "./Navbar";
import { Open_Sans } from "@next/font/google";

const opensans = Open_Sans({
subsets: ["latin"],
  variable: "--font-opensans",
});

const Layout = ({ children }) => {
  return (
    // <div className={`${opensans.variable} font-opensans selection:bg-neutral-800 flex flex-col min-h-screen`}>
    <div className={`${opensans.variable} font-opensans selection:bg-neutral-800 min-h-screen flex flex-col`}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
