import { openSans } from '../styles/fonts/fonts';
import Footer from './footer';
import Header from './header';

export default function Layout({ children }) {
  return (
    <div
      className={`${openSans} flex min-h-dvh flex-col selection:bg-neutral-800`}
      role="region"
      aria-label="Main Layout"
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}
