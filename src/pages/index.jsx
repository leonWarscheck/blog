// import fs from 'fs';
import Link from 'next/link'
import Date from '../components/date';

import { getSortedPostsData } from '../utils/postsData' ;

export async function getStaticProps() {
  const allPostsData2 = getSortedPostsData();
  return {
    props: {
      allPostsData2,
    },
  };
}

// better Descriptive Names:
// getSortedPostsData = getPreviewListMetaDataArray
// allPostsData = allPostsMetaData
// allPostsData2 = previewListProps
// ?
// how can notice faster, if samenamed varables are different ?

export default function Home({allPostsData2 }) {
  return (
    <main className='bg-gray-500'>

    <section>
        <ul className=''>
          {allPostsData2.map(({ id, date, title, preview }) => ( // why map? why not just .id .date etc?
            <Link href={`/posts/${id}`} key={id}>
            <li className='mb-4 p-4 border rounded bg-purple-500' >
              <h2>{title}</h2>
              <Date dateString={date} />
         <p>{preview}
            </p> 
          </li>
            </Link>
          ))}
        </ul>
      </section> 
    </main>
  )
}
