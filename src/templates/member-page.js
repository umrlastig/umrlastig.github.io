import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import {imgMember,roundedCircle} from '../components/members.module.css'

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
  return (
    <Layout>
      <div>
        <h1>{node.firstname} {node.lastname}</h1>
        <div className={imgMember}><img className={roundedCircle} src={modifyPhotoUrl(node.photo)} alt={`${node.firstname} ${node.lastname}`} /></div>
        <h2>{node.status}{node.team ? ` in the ${node.team} team`: null }</h2>
        <a href={modifyUrl(node.webpage)}>Personal webpage</a>
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
