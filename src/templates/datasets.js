import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/seo'
import Chart from "chart.js/auto";
import BarChart from "../components/BarChart";
import { useState } from "react";
import { CategoryScale } from "chart.js";
import { theme } from '../theme'
import { DatasetLegend, DatasetLegendItem, DatasetList, Dataset, DatasetHead, DatasetInfo, Downloads } from '../components/styles/Datasets.styled'
import { useIntl } from 'react-intl'
import { Icon } from '@iconify-icon/react';
import { NavBar } from '../components/NavBar'
import { PublicationList } from '../components/CreateNodes';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

Chart.register(CategoryScale);

export default function DatasetsPage({ data, pageContext }) {
    const team = pageContext.team
    const isLastigPage = (team.length > 1)
    console.log(`Dataset PAGE : ${team} => ${isLastigPage}`)
    const intl = useIntl()
    function trans(text) { return intl.formatMessage({ id: text }) }
    const nodes = data.allDatasetCsv.nodes;
    nodes.sort(function (a, b) {return b.downloads - a.downloads;});
    const [chartData] = useState({
        labels: data.allDatasetCsv.nodes.map((node) => `${node.short_name}`),
        datasets: [
            {
                label: "Datasets downloads",
                data: data.allDatasetCsv.nodes.map((node) => node.downloads),
                backgroundColor: data.allDatasetCsv.nodes.map((node) => theme.colors[node.theme]),
            }
        ]
    });
    function Project({ project }) {
        if (!project) { return <div></div>; }
        return <div>Project: <b>{project}</b></div>;
    }
    function Doi({ doi }) {
        if (!doi) { return <div></div>; }
        return <div><a href={`https://www.doi.org/${doi}`} aria-label='doi'><Icon icon="academicons:doi" width="2em" height="2em" /></a></div>;
    }
    function Teams({ teams }) {
        if (!teams) { return <div></div>; }
        return <div>Team(s): <b>{teams.join(", ")}</b></div>;
    }
    function Publications({ doi }) {
        if (!doi) { return <div></div>; }
        const publications = data.allHalCsv.nodes.filter((n)=>n.researchData && n.researchData.some((rdata)=>rdata.includes(doi)))
        return <div>
            <PublicationList nodes = {publications} type={null} theme={theme}/>
        </div>;
    }

    return (
        <Layout pageTitle={`${isLastigPage ? 'LASTIG' : team} Datasets`}>
            <h1>{trans(`${isLastigPage ? 'LASTIG' : team} Datasets`)}</h1>
            {(!isLastigPage) && <NavBar title={team} menus = {data.site.siteMetadata.menus[team]} team={team}/>}
            <div>
                <DatasetLegend>
                    {['Agriculture','DigitalHumanities','Tourism','Planning','Urban','LULC','Security','Climate'].map((dataTheme)=>
                        <DatasetLegendItem $dataTheme = {dataTheme}><b>{dataTheme}</b></DatasetLegendItem>
                    )}
                </DatasetLegend>
                <BarChart chartData={chartData} />
            </div>
            <DatasetList>
                {
                    data.allDatasetCsv.nodes.map((node) => (
                        <Dataset key={node.id}>
                            <DatasetHead $dataTheme={node.theme}>
                                <div><a href={node.url}>{node.name}</a></div>
                                <div>{node.theme}</div>
                            </DatasetHead>
                            <DatasetInfo>
                                <GatsbyImage image={getImage(node.image)} alt={node.short_name} />
                                <Doi doi={node.doi} />
                                <Project project={node.project} />
                                <Teams teams={node.teams} />
                                <Downloads>{trans('Downloads:')} <b>{node.downloads }</b></Downloads>
                            </DatasetInfo>
                            <Publications doi={node.doi} />
                        </Dataset>
                    ))
                }
            </DatasetList>
        </Layout>
    )
}

export const query = graphql`
    query ($team: [String]) {
        allDatasetCsv(filter: { teams: { in: $team } }, sort: { downloads: DESC }) {
            nodes {
                downloads
                doi
                id
                name
                date
                project
                short_name
                theme
                url
                teams
                image {
                    childImageSharp {
                        gatsbyImageData(width: 200)
                    }
                }
            }
        }
        site {
            siteMetadata {
                menuLinks {
                    link
                    name
                    subMenu {
                        link
                        name
                        subMenu {
                            link
                            name
                        }
                    }
                }
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
        allHalCsv {
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
                teams
                authors
                keywords
            }
        }
    }
`

export const Head = ({pageContext}) => <Seo title={`${pageContext.team.length > 1 ? 'LASTIG' : pageContext.team} Datasets`} />
