import Head from "next/head";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [number, setNumber] = useState(1);

  useEffect(() => {
    const posts = document.querySelectorAll("li");
    const handleHover = () => setNumber(Math.floor(Math.random() * 4) + 1);
    posts.forEach((post) => {
      // post.addEventListener("mouseenter", handleHover);
      post.addEventListener("mouseleave", handleHover);
    });

    return () => {
      posts.forEach((post) => {
        // post.removeEventListener("mouseenter", handleHover);
        post.addEventListener("mouseleave", handleHover);
      });
    };
  }, []);

  return (
    <main className="max-w-2xl mx-auto pt-32 pb-12 px-4 grow ">
      <Head>
        <title>About Leon Andersen</title>
      </Head>

      <section>
        {/* <h1 className="font-semibold text-2xl mb-1 ">Leon Andersen</h1> */}

        <p className="text- lg mb- text- balance c1:textjustify pb-">
          <span className="font- semibold">Leon Andersen</span> is a Fullstack
          JavaScript Developer at EarlyNode. <br />
          <br />
          After studying audio engineering he discovered his passion for
          programming and became a webdeveloper. <br />
          <br />
          He is specialized in React and Node and is currently exploring Remix.
          <br />
          <br />
        </p>
        <ul
          className={` text-neutral-200 mb-16 flex gap-4  font- medium  underlin underline-offset-2 mx-auto `}
          aria-label="Contact Links"
        >
          <li className="ml- auto">
            <h2
              className={` custom-border  h-[22.5px]  ${
                number === 1
                  ? " hover:border-red-500 hover:text-red-500"
                  : number === 2
                  ? " hover:border-violet-500 hover:text-violet-500"
                  : number === 3
                  ? " hover:border-yellow-la hover:text-yellow-la"
                  : " hover:border-emerald-la hover:text-emerald-la"
              }`}
            >
              <a href="https://github.com/leonAndersen" className="">
                Github
              </a>
            </h2>
          </li>
          {/* <li>
          <h2 className="mx-2  underline-offset-2 hover:text-neutral-400">
            <a href="https://twitter.com/leonAndersen">Twitter</a>
          </h2>
        </li> */}
          <li>
            <h2
              className={` custom-border  h-[22.5px]  ${
                number === 1
                  ? " hover:border-red-500 hover:text-red-500"
                  : number === 2
                  ? " hover:border-violet-500 hover:text-violet-500"
                  : number === 3
                  ? " hover:border-yellow-la hover:text-yellow-la"
                  : " hover:border-emerald-la hover:text-emerald-la"
              }`}
            >
              <a href="mailto:leon.andersen@protonmail.com" className="">
                Email
              </a>
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
        <hr className="mt-6" />
        <h3 className="italic text- sm lg mt-2 font-light ">
          "Creative power is head and heart working together."
        </h3>
      </section>
    </main>
  );
}
