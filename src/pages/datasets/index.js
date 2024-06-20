import * as React from 'react'
import { graphql } from 'gatsby'
// import {Link, Trans, useTranslation} from 'gatsby-plugin-react-i18next';

import Layout from '../../components/layout'
import Seo from '../../components/seo'
import Chart from "chart.js/auto";
import BarChart from "../../components/BarChart";
import { useState } from "react";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
const DatasetsPage = ({ data }) => {
    const colors = {
        "Agriculture": "#9fd6b6",
        "DigitalHumanities": "#0c8ae3",
        "Tourism": "#de2cfa",
        "Planning": "#dae3fb",
        "Urban": "#ea0604",
        "LUCC": "#fbc422",
        "Security" :"#0ceee3",
        "Climate": "#f6f812"
    }
    const [chartData, setChartData] = useState({
        labels: data.allDatasetCsv.nodes.map((node) => `${node.short_name}`), 
        datasets: [
          {
            label: "Datasets downloads",
            data: data.allDatasetCsv.nodes.map((node) => node.fields.downloads),
            backgroundColor: data.allDatasetCsv.nodes.map((node) => colors[node.theme]),
            // borderColor: "black",
            // borderWidth: 2
          }
        ]
      });
    function Project({ project }) {
    if (!project) {
        return null;
    }
    return <p>Project: {project}</p>;
    }
    function Doi({ doi }) {
        if (!doi) {
            return null;
        }
        return <p>DOI: <a href={`https://www.doi.org/${doi}`}>{doi}</a></p>;
        }
        
    return (
        <Layout pageTitle="LASTIG Datasets">
            <div>
                <BarChart chartData={chartData} />
            </div>
            <div>
                {
                    data.allDatasetCsv.nodes.map((node) => (
                        <article key={node.id}>
                            <h2>
                                <a href={node.url}>
                                    {node.name}
                                </a>
                            </h2>
                            <Project project = {node.project}/>
                            <p>Theme: {node.theme}</p>
                            <Doi doi = {node.doi}/>
                            <p>Url: <a href={node.url}>{node.url}</a></p>
                            <p>Downloads: {node.fields.downloads}</p>
                        </article>
                    ))
                }
            </div>
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