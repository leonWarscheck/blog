import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), '/src/pages/posts');

// Gets called in `getStaticProps` in `index.js`.
export function getFeedData() {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });
}
