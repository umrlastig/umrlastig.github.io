import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import {imgMember,roundedCircle} from '../components/members.module.css'
import {FormattedMessage, useIntl} from 'react-intl'

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
  const intl = useIntl()
  function trans(text) { return intl.formatMessage({ id: text }) }
  return (
    <Layout>
      <div>
        <h1>{node.firstname} {node.lastname}</h1>
        <div className={imgMember}><img className={roundedCircle} src={modifyPhotoUrl(node.photo)} alt={`${node.firstname} ${node.lastname}`} /></div>
        <h2>{trans(node.status)}{
          node.team ? <FormattedMessage
          id="inteam"
          defaultMessage=" in the {team} team"
          values={{team: node.team}}
        />: null
        }</h2>
        <a href={modifyUrl(node.webpage)}>{trans("Personal webpage")}</a>
        <p>HAL-id: {node.HAL}</p>
      </div>
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
  }
`
