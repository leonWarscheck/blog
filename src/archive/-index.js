import Link from "next/link";
import Date from "../components/date";
import { getFeedData } from "../utils/getFeedData";
import { useEffect, useState } from "react";

export async function getStaticProps() {
  const feedData = await getFeedData();
  return {
    props: {
      feedData,
    },
  };
}

export default function HomeFeed({ feedData }) {
  // eventlistener hover on lis
  // triggers math.random on each hover
  // captured in useState
  // conditionally rendering colors depending on number from 0-10
  const [number, setNumber] = useState(1);

  useEffect(() => {
   
    const posts = document.querySelectorAll("li");
    const handleHover = () => setNumber(Math.floor(Math.random() * 4) + 1);
    posts.forEach((post) => {
      // post.addEventListener("mouseenter", handleHover);
      post.addEventListener("mouseleave", handleHover);
    });

    return () => {
      posts.forEach((post) => {
        // post.removeEventListener("mouseenter", handleHover);
        post.addEventListener("mouseleave", handleHover);
      });
    };
  }, []);

  return (
    <main className="grow max-w-2xl pt-24 mx-auto px-4 ">
      <ul>
        {feedData.map(({ slug, date, readingTime, title, preview }) => (
          <li className="mb-16 group" key={slug}>
            <Link href={`/posts/${slug}`}>
              <h2 className={`font-semibold text-xl 
              ${number=== 1 ? "group-hover:text-red-500" 
              : number===2?"group-hover:text-violet-500"
              : number===3?"group-hover:text-yellow-la" 
              :"group-hover:text-emerald-la"  }   `}>
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
