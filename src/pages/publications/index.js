import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '../../components/seo'
import { useIntl } from 'react-intl'
import { Publication } from '../../components/styles/Publications.styled'

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
export function getPubType(node) {
    if (node.popularLevel === "1") return "PV";
    if (node.popularLevel === "0" && node.docType === "ART" && node.peerReviewing === "0") return "ASCL";
    if (node.popularLevel === "0" && node.docType === "ART" && node.peerReviewing === "1" && node.audience === "2") return "ACL";
    if (node.popularLevel === "0" && node.docType === "ART" && node.peerReviewing === "1") return "ACLN";
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
export function createNodes(nodes, type) {
    function pubKey(node) {console.log(`${node.id}-${type}`);return `${node.id}-${type}`};
    return nodes.filter((node) => node.pubType === type).map((node) => (
        <Publication key={pubKey(node)}>
            <span key={`${node.id}-authors`}>
                {node.authIdHalFullName.map((auth) => <a href={auth["idHal"] ? `https://cv.archives-ouvertes.fr/${auth["idHal"]}` : null}>{auth["fullName"]}</a>)}
            </span>
            <a href={node.fileMain} key={`${node.id}-title`}>{node.title}</a>
            <span key={`${node.id}-citation`} dangerouslySetInnerHTML={{ __html: parseCitation(node.citationRef)["citation"] }} >
            </span>
        </Publication>
    ))
}
const PublicationsPage = ({ data }) => {
    const intl = useIntl()
    function trans(text) { return intl.formatMessage({ id: text }) }
    const nodes = data.allHal.nodes;
    const classifiedNodes = nodes.map((node) => ({ pubType: getPubType(node), ...node }));
    function Pub({ pubType }) {
        const nodes = createNodes(classifiedNodes, pubType)
        if (nodes.length > 0) {
            return (
                <div key={`pub${pubType}`}>
                    <h2> {trans(pubType)} </h2>
                    <ol>{nodes}</ol>
                </div>
            );
        }
        return null;
    }
    return (
        <Layout pageTitle="LASTIG Publications">
            <h1>{trans('LASTIG Publications')}</h1>
            <div>
                <Pub pubType="ACL" key="ACL"></Pub>
                <Pub pubType="ACLN" key="ACLN"></Pub>
                <Pub pubType="ASCL" key="ASCL"></Pub>
                <Pub pubType="PV" key="PV"></Pub>
                <Pub pubType="INV" key="INV"></Pub>
                <Pub pubType="COM" key="COM"></Pub>
                <Pub pubType="ACTI" key="ACTI"></Pub>
                <Pub pubType="ACTN" key="ACTN"></Pub>
                <Pub pubType="OS" key="OS"></Pub>
                <Pub pubType="DO" key="DO"></Pub>
                <Pub pubType="AP" key="AP"></Pub>
                <Pub pubType="TH" key="TH"></Pub>
                <Pub pubType="AFF" key="AFF"></Pub>
                <Pub pubType="OTHER" key="OTHER"></Pub>
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