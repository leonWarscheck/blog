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
    <main className=' mx-auto pt-24'>
        <ul className=''>
          {allPostsData2.map(({ id, date, title, preview }) => ( 
            <Link href={`/posts/${id}`} key={id}>
            <li className='mb-12' >
              <h2 className='font-bold text-2xl hover:text-neutral-400 '>{title}</h2>
         <h2 className=' text-sm pb-3'>
              <Date dateString={date} />
         </h2>
          <p className=''>{preview}
            </p> 
          </li>
            </Link>
          ))}
        </ul>
    </main>
  )
}
