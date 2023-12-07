import type { GatsbyConfig } from "gatsby"

/**
 * Gatsby site configuration options and plugins
 * Read more at https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */
const config: GatsbyConfig = {
  pathPrefix: '/strudel-web',
  siteMetadata: {
    title: `STRUDEL`,
    siteUrl: `https://strudel.science`,
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-theme-material-ui',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/content`,
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'strudel-config',
        path: `${__dirname}/config`,
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    'gatsby-transformer-json',
  ],
}

export default config
