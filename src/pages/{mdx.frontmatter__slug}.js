import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from "@mdx-js/react"
import Layout from '../components/Layout'
import Seo from '../components/seo'
import { MdxLink as Link } from "@ericcote/gatsby-theme-i18n"
// import Org from "../images/orga_lastig_12mois.svg";
import Projects from "../images/projects.svg";
import LastigMapContainer from "../components/lastigMapComponent"
import { ContainerWithSlider } from '../components/ContainerWithSlider'
import { Columns,Column2,Column4 } from '../components/styles/ContainerWithSlider.styled'
import { News } from '../components/News'
import { StaticImage } from 'gatsby-plugin-image'
import { NavBar } from '../components/NavBar'

const Org = () => <div><StaticImage src={`../images/orga_lastig_12mois.svg`} alt='LASTIG organisation' /></div>
function LocalMenu(title, team, menus) {
  return ( <NavBar title={title} menus = {menus} team={team}/> );
}
const Page = ({ data, children }) => {
  const pageTitle = data.mdx.frontmatter.title
  const pageSlug = data.mdx.frontmatter.slug
  const team = (pageSlug.includes("teams/")) ? pageSlug.replace("teams/","").split("/")[0].toUpperCase() : null
  const pageMenu = team ? data.site.siteMetadata.menus[team] : null
  console.log(`Page ${pageSlug} - team ${team} menu ${pageMenu}`)
  const shortcodes = {
    Link, ContainerWithSlider, Columns,Column2,Column4, Projects, LastigMapContainer, Org,
    News: () => <News data = {data}/>,
    LocalMenu: () => pageMenu && LocalMenu(pageTitle,team,pageMenu)
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
  }
`

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />
export default Page