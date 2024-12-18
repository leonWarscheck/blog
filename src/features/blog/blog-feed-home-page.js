import Link from 'next/link';
import Date from '../../components/date';
import Head from 'next/head';

export default function HomeFeed({ feedData }) {
  const colorClasses = [
    'c1: text-neutral-200 c1: group-hover:text-red-500',
    'c1: text-neutral-200 c1: group-hover:text-violet-500',
    'c1: text-neutral-200 c1: group-hover:text-yellow-la',
    'c1: text-neutral-200 c1: group-hover:text-emerald-la',
  ];

  return (
    <main className="mx-auto mt-0.5 min-h-dvh max-w-2xl grow px-4 pt-32">
      <Head>
        <title>A Blog by LeonWarscheck</title>
      </Head>
      <ul>
        {feedData.map(({ slug, date, readingTime, title, preview }, index) => (
          <li className="group mb-16" key={slug}>
            <Link href={`/posts/${slug}`}>
              <h2
                className={`text-xl font-semibold ${
                  colorClasses[index % colorClasses.length]
                } `}
              >
                {title}
              </h2>
              <h3 className="pb-2 text-sm">
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
