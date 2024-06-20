import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from "@mdx-js/react"
import Layout from '../components/layout'
import Seo from '../components/seo'
// import { Link } from "gatsby"
// import { Link, Trans } from 'gatsby-plugin-react-i18next';
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

const shortcodes = { Link, Slider, Projects, LastigMapContainer,
  OrgWithProps: (props) => <Org className={image}/>
 } // Provide common components here

const Page = ({ data, children }) => {
  const { locale, defaultLang, config } = useLocalization()
  console.log(locale)
  console.log(data)
  console.log(data.mdx.frontmatter.slug + " = > " + data.mdx.frontmatter.title + " with "+ locale)
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <MDXProvider components={shortcodes}>
        {children}
      </MDXProvider>
    </Layout>
  )
}
// export const query = graphql`
//   query($id: String, $locale: String!) {
//     mdx(
//       id: { eq: $id }
//       fields: { locale: { eq: $locale } }
//     ) {
//       frontmatter {
//         title
//         slug
//       }
//       body
//     }
//   }
// `
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
  }
`

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />
export default Page