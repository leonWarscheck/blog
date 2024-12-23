import Head from 'next/head';
import Link from 'next/link';

import Date from '../../components/date';

// Like all page components, this one is exported via its corresponding route
// file, in this case: `index.js`. The `feedData` prop is getting passed from
// there, because it comes from `getStaticProps`, which needs to run serverside
// in the route file.
export default function HomeFeedPage({ feedData }) {
  const hoverColors = [
    'group-hover:text-red-500',
    'group-hover:text-violet-500',
    'group-hover:text-yellow-la',
    'group-hover:text-emerald-la',
  ];

  return (
    <main className="mx-auto mt-0.5 max-w-2xl grow px-4 pt-32">
      <Head>
        <title>A Blog by LeonWarscheck</title>
      </Head>
      <ul>
        {feedData.map(({ slug, date, readingTime, title, preview }, index) => (
          <li className="group mb-16" key={slug}>
            <Link href={`/posts/${slug}`}>
              <h2
                className={`text-xl font-semibold ${
                  hoverColors[index % hoverColors.length]
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
