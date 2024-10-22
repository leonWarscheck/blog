import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="scroll-pt-32" lang="en">
      <Head>
      <link rel="icon" type="image/svg+xml" href="favicon.svg" />
      </Head>
      <body className="bg-neutral-700 overscroll-none text-neutral-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
