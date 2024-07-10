import React from 'react'
import { graphql } from 'gatsby'
import { LocalizedLink as Link } from "@ericcote/gatsby-theme-i18n"
import { FormattedMessage, useIntl } from 'react-intl'
import { Members, StyledMember } from '../components/styles/Members.styled'
import Layout from '../components/Layout'
import Seo from '../components/seo'
import { NavBar } from '../components/NavBar'

const modifyUrl = (url) => {
    if (!url) return "https://www.umr-lastig.fr/lastig_data/img/abstract-user-icon.svg";
    if (url.startsWith("/")) return "https://www.umr-lastig.fr" + url;
    return url;
}

const Member = ({ node }) => {
    return (
        <StyledMember key={node.id}>
            <Link to={`/members/${node.firstname}-${node.lastname}`}>
                <img src={modifyUrl(node.photo)} alt={`${node.firstname} ${node.lastname}`} />
                <h3> {node.firstname} {node.alt_firstname && `(${node.alt_firstname}) `}{node.lastname} </h3>
                <p> {node.status} </p>
                {/* <p>Started: {node.start_date}</p> */}
            </Link>
        </StyledMember>
    )
}

export default function MembersPage({ data, pageContext }) {
    const isLastigPage = (pageContext.team.length > 1)
    const team = isLastigPage ? 'LASTIG' : pageContext.team
    console.log(`Members PAGE : ${team} => ${isLastigPage}`)
    const intl = useIntl()
    function trans(text) { return intl.formatMessage({ id: text }) }
    const phD = data.allPeopleCsv.nodes.filter((node) => node.status === 'PhD student' && node.member === 'true')
    const postDoc = data.allPeopleCsv.nodes.filter((node) => node.status === 'Post-doc' && node.member === 'true' && node.perm === 'false')
    const engineer = data.allPeopleCsv.nodes.filter((node) => node.member === 'Engineer' && node.member === 'true' && node.perm === 'false')
    const alumni = data.allPeopleCsv.nodes.filter((node) => node.member === 'false')
    const permanent = data.allPeopleCsv.nodes.filter((node) => node.perm === 'true' && node.status !== 'PhD student' && node.member === 'true')
    return (
        //`${isLastigPage ? 'LASTIG' : team} Members`
        <Layout pageTitle={<FormattedMessage id="members" values={{ team: team }}/>}>
            <h1>{<FormattedMessage id="members" values={{ team: team }}/>}</h1>
            {(!isLastigPage) && <NavBar title={team} menus={data.site.siteMetadata.menus[team]} team={team} />}
            <h2>{trans("Permanent staff")}</h2>
            <Members>
                {
                    permanent.map((node) => Member(node = { node }))
                }
            </Members>
            {phD.length > 0 && <>
                <h2>{trans("PhD candidates")}</h2>
                <Members>
                    {
                        phD.map((node) => Member(node = { node }))
                    }
                </Members></>
            }
            {postDoc.length > 0 && <>
                <h2>{trans("Post-docs")}</h2>
                <Members>
                    {
                        postDoc.map((node) => Member(node = { node }))
                    }
                </Members></>
            }
            {engineer.length > 0 && <>
                <h2>{trans("Engineers")}</h2>
                <Members>
                    {
                        engineer.map((node) => Member(node = { node }))
                    }
                </Members>
            </>
            }
            <h2>{trans("Alumni")}</h2>
            <Members>
                {
                    alumni.map((node) => Member(node = { node }))
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
            alt_firstname
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

export const Head = ({ pageContext }) => <Seo title={`${pageContext.team.length > 1 ? 'LASTIG' : pageContext.team} Members`} />
