import SubscribeFormOnPage from "../../components/subscribeform-blogpage";

export default function MdxLayout({ children }) {
  return (
    <main
      className="max-w-2xl pt-20 mt-0.5 grow w-full mx-auto px-4 prose 
      prose-neutral prose-invert prose-pre:bg-neutral- prose-pre:-mb-4 prose-pre:-ml-4 c1:prose-pre:ml-4 prose-code:text-neutral-100 prose-a:no-underline prose-a:text-neutral-100
      hover:prose-a:underline prose-h4:font-bold prose-blockquote:bg-neutral-500 prose-headings:text-neutral-200"
      role="region"
      aria-label="MDX Article Layout"
    >
      {children}
      <section className="not-prose" aria-label="Subscribe Form Section">
        <SubscribeFormOnPage />
      </section>
    </main>
  );
}
