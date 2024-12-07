import Link from "next/link";
import Date from "../../components/date";
import Head from "next/head";




export default function HomeFeed({ feedData }) {
  const colorClasses = [
    "c1: text-neutral-200 c1: group-hover:text-red-500",
    "c1: text-neutral-200 c1: group-hover:text-violet-500",
    "c1: text-neutral-200 c1: group-hover:text-yellow-la",
    "c1: text-neutral-200 c1: group-hover:text-emerald-la",
  ];

  return (
    <main className="grow max-w-2xl pt-32 mt-0.5 mx-auto px-4 min-h-dvh ">
       <Head>
        <title>A Blog by LeonWarscheck</title>
      </Head>
      <ul>
        {feedData.map(({ slug, date, readingTime, title, preview }, index) => (
          <li className="mb-16 group" key={slug}>
            <Link href={`/posts/${slug}`}>
              <h2
                className={`font-semibold  text-xl ${
                  colorClasses[index % colorClasses.length]
                } `}
              >
                {title}
              </h2>
              <h3 className="text-sm pb-2">
                <Date dateString={date} /> &nbsp;- &nbsp;{readingTime}
              </h3>
              <p className="hyphens-auto text-justif">{preview}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
