import * as React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import { MdxLink as Link } from "@ericcote/gatsby-theme-i18n";
import Projects from "../images/projects.svg";
import LastigMapContainer from "../components/lastigMapComponent";
import { ContainerWithSlider } from "../components/ContainerWithSlider";
import { Columns, Column2, Column4 } from "../components/styles/ContainerWithSlider.styled";
import { TeamDiagramComponent } from "../components/TeamDiagramComponent";
import { News } from "../components/News";
import { NavBar } from "../components/NavBar";
import { WordCloud } from "../components/WordCloud";
import { ContainerWithSliderAndWordCloud } from "../components/ContainerWithSliderAndWordCloud";
import { TextContainer } from "../components/styles/Container.styled";
import KeywordsPlot from "../components/KeywordsPlot";

function LocalMenu(title, team, menus) {
  return <NavBar title={title} menus={menus} team={team} />;
}

const Page = ({ data, children }) => {
  const pageTitle = data.mdx.frontmatter.title;
  const pageSlug = data.mdx.frontmatter.slug;
  const team = pageSlug.includes("teams/")
    ? pageSlug.replace("teams/", "").split("/")[0].toUpperCase()
    : null;
  const pageMenu = team ? data.site.siteMetadata.menus[team] : null;
  const nodes = data.allHalCsv.nodes;
  const filteredNodes = team
    ? nodes.filter((node) => node.teams.includes(team))
    : nodes;
  const shortcodes = {
    Link,
    ContainerWithSlider,
    Columns,
    Column2,
    Column4,
    Projects,
    LastigMapContainer,
    News: () => <News data={data} />,
    LocalMenu: () => pageMenu && LocalMenu(pageTitle, team, pageMenu),
    WordCloud: () => <WordCloud nodes={filteredNodes} />,
    ContainerWithSliderAndWordCloud: () => (
      <ContainerWithSliderAndWordCloud nodes={filteredNodes} />
    ),
    TextContainer,
    TeamsDiagram: () => <TeamDiagramComponent />,
    KeywordsPlot: () => <KeywordsPlot nodes = {filteredNodes}/>
  }; // Provide common components here
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <MDXProvider components={shortcodes}>{children}</MDXProvider>
    </Layout>
  );
};
export const query = graphql`
  query ($frontmatter__slug: String!, $locale: String!) {
    mdx(frontmatter: {slug: {eq: $frontmatter__slug}}, fields: { locale: { eq: $locale } }) {
      id
      frontmatter {
        title
        slug
      }
      fields {
        locale
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
    allHalCsv {
      nodes {
        halId
        id
        citationRef
        docType
        fileMain
        files
        invitedCommunication
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
        keywords
        keywords_lastig
      }
    }
  }
`;

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />;
export default Page;
