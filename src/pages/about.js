import Head from "next/head";

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto pt-20 pb-12 px-4 grow">
      <Head>
        <title>About Leon Andersen</title>
      </Head>
      <ul
        className="text-orange-la mb-5 flex pb-1 font-medium "
        aria-label="Contact Links"
      >
        <li>
          <h2 className="mr-2 group  underline-offset-2 hover:text-neutral-400 ">
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
      <section>
        <h1 className="font-semibold text-2xl mb-1">Leon Andersen</h1>
        <h3 className="italic text-lg mb-7 font-light">
          "Creative power is head and heart working together."
        </h3>
        <p className="text-lg mb-7 text-balance c1:text-justify pb-4">
          Leon is a Fullstack Senior Developer at an awesome company, soon.{" "}
          <br />
          <br />
          After studying music production he discovered his passion for
          programming and became a webdeveloper. <br />
          <br />
          He is specialized in React and Node and is currently exploring Remix.
        </p>
        <h2 className="font-bold text-xl pb-2">Other Interests/ Skills:</h2>
        <ul className="text-md list-disc pl-5">
          <li>The Art of Learning,</li>
          <li>Systems Thinking,</li>
          <li>Sales/ Entrepreneurship,</li>
          <li>Trauma/ Psychology,</li>
          <li>and Media Design.</li>
        </ul>
      </section>
    </main>
  );
}
