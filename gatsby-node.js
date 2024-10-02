const axios = require('axios')
const crypto = require('crypto')
const cheerio = require('cheerio')
var qs = require('qs')
var fs = require('fs')

// const { decompress } = require('shrink-string')

// const ign_proxy = {
//   protocol: 'http',
//   host: 'proxy.ign.fr',
//   port: 3128,
// }
// const ign_proxy = false

// var peopleCsvLines = 0;
// var personNodes = 0;

// exports.onPreBootstrap = async function ({ reporter }) {
//   // Read the file
//   await fs.readFile('src/data/people.csv', 'utf8', (err, data) => {
//     if (err) {
//       console.error(`Error reading file: ${err}`);
//       return;
//     }
//     // Split the data into lines
//     const lines = data.split('\n');
//     // Count non-empty lines (without header)
//     peopleCsvLines = lines.filter(line => line.trim() !== '').length - 1;
//     reporter.info(`${peopleCsvLines} lines in people.csv`);
//   });
// }
exports.createPages = async function ({ actions, graphql, reporter }) {
  var { data } = await graphql(`
        query {
            allPeopleCsv {
                nodes {
                    HAL
                    end_date
                    firstname
                    id
                    lastname
                    member
                    perm
                    photo
                    start_date
                    status
                    statut
                    team
                    webpage
                }
            }
        }
    `)
  data.allPeopleCsv.nodes.forEach(node => {
    const firstName = node.firstname
    const lastName = node.lastname
    // console.log(`${node.firstname}-${node.lastname}`)
    actions.createPage({
      path: `/members/${node.firstname}-${node.lastname}`,
      component: require.resolve(`./src/templates/member-page.js`),
      context: { firstName: firstName, lastName: lastName },
    })
  })
  const teams = ['STRUDEL', 'ACTE', 'MEIG', 'GEOVIS']
  teams.forEach((team) => {
    reporter.info(`Creating pages for team ${team}`)
    actions.createPage({
      path: `/teams/${team.toLowerCase()}/publications`,
      component: require.resolve(`./src/templates/publications.js`),
      context: { team: [team] },
    })
    actions.createPage({
      path: `/teams/${team.toLowerCase()}/datasets`,
      component: require.resolve(`./src/templates/datasets.js`),
      context: { team: [team] },
    })
    actions.createPage({
      path: `/teams/${team.toLowerCase()}/members`,
      component: require.resolve(`./src/templates/members-page.js`),
      context: { team: [team] },
    })
    actions.createPage({
      path: `/teams/${team.toLowerCase()}/projects`,
      component: require.resolve(`./src/templates/projects.js`),
      context: { team: [team] },
    })
    actions.createPage({
      path: `/teams/${team.toLowerCase()}/softwares`,
      component: require.resolve(`./src/templates/softwares.js`),
      context: { team: [team] },
    })
  })
  actions.createPage({
    path: `/publications`,
    component: require.resolve(`./src/templates/publications.js`),
    context: { team: ["ACTE", "GEOVIS", "MEIG", "STRUDEL"] },
  })
  actions.createPage({
    path: `/datasets`,
    component: require.resolve(`./src/templates/datasets.js`),
    context: { team: ["ACTE", "GEOVIS", "MEIG", "STRUDEL"] },
  })
  actions.createPage({
    path: `/projects`,
    component: require.resolve(`./src/templates/projects.js`),
    context: { team: ["ACTE", "GEOVIS", "MEIG", "STRUDEL"] },
  })
  actions.createPage({
    path: `/members`,
    component: require.resolve(`./src/templates/members-page.js`),
    context: { team: ["ACTE", "GEOVIS", "MEIG", "STRUDEL"] },
  })
  actions.createPage({
    path: `/softwares`,
    component: require.resolve(`./src/templates/softwares.js`),
    context: { team: ["ACTE", "GEOVIS", "MEIG", "STRUDEL"] },
  })
  actions.createPage({
    path: `/theses`,
    component: require.resolve(`./src/templates/theses.js`),
    context: { team: ["ACTE", "GEOVIS", "MEIG", "STRUDEL"] },
  })
}

const { createRemoteFileNode } = require("gatsby-source-filesystem")
exports.onCreateNode = async ({
  node, // the node that was just created
  actions: { createNode, createNodeField },
  reporter,
  createNodeId,
  getCache
}) => {
  // console.log(`onCreateNode ${node.internal.type}`)
  if (node.internal.type === `DatasetCsv`) {
    if (node.image_url !== null && node.image_url) {
      reporter.info(`DatasetCsv Image url = ${node.image_url}.`);
      const fileNode = await createRemoteFileNode({
        url: node.image_url, // string that points to the URL of the image
        parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id
        getCache
      })
      // if the file was created, extend the node with "image"
      if (fileNode) {
        createNodeField({ node, name: "image", value: fileNode.id })
      }
    }
  } else {
    if (node.internal.type === `SoftwareCsv` && node.image_url !== null && node.image_url) {
      reporter.info(`SoftwareCsv Image url = ${node.image_url}.`);
      // const extension = node.image_url.includes(".png") ? ".png" : ".jpg"
      const fileNode = await createRemoteFileNode({
        url: node.image_url, // string that points to the URL of the image
        parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id
        getCache
        // ext: extension,
        // name: node.short_name,
      })
      // if the file was created, extend the node with "image"
      if (fileNode) {
        createNodeField({ node, name: "image", value: fileNode.id })
      }
    }
  }
}

exports.createSchemaCustomization = ({ actions, schema, reporter }) => {
  const { createFieldExtension, createTypes } = actions
  createFieldExtension({
    name: `defaultArray`,
    extend() {
      return {
        resolve(source, args, context, info) {
          if (source[info.fieldName] == null) {
            return []
          }
          return source[info.fieldName]
        },
      }
    },
  })
  const typeDefs = [`
    type Site implements Node {
      siteMetadata: SiteMetadata
    }
    type SiteMetadata {
      menuLinks: [MenuLinks]!
      menus: teamMenus!
    }
    type teamMenus {
      ACTE: [MenuLinks]!
      GEOVIS: [MenuLinks]!
      MEIG: [MenuLinks]!
      STRUDEL: [MenuLinks]!
    }
    type MenuLinks {
      name: String!
      link: String!
      subMenu: [SubMenu] @defaultArray
    }
    type SubMenu {
      name: String
      link: String
    }
    type AuthIdHalFullName {
      fullName: String
      idHal: String
    }
  `,
    schema.buildObjectType({
      name: 'HalCsv',
      interfaces: ['Node'],
      extensions: {
        infer: true,
      },
      fields: {
        teams: {
          type: '[String]',
          resolve: (src, args, context, info) => {
            const { fieldName } = info
            const content = src[fieldName]
            const teams = content.split(',').map(str => str.trim())
            return teams
          }
        },
        authors: {
          type: '[String]',
          resolve: (src, args, context, info) => {
            const { fieldName } = info
            const content = src[fieldName]
            const authors = content.split(',').map(str => str.trim())
            return authors
          }
        },
        keywords: {
          type: '[String]',
          resolve: (src, args, context, info) => {
            const { fieldName } = info
            const content = src[fieldName]
            const keywords = content.split(',').map(str => str.trim())
            return keywords
          }
        },
        researchData: {
          type: '[String]',
          resolve: (src, args, context, info) => {
            const { fieldName } = info
            const content = src[fieldName]
            const researchData = content.split(',').map(str => str.trim())
            return researchData
          }
        },
        files: {
          type: '[String]',
          resolve: (src, args, context, info) => {
            const { fieldName } = info
            const content = src[fieldName]
            const files = content.split(',').map(str => str.trim())
            return files
          }
        },
        title: {
          type: '[String]',
          resolve: (src, args, context, info) => {
            const { fieldName } = info
            const content = src[fieldName]
            const title = content.split(',').map(str => str.trim())
            return title
          }
        },
        softCodeRepository: {
          type: '[String]',
          resolve: (src, args, context, info) => {
            const { fieldName } = info
            const content = src[fieldName]
            const softCodeRepository = content.split(',').map(str => str.trim())
            return softCodeRepository
          }
        },
        authIdHalFullName: {
          type: `[AuthIdHalFullName]`,
          resolve: (src, args, context, info) => {
            const { fieldName } = info
            const content = src[fieldName]
            const authors = JSON.parse(content)
            return authors
          }
        }
      }
    }),
    schema.buildObjectType({
      name: 'DatasetCsv',
      interfaces: ['Node'],
      extensions: {
        infer: true,
      },
      fields: {
        teams: {
          type: '[String]',
          resolve: (src, args, context, info) => {
            const { fieldName } = info
            const content = src[fieldName]
            const teams = content.split(',').map(str => str.trim())
            return teams
          }
        },
        image: {
          type: 'File',
          extensions: {
            link: {
              from: "fields.image"
            }
          }
        }
      }
    }),
    schema.buildObjectType({
      name: 'ProjectsCsv',
      interfaces: ['Node'],
      extensions: {
        infer: true,
      },
      fields: {
        Teams: {
          type: '[String]',
          resolve: (src, args, context, info) => {
            const { fieldName } = info
            const content = src[fieldName]
            const teams = content.split(',').map(str => str.trim())
            return teams
          }
        }
      }
    }),
    schema.buildObjectType({
      name: 'SoftwareCsv',
      interfaces: ['Node'],
      extensions: {
        infer: true,
      },
      fields: {
        teams: {
          type: '[String]',
          resolve: (src, args, context, info) => {
            const { fieldName } = info
            const content = src[fieldName]
            const teams = content.split(',').map(str => str.trim().toUpperCase())
            return teams
          }
        },
        image: {
          type: 'File',
          extensions: {
            link: {
              from: "fields.image"
            }
          }
        }
      }
    }),
  ]
  createTypes(typeDefs)
}

exports.onPostBuild = async ({ reporter }) => {
  reporter.info('Waiting for plugin to finish...');

  // Add your code here to wait for the plugin to finish
  // You can use promises, async/await, or any other method to wait for the plugin to complete its task

  reporter.info('Plugin has finished.');
};
exports.onPostBootstrap = async ({ reporter }) => {
  reporter.info('Waiting for gatsby-transformer-csv plugin to finish...');

  // Add your code here to wait for the gatsby-transformer-csv plugin to finish
  // You can use promises, async/await, or any other method to wait for the plugin to complete its task

  reporter.info('gatsby-transformer-csv plugin has finished.');
};