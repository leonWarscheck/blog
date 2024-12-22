import Head from 'next/head';

export default function AboutPage() {
  return (
    <main className="mx-auto mt-0.5 max-w-2xl grow px-4 pb-12 pt-32">
      <Head>
        <title>About LeonWarscheck</title>
      </Head>

      <section>
        <p>
          <span>Leon Warscheck</span> is a Fullstack JavaScript Developer at
          ReactSquad. <br />
          <br />
          After studying audio engineering he discovered his passion for
          programming and became a webdeveloper. <br />
          <br />
          He is specialized in React and Node and is currently exploring Remix.
          <br />
          <br />
        </p>
        <ul
          className={`mx-auto mb-16 flex gap-4 text-neutral-200 underline-offset-2`}
          aria-label="Contact Links"
        >
          <li>
            <h2 className={`custom-border h-[22.5px]`}>
              <a href="https://github.com/leonWarscheck">Github</a>
            </h2>
          </li>
          <li>
            <h2 className={`custom-border h-[22.5px]`}>
              <a href="mailto:leon.warscheck@outlook.com">Email</a>
            </h2>
          </li>
        </ul>
        <h2 className="pb-2 font-bold">Other Interests/ Skills:</h2>
        <ul className="list-disc pl-5">
          <li>Music Production,</li>
          <li>Psychology,</li>
          <li>and Media Design.</li>
        </ul>
        <hr className="mt-6" />
        <h3 className="mt-2 font-light italic">
          "True creative power is head and heart working together."
        </h3>
      </section>
    </main>
  );
}
