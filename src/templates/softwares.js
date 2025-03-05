import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { theme } from "../theme";
import {
  SoftwareList,
  Software,
  SoftwareHead,
  SoftwareInfo,
} from "../components/styles/Softwares.styled";
import { useIntl } from "react-intl";
import { Icon } from "@iconify-icon/react";
import { NavBar } from "../components/NavBar";
import { PublicationList } from "../components/CreateNodes";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

Chart.register(CategoryScale);

export default function SoftwaresPage({ data, pageContext }) {
  const team = pageContext.team;
  const isLastigPage = team.length > 1;
  console.log(`Software PAGE : ${team} => ${isLastigPage}`);
  data.allSoftwareCsv.nodes.forEach((element) => {
    console.log(`Software ${element.short_name}`);
  });
  const intl = useIntl();
  function trans(text) {
    return intl.formatMessage({ id: text });
  }

  function Doi({ doi }) {
    if (!doi) {
      return <div></div>;
    }
    return (
      <div>
        <a href={`https://www.doi.org/${doi}`} aria-label="doi">
          <Icon icon="academicons:doi" width="2em" height="2em" />
        </a>
      </div>
    );
  }
  function Teams({ teams }) {
    if (!teams) {
      return <div></div>;
    }
    return (
      <div>
        Team(s): <b>{teams.join(", ")}</b>
      </div>
    );
  }
  function Publications({ repo }) {
    if (!repo) {
      return <div></div>;
    }
    const publications = data.allHalCsv.nodes.filter(
      (n) => n.softCodeRepository && n.softCodeRepository.includes(repo),
    );
    return (
      <div>
        <PublicationList nodes={publications} type={null} theme={theme} />
      </div>
    );
  }

  return (
    <Layout pageTitle={`${isLastigPage ? "LASTIG" : team} Softwares`}>
      <h3>{trans(`${isLastigPage ? "LASTIG" : team} Softwares`)}</h3>
      {!isLastigPage && (
        <NavBar
          title={team}
          menus={data.site.siteMetadata.menus[team]}
          team={team}
        />
      )}
      <SoftwareList>
        {data.allSoftwareCsv.nodes.map((node) => (
          <Software key={node.id}>
            <SoftwareHead $dataTheme={node.theme}>
              <div>
                <a href={node.repo}>{node.short_name}</a>
              </div>
            </SoftwareHead>
            <SoftwareInfo>
              <GatsbyImage image={getImage(node.image)} alt={node.short_name} />
              <Doi doi={node.doi} />
              <Teams teams={node.teams} />
            </SoftwareInfo>
            <Publications repo={node.repo} />
          </Software>
        ))}
      </SoftwareList>
    </Layout>
  );
}

export const query = graphql`
  query ($team: [String]) {
    allSoftwareCsv(filter: { teams: { in: $team } }) {
      nodes {
        doi
        id
        name
        date
        short_name
        repo
        teams
        HALid
        SWHID
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
`;

export const Head = ({ pageContext }) => (
  <Seo
    title={`${
      pageContext.team.length > 1 ? "LASTIG" : pageContext.team
    } Softwares`}
  />
);
