import SubscribeFormOnPage from "./SubscribeFormOnPage";

export default function MdxLayout({ children }) {
  // Create any shared layout or styles here
  return (
    <main className=" text-neutral-200 max-w-2xl pt-12 grow w-full mx-auto px-4 prose prose-neutral prose-invert  prose-pre:bg-neutral-700 prose-strong:not-prose   prose-h4:font-bold prose-a:no-underline hover:prose-a:text-neutral-400  "> 
      {children}
      <div className="not-prose">
      <SubscribeFormOnPage />
      </div>
    </main>
  );
}
