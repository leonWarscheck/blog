import Head from "next/head";

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto pt-28 pb-16 px-4 grow ">
      <Head>
        <title>About Leon Andersen</title>
      </Head>
      <div className=" ">
      <ul className="text-orange-la mb-5 flex pb-3 font-semibold  text-xl">
        <li>
          <h2 className="mr-2 group  underline-offset-2 hover:text-neutral-400 ">
            <a href="https://github.com/leonAndersen">Github</a>
          </h2>
        </li>
        <li>
          <h2 className="mx-2  underline-offset-2 hover:text-neutral-400">
            <a href="https://twitter.com/leonAndersen">Twitter</a>
          </h2>
        </li>
        <li>
          <h2 className="mx-2 underline-offset-2 hover:text-neutral-400">
            <a href="mailto:leon.andersen@protonmail.com">Email</a>
          </h2>
        </li>
      </ul>
      <h1 className="font-bold text-4xl mb-1">Leon Andersen</h1>
      <h3 className="italic text-xl mb-7 font-light">
        "Creative power is head and heart working together."
      </h3>
      <p className="text-2xl mb-7  pb-4">
        Leon is a Fullstack Senior Developer at an awesome company, soon. <br />
        <br />
        After studying music production he explored Webdevelopment and became a
        programmer. <br />
        <br />
        He is specialized in React and Node and has a strong passion for
        communication protocols.
      </p>
      <h2 className="font-bold text-2xl pb-2">Other Interests/ Skills:</h2>
      <ul className="text-lg list-disc pl-5">
        <li>The Art of Learning,</li>
        <li>Systems Thinking,</li>
        <li>Sales/ Entrepreneurship,</li>
        <li>Trauma/ Psychology,</li>
        <li>and Media Design.</li>
      </ul>
      </div>
    </main>
  );
}
