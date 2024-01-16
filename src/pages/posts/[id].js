import { getAllPostIds, getPostData } from '../../utils/postsData';
import SubscribeFormOnPage from '../../components/SubscribeFormOnPage';
import Head from 'next/head';
import Date from '../../components/date';
import { MDXProvider } from '@mdx-js/react';
// import { components } from '../../utils/mdx-components';

/** @type {import('mdx/types.js').MDXComponents} */
const components = {
  h2(props) {
    return <h2 {...props} className='text-3xl' />
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

// How does params.id from getStaticProps({ params }) know the key is named id?
// A The front matter of the Markdown file 
// B The value from the file name

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  console.log("components", components)
  return (
  <main className=' pt-28 grow max-w-4xl'>
   <Head>
        <title>{postData.headtitle}</title>
      </Head>
      <h1 className='font-semibold text-3xl'>{postData.title}</h1>
      <br /> 
       <Date dateString={postData.date} />
      <br />
      <MDXProvider components={ components }>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </MDXProvider>
      <SubscribeFormOnPage/>
  </main>

  );
}

