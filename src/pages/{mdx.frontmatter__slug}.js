import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from "@mdx-js/react"
import Layout from '../components/layout'
import Seo from '../components/seo'
// import { Link } from "gatsby"
import { Link, Trans } from 'gatsby-plugin-react-i18next';

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import '../components/layout.module.css'
import Org from "../images/orga_lastig_12mois.svg";
import Projects from "../images/projects.svg";
import LastigMapContainer from "../components/lastigMapComponent.js"

const shortcodes = { Link, Slider, Org, Projects, LastigMapContainer, Trans } // Provide common components here

const Page = ({ data, children }) => {
  console.log(data.mdx.frontmatter.slug + " = > " + data.mdx.frontmatter.title)
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <MDXProvider components={shortcodes}>
        {children}
      </MDXProvider>
    </Layout>
  )
}
export const query = graphql`
  query($id: String,$language: String!) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        slug
      }
      body
    }
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />
export default Page