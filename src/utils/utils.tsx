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