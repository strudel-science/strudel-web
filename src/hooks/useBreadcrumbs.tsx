import { useStaticQuery, graphql } from "gatsby"
import { findPageByPath, getCurrentPath } from "../utils/utils";
import { useLocation } from "@gatsbyjs/reach-router";
import { usePage } from "./usePage";
import { StrudelPage } from "../types/strudel-config";

interface Breadcrumb {
  label?: string;
  path?: string;
}

/**
 * Get the current page and generate a list of breadcrumbs.
 */
export const useBreadcrumbs = () => {
  const page = usePage();
  console.log(page);
  const breadcrumbs: Breadcrumb[] = [
    {
      label: page?.name,
      path: page?.path
    }
  ];

  /**
   * Iterate through the page object and add the nested 
   * parent pages to the breadcrumbs array.
   */
  const iterate = (page?: StrudelPage) => {
    if (page) {
      Object.keys(page).forEach(key => {
        if (key === 'parent' && page[key]) {
          breadcrumbs.push({
            label: page[key]?.name,
            path: page[key]?.path
          });
          iterate(page[key]);
        }
      });
    }
  }

  iterate(page);

  return breadcrumbs.reverse();
}