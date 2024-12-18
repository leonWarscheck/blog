import SubscribeFormOnPage from './subscribeform-blogpage';

export default function MdxLayout({ children }) {
  return (
    <main
      className="prose prose-neutral prose-invert mx-auto mt-0.5 w-full max-w-2xl grow px-4 pt-20 prose-headings:text-neutral-200 prose-h4:font-bold prose-a:text-neutral-100 prose-a:no-underline hover:prose-a:underline prose-blockquote:bg-neutral-500 prose-code:text-neutral-100 prose-pre:-mb-4 prose-pre:-ml-4 c1:prose-pre:ml-4"
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
