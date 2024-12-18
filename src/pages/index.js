import { getFeedData } from '../features/blog/get-feed-data';

export function getStaticProps() {
  const feedData = getFeedData();
  return {
    props: {
      feedData,
    },
  };
}

export { default } from '../features/blog/blog-feed-home-page';
