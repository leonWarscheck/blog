import Footer from "./Footer";
import Navbar from "./Navbar";
import { Open_Sans } from "next/font/google";

const nunito = Open_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const Layout = ({ children }) => {
  return (
    <div className={`${nunito.variable} font-sans flex flex-col min-h-screen`}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
