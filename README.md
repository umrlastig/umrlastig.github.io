<h1 align="center">
  LASTIG gatsby website
</h1>

## 🚀 Quick start

1.  **Get the site locally.**

Use git to download the code to build the site.

    ```shell
    git clone git@github.com:umrlastig/lastig-gatsby.git
    ```

2.  **Install dependencies.**

Use npm:

    ```shell
    npm install
    ```

or yarn for instance.

    ```shell
    yarn install
    ```

3.  **Prepare the data.**
    Run.

        ```shell
        node prepareData.js
        ```

4.  **Start developing.**

Navigate into your new site’s directory and start it up.

    ```shell
    cd lastig-gatsby/
    npm run develop
    ```

5.  **Open the code and start customizing!**

Your site is now running at http://localhost:8000!

Edit pages to see your site update in real-time!

6.  **Update the data**

If you need to update the (csv) data for the website, run the script.
It might take a while since it makes quite a few REST API requests...
Be careful of the _use_proxy_ variable.
Furthermore, do not hesitate to run only the process you actually need (publications, etc.).

    ```shell
    cd lastig-gatsby/
    node prepareData.js
    ```

7.  **Learn more**

- [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Tutorials](https://www.gatsbyjs.com/docs/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Guides](https://www.gatsbyjs.com/docs/how-to/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

## 🚀 Quick start (deploy)

Deploy this site to github pages:

    ```shell
    cd lastig-gatsby/
    npm run deploy
    ```

## Before pushing modifications

Please run prettier:

    ```shell
    npx prettier . --write
    ```
