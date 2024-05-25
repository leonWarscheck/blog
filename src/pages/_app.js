import { MDXProvider } from "@mdx-js/react";
import Layout from "../components/Layout";
import "../styles/globals.css";
import Head from "next/head";
import { mdxComponents } from "../utils/mdx-components";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Head>
          <title>LeonAndersen</title>
        </Head>
        <MDXProvider  components={mdxComponents}>
          <Component {...pageProps} />
        </MDXProvider>
      </Layout>
    </>
  );
}
