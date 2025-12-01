import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import Seo from "../../components/seo";
import { useIntl } from "react-intl";
import { useLocalization } from "@ericcote/gatsby-theme-i18n";
import { FaFilePdf } from "react-icons/fa6";
import {
  Position,
  PositionList,
  ImageLink,
} from "../../components/styles/Positions.styles";

function createPosition(id, type, team, pdf, text, link) {
  return (
    <Position $team={team}>
      {/* <span key={`${id}-position`}><b>{type}</b></span> */}
      <ImageLink>
        {pdf && (
          <a href={pdf} aria-label="pdf document">
            <FaFilePdf />
          </a>
        )}
      </ImageLink>
      <a href={link} key={`${id}-title`}>
        {text}
      </a>
      <span key={`${id}-team`}>
        <b>{team.join(" & ")}</b>
      </span>
    </Position>
  );
}

const JoinPage = ({ data }) => {
  const intl = useIntl();
  const { locale } = useLocalization();
  function trans(text) {
    return intl.formatMessage({ id: text });
  }
  const nodes = data.allRecruitingCsv.nodes;
  console.log(nodes);
  return (
    <Layout pageTitle="Join Us">
      <h1>Join Us!</h1>
      <h3>PhD</h3>
      <PositionList>
        {nodes
          .filter((node) => node.type === "PhD")
          .map(
            (node) => {
              return createPosition(
                node.id,
                trans(node.type),
                node.team,
                locale === "en" ? node.pdf_en : node.pdf_fr,
                locale === "en" ? node.title : node.titre,
                node.link,
              );
            },
            // <article key={node.id} dangerouslySetInnerHTML={{ __html: `<b>${node.type} [${node.team}]:</b> <a href="${(locale === 'en') ? node.pdf_en : node.pdf_fr}">${(locale === 'en') ? node.title : node.titre}</a>` }}></article>
          )}
      </PositionList>
      <h3>Postdoc</h3>
      <PositionList>
        {nodes
          .filter((node) => node.type === "postdoc")
          .map(
            (node) => {
              return createPosition(
                node.id,
                trans(node.type),
                node.team,
                locale === "en" ? node.pdf_en : node.pdf_fr,
                locale === "en" ? node.title : node.titre,
                node.link,
              );
            },
            // <article key={node.id} dangerouslySetInnerHTML={{ __html: `<b>${node.type} [${node.team}]:</b> <a href="${(locale === 'en') ? node.pdf_en : node.pdf_fr}">${(locale === 'en') ? node.title : node.titre}</a>` }}></article>
          )}
      </PositionList>
      <h3>Research engineer</h3>
      <PositionList>
        {nodes
          .filter((node) => node.type === "ingenieur")
          .map(
            (node) => {
              return createPosition(
                node.id,
                trans(node.type),
                node.team,
                locale === "en" ? node.pdf_en : node.pdf_fr,
                locale === "en" ? node.title : node.titre,
                node.link,
              );
            },
            // <article key={node.id} dangerouslySetInnerHTML={{ __html: `<b>${node.type} [${node.team}]:</b> <a href="${(locale === 'en') ? node.pdf_en : node.pdf_fr}">${(locale === 'en') ? node.title : node.titre}</a>` }}></article>
          )}
      </PositionList>
      <h3>Internship</h3>
      <PositionList>
        {nodes
          .filter((node) => node.type === "Internship")
          .map(
            (node) => {
              return createPosition(
                node.id,
                trans(node.type),
                node.team,
                locale === "en" ? node.pdf_en : node.pdf_fr,
                locale === "en" ? node.title : node.titre,
                node.link,
              );
            },
            // <article key={node.id} dangerouslySetInnerHTML={{ __html: `<b>${node.type} [${node.team}]:</b> <a href="${(locale === 'en') ? node.pdf_en : node.pdf_fr}">${(locale === 'en') ? node.title : node.titre}</a>` }}></article>
          )}
      </PositionList>
    </Layout>
  );
};

export const query = graphql`
  query {
    allRecruitingCsv {
      nodes {
        id
        type
        titre
        title
        pdf_fr
        pdf_en
        team
        filled
        link
      }
    }
  }
`;

export const Head = () => <Seo title="Join Us" />;

export default JoinPage;
