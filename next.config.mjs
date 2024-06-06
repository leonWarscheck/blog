import nextMDX from '@next/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkFrontmatter from 'remark-frontmatter'
import fs from 'fs';

 
const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter],
      rehypePlugins: [[rehypePrettyCode,{theme: JSON.parse(fs.readFileSync("./public/LA-Classics.json", "utf-8")),}]],
      // rehypePlugins: [[rehypePrettyCode,{theme:'one-dark-pro'}]],
  }
})
 
export default withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx']
})