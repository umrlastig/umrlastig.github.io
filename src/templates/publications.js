import React, { useState, useMemo } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import { useIntl } from "react-intl";
import { PublicationListOfLists } from "../components/styles/Publications.styled";
import { getPubType } from "../util";
import { PublicationList } from "../components/CreateNodes";
import { NavBar } from "../components/NavBar";
import { theme } from "../theme";
import { DoubleSlider } from "../components/DoubleSlider";
import { LocalDropdown } from "../components/LocalDropdown";

export default function PublicationsPage({ data, pageContext }) {
  const team = pageContext.team;
  const isLastigPage = team.length > 1;
  const intl = useIntl();
  function trans(text) {
    return intl.formatMessage({ id: text });
  }
  const nodes = data.allHalCsv.nodes;

  const allDates = [...new Set(nodes.map((node) => node.producedDate))];
  const minDate = Math.min(...allDates);
  const maxDate = Math.max(...allDates);
  const [startDate, setStartDate] = useState(2018);
  const [endDate, setEndDate] = useState(maxDate);

  const selectedNodes = useMemo(
    () =>
      nodes.filter(
        (node) =>
          (node.producedDate >= startDate) & (node.producedDate <= endDate),
      ),
    [nodes, startDate, endDate],
  );

  const classifiedNodes = selectedNodes.map((node) => ({
    pubType: getPubType(node),
    ...node,
  }));
  const pubTypes = [
    "ACL",
    "ACLN",
    "ASCL",
    "PV",
    "INV",
    "COM",
    "ACTI",
    "ACTN",
    "OS",
    "DO",
    "AP",
    "TH",
    "AFF",
    "OTHER",
  ];
  const dropdown = <LocalDropdown
            name="Jump to..."
            options={pubTypes}
            trans={trans}
          ></LocalDropdown>;
  function Pub({ id, pubType }) {
    const filteredNodes = classifiedNodes.filter(
      (node) => node.pubType === pubType,
    );
    if (filteredNodes.length > 0) {
      return (
        <div id={id} key={`pub${pubType}`}>
          <h2> {trans(pubType)} </h2>
          {dropdown}
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
      <span>Filter by date:</span>
      <DoubleSlider
        sliderMinValue={minDate}
        sliderMaxValue={maxDate}
        minVal={startDate}
        maxVal={endDate}
        setMinVal={setStartDate}
        setMaxVal={setEndDate}
      />
      {/* <LocalDropdown
        name="Jump to..."
        options={pubTypes}
        trans={trans}
      ></LocalDropdown> */}
      <PublicationListOfLists>
        {pubTypes.map((pt) => (
          <Pub id={pt} pubType={pt} key={pt}></Pub>
        ))}
        {/* <Pub pubType="ACL" key="ACL"></Pub>
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
        <Pub pubType="OTHER" key="OTHER"></Pub> */}
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
