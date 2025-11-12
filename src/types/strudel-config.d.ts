import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks';

/**
 * Possible properties for a page object in strudel-config.json.
 */
export interface StrudelPage {
  name: string;
  path: string;
  markdownId?: string;
  layoutComponent?: string;
  redirectTo?: string;
  /** 
   * The parent property is only present when pages are 
   * retrieved or flattened with one of the util functions 
   */
  parent?: StrudelPage;
  children?: StrudelPage[];
}

/**
 * Properties that can exist in the markdown frontmatter
 * for a Task Flow.
 */
export interface TaskFlowFrontmatter {
  id?: string;
  title?: string;
  tagline?: string;
  tags?: string[];
  intent?: string;
  intentDetails?: string;
  exampleUrl?: string;
  codeUrl?: string;
  figmaUrl?: string;
  iconImage?: string | FileNode;
}

/**
 * Properties that can exist in the markdown frontmatter
 * for a typical page.
 */
export interface PageFrontmatter {
  id?: string;
  title?: string;
  subtitle?: string;
}

/**
 * Properties expected to exist in the markdown frontmatter
 * for an event page.
 */
export interface EventFrontmatter {
  title: string;
  slug: string;
  date: string;
  timezone?: string;
  upcoming?: boolean;
  newsUrl?: string;
  speakers: string[];
  format: string;
  location: string;
  registrationLink?: string | null;
  image?: string;
  imageData?: IGatsbyImageData;
  shortDescription: string;
}

/**
 * Properties expected to exist in the markdown frontmatter
 * for a news post.
 */
export interface NewsFrontmatter {
  title: string;
  slug: string;
  date: string;
  author: string;
  thumbnail?: string;
  thumbnailData?: IGatsbyImageData;
}

/**
 * Properties expected to exist in the markdown frontmatter
 * for an app gallery item.
 */
export interface GalleryFrontmatter {
  title: string;
  slug: string;
  contributors: string[];
  appType: string;
  repoUrl?: string;
  liveUrl?: string;
  primaryImage?: string;
  primaryImageData?: IGatsbyImageData;
  otherImages?: string[];
}