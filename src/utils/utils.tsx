import { StrudelPage } from "../types/strudel-config";

/**
 * Build a flat list of page objects from the json.
 * Results will include a reference to each page's parent if it has one.
 */
export const flattenPages = (pages: StrudelPage[], parent?: StrudelPage): StrudelPage[] => { 
  return pages.reduce((flattened: StrudelPage[], { children, ...rest }) => {
    const page = { ...rest, parent };
    return flattened
      .concat([page])
      .concat(children ? flattenPages(children, page) : []);
  }, []);
};

/**
 * Find a page in a nested array of page objects that has a given path value.
 * Result will include a reference to the page's parent if it has one.
 */
export const findPageByPath = (path: string, pages: StrudelPage[]) => { 
  return flattenPages(pages).find((page) => page.path === path);
};

/**
 * Remove single trailing slash from a string
 */
const removeTrailingSlash = (str: string) => {     
  return str.replace(/\/$/, '');
};

/**
 * The currentPath is the full page path without the pathPrefix or trailing slashes.
 * The pathPrefix only matters when the option is set in the config and 
 * the app is deployed under another path (e.g. '/strudel-web').
 */
export const getCurrentPath = (pathname: string, pathPrefix?: string) => {
  let currentPath = removeTrailingSlash(pathname);
  /** Split pathname by slash and remove empty strings */
  const pathSegments = pathname.split('/').filter((d: string) => d);
  if (pathPrefix && `/${pathSegments[0]}` === pathPrefix) {
    currentPath = pathSegments.filter((d, i) => i > 0).join('/');
    currentPath = `/${currentPath}`;
  }
  return currentPath;
}
