import React, {useState} from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import { NavBar } from "../components/NavBar";
import { ImageLink } from "../components/styles/Publications.styled";
import { FaFilePdf,FaAngleDown,FaAngleUp } from "react-icons/fa6";

import { theme } from "../theme";

const Thesis = (node,index,beforeLastig=false) => {
  const [showDetails, setShowDetails] = useState(false)
  const jury = Array.from(Array(10).keys())
    .map(h=>h+1)
    .map(h=> node[`jury${h}LastName`] ? `${node[`jury${h}FirstName`]} ${node[`jury${h}LastName`]} (${node[`jury${h}role`]})` : "")
    .filter(t=>t.length>0)
  return (
    <tr key={index + "=" + node.id}>
      <td key={node.id + "-teams"}>
        {!beforeLastig && <div
          aria-label="Team"
          style={{
            width: 32,
            height: 32,
            background: theme.colors[node.authorTeam],
            borderRadius: 5,
          }}
        />}
      </td>
      <td
        style={{
          minWidth: "100px",
        }}
      >
        <span>{node.defense ? node.defense : node.start}</span>
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
        <button 
          style={{background:"none",border:0}}
          onClick={() => setShowDetails(!showDetails)}>
          {/* Details */}
          {showDetails ? <FaAngleUp /> : <FaAngleDown />}
        </button>
      </td>
      <td>
        <a
          href={`https://theses.fr/${node.id}`}
          key={`${node.id}-title`}
        >
          {node.titre}
        </a>
        {showDetails && <p id="Details">
          {jury.join('\n')}
          </p>
        }
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
}

export default function thesesPage({ data, pageContext }) {
  const team = pageContext.team;
  const isLastigPage = team.length > 1;
  const ongoingNodes = data.allThesesCsv.nodes.filter(
    (node) => node.status === "ongoing",
  );
  const defendedNodes = data.allThesesCsv.nodes.filter(
    (node) => (node.status === "defended") && (new Date(node.defense) >= new Date("01/01/2019")),
  );
  const defendedNodesBeforeLASTIG = data.allThesesCsv.nodes.filter(
    (node) => (node.status === "defended") && (new Date(node.defense) < new Date("01/01/2019")),
  );
  ongoingNodes.sort(function (a, b) {
    return new Date(b.start) - new Date(a.start);
  });
  defendedNodes.sort(function (a, b) {
    return new Date(b.defense) - new Date(a.defense);
  });
  defendedNodesBeforeLASTIG.sort(function (a, b) {
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
        <thead></thead>
        <tbody>
          {ongoingNodes.map((node, index) => { return Thesis(node,index) })}
        </tbody>
      </table>
      <h3>Defended theses</h3>
      <table>
        <tbody>
          {defendedNodes.map((node, index) => { return Thesis(node,index) }
          )}
        </tbody>
      </table>
      <h3>Defended theses before the LASTIG</h3>
      <table>
        <tbody>
          {defendedNodesBeforeLASTIG.map((node, index) => { return Thesis(node,index,true) }
          )}
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
        authorTeam
        authorWebpage
        status
        start
        defense
        halId
        halUri
        halFile
        jury1FirstName
        jury1LastName
        jury1role
        jury2FirstName
        jury2LastName
        jury2role
        jury3FirstName
        jury3LastName
        jury3role
        jury4FirstName
        jury4LastName
        jury4role
        jury5FirstName
        jury5LastName
        jury5role
        jury6FirstName
        jury6LastName
        jury6role
        jury7FirstName
        jury7LastName
        jury7role
        jury8FirstName
        jury8LastName
        jury8role
        jury9FirstName
        jury9LastName
        jury9role
        jury10FirstName
        jury10LastName
        jury10role
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
