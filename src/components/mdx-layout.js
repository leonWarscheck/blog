import SubscribeFormOnPage from './SubscribeFormOnPage'

export default function MdxLayout({ children }) {
    // Create any shared layout or styles here
    return <main className="max-w-xl pt-20 w-full mx-auto px-4 ">{children} <SubscribeFormOnPage /></main>
  }