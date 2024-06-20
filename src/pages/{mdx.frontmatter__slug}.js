import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from "@mdx-js/react"
import Layout from '../components/layout'
import Seo from '../components/seo'
import { useLocalization } from "@ericcote/gatsby-theme-i18n"
import { MdxLink as Link } from "@ericcote/gatsby-theme-i18n"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import '../components/layout.module.css'
import Org from "../images/orga_lastig_12mois.svg";
import Projects from "../images/projects.svg";
import LastigMapContainer from "../components/lastigMapComponent.js"
import {image} from '../../src/components/layout.module.css'

const Page = ({ data, children }) => {
  const { locale } = useLocalization()
  // console.log(locale)
  // console.log(data)
  // console.log(data.mdx.frontmatter.slug + " = > " + data.mdx.frontmatter.title + " with "+ locale)
  const shortcodes = { Link, Slider, Projects, LastigMapContainer,
    OrgWithProps: () => <Org className={image}/>,
    News: () =>
    <div>
      {
          data.allNewsCsv.nodes.map((node) => (
              <article key={node.id} dangerouslySetInnerHTML={{__html: `<b>${node.date} [${node.team}]:</b> ${(locale === 'en')?node.texten:node.textfr}`}}></article>
          ))
      }
    </div>
   } // Provide common components here  
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <MDXProvider components={shortcodes}>
        {children}
      </MDXProvider>
    </Layout>
  )
}
export const query = graphql`
  query($id: String!) {
    mdx(
      id: { eq: $id }
    ) {
      frontmatter {
        title
        slug
      }
      body
    }
    allNewsCsv {
      nodes {
        id
        date
        team
        only
        perso
        textfr
        texten
      }
    }
  }
`

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />
export default Page