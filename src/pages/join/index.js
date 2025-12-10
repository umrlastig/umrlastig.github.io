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
    <Position $team={team} key={`${id}-position`}>
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
function createPositionList(type, nodes, trans, locale) {
  return nodes.length>0 && (
      <PositionList>
        <h3>{trans(type)}</h3>
        {nodes
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
          )}
      </PositionList>
  );
}
const JoinPage = ({ data }) => {
  const intl = useIntl();
  const { locale } = useLocalization();
  function trans(text) {
    return intl.formatMessage({ id: text });
  }
  const nodes = data.allRecruitingCsv.nodes;
  const lecturers = nodes.filter((node) => node.type === "EC")
  const phds = nodes.filter((node) => node.type === "PhD")
  const postdocs = nodes.filter((node) => node.type === "postdoc")
  const engineers = nodes.filter((node) => node.type === "ingenieur")
  const interns = nodes.filter((node) => node.type === "Internship")
  return (
    <Layout pageTitle="Join Us">
      <h1>Join Us!</h1>
      {createPositionList("Lecturer-Researcher", lecturers, trans, locale)}
      {createPositionList("PhD", phds, trans, locale)}
      {createPositionList("Postdoc", postdocs, trans, locale)}
      {createPositionList("Engineer", engineers, trans, locale)}
      {createPositionList("Internship", interns, trans, locale)}
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
