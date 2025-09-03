import path from "path";
import type { GatsbyNode } from "gatsby";
import { flattenPages } from "./src/utils/utils";
import { EventFrontmatter, NewsFrontmatter, PageFrontmatter, StrudelPage, TaskFlowFrontmatter } from "./src/types/strudel-config";

/**
 * Shape of the result from the graphql query
 * for the strudel config json and the markdown (MDX)
 * content files.
 */
interface Result {
  errors?: any;
  data?: {
    configJson: {
      pages: StrudelPage[]
    },
    content: {
      nodes: {
        frontmatter: TaskFlowFrontmatter | PageFrontmatter,
        internal: {
          contentFilePath: string;
        }
      }[]
    }
    events: {
      nodes: {
        frontmatter: EventFrontmatter,
        internal: {
          contentFilePath: string;
        },
        fields: {
          source: string;
        }
      }[]
    }
    news: {
      nodes: {
        frontmatter: NewsFrontmatter,
        internal: {
          contentFilePath: string;
        },
        fields: {
          source: string;
        }
      }[]
    }
  }
}

/**
 * Special gatsby method for creating pages programatically.
 * Here we are pulling data from strudel-config.json to generate 
 * pages from the markdown files that correspond to each page.
 */
export const createPages: GatsbyNode["createPages"] = async ({
  graphql, 
  actions,
  reporter
}) => {
  const { createPage, createRedirect } = actions;

  /**
   * Graphql query for the page objects in strudel-config.json
   * and the mdx files in the content directory.
   */
  const result: Result = await graphql(
    `
      {
        configJson {
          pages {
            name
            path
            markdownId
            layoutComponent
            children {
              markdownId
              name
              path
              layoutComponent
              children {
                markdownId
                name
                path
                layoutComponent
              }
            }
          }
        }
        content: allMdx {
          nodes {
            frontmatter {
              id
              title
              tagline
              tags
              intent
              intentDetails
              exampleUrl
              codeUrl
              figmaUrl
              iconImage {
                childImageSharp {
                  gatsbyImageData(width: 800)
                }
              }
              subtitle
            }
            internal {
              contentFilePath
            }
          }
        }
        events: allMdx(filter: {fields: {source: {eq: "events"}}}) {
          nodes {
            fields {
              source
            }
            frontmatter {
              title
              slug
              date
              upcoming
              speakers
              format
              location
              registrationLink
              shortDescription
              registrationCode
              image {
                childImageSharp {
                  gatsbyImageData(width: 800)
                }
              }
            }
            internal {
              contentFilePath
            }
          }
        }
        news: allMdx(filter: {fields: {source: {eq: "news"}}}) {
          nodes {
            fields {
              source
            }
            frontmatter {
              title
              slug
              date
              author
              thumbnail {
                childImageSharp {
                  gatsbyImageData(width: 800)
                }
              }
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const nestedPages = result.data?.configJson.pages;
  const pages = nestedPages && flattenPages(nestedPages);
  const mdxPages = result.data?.content.nodes;
  const eventPages = result.data?.events.nodes;
  const newsPages = result.data?.news.nodes;

  /**
   * Create a page for each page object that has an associated markdown file.
   * Pages that don't have a markdownId are assumed to have a custom page in
   * the pages directory.
   * 
   * Page objects are linked to markdown files by an id in the file's frontmatter metadata
   * (markdownId === frontmatter.id).
   */
  if (pages) {
    pages.forEach((page) => {
      if (page.markdownId) {
        const mdx = mdxPages?.find((d) => d.frontmatter.id === page.markdownId);
        if (mdx) {
          /**
           * The layoutComponent prop will fallback to PageLayout if none exists on the page object.
           * Because gatsby graphql looks at the existing properties of strudel-config.json to determine
           * what the queryable properties are, the layoutComponent property has been included in the json 
           * for each object to ensure layoutComponent remains queryable at every page level.
           * Technically each property only needs to exist in one object per child-level to be queryable.
           */
          page.layoutComponent = page.layoutComponent || 'PageLayout';
          const pageTemplate = path.resolve(`src/components/layouts/${page.layoutComponent}.tsx`);
          createPage({
            path: page.path,
            /**
             * This will pass the formatted markdown file to the page template via the children prop
             */
            component: `${pageTemplate}?__contentFilePath=${mdx.internal.contentFilePath}`,
            context: {
              frontmatter: mdx.frontmatter,
            }
          });
        }
      }
    });
  }

  /**
   * Create a page for each event mdx node.
   */
  if (eventPages) {
    const eventTemplate = path.resolve(`src/components/layouts/EventLayout.tsx`)
    eventPages.forEach((eventPage) => {
      createPage({
        path: `/engage/events/${eventPage.frontmatter.slug}`,
        component: `${eventTemplate}?__contentFilePath=${eventPage.internal.contentFilePath}`,
        context: {
          frontmatter: eventPage.frontmatter,
        }
      });
    })
  }

  /**
   * Create a page for each news mdx node.
   */
  if (newsPages) {
    const newsTemplate = path.resolve(`src/components/layouts/NewsLayout.tsx`)
    newsPages.forEach((newsPage) => {
      createPage({
        path: `/engage/news/${newsPage.frontmatter.slug}`,
        component: `${newsTemplate}?__contentFilePath=${newsPage.internal.contentFilePath}`,
        context: {
          frontmatter: newsPage.frontmatter,
        }
      });
    })
  }

  /**
   * Add redirects for top-level routes that 
   * don't have specific pages associated with them.
   */
  createRedirect({
    fromPath: `/design-system/`,
    toPath: `/design-system/overview/`,
    isPermanent: true, 
    force: true, 
    redirectInBrowser: true,
  });

  createRedirect({
    fromPath: `/design-system/task-flows/`,
    toPath: `/design-system/task-flows/overview/`,
    isPermanent: true, 
    force: true, 
    redirectInBrowser: true,
  });

  createRedirect({
    fromPath: `/planning-framework/`,
    toPath: `/planning-framework/overview/`,
    isPermanent: true, 
    force: true, 
    redirectInBrowser: true,
  });

  createRedirect({
    fromPath: `/engage/`,
    toPath: `/engage/contribute/`,
    isPermanent: true, 
    force: true, 
    redirectInBrowser: true,
  });

  createRedirect({
    fromPath: `/about/`,
    toPath: `/about/background/`,
    isPermanent: true, 
    force: true, 
    redirectInBrowser: true,
  });
};

