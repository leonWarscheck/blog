import SubscribeFormOnPage from './SubscribeFormOnPage'


export default function MdxLayout({ children }) {
    // Create any shared layout or styles here
    return <main className="max-w-2xl pt-20 grow w-full mx-auto px-4 "> {children} <SubscribeFormOnPage /></main>
  }