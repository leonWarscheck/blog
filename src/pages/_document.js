import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="scroll-pt-32" lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
      </Head>
      <body className="overscroll-none bg-neutral-700 text-neutral-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
