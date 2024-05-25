import SubscribeFormOnPage from "./SubscribeFormOnPage";

export default function MdxLayout({ children }) {
  // Create any shared layout or styles here
  return (
    <div
      className=" text-neutral-200 max-w-2xl pt-12 grow w-full mx-auto px-4 prose prose-neutral prose-invert  prose-pre:bg-neutral-700  prose-a:no-underline hover:prose-a:underline  prose-h4:font-bold prose-blockquote:bg-neutral-500 "
      role="region"
      aria-label="MDX Article Layout"
    >
      {children}
      <section className="not-prose"
      aria-label="Subscribe Form Section"
      >
        <SubscribeFormOnPage />
      </section>
    </div>
  );
}
