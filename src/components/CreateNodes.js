import React, { useState } from "react";
import { FaClipboardCheck, FaFilePdf } from "react-icons/fa6";
import { Icon } from "@iconify-icon/react";
import {
  StyledPublicationList,
  Publication,
  ImageLink,
} from "./styles/Publications.styled";
import { Buffer } from "buffer";

// Component adapted from: https://blog.logrocket.com/implementing-copy-clipboard-react-clipboard-api/
function ClipboardCopy({ copyText }) {
  const [isCopied, setIsCopied] = useState(false);
  async function copyTextToClipboard(text) {
    return await navigator.clipboard.writeText(text);
  }
  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ImageLink>
      {" "}
      <button
        onClick={handleCopyClick}
        aria-label="Copy the bibtex to the clipboard"
      >
        {" "}
        {isCopied ? (
          <FaClipboardCheck />
        ) : (
          <Icon icon="file-icons:bibtex" width="2em" height="2em" />
        )}{" "}
      </button>{" "}
    </ImageLink>
  );
}

function withLink(ref, content, key) {
  // console.log("withLink " + key)
  const url = ref.startsWith("http") ? ref : `https://www.doi.org/${ref}`;
  return (
    <ImageLink key={key}>
      <a href={url}>{content}</a>
    </ImageLink>
  );
}

function ResearchDataIcon(researchData, key) {
  // console.log("ResearchDataIcon " + key)
  if (researchData.includes("figshare") || researchData.startsWith("10.6084/"))
    return withLink(
      researchData,
      <Icon icon="simple-icons:figshare" width="2em" height="2em" />,
      key,
    );
  if (researchData.includes("zenodo") || researchData.startsWith("10.5281/"))
    return withLink(
      researchData,
      <Icon icon="simple-icons:zenodo" width="2em" height="2em" />,
      key,
    );
  if (researchData.startsWith("10.17632/"))
    return withLink(
      researchData,
      <Icon icon="simple-icons:mendeley" width="2em" height="2em" />,
      key,
    );
  if (researchData.startsWith("10.57967/"))
    return withLink(
      researchData,
      <Icon icon="simple-icons:huggingface" width="2em" height="2em" />,
      key,
    );
  if (researchData.startsWith("10.2760/"))
    return withLink(
      researchData,
      <Icon icon="twemoji:flag-european-union" width="2em" height="2em" />,
      key,
    );
  if (researchData.includes("arXiv") || researchData.startsWith("10.48550/"))
    return withLink(
      researchData,
      <Icon icon="simple-icons:arxiv" width="2em" height="2em" />,
      key,
    );
  if (researchData.startsWith("10.1145/"))
    return withLink(
      researchData,
      <Icon icon="academicons:acmdl" width="2em" height="2em" />,
      key,
    );
  return null;
}
function Repo(repo, key) {
  // console.log("Repo " + key)
  if (repo.includes("github.com"))
    return withLink(
      repo,
      <Icon icon="fe:github-alt" width="2em" height="2em" />,
      key,
    );
  return null;
}

function getBibtex(label_bibtex) {
  // console.log(label_bibtex);
  // console.log(Buffer.from(label_bibtex, "base64").toString("utf8"));
  return Buffer.from(label_bibtex, "base64").toString("utf8");
}

export const PublicationList = ({ nodes, type, theme }) => {
  function pubKey(node) {
    return `${node.id}-${type}`;
  }
  return (
    <StyledPublicationList>
      <thead />
      <tbody>
        {nodes.map((node, index) => {
          // console.log(index+"="+pubKey(node));
          debugger;
          return (
            <Publication key={index + "=" + pubKey(node)}>
              <td key={pubKey(node) + "-teams"}>
                <div
                  aria-label="Team"
                  style={{
                    width: 32,
                    height: 32,
                    background: `conic-gradient(${node.teams
                      .map(
                        (team, index) =>
                          `${theme.colors[team]} ${
                            (index * 360.0) / node.teams.length
                          }deg ${((index + 1) * 360.0) / node.teams.length}deg`,
                      )
                      .join(", ")})`,
                    borderRadius: 5,
                  }}
                />
              </td>
              <td key={pubKey(node) + "-authors"}>
                <span key={`${node.id}-authors`}>
                  {node.authIdHalFullName.map((auth, aIndex) => (
                    <a
                      key={node.id + "a" + aIndex}
                      href={
                        auth["idHal"]
                          ? `https://cv.archives-ouvertes.fr/${auth["idHal"]}`
                          : null
                      }
                    >
                      {auth["fullName"]}
                    </a>
                  ))}
                </span>
                <a
                  href={`https://hal.science/${node.halId}`}
                  key={`${node.id}-title`}
                >
                  {node.title + ". "}
                </a>
                <span
                  key={`${node.id}-citation`}
                  dangerouslySetInnerHTML={{ __html: node.citationRef }}
                ></span>
              </td>
              <td key={pubKey(node) + "-researchData"}>
                {node.researchData &&
                  node.researchData.map((rData, dIndex) =>
                    ResearchDataIcon(rData, `${node.id}-rd-${dIndex}`),
                  )}
              </td>
              <td key={pubKey(node) + "-code"}>
                {node.softCodeRepository &&
                  node.softCodeRepository.map((repo, cIndex) =>
                    Repo(repo, `${node.id}-code-${cIndex}`),
                  )}
              </td>
              <td key={pubKey(node) + "-doi"}>
                <ImageLink>
                  {node.doiId && (
                    <a
                      href={`https://www.doi.org/${node.doiId}`}
                      aria-label="Document page using DOI"
                    >
                      <Icon icon="academicons:doi" width="2em" height="2em" />
                    </a>
                  )}
                </ImageLink>
              </td>
              <td key={pubKey(node) + "-file"}>
                <ImageLink>
                  {node.fileMain && (
                    <a href={node.fileMain} aria-label="Main document in HAL">
                      <FaFilePdf />
                    </a>
                  )}
                </ImageLink>
              </td>
              <td key={pubKey(node) + "-bib"}>
                {ClipboardCopy({ copyText: getBibtex(node.label_bibtex) })}
              </td>
            </Publication>
          );
        })}
      </tbody>
    </StyledPublicationList>
  );
};
