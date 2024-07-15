import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

import { FormattedMessage, useIntl } from 'react-intl'

import { getPubType } from '../util'
import { PublicationList } from '../components/CreateNodes'
import { Icon } from '@iconify-icon/react';

import { StyledMemberPage, Ids } from '../components/styles/MemberPage.styled'
import {WordCloud} from '../components/WordCloud'
import { theme } from '../theme'

import { useLocalization } from "@ericcote/gatsby-theme-i18n"

const modifyUrl = (url) => {
  if (url.startsWith("/")) return "https://www.umr-lastig.fr" + url;
  return url;
};
const modifyPhotoUrl = (url) => {
  if (!url) return "https://www.umr-lastig.fr/lastig_data/img/abstract-user-icon.svg";
  return modifyUrl(url);
};

export default function MemberPage({ data }) {
  const node = data.peopleCsv
  const allNodes = data.allHal.nodes;
  const filteredNodes = allNodes.filter((pubNode) => pubNode.fields.authors.includes(node.id));
  const classifiedNodes = filteredNodes.map((node) => ({ pubType: getPubType(node), ...node }));
  function Pub({ pubType }) {
    const filteredNodesForType = classifiedNodes.filter((node) => node.pubType === pubType);
    if (filteredNodesForType.length > 0) {
      return <div id={`pub${pubType}`}>
        <h2> {trans(pubType)} </h2>
        <PublicationList nodes={filteredNodesForType} type={pubType} theme={theme} />
      </div>;
    }
    return null;
  }
  const intl = useIntl()
  const { locale } = useLocalization();
  function trans(text) { return intl.formatMessage({ id: text }) }
  function first(text) { return text.split(',')[0] }
  return (
    <Layout>
      <StyledMemberPage>
        <h1>{node.firstname} {node.alt_firstname && `(${node.alt_firstname}) `}{node.lastname}</h1>
        <div><img src={modifyPhotoUrl(node.photo)} alt={`${node.firstname} ${node.lastname}`} /></div>
        <h2>{(locale === 'en') ? node.status : node.statut}</h2>
        {node.team && <h3><FormattedMessage id="inteam" values={{ team: node.team }} /></h3>}
        {node.webpage && <a href={modifyUrl(node.webpage)}>{trans("Personal webpage")}</a>}
        <Ids>
          {node.HAL && <a href={`https://cv.hal.science/${node.HAL}`} aria-label="HAL"><Icon icon="simple-icons:hal" width="2em" height="2em" /></a>}
          {node.fields.orcidId_s && <a href={node.fields.orcidId_s} aria-label="orcid"><Icon icon="simple-icons:orcid" width="2em" height="2em" /></a>}
          {node.fields.google_scholarId_s && <a href={node.fields.google_scholarId_s.includes('http') ? node.fields.google_scholarId_s : `https://scholar.google.com/citations?user=${node.fields.google_scholarId_s}`} aria-label="google_scholarId"><Icon icon="simple-icons:googlescholar" width="2em" height="2em" /></a>}
          {node.fields.idrefId_s && <a href={node.fields.idrefId_s} aria-label="idref"><Icon icon="token:id" width="2em" height="2em" /></a>}
          {node.fields.researcheridId_s && <a href={first(node.fields.researcheridId_s)} aria-label="researcherId"><Icon icon="academicons:researcherid" width="2em" height="2em" /> </a>}
          {node.fields.isniId_s && <a href={node.fields.isniId_s} aria-label="isni"><Icon icon="academicons:isni" width="2em" height="2em" /></a>}
          {node.fields.viafId_s && <a href={node.fields.viafId_s} aria-label="viaf"><Icon icon="academicons:viaf" width="2em" height="2em" /></a>}
          {node.fields.arxivId_s && <a href={node.fields.arxivId_s} aria-label="arxiv"><Icon icon="simple-icons:arxiv" width="2em" height="2em" /></a>}
        </Ids>
        <WordCloud nodes={filteredNodes}/>
        <h1>Publications</h1>
        <div>
          <Pub pubType="ACL"></Pub>
          <Pub pubType="ACLN"></Pub>
          <Pub pubType="ASCL"></Pub>
          <Pub pubType="PV"></Pub>
          <Pub pubType="INV"></Pub>
          <Pub pubType="COM"></Pub>
          <Pub pubType="ACTI"></Pub>
          <Pub pubType="ACTN"></Pub>
          <Pub pubType="OS"></Pub>
          <Pub pubType="DO"></Pub>
          <Pub pubType="AP"></Pub>
          <Pub pubType="TH"></Pub>
          <Pub pubType="AFF"></Pub>
          <Pub pubType="OTHER"></Pub>
        </div>
      </StyledMemberPage>
    </Layout>
  )
}

export const query = graphql`
  query($firstName: String, $lastName: String!) {
    peopleCsv(firstname: { eq: $firstName }, lastname: { eq: $lastName }) {
      id
      firstname
      alt_firstname
      lastname
      photo
      HAL
      member
      start_date
      end_date
      status
      statut
      team
      webpage
      fields {
        arxivId_s
        google_scholarId_s
        idrefId_s
        isniId_s
        orcidId_s
        researcheridId_s
        viafId_s
      }
    }
    allHal {
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
          fields {
              teams
              authors
          }
          keywords
      }
    }
  }
`
