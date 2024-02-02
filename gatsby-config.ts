import type { GatsbyConfig } from "gatsby"
import { round } from "lodash"

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
    'gatsby-transformer-sharp',
    'gatsby-transformer-json',
    'gatsby-plugin-mdx-source-name',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content`,
        ignore: [`**/engage/events/*`, `**/engage/news/*`],
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'events',
        path: `${__dirname}/content/engage/events`,
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'news',
        path: `${__dirname}/content/engage/news`,
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
              wrapperStyle: (fluidResult: any) => `flex:${round(fluidResult.aspectRatio, 2)};`,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          /** Google Analytics Measurement ID */
          'TEMP',
        ],
        /**
         * This object gets passed directly to the gtag config command
         * This config will be shared across all trackingIds
         */
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: false,
          respectDNT: true,
          exclude: [],
          origin: 'https://www.googletagmanager.com',
          delayOnRouteUpdate: 0,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'STRUDEL',
        short_name: 'STRUDEL',
        start_url: '/',
        display: 'browser',
        icon: 'content/images/strudel-logo-icon.png'
      },
    },
  ],
}

export default config
