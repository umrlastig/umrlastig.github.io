import React from 'react'
import { graphql } from 'gatsby'
import { LocalizedLink as Link } from "@ericcote/gatsby-theme-i18n"
import { useIntl } from 'react-intl'
import {Members,StyledMember} from '../components/styles/Members.styled'
import Layout from '../components/Layout'
import Seo from '../components/seo'
import { NavBar } from '../components/NavBar'

const modifyUrl = (url) => {
    if (!url) return "https://www.umr-lastig.fr/lastig_data/img/abstract-user-icon.svg";
    if (url.startsWith("/")) return "https://www.umr-lastig.fr" + url;
    return url;
}

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

export default function MembersPage({ data, pageContext }) {
    const team = pageContext.team
    const isLastigPage = (team.length > 1)
    console.log(`Members PAGE : ${team} => ${isLastigPage}`)
    const intl = useIntl()
    function trans(text) { return intl.formatMessage({ id: text }) }
    return (
        <Layout pageTitle={`${isLastigPage ? 'LASTIG' : team} Members`}>
            <h1>{trans(`${isLastigPage ? 'LASTIG' : team} Members`)}</h1>
            {(!isLastigPage) && <NavBar title={team} menus = {data.site.siteMetadata.menus[team]} team={team}/>}
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
query MembersQuery ($team: [String]!) {
    allPeopleCsv(filter: { team: { in: $team } })  {
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
    site {
        siteMetadata {
            menus {
                ACTE {
                    link
                    name
                    subMenu {
                        link
                        name
                    }
                }
                GEOVIS {
                    link
                    name
                    subMenu {
                        link
                        name
                    }
                }
                MEIG {
                    link
                    name
                    subMenu {
                        link
                        name
                    }
                }
                STRUDEL {
                    link
                    name
                    subMenu {
                        link
                        name
                    }
                }
            }
        }
    }
}
`

export const Head = ({pageContext}) => <Seo title={`${pageContext.team.length > 1 ? 'LASTIG' : pageContext.team} Members`} />
