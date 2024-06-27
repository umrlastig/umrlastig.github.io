import * as React from 'react'
import { graphql } from 'gatsby'
// import {Link, Trans, useTranslation} from 'gatsby-plugin-react-i18next';
import { LocalizedLink as Link } from "@ericcote/gatsby-theme-i18n"
import {Members,StyledMember} from '../../components/styles/Members.styled'
import Layout from '../../components/Layout'
import Seo from '../../components/seo'

const modifyUrl = (url) => {
    if (!url) return "https://www.umr-lastig.fr/lastig_data/img/abstract-user-icon.svg";
    if (url.startsWith("/")) return "https://www.umr-lastig.fr" + url;
    return url;
};

const Member = ({node}) => {
    return (
    <StyledMember key={node.id}>
        <div>
            <img src={modifyUrl(node.photo)} alt={`${node.firstname} ${node.lastname}`} />
        </div>
        <h2>
            <Link to={`/members/${node.firstname}-${node.lastname}`}>
                {node.firstname} {node.lastname}
            </Link>
        </h2>
        <p>Started: {node.start_date}</p>
    </StyledMember>
    )
}
const MembersPage = ({ data }) => {
    return (
        <Layout pageTitle="LASTIG Members">
            <Members>
                {
                    data.allPeopleCsv.nodes.map((node) => (
                        <Member node = {node} />
                    ))
                }
            </Members>
        </Layout>
    )
}

export const query = graphql`
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
`

export const Head = () => <Seo title="LASTIG Members" />

export default MembersPage