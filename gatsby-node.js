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
    // var { data } = await graphql(`
    //     query {
    //         allMdx {
    //             nodes {
    //                 frontmatter {
    //                     title
    //                     slug
    //                 }
    //                 id
    //                 excerpt
    //                 internal {
    //                     contentFilePath
    //                 }
    //             }
    //         }
    //     }
    // `)
    // data.allMdx.nodes.forEach(node => {
    //     const title = node.frontmatter.title
    //     const slug = node.frontmatter.slug
    //     const id = node.id
    //     const path = require("path")
    //     const template = path.resolve(`./src/templates/page.js`)
    //     console.log(title + " with " + slug + " has id = " + id)
    //     actions.createPage({
    //         path: `/${node.frontmatter.slug}`,
    //         component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
    //         context: { id: id },
    //     })
    // })

}
const axios = require('axios');
const crypto = require('crypto');

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;
  // fetch raw data from the HAL api
  const fetchHAL = () => axios.get(`https://api.archives-ouvertes.fr/search/?q=*&wt=json&sort=producedDateY_i desc&rows=10000&fl=fileAnnexes_s,fileAnnexesFigure_s,invitedCommunication_s,proceedings_s,popularLevel_s,halId_s,authIdHalFullName_fs,producedDateY_i,docType_s,files_s,fileMain_s,fileMainAnnex_s,linkExtUrl_s,title_s,en_title_s,fr_title_s,label_bibtex,citationRef_s,labStructId_i,journalTitle_s,researchData_s,peerReviewing_s,audience_s&fq=(labStructId_i:1003089 OR labStructId_i:536752)&fq=producedDateY_i:[2019 TO *]`);
  // await for results
  const res = await fetchHAL();
  // map into these results and create nodes
  res.data.response.docs.map((doc, i) => {
    // Create your node object
    const authors = doc.authIdHalFullName_fs.map((authIdHalFullName) => {
        const [_idHal, _fullName] = authIdHalFullName.split('_FacetSep_');
        return {fullName: _fullName, idHal: _idHal}
    });
    // console.log(authors);
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
  return;
}