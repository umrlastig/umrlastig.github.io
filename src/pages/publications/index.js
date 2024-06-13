import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import { doc, list, author, title } from '../../components/publications.module.css'

const baseImageUrl = "https://www.umr-lastig.fr/strudel/assets/images";
const icons = {
    'dx.doi.org': 'doi.svg',
    'www.mdpi.com': 'mdpi.jpg'
};
function parseCitation(citation) {
    var regex = /. <a[^>]*href="(https?:\/\/([^"/]*)\/[^"]*)"[^>]*>&#x27E8;([^<]*)&#x27E9;<\/a>/;
    var links = [];
    var matches;
    while ((matches = regex.exec(citation)) !== null) {
        const url = matches[1];
        var host = matches[2];
        const text = matches[3];
        citation = citation.replace(matches[0], '');
        const img = baseImageUrl + "/icons/" + (icons[host] || "link.svg");
        links.push({ url, text, img })
    }
    return { "citation": citation, "links": links };
}
function pubType(node) {
    if (node.popularLevel === "1") return "PV";
    if (node.popularLevel === "0" && node.docType === "ART" && node.peerReviewing === "0") return "ASCL";
    if (node.popularLevel === "0" && node.docType === "ART" && node.peerReviewing === "1" && node.audience === "2") return "ACL";
    if (node.popularLevel === "0" && node.docType === "ART" && node.peerReviewing === "1" ) return "ACLN";
    if (node.popularLevel === "0" && node.docType === "COMM" && node.invitedCommunication === "1") return "INV";
    if (node.popularLevel === "0" && node.docType === "COMM" && node.invitedCommunication === "0" && node.proceedings === "0") return "COM";
    if (node.popularLevel === "0" && node.docType === "COMM" && node.invitedCommunication === "0" && node.proceedings === "1" && node.audience === "2") return "ACTI";
    if (node.popularLevel === "0" && node.docType === "COMM" && node.invitedCommunication === "0" && node.proceedings === "1") return "ACTN";
    if (node.docType === "COUV") return "OS";
    if (node.docType === "DOUV") return "DO";
    if (node.docType === "REPORT" || node.docType === "UNDEFINED") return "AP";
    if (node.docType === "THESE" || node.docType === "HDR") return "TH";
    if (node.docType === "POSTER") return "AFF";
    return "OTHER";
}
function createNodes(nodes, type) {
    return nodes.filter((node) => node.pubType === type).map((node) => (
        <li key={node.halId} className={doc}>
            <span key={node.halId}>
                {node.authIdHalFullName.map((auth) => <a href={auth["idHal"] ? `https://cv.archives-ouvertes.fr/${auth["idHal"]}` : null} className={author}>{auth["fullName"]}</a>)}
            </span>
            <a href={node.fileMain} key={node.halId} className={title}>{node.title}</a>
            <span key={node.halId} dangerouslySetInnerHTML={{ __html: parseCitation(node.citationRef)["citation"] }} >
            </span>
        </li>
    ))
}
const PublicationsPage = ({ data }) => {
    const nodes = data.allHal.nodes;
    const classifiedNodes = nodes.map((node) => ({ pubType: pubType(node), ...node }));
    return (
        <Layout pageTitle="LASTIG Publications">
            <h1>LASTIG Publications</h1>
            <div>
                <div id="pubACL">
                    <h2> ACL </h2>
                    <ol className={list}>
                        {createNodes(classifiedNodes,"ACL")}
                    </ol>
                </div>
                <div id="pubACLN">
                    <h2> ACLN </h2>
                    <ol className={list}>
                        {createNodes(classifiedNodes,"ACLN")}
                    </ol>
                </div>
                <div id="pubASCL">
                    <h2> ASCL </h2>
                    <ol className={list}>
                        {createNodes(classifiedNodes,"ASCL")}
                    </ol>
                </div>
                <div id="pubPV">
                    <h2> PV </h2>
                    <ol className={list}>
                        {createNodes(classifiedNodes,"PV")}
                    </ol>
                </div>
                <div id="pubINV">
                    <h2> INV </h2>
                    <ol className={list}>
                        {createNodes(classifiedNodes,"INV")}
                    </ol>
                </div>
                <div id="pubCOM">
                    <h2> COM </h2>
                    <ol className={list}>
                        {createNodes(classifiedNodes,"COM")}
                    </ol>
                </div>
                <div id="pubACTI">
                    <h2> ACTI </h2>
                    <ol className={list}>
                        {createNodes(classifiedNodes,"ACTI")}
                    </ol>
                </div>
                <div id="pubACTN">
                    <h2> ACTN </h2>
                    <ol className={list}>
                        {createNodes(classifiedNodes,"ACTN")}
                    </ol>
                </div>
                <div id="pubOS">
                    <h2> OS </h2>
                    <ol className={list}>
                        {createNodes(classifiedNodes,"OS")}
                    </ol>
                </div>
                <div id="pubDO">
                    <h2> DO </h2>
                    <ol className={list}>
                        {createNodes(classifiedNodes,"DO")}
                    </ol>
                </div>
                <div id="pubAP">
                    <h2> AP </h2>
                    <ol className={list}>
                        {createNodes(classifiedNodes,"AP")}
                    </ol>
                </div>
                <div id="pubTH">
                    <h2> TH </h2>
                    <ol className={list}>
                        {createNodes(classifiedNodes,"TH")}
                    </ol>
                </div>
                <div id="pubAFF">
                    <h2> AFF </h2>
                    <ol className={list}>
                        {createNodes(classifiedNodes,"AFF")}
                    </ol>
                </div>
                <div id="pubOTHER">
                    <h2> OTHER </h2>
                    <ol className={list}>
                        {createNodes(classifiedNodes,"OTHER")}
                    </ol>
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query {
        allHal {
            nodes {
                halId
                id
                citationRef
                docType
                fileMain
                files
                invitedCommunication
                label_bibtex
                popularLevel
                proceedings
                producedDate
                title
                authIdHalFullName {
                    fullName
                    idHal
                }
                peerReviewing
                researchData
                audience
            }
        }
    }
`

export const Head = () => <Seo title="LASTIG Publications" />

export default PublicationsPage