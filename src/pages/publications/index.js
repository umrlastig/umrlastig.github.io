import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '../../components/seo'
import { useIntl } from 'react-intl'
import { PublicationListOfLists } from '../../components/styles/Publications.styled'
import { getPubType } from './util'
import { CreateNodes } from '../../components/CreateNodes'

const PublicationsPage = ({ data }) => {
    const intl = useIntl()
    function trans(text) { return intl.formatMessage({ id: text }) }
    const nodes = data.allHal.nodes;
    const classifiedNodes = nodes.map((node) => ({ pubType: getPubType(node), ...node }));
    function Pub({ pubType }) {
        const filteredNodes = classifiedNodes.filter((node) => node.pubType === pubType);
        // const nodes = createNodes(classifiedNodes, pubType)
        if (filteredNodes.length > 0) {
            return (
                <div key={`pub${pubType}`}>
                    <h2> {trans(pubType)} </h2>
                    {/* <PublicationList>{nodes}</PublicationList> */}
                    <CreateNodes nodes = {filteredNodes} type={pubType}/>
                </div>
            );
        }
        return null;
    }
    return (
        <Layout pageTitle="LASTIG Publications">
            <h1>{trans('LASTIG Publications')}</h1>
            <PublicationListOfLists>
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
            </PublicationListOfLists>
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
                doiId
                softCodeRepository
                arxivId
                anrProjectTitle
                europeanProjectTitle
                publicationDate
            }
        }
    }
`

export const Head = () => <Seo title="LASTIG Publications" />

export default PublicationsPage