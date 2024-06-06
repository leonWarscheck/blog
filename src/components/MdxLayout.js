import SubscribeFormOnPage from "./SubscribeFormOnPage";
import { useMDXComponents } from "/mdx-components.js";
import { MDXProvider } from "@mdx-js/react";

export default function MdxLayout({ children }) {
  // Create any shared layout or styles here
  return (

        // <MDXProvider  components={useMDXComponents({})}>
    <main
      className="max-w-2xl pt-12 grow w-full mx-auto px-4 prose 
      prose-neutral prose-invert prose-pre:bg-neutral- prose-pre:-mb-4 prose-pre:ml-4 prose-a:no-underline 
      hover:prose-a:underline prose-h4:font-bold prose-blockquote:bg-neutral-500" 
      role="region"
      aria-label="MDX Article Layout"
    >
      {children}
      <section className="not-prose"
      aria-label="Subscribe Form Section"
      >
        <SubscribeFormOnPage />
      </section>
    </main>
    // </MDXProvider>
  );
}
