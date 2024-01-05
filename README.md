<img width="500" alt="strudel-logo-cropped" src="https://github.com/lbl-ux/strudel/assets/420923/87cb4bd1-8c8d-4dfb-924f-f96f84017f2d">

The Scientific sofTware Research for User experience, Design, Engagement, and Learning project (STRUDEL) is a planning framework and design system that empowers people to build effective user interfaces for scientific software.

# strudel-web

**strudel-web** contains the code and content for the public-facing STRUDEL website. The code in this repo is deployed as the STRUDEL staging website. When ready for production, the Copy Build to Production Repo GitHub action copies the code over to the [strudel-web-prod](https://github.com/strudel-science/strudel-science.github.io) repo and deploys it to the production site.

- [Staging Website](https://strudel.science/strudel-web)
- [Production Website](https://strudel.science/)

## Table of Contents

- [Repo Overview](#repo-overview)
- [Contributing and Deploying](#contributing-and-deploying)
- [Creating and Editing Content](#creating-and-editing-content)
- [Installing Locally](#installing-locally)
- [About STRUDEL](#about-strudel)

## Repo Overview

| Location    | Description |
| -------- | ------- |
| `/config` | Contains `strudel-config.json` which defines the navigation link structure and connects markdown files to pages. |
| `/content` | Contains markdown (.mdx) files that can be turned into pages. |
| `/content/images` | Contains images that are used in markdown files or other areas of the website. |
| `/src/components` | React components that are reused across the website. |
| `/src/gatsby-theme-material-ui-top-layout` | Contains `theme.ts` which configures the material ui theme for the site (e.g. palette, spacing, component defaults). |
| `/src/pages` | Gatsby Page components that are automatically added to the routing tree (but not the navigation config). |

## Contributing and Deploying

This guide is for STRUDEL team members who have permission to create branches and run GitHub actions.

### Contributing

#### 1. Create a new branch called `update/short-description-of-change`

You can do this from the command line or from the [github branches page](https://github.com/strudel-science/strudel-web/branches). Make sure that you source the new branch from the latest version of the `main` branch.

#### 2. Make your changes

Update any markdown, config, or typescript files that you need to.

#### 3. Commit your changes

#### 4. Create a PR to merge changes to the `main` branch

Request that your changes get merged into the `main` branch.

#### 5. Merge the PR and delete your branch

If there are no conflicts and you are ready, merge the PR into the main branch and delete the `update` branch you made for your changes.

#### 6. Check your changes on the staging website

Merging the PR should kick off the Deploy Gatsby Site to Pages workflow automatically. Check the status of that workflow on [its actions page](https://github.com/strudel-science/strudel-web/actions/workflows/gatsby.yml). Once the workflow completes, go to https://strudel.science/strudel-web and make sure your changes are there and that there were no unintended consequences.

### Deploying

NOTE: This process is still a work in progress. Right now, this will not replace any content on the official strudel.science site.

#### 7. Run the production deployment workflow

If the staging websites looks good, go to the [actions page for the Copy Build to Production Repo workflow](https://github.com/strudel-science/strudel-web/actions/workflows/prod.yml). Click the "Run workflow" dropdown, ensure that the `main` branch is selected, then click the "Run workflow" button. This will create build files for the website and copy them to the [strudel-web-prod](https://github.com/strudel-science/strudel-science.github.io) repo. This will automatically trigger a new deployment to the production website at https://strudel.science.

#### 8. Confirm your changes on the production website

Go to the the production website at https://strudel.science and confirm that everything looks as expected.

You're done!

## Creating and Editing Content

There are two possible ways that content gets loaded into the website:
1. Markdown (.mdx) files in the `content` directory
2. React page components in the `src/pages` directory

### Setting up a Markdown Page

#### 1. Create a markdown (.mdx) file in the `content` directory

Files in the `content` directory can be used as source data for pages on the website. The subdirectories inside `content` are purely organizational and have no impact on the website, except for the `images` directory whose location gets referenced around the app.

The markdown files should all use the `.mdx` extension. MDX is a special kind of markdown file that can accept JSX code (e.g. React components, HTML) as well as regular markdown. [Read more about MDX here](https://mdxjs.com/docs/what-is-mdx/). 

#### 2. Add an `id` to the top of your markdown file

For a markdown file to be turned into a page, you must add an `id` to the top of the file. To do this you use a YAML syntax called [frontmatter](https://mdxjs.com/guides/frontmatter/) which let's you add your own metadata to markdown files. For example, the `comparison.mdx` file in `content/design-system/task-flows` has the following at the top of the file:

```
---
id: 'task-flows-comparison'
---
```

This is the syntax for adding metadata. Be sure to follow it exactly. The `id` can be any string value, but it is best to follow this convention for markdown pages: all lowercase kabob-case `parent-section-filename`.

#### 3. Add an object to `strudel-config.json`

To actually create a web page from the markdown file, you must add a page object to `config/strudel-config.json`. The `strudel-config.json` file determines the navigation links and structure that are rendered on the site as well as which markdown files are turned into pages.

If an object within the config's `pages` array has a `markdownId`, then the content of that page will be sourced from the markdown file in the `content` directory that has an `id` that matches the `markdownId`.

For example, take the following page object from `strudel-config.json`:

```json
{
    "name": "Comparison",
    "path": "/design-system/task-flows/comparison",
    "markdownId": "task-flows-comparison",
    "layoutComponent": "PageLayout"
},
```

This tells the sidebar menu to render a link to "/design-system/task-flows/comparison" with the text "Comparison". It also looks for a markdown file in the `content` directory that has `id: task-flows-comparison`. The `layoutComponent` property is telling the app which layout component to use to wrap the markdown content in.

The `path` you supply to the object should be the full absolute path to the URL that should render the page.

The `pages` array in `strudel-config.json` is an ordered nested array. The top-level objects are rendered as links in the top Navbar. Children of top-level objects are rendered in the sidebar for their respective parent section. Children of second-level objects are rendered in a collapsible menu within the sidebar. The config only supports three levels of nesting for pages.

### Setting up a Custom React Component Page (Non-Markdown)

#### 1. Create a `.tsx` file in the `pages` directory

React component files in the `pages` directory are automatically recognized by Gatsby as pages in the website. The filename and subdirectory names are used to create the path name in the app router. For example, the file `pages/about/team.tsx` would be rendered at the path `/about/team`. If the filename is `index.tsx`, then it will be rendered at the root path of the directory it is in. For example `pages/index.tsx` is the home page of the app rendered at the path `/`.

#### 2. Write and Export a React Component

Inside your `.tsx` file you can build a TypeScript React component just as you normally would. You can import other components, add functions, load data, or anything else. The only requirement is that you make the component the `default` export. [Learn more about React here](https://react.dev/learn). Below is a minimal example of a page component:

```tsx
import * as React from 'react';
import BaseLayout from '../../components/layouts/BaseLayout';

const TeamPage: React.FC = () => {
  return (
    <BaseLayout>
      <Typography variant="h1">My Team Page</Typography>
    </BaseLayout>
  );
};

export default TeamPage
```

## Installing Locally

This website is built with [Gatsby](https://www.gatsbyjs.com/docs), a React-based framework for building websites. 

1.  **Clone the repo and install dependencies**

    Clone the strudel repo onto your local machine.

    ```shell
    git clone git@github.com:lbl-ux/strudel.git
    ```

    Navigate into the new strudel directory and install the dependencies.

    ```shell
    cd strudel
    npm install
    ```

2.  **Start developing.**

    Start up the strudel site with gatsby.

    ```shell
    npm run develop
    ```

3.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000!

    Edit `src/pages/index.tsx` to see your site update in real-time!

4.  **Learn more**

    - [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Tutorials](https://www.gatsbyjs.com/docs/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Guides](https://www.gatsbyjs.com/docs/how-to/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)

## About STRUDEL

The Scientific sofTware Research for User experience, Design, Engagement, and Learning project (STRUDEL) is a planning framework and design system for scientific software towards improving the usability and user interfaces. It is funded by the Alfred P. Sloan Foundation and is based at the Lawrence Berkeley National Laboratory.

The STRUDEL team includes:

* Lavanya Ramakrishnan (PI)
* Rajshree Deshmukh
* Dan Gunter
* Drew Paine
* Sarah Poon
* Cody O'Donnell