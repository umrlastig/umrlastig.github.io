/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: "/lastig-gatsby",
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
          }
        ]
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
              }
            ]
          },
          {
            name: `Members`,
            link: `/members`,
          },
          {
            name: `Projects`,
            link: `/projects`,
          }
        ]
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
            name: `Projects`,
            link: `/projects`,
          }
        ]
      },
      {
        name: `Join`,
        link: `/join`,
      }
    ],
    menuSTRUDEL: [
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
            link: `/members`,
          },
          {
            name: `Projects`,
            link: `/projects`,
          }
        ]
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
            name: `Projects`,
            link: `/teams/strudel/projects`,
          }
        ]
      },
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
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
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-csv`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images\/.*\.svg/
        }
      }
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
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
      }
    },
    `gatsby-plugin-styled-components`
  ],
};