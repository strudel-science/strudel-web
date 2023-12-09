<img width="500" alt="strudel-logo-cropped" src="https://github.com/lbl-ux/strudel/assets/420923/87cb4bd1-8c8d-4dfb-924f-f96f84017f2d">

The Scientific sofTware Research for User experience, Design, Engagement, and Learning project (STRUDEL) is a planning framework and design system that empowers people to build effective user interfaces for scientific software.

# strudel-web

**strudel-web** contains the code and content for the public-facing STRUDEL website. The code in this repo is deployed as the STRUDEL staging website. When ready for production, the Deploy Production Site GitHub action copies the code over to the [strudel-web-prod](https://github.com/strudel-science/strudel-science.github.io) repo and deploys it to the production site.

- [Staging Website](https://strudel.science/strudel-web)
- [Production Website](https://strudel.science/)

## Content Contributor Guide

There are two ways that content gets loaded into the website:
1. Markdown (.mdx) files in the `content` directory
2. React page components in the `src/pages` directory

## Developer Guide

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

# About STRUDEL
## Scientific sofTware Research for User experience, Design, Engagement, and Learning

The Scientific sofTware Research for User experience, Design, Engagement, and Learning project (STRUDEL) is a planning framework and design system for scientific software towards improving the usability and user interfaces.

The STRUDEL project is based at Lawrence Berkeley National Laboratory. The team members are:
* Lavanya Ramakrishnan (PI)
* Rajshree Deshmukh
* Dan Gunter
* Drew Paine
* Sarah Poon
* Cody O'Donnell