import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '../../components/seo'
import { useIntl } from 'react-intl'
import { useLocalization } from "@ericcote/gatsby-theme-i18n"
import {Position} from '../../components/styles/Positions.styles'

function createPosition(id, type, team, pdf, text) {
    return (
        <Position>
            <span key={`${id}-position`}>
                {type}
            </span>
            <a href={pdf} key={`${id}-title`}>{text}</a>
            <span key={`${id}-team`}>
                {team}
            </span>
        </Position>
    )
}

const JoinPage = ({ data }) => {
    const intl = useIntl()
    const { locale } = useLocalization()
    function trans(text) { return intl.formatMessage({ id: text }) }
    const nodes = data.allRecruitingCsv.nodes;
    return (
        <Layout pageTitle="Join Us">
            <h1>Join Us!</h1>
            <ul>
                {
                    nodes.map((node) => ( 
                        createPosition(node.id, node.type, node.team, (locale === 'en') ? node.pdf_en : node.pdf_fr, (locale === 'en') ? node.title : node.titre)
                        // <article key={node.id} dangerouslySetInnerHTML={{ __html: `<b>${node.type} [${node.team}]:</b> <a href="${(locale === 'en') ? node.pdf_en : node.pdf_fr}">${(locale === 'en') ? node.title : node.titre}</a>` }}></article>
                    ))
                }
            </ul>
        </Layout>
    )
}

export const query = graphql`
    query {
        allRecruitingCsv {
            nodes {
                id
                type
                titre
                title
                pdf_fr
                pdf_en
                team
                filled
            }
        }
    }
`

export const Head = () => <Seo title="Join Us" />

export default JoinPage