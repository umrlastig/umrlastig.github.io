import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '../../components/seo'
import Chart from "chart.js/auto";
import BarChart from "../../components/BarChart";
import { useState } from "react";
import { CategoryScale } from "chart.js";
import { theme } from '../../theme'
import { DatasetLegend, DatasetLegendItem, DatasetList, Dataset, DatasetHead, DatasetInfo, Downloads } from '../../components/styles/Datasets.styled'
import { useIntl } from 'react-intl'
import { Icon } from '@iconify-icon/react';

Chart.register(CategoryScale);

const DatasetsPage = ({ data }) => {
    const intl = useIntl()
    function trans(text) { return intl.formatMessage({ id: text }) }
  
    const [chartData] = useState({
        labels: data.allDatasetCsv.nodes.map((node) => `${node.short_name}`),
        datasets: [
            {
                label: "Datasets downloads",
                data: data.allDatasetCsv.nodes.map((node) => node.fields.downloads),
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

    return (
        <Layout pageTitle="LASTIG Datasets">
            <h1>LASTIG Datasets</h1>
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
                                <Downloads>{trans('Downloads:')} <b>{node.fields.downloads}</b></Downloads>
                            </DatasetInfo>
                        </Dataset>
                    ))
                }
            </DatasetList>
        </Layout>
    )
}

export const query = graphql`
    query {
        allDatasetCsv(sort: { fields: { downloads: DESC } }) {
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
            }
        }
    }
`

export const Head = () => <Seo title="LASTIG Datasets" />

export default DatasetsPage