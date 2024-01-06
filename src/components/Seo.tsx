import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

interface SeoProps {
  title: string;
}

/**
 * Metadata to display in the web page's head for Search Engine Optimization
 */
const Seo: React.FC<SeoProps> = ({ title }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <title>{title} | {data.site.siteMetadata.title}</title>
  )
}

export default Seo