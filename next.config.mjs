import nextMDX from '@next/mdx'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkFrontmatter from 'remark-frontmatter'
 
const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [[rehypePrettyCode,{grid: false}]],
    // rehypePlugins: [[rehypePrettyCode,{theme: 'synthwave-84'}]],
    providerImportSource: '@mdx-js/react'
  }
})
 
export default withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx']
})