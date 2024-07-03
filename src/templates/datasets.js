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

Chart.register(CategoryScale);

export default function DatasetsPage({ data, pageContext }) {
    const team = pageContext.team
    const isLastigPage = (team.length > 1)
    console.log(`Dataset PAGE : ${team} => ${isLastigPage}`)
    const intl = useIntl()
    function trans(text) { return intl.formatMessage({ id: text }) }
  
    const [chartData] = useState({
        labels: data.allDatasetCsv.nodes.map((node) => `${node.short_name}`),
        datasets: [
            {
                label: "Datasets downloads",
                data: data.allDatasetCsv.nodes.map((node) => node.fields ? node.fields.downloads : 0),
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
        return <div><a href={`https://www.doi.org/${doi}`}><Icon icon="academicons:doi" width="2em" height="2em" />{doi}</a></div>;
    }
    function Teams({ teams }) {
        if (!teams) { return <div></div>; }
        return <div>Team(s): <b>{teams.join(", ")}</b></div>;
    }

    return (
        <Layout pageTitle={`${isLastigPage ? 'LASTIG' : pageContext.team} Datasets`}>
            <h1>{trans(`${isLastigPage ? 'LASTIG' : pageContext.team} Datasets`)}</h1>
            {(!isLastigPage) && <NavBar title={team} menus = {data.site.siteMetadata.menuSTRUDEL} team={team}/>}
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
                            {/* DOI_logo.svg */}
                                <Doi doi={node.doi} />
                                <Project project={node.project} />
                                <Teams teams={node.teams} />
                                <Downloads>{trans('Downloads:')} <b>{node.fields ? node.fields.downloads : 0}</b></Downloads>
                            </DatasetInfo>
                        </Dataset>
                    ))
                }
            </DatasetList>
        </Layout>
    )
}

export const query = graphql`
    query ($team: [String]) {
        allDatasetCsv(filter: { teams: { in: $team } }, sort: { fields: { downloads: DESC } }) {
            nodes {
                fields {
                    downloads
                }
                doi
                id
                name
                date
                project
                short_name
                theme
                url
                teams
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
                menuSTRUDEL {
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
`

export const Head = ({pageContext}) => <Seo title={`${pageContext.team.length > 1 ? 'LASTIG' : pageContext.team} Datasets`} />
