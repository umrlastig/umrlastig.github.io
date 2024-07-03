exports.createPages = async function ({ actions, graphql }) {
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
  const teams = ['STRUDEL','ACTE','MEIG','GEOVIS']
  teams.forEach((team) => {
    console.log(`Team ${team}`)
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
}
const axios = require('axios')
const crypto = require('crypto')
var qs = require('qs')
// const ign_proxy = {
//   protocol: 'http',
//   host: 'proxy.ign.fr',
//   port: 3128,
// }
const ign_proxy = {
}

const fields = [
  'fileAnnexes_s', 'fileAnnexesFigure_s', 'invitedCommunication_s', 'proceedings_s', 'popularLevel_s', 'halId_s', 'authIdHalFullName_fs', 'producedDateY_i',
  'docType_s', 'files_s', 'fileMain_s', 'fileMainAnnex_s', 'linkExtUrl_s', 'title_s', 'en_title_s', 'fr_title_s', 'label_bibtex', 'citationRef_s', 'labStructId_i',
  'journalTitle_s', 'researchData_s', 'peerReviewing_s', 'audience_s', 'doiId_s', 'softCodeRepository_s', 'arxivId_s', 'anrProjectTitle_s', 'europeanProjectTitle_s',
  'publicationDate_s', 'journalUrl_s'
]
exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;
  // fetch raw data from the HAL api
  const queryParams = {
    q: "*",
    wt: "json",
    sort: "producedDateY_i desc",
    rows: 10000,
    fl: fields.join(','),
    fq: "((labStructId_i:1003089 OR labStructId_i:536752) producedDateY_i:[2019 TO *])"
  };
  const params = qs.stringify(queryParams);
  await axios.get(`https://api.archives-ouvertes.fr/search/?${params}`,
    proxy = ign_proxy).then(res => {
      console.log(`Found ${res.data.response.docs.length} publications`);

      // map into these results and create nodes
      res.data.response.docs.map((doc, i) => {
        // Create your node object
        const authors = doc.authIdHalFullName_fs.map((authIdHalFullName) => {
          const [_idHal, _fullName] = authIdHalFullName.split('_FacetSep_');
          return { fullName: _fullName, idHal: _idHal }
        });
        const docNode = {
          // Required fields
          id: `${i}`,
          parent: `__SOURCE__`,
          internal: {
            type: `HAL`, // name of the graphQL query --> allHAL {}
            // contentDigest will be added just after but it is required
          },
          children: [],
          // Other fields that you want to query with graphQl
          title: doc.title_s,
          halId: doc.halId_s,
          authIdHalFullName: authors,
          docType: doc.docType_s,
          producedDate: doc.producedDateY_i,
          fileMain: doc.fileMain_s,
          files: doc.files_s,
          citationRef: doc.citationRef_s,
          label_bibtex: doc.label_bibtex,
          proceedings: doc.proceedings_s,
          popularLevel: doc.popularLevel_s,
          invitedCommunication: doc.invitedCommunication_s,
          peerReviewing: doc.peerReviewing_s,
          researchData: doc.researchData_s,
          audience: doc.audience_s,
          doiId: doc.doiId_s,
          softCodeRepository: doc.softCodeRepository_s,
          arxivId: doc.arxivId_s,
          anrProjectTitle: doc.anrProjectTitle_s,
          europeanProjectTitle: doc.europeanProjectTitle_s,
          publicationDate: doc.publicationDate_s
        }
        // Get content digest of node. (Required field)
        const contentDigest = crypto
          .createHash(`md5`)
          .update(JSON.stringify(docNode))
          .digest(`hex`);
        // add it to userNode
        docNode.internal.contentDigest = contentDigest;
        // Create node with the gatsby createNode() API
        createNode(docNode);
      });
    }).catch(err => console.error(err));
}

const cheerio = require('cheerio');
var first = true
exports.onCreateNode = async ({
  node, // the node that was just created
  actions: { createNodeField },
  getNodesByType
}) => {
  if (node.internal.type === `DatasetCsv`) {
    var url = node.url;
    if (url.includes("zenodo")) {
      url = url.replace("/records/", "/api/records/")
      // console.log("Z = "+url)
      await axios.get(url, proxy = ign_proxy).then(res => {
        const downloads = res.data["stats"]["downloads"];
        // console.log(`Z => ${downloads}`)
        createNodeField({ node, name: 'downloads', value: +downloads })
      });
    } else {
      if (url.includes("dataverse") || url.includes("entrepot.recherche.data.gouv.fr")) {
        // console.log("D = " + url);
        await axios.get(url, proxy = ign_proxy).then(({ data }) => {
          const $ = cheerio.load(data);
          const downloads = $('.metrics-count-block')
            .map((_, block) => {
              const $block = $(block);
              return $block.text().substring(0, $block.text().indexOf(" Downloads")).replace(",", "")
            })
            .toArray()[0];
          // console.log(`D => ${downloads}`)
          createNodeField({ node, name: 'downloads', value: +downloads })
        });
      } else {
        if (url.includes("figshare")) {
          const dataId = url.substring(url.lastIndexOf("/") + 1)
          // console.log(`F = ${url} (${dataId})`);
          await axios.get(`https://stats.figshare.com/total/article/${dataId}`, proxy = ign_proxy).then(res => {
            const downloads = res.data["downloads"];
            // console.log(`F => ${downloads} from ${`https://stats.figshare.com/total/article/${dataId}`}`)
            createNodeField({ node, name: 'downloads', value: +downloads })
          });
        } else {
          if (url.includes("mendeley")) {
            // console.log("M = "+ url);
            const dataId = url.substring(url.lastIndexOf("/") + 1)
            await axios.get(`https://api.plu.mx/widget/elsevier/artifact?type=mendeley_data_id&id=${dataId}&hidePrint=true&site=plum&href=https://plu.mx/plum/a?mendeley_data_id=${dataId}`, proxy = ign_proxy).then(res => {
              const downloads = res.data["statistics"]["Usage"][0]["count"];
              // console.log("M => " + downloads)
              createNodeField({ node, name: 'downloads', value: +downloads })
            });
          } else {
            // console.log("OTHER = " + url)
            createNodeField({ node, name: 'downloads', value: Number(0) })
          }
        }
      }
    }
  } else {
    if (node.internal.type === `HAL`) {
      const peopleData = getNodesByType("PeopleCsv")
      // Identify the teams
      if (first) {
        const ignoreNoise = str => str.replaceAll("-", " ").replaceAll(".", "")
        const removeAccents = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        const clean = str => ignoreNoise(removeAccents(str))
        peopleData.forEach((n) => console.log(clean(`${n.firstname} ${n.lastname}`)))
        first = false
      }
      function match(n, a) {
        function getInitials(name) {
          let words = name.split(' ');
          let initials = words.map(word => word.charAt(0));
          return initials.join('-').toUpperCase();
        }
        const ignoreNoise = str => str.replaceAll("-", " ").replaceAll(".", "")
        const removeAccents = str => str.normalize('NFD').replaceAll(/[\u0300-\u036f]/g, '')
        const clean = str => ignoreNoise(removeAccents(str))
        const fullName = clean(a.fullName)
        return (
          (n.HAL && (a.idHal === n.HAL)) ||
          fullName.includes(clean(`${n.firstname} ${n.lastname}`)) ||
          fullName.includes(clean(`${n.alt_firstname} ${n.lastname}`)) ||
          fullName.includes(clean(`${getInitials(n.firstname)} ${n.lastname}`)) ||
          fullName.includes(clean(`${n.lastname} ${n.firstname}`))
        )
      }
      const teams = Array.from(new Set(node.authIdHalFullName.flatMap((author) => {
        const people = peopleData.filter((peopleNode) => match(peopleNode, author));
        return people.map((p) => p.team);
      })))
      if (teams.length == 0) console.log(node.halId + " => " + teams + " => " + node.authIdHalFullName.map((a) => a.fullName).join(', '));
      createNodeField({ node, name: 'teams', value: teams })
    }
  }
}

exports.createSchemaCustomization = ({ actions, schema }) => {
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
      menuSTRUDEL: [MenuLinks]!
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
  `,
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
        }
      }
    })
  ]
  createTypes(typeDefs)
}