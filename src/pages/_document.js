import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="scroll-pt-16" lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-neutral-700 overscroll-none text-neutral-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
