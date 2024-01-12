import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="h-full" lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-neutral-700 overscroll-none flex flex-col h-full text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
