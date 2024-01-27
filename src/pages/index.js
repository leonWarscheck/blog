// import fs from 'fs';
import Link from "next/link";
import Date from "../components/date";

import { feedMetaDataArray } from "../utils/postsData";

export async function getStaticProps() {
  const feedData = await feedMetaDataArray();
  return {
    props: {
      feedData,
    },
  };
}

// better Descriptive Names:
// getSortedPostsData = feedMetaDataArray
// allPostsData = allPostsMetaData
// allPostsData2 = feedData
// ?
// how can notice faster, if samenamed varables are different ?

export default function Home({ feedData }) {
  return (
    <main className="grow max-w-2xl mx-auto px-4">
      <ul className="pt-24">
        {feedData.map(({ id, date, title, preview }) => (
          <Link href={`/posts/${id}`} key={id}>
            <li className="mb-14">
              <h2 className="font-semibold text-xl hover:text-neutral-400 ">
                {title}
              </h2>
              <h2 className=" text-sm pb-2">
                <Date dateString={date} />
              </h2>
              <p className="text-justify">{preview}</p>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}
