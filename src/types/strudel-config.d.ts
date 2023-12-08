/**
 * Possible properties for a page object in strudel-config.json.
 */
export interface StrudelPage {
  name: string;
  path: string;
  markdownId?: string;
  layoutComponent?: string;
  /** 
   * The parent property is only present when pages are 
   * retrieved or flattened with one of the util functions 
   */
  parent?: StrudelPage;
  children?: StrudelPage[];
}