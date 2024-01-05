import { getAllPostIds, getPostData } from '../../utils/postsData';
import SubscribeFormOnPage from '../../components/SubscribeFormOnPage';
import Head from 'next/head';
import Date from '../../components/date';

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
  return (
  <>
   <Head>
        <title>{postData.title}</title>
      </Head>
      {postData.title}
      <br />
      {postData.id}
      <br />
       <Date dateString={postData.date} />
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      <SubscribeFormOnPage/>
  </>

  );
}

