import { useStaticQuery, graphql } from "gatsby"
import { findDynamicPageByPath, findPageByPath, getCurrentPath } from "../utils/utils";
import { useLocation } from "@gatsbyjs/reach-router";

/**
 * 
 */
export const usePage = () => {
  const { configJson, site } = useStaticQuery(
    graphql`
      query {
        configJson {
          pages {
            name
            path
            children {
              name
              path
              children {
                name
                path
              }
            }
          }
        }
        site {
          pathPrefix
        }
      }
    `
  );
  const { pathname } = useLocation();
  const pathPrefix = site.pathPrefix;
  const currentPath = getCurrentPath(pathname, pathPrefix);
  const page = findPageByPath(currentPath, configJson.pages);
  if (page) {
    return page;
  } else {
    const dynamicPage = findDynamicPageByPath(currentPath, configJson.pages);
    if (dynamicPage) return dynamicPage;
  }
  return;
}