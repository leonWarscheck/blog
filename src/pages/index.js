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
  // Define an array of color classes
  const colorClasses = [
    "c1:text-neutral-200 c1:group-hover:text-red-500",
    "c1:text-neutral-200 c1:group-hover:text-violet-500",
    "c1:text-neutral-200 c1:group-hover:text-yellow-la",
    "c1:text-neutral-200 c1:group-hover:text-emerald-la",
  ];
  const colorClassesMobile = [
    "text-red-500",
    "text-violet-500",
    "text-yellow-la",
    "text-emerald-la",
  ];

  return (
    <main className="grow max-w-2xl pt-32 mt-0.5 mx-auto px-4 min-h-dvh">
      <ul>
        {feedData.map(({ slug, date, readingTime, title, preview }, index) => (
          <li className="mb-16 group" key={slug}>
            <Link href={`/posts/${slug}`}>
              <h2
                className={`font-semibold text-xl ${
                  colorClasses[index % colorClasses.length]
                }  ${colorClassesMobile[index % colorClassesMobile.length]}`}
              >
                {title}
              </h2>
              <h3 className="text-sm pb-2">
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
