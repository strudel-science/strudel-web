import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

interface SeoProps {
  title?: string;
  fullTitle?: string;
}

/**
 * Metadata to display in the web page's head for Search Engine Optimization
 */
const Seo: React.FC<SeoProps> = ({ title, fullTitle }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  let titleText = data.site.siteMetadata.title;
  if (fullTitle) {
    titleText = fullTitle
  } else if (title) {
    titleText = `${title} | ${data.site.siteMetadata.title}`;
  }

  return (
    <title>{titleText}</title>
  )
}

export default Seo