import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  pathPrefix: '/strudel-web',
  siteMetadata: {
    title: `STRUDEL`,
    siteUrl: `https://strudel.science`,
    menuLinks: [
      {
        name: 'Overview',
        path: '/'
      },
      {
        name: 'Typology',
        path: '/typology',
        children: [
          {
            name: 'Getting Started',
            path: '/typology/getting-started'
          },
          {
            name: 'Facets',
            path: '/typology/facets'
          },
        ]
      },
      {
        name: 'Design System',
        path: '/design-system',
        children: [
          {
            name: 'Getting Started',
            path: '/design-system/getting-started'
          },
          {
            name: 'Task Flows',
            path: '/design-system/task-flows',
            children: [
              {
                name: 'Comparison',
                path: '/design-system/task-flows/comparison'
              },
              {
                name: 'Contributing Data',
                path: '/design-system/task-flows/contributing-data'
              },
              {
                name: 'Exploring Datasets',
                path: '/design-system/task-flows/exploring-datasets'
              },
              {
                name: 'Exploring Entities',
                path: '/design-system/task-flows/exploring-entities'
              },
              {
                name: 'Monitoring',
                path: '/design-system/task-flows/monitoring'
              },
              {
                name: 'Optimization',
                path: '/design-system/task-flows/optimization'
              },
            ]
          },
          {
            name: 'UI Library',
            path: 'ui-library',
            children: [
              {
                name: 'Getting Started',
                path: '/ui-library/getting-started'
              },
              {
                name: 'React Templates',
                path: '/ui-library/react-templates'
              },
            ]
          },
        ]
      }
    ]
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
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
