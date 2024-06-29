import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

import { FormattedMessage, useIntl } from 'react-intl'

import { getPubType } from '../util'
import { CreateNodes } from '../components/CreateNodes'
import { Icon } from '@iconify-icon/react';

import {StyledMemberPage} from '../components/styles/MemberPage.styled'

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
  function checkAuthor(authIdHalFullName) {
    return authIdHalFullName.fullName === `${node.firstname} ${node.lastname}` || authIdHalFullName.idHal === node.HAL;
  }
  const filteredNodes = allNodes.filter((node) => node.authIdHalFullName.some(checkAuthor));
  const classifiedNodes = filteredNodes.map((node) => ({ pubType: getPubType(node), ...node }));
  function Pub({ pubType }) {
    const filteredNodes = classifiedNodes.filter((node) => node.pubType === pubType);
    if (filteredNodes.length > 0) {
      return <div id={`pub${pubType}`}>
        <h2> {pubType} </h2>
        <CreateNodes nodes={filteredNodes} type={pubType}/>
      </div>;
    }
    return null;
  }
  const intl = useIntl()
  function trans(text) { return intl.formatMessage({ id: text }) }
  return (
    <Layout>
      <StyledMemberPage>
        <h1>{node.firstname} {node.lastname}</h1>
        <div><img src={modifyPhotoUrl(node.photo)} alt={`${node.firstname} ${node.lastname}`} /></div>
        <h2>{trans(node.status)}</h2>
        {node.team && <h3><FormattedMessage id="inteam" defaultMessage=" in the {team} team" values={{ team: node.team }}/></h3>}
        <a href={modifyUrl(node.webpage)}>{trans("Personal webpage")}</a>
        {node.HAL && <p><Icon icon="simple-icons:hal" width="2em" height="2em" /> <a href={`https://cv.hal.science/${node.HAL}`}>{node.HAL}</a></p>}
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
        firstname
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
        }
    }
  }
`
