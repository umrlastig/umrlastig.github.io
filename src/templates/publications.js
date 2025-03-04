import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import { useIntl } from "react-intl";
import { PublicationListOfLists } from "../components/styles/Publications.styled";
import { getPubType } from "../util";
import { PublicationList } from "../components/CreateNodes";
import { NavBar } from "../components/NavBar";
import { theme } from "../theme";

export default function PublicationsPage({ data, pageContext }) {
  const team = pageContext.team;
  const isLastigPage = team.length > 1;
  console.log(`Publication PAGE : ${team} => ${isLastigPage}`);
  const intl = useIntl();
  function trans(text) {
    return intl.formatMessage({ id: text });
  }
  const nodes = data.allHalCsv.nodes;
  const classifiedNodes = nodes.map((node) => ({
    pubType: getPubType(node),
    ...node,
  }));
  function Pub({ pubType }) {
    const filteredNodes = classifiedNodes.filter(
      (node) => node.pubType === pubType
    );
    if (filteredNodes.length > 0) {
      return (
        <div key={`pub${pubType}`}>
          <h2> {trans(pubType)} </h2>
          <PublicationList nodes={filteredNodes} type={pubType} theme={theme} />
        </div>
      );
    }
    return null;
  }
  return (
    <Layout pageTitle={`${isLastigPage ? "LASTIG" : team} Publications`}>
      <h3>{trans(`${isLastigPage ? "LASTIG" : team} Publications`)}</h3>
      {!isLastigPage && (
        <NavBar
          title={team}
          menus={data.site.siteMetadata.menus[team]}
          team={team}
        />
      )}
      <PublicationListOfLists>
        <Pub pubType="ACL" key="ACL"></Pub>
        <Pub pubType="ACLN" key="ACLN"></Pub>
        <Pub pubType="ASCL" key="ASCL"></Pub>
        <Pub pubType="PV" key="PV"></Pub>
        <Pub pubType="INV" key="INV"></Pub>
        <Pub pubType="COM" key="COM"></Pub>
        <Pub pubType="ACTI" key="ACTI"></Pub>
        <Pub pubType="ACTN" key="ACTN"></Pub>
        <Pub pubType="OS" key="OS"></Pub>
        <Pub pubType="DO" key="DO"></Pub>
        <Pub pubType="AP" key="AP"></Pub>
        <Pub pubType="TH" key="TH"></Pub>
        <Pub pubType="AFF" key="AFF"></Pub>
        <Pub pubType="OTHER" key="OTHER"></Pub>
      </PublicationListOfLists>
    </Layout>
  );
}

export const query = graphql`
  query ($team: [String]) {
    allHalCsv(filter: { teams: { in: $team } }) {
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
`;

export const Head = ({ pageContext }) => (
  <Seo
    title={`${
      pageContext.team.length > 1 ? "LASTIG" : pageContext.team
    } Publications`}
  />
);
