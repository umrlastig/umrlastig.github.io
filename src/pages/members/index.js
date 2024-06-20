import * as React from 'react'
import { graphql } from 'gatsby'
// import {Link, Trans, useTranslation} from 'gatsby-plugin-react-i18next';
import { LocalizedLink as Link } from "@ericcote/gatsby-theme-i18n"

import Layout from '../../components/layout'
import Seo from '../../components/seo'
import {members,imgMember,roundedCircle} from '../../components/members.module.css'

const modifyUrl = (url) => {
    if (!url) return "https://www.umr-lastig.fr/lastig_data/img/abstract-user-icon.svg";
    if (url.startsWith("/")) return "https://www.umr-lastig.fr" + url;
    return url;
};
const MembersPage = ({ data }) => {
    return (
        <Layout pageTitle="LASTIG Members">
            <div className={members}>
                {
                    data.allPeopleCsv.nodes.map((node) => (
                        <article key={node.id}>
                            <div className={imgMember}><img className={roundedCircle} src={modifyUrl(node.photo)} alt={`${node.firstname} ${node.lastname}`} /></div>
                            <h2>
                                <Link to={`/members/${node.firstname}-${node.lastname}`}>
                                    {node.firstname} {node.lastname}
                                </Link>
                            </h2>
                            <p>Started: {node.start_date}</p>
                        </article>
                    ))
                }
            </div>
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