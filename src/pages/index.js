import Link from "next/link";
import Date from "../components/date";
import { getFeedData } from "../utils/getFeedData";

export async function getStaticProps() {
  const feedData = await getFeedData();
  return {
    props: {
      feedData,
    },
  };
}

export default function HomeFeed({ feedData }) {
  return (
    <main className="grow max-w-2xl pt-24 mx-auto px-4"> 
      <ul>
        {feedData.map(({ slug, date, readingTime, title, preview }) => (
          <li className="mb-14" key={slug}>
            <Link href={`/posts/${slug}`} >
              <h2 className="font-semibold text-xl hover:text-neutral-400 ">
                {title}
              </h2>
              <h3 className=" text-sm pb-2">
                <Date dateString={date} /> &nbsp;- &nbsp;{readingTime}
              </h3>
              <p className="hyphens-auto">{preview}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
