import Head from "next/head";

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto pt-20 pb-12 px-4 grow ">
      <Head>
        <title>About Leon Andersen</title>
      </Head>
      
      <section>
        {/* <h1 className="font-semibold text-2xl mb-1 ">Leon Andersen</h1> */}

        
        <p className="text- lg mb-2 text- balance c1:textjustify pb-4">
          <span className="font-bold">Leon Andersen</span> is a Fullstack JavaScript Developer at EarlyNode.{" "}
          <br />
          <br />
          After studying audio engineering he discovered his passion for
          programming and became a webdeveloper. <br />
          <br />
          He is specialized in React and Node and is currently exploring Remix.
        </p>
        <ul
        className="text-orange -la text-neutral-400 mb-10 flex pb-1 font-medium  underline underline-offset-2 mx-auto "
        aria-label="Contact Links"
      >
        <li className="ml- auto">
          <h2 className="mr-2 grou  underline-offset-2 hover:text-neutral-400 ">
            <a href="https://github.com/leonAndersen">Github</a>
          </h2>
        </li>
        {/* <li>
          <h2 className="mx-2  underline-offset-2 hover:text-neutral-400">
            <a href="https://twitter.com/leonAndersen">Twitter</a>
          </h2>
        </li> */}
        <li>
          <h2 className="mx-2 underline-offset-2 hover:text-neutral-400">
            <a href="mailto:leon.andersen@protonmail.com">Email</a>
          </h2>
        </li>
      </ul>
        <h2 className="font-bold text- lg pb-2">Other Interests/ Skills:</h2>
        <ul className=" list-disc pl-5">
          {/* <li>The Art of Learning,</li>
          <li>Systems Thinking,</li> */}
          <li>Music Production,</li>
          <li>Psychology,</li>
          <li>and Media Design.</li>
        </ul>
        <hr className="mt-6"/>
        <h3 className="italic text- sm lg mt-2 font-light "> 
          "Creative power is head and heart working together."
        </h3>
      </section>
    </main>
  );
}
