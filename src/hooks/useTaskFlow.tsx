import { useStaticQuery, graphql } from "gatsby"
import { findPageByName } from "../utils/utils";
import { StrudelPage } from "../types/strudel-config";

interface TaskFlowsResult {
  configJson: {
    pages: StrudelPage[]
  },
  allMdx: {
    nodes: {
      frontmatter: {
        id: string;
        title: string;
        tagline: string;
        intent: string;
      },
      internal: {
        contentFilePath: string;
      }
    }[]
  }
}

/**
 * Get task flow metadata using the task flow's name in the config.
 * Combines fields from the task flow's object in strudel-config.json and 
 * markdown frontmatter.
 */
export const useTaskFlow = (name: string) => {
  const { configJson, allMdx } = useStaticQuery<TaskFlowsResult>(
    graphql`
      query {
        configJson {
          pages {
            name
            children {
              name
              children {
                name
                markdownId
                path
              }
            }
          }
        }
        allMdx {
          nodes {
            frontmatter {
              id
              title
              tagline
              intent
            }
          }
        }
      }
    `
  );
  const taskFlowConfig = findPageByName(name, configJson.pages);
  if (taskFlowConfig) {
    const mdx = allMdx.nodes?.find((md) => md.frontmatter.id === taskFlowConfig.markdownId);
    return {
      ...taskFlowConfig,
      ...mdx?.frontmatter
    }
  } else {
    return;
  }
}