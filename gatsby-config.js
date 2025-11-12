/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: "",
  siteMetadata: {
    title: "LASTIG Gatsby",
    siteUrl: "https://www.umr-lastig.fr/",
    menuLinks: [
      {
        name: `Lab`,
        link: `/`,
        subMenu: [
          {
            name: `Presentation`,
            link: `/presentation`,
          },
          {
            name: `History`,
            link: `/history`,
          },
          {
            name: `Access`,
            link: `/access`,
          },
        ],
      },
      {
        name: `Research`,
        link: `/`,
        subMenu: [
          {
            name: `Teams`,
            link: `/teams`,
            subMenu: [
              {
                name: `ACTE`,
                link: `/teams/acte`,
              },
              {
                name: `GEOVIS`,
                link: `/teams/geovis`,
              },
              {
                name: `MEIG`,
                link: `/teams/meig`,
              },
              {
                name: `STRUDEL`,
                link: `/teams/strudel`,
              },
            ],
          },
          {
            name: `Members`,
            link: `/members`,
          },
          {
            name: `Projects`,
            link: `/projects`,
          },
        ],
      },
      {
        name: `Production`,
        link: `/`,
        subMenu: [
          {
            name: `Publications`,
            link: `/publications`,
          },
          {
            name: `Datasets`,
            link: `/datasets`,
          },
          {
            name: `Softwares`,
            link: `/softwares`,
          },
          {
            name: `PhD Theses`,
            link: `/theses`,
          },
        ],
      },
      {
        name: `Join`,
        link: `/join`,
      },
    ],
    menus: {
      STRUDEL: [
        {
          name: `Presentation`,
          link: `/teams/strudel`,
        },
        {
          name: `Research`,
          link: `/`,
          subMenu: [
            {
              name: `Members`,
              link: `/teams/strudel/members`,
            },
            {
              name: `Projects`,
              link: `/teams/strudel/projects`,
            },
          ],
        },
        {
          name: `Production`,
          link: `/`,
          subMenu: [
            {
              name: `Publications`,
              link: `/teams/strudel/publications`,
            },
            {
              name: `Datasets`,
              link: `/teams/strudel/datasets`,
            },
            {
              name: `Softwares`,
              link: `/teams/strudel/softwares`,
            },
          ],
        },
      ],
      ACTE: [
        {
          name: `Presentation`,
          link: `/teams/acte`,
        },
        {
          name: `Research`,
          link: `/`,
          subMenu: [
            {
              name: `Members`,
              link: `/teams/acte/members`,
            },
            {
              name: `Projects`,
              link: `/teams/acte/projects`,
            },
          ],
        },
        {
          name: `Production`,
          link: `/`,
          subMenu: [
            {
              name: `Publications`,
              link: `/teams/acte/publications`,
            },
            {
              name: `Datasets`,
              link: `/teams/acte/datasets`,
            },
          ],
        },
      ],
      MEIG: [
        {
          name: `Presentation`,
          link: `/teams/meig`,
        },
        {
          name: `Research`,
          link: `/`,
          subMenu: [
            {
              name: `Members`,
              link: `/teams/meig/members`,
            },
            {
              name: `Projects`,
              link: `/teams/meig/projects`,
            },
          ],
        },
        {
          name: `Production`,
          link: `/`,
          subMenu: [
            {
              name: `Publications`,
              link: `/teams/meig/publications`,
            },
            {
              name: `Datasets`,
              link: `/teams/meig/datasets`,
            },
          ],
        },
      ],
      GEOVIS: [
        {
          name: `Presentation`,
          link: `/teams/geovis`,
        },
        {
          name: `Research`,
          link: `/`,
          subMenu: [
            {
              name: `Members`,
              link: `/teams/geovis/members`,
            },
            {
              name: `Projects`,
              link: `/teams/geovis/projects`,
            },
          ],
        },
        {
          name: `Production`,
          link: `/`,
          subMenu: [
            {
              name: `Publications`,
              link: `/teams/geovis/publications`,
            },
            {
              name: `Datasets`,
              link: `/teams/geovis/datasets`,
            },
          ],
        },
      ],
    },
  },
  plugins: [
    `gatsby-transformer-csv`,
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        // The option defaults to true
        checkSupportedExtensions: false,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    // "gatsby-transformer-sharp",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images\/.*\.svg/,
        },
      },
    },
    {
      resolve: `@ericcote/gatsby-theme-i18n`,
      options: {
        defaultLang: `en`,
        configPath: require.resolve(`./i18n/config.json`),
      },
    },
    {
      resolve: `@ericcote/gatsby-theme-i18n-react-intl`,
      options: {
        defaultLocale: `./i18n/locales/en.json`,
      },
    },
    {
      resolve: "gatsby-plugin-react-leaflet",
      options: {
        linkStyles: true, // (default: true) Enable/disable loading stylesheets via CDN
      },
    },
    `gatsby-plugin-styled-components`,
  ],
};
