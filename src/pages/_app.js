import Layout from '../components/layout.js';
import '../styles/globals.css';
import '../styles/overpass-mono.css';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    // <>
    <Layout>
      <Head>
        <title>LeonWarscheck</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
    // </>
  );
}
