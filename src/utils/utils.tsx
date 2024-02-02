import { StrudelPage } from "../types/strudel-config";
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks';
import { getImage } from "gatsby-plugin-image"

/**
 * Build a flat list of page objects from the json.
 * Results will include a reference to each page's parent if it has one.
 */
export const flattenPages = (pages: StrudelPage[], parent?: StrudelPage): StrudelPage[] => { 
  return pages.reduce((flattened: StrudelPage[], { children, ...rest }) => {
    if (!parent) {
      parent = pages.find((p) => p.path === '/');
    }
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
 * Find a page that doesn't exist in the config because
 * it has been generated dynamically (e.g. event page).
 * This will strip out the dynamic part of the URL and use that 
 * to find the parent page. Then the dynamic slug from the URL is 
 * used as the page name.
 */
export const findDynamicPageByPath = (path: string, pages: StrudelPage[]): StrudelPage | undefined => {
  const parentPath = removeLastPathSegment(path);
  const parentPage = findPageByPath(parentPath, pages);
  const segments = removeTrailingSlash(path).split('/');
  const wordsInName = segments[segments.length - 1].split('-');
  const capitalizedWords = wordsInName.map((word) =>  word.charAt(0).toUpperCase() + word.slice(1));
  const name = capitalizedWords.join(' ');

  if (parentPage) {
    return {
      name,
      path,
      parent: parentPage
    }
  } else {
    return;
  }
};

/**
 * Find a page in a nested array of page objects that has a given name value.
 * Name values are not necessarily unique. This will return the first page found with a given name.
 * This should only be used when you know the name is unique, such as for getting a Task Flow page object.
 * Result will include a reference to the page's parent if it has one.
 */
export const findPageByName = (name: string, pages: StrudelPage[]) => { 
  return flattenPages(pages).find((page) => page.name === name);
};

/**
 * Get the top-level parent of a given page.
 * This assumes the page argument is from usePage or findPage so that 
 * it has a reference to its parent nodes.
 */
export const getTopLevelParent = (page: StrudelPage) => {
  const parent = page.parent;
  const grandparent = page.parent?.parent;
  if (parent && grandparent) {
    if (grandparent.path === '/') {
      return parent;
    } else if (grandparent.parent && grandparent.parent.path === '/') {
      return grandparent;
    }
  }
  return;
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
  } else if (currentPath === '') {
    currentPath = '/';
  }
  return currentPath;
};

export const getImageFromFileNode = (image?: FileNode | string) => {
  if (
    typeof image !== 'string' &&
    image?.hasOwnProperty('childImageSharp') &&
    image.childImageSharp?.gatsbyImageData
  ) {
    return getImage(image?.childImageSharp?.gatsbyImageData);
  } else {
    return;
  }
};

/**
 * Remove the last segment of a path
 * i.e. remove all text after the last / in the path.
 * E.g. /first-segment/last-segment
 */
const removeLastPathSegment = (path: string) => {     
  const segments = removeTrailingSlash(path).split('/').filter((d: string) => d);
  segments.splice(segments.length - 1, 1);
  return `/${segments.join('/')}`;
};

/**
 * Convert a list of strings into a grammatically correct sentence fragment.
 */
export const arrayToSentence = (arr: string[]) => {
  if (arr.length === 1) {
    return arr[0];
  } else if (arr.length === 2) {
    return arr.join(' and ');
  } else {
    const last = arr.pop();
    return arr.join(', ') + ' and ' + last;
  }
}