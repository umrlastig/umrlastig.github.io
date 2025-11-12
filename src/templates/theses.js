import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import { NavBar } from "../components/NavBar";
import { ImageLink } from "../components/styles/Publications.styled";
import { FaFilePdf } from "react-icons/fa6";

import { theme } from "../theme";

export default function thesesPage({ data, pageContext }) {
  const team = pageContext.team;
  const isLastigPage = team.length > 1;
  console.log(`Theses PAGE : ${team} => ${isLastigPage}`);
  const ongoingNodes = data.allThesesCsv.nodes.filter(
    (node) => node.status === "ongoing",
  );
  const defendedNodes = data.allThesesCsv.nodes.filter(
    (node) => node.status === "defended",
  );
  ongoingNodes.sort(function (a, b) {
    return new Date(b.start) - new Date(a.start);
  });
  defendedNodes.sort(function (a, b) {
    return new Date(b.defense) - new Date(a.defense);
  });
  return (
    <Layout pageTitle={`${isLastigPage ? "LASTIG" : team} Theses`}>
      <h1>{`${isLastigPage ? "LASTIG" : team} Theses`}</h1>
      {!isLastigPage && (
        <NavBar
          title={team}
          menus={data.site.siteMetadata.menus[team]}
          team={team}
        />
      )}
      <h3>Ongoing theses</h3>
      <table>
        {/* <thead><h3>Ongoing theses</h3></thead> */}
        <thead></thead>
        <tbody>
          {ongoingNodes.map((node, index) => {
            return (
              <tr key={index + "=" + node.id}>
                <td key={node.id + "-teams"}>
                  <div
                    aria-label="Team"
                    style={{
                      width: 32,
                      height: 32,
                      background: theme.colors[node.authorTeam],
                      borderRadius: 5,
                    }}
                  />
                </td>
                <td style={{
                     minWidth:  "100px",
                    }}>
                  <span>{node.start}</span>
                </td>
                <td>
                  <span key={`${node.id}-author`}>
                    {node.authorWebpage ? (
                      <a
                        href={node.authorWebpage}
                        key={`${node.id}-hal`}
                      >{`${node.authorFirstName} ${node.authorLastName}`}</a>
                    ) : (
                      `${node.authorFirstName} ${node.authorLastName}`
                    )}
                  </span>
                </td>
                <td>
                  <a
                    href={`https://theses.fr/${node.id}`}
                    key={`${node.id}-title`}
                  >
                    {node.titre}
                  </a>
                </td>
              </tr>
            );
          })}
          </tbody>
          </table>
      <h3>Defended theses</h3>          
      <table>
        <tbody>
          {defendedNodes.map((node, index) => {
            return (
              <tr key={index + "=" + node.id}>
                <td key={node.id + "-teams"}>
                  <div
                    aria-label="Team"
                    style={{
                      width: 32,
                      height: 32,
                      background: theme.colors[node.authorTeam],
                      borderRadius: 5,
                    }}
                  />
                </td>
                <td style={{minWidth: "100px"}}>
                  <span>{node.defense}</span>
                </td>
                <td>
                  <span key={`${node.id}-author`}>
                    {node.authorWebpage ? (
                      <a
                        href={node.authorWebpage}
                        key={`${node.id}-hal`}
                      >{`${node.authorFirstName} ${node.authorLastName}`}</a>
                    ) : (
                      `${node.authorFirstName} ${node.authorLastName}`
                    )}
                  </span>
                </td>
                <td>
                  <a
                    href={`https://theses.fr/${node.id}`}
                    key={`${node.id}-title`}
                  >
                    {node.titre}
                  </a>
                  {/* <a href={`${node.halUri}`} key={`${node.id}-title`}>{node.titre}</a> */}
                </td>
                <td key={index + "-file"}>
                  <ImageLink>
                    {node.halFile && (
                      <a href={node.halFile} aria-label="Main document in HAL">
                        <FaFilePdf />
                      </a>
                    )}
                  </ImageLink>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
}

export const query = graphql`
  query {
    allThesesCsv {
      nodes {
        id
        titre
        authorFirstName
        authorLastName
        authorIdHal
        authorHAL
        authorTeam
        authorWebpage
        status
        start
        defense
        halId
        halUri
        halFile
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
    title={`${pageContext.team.length > 1 ? "LASTIG" : pageContext.team} Theses`}
  />
);
