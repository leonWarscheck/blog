import '../styles/globals.css';

import Head from 'next/head';

import Layout from '../components/layout.js';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>LeonWarscheck</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
