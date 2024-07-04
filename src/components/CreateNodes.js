import React, { useState } from 'react'
import { FaClipboardCheck, FaFilePdf } from 'react-icons/fa6'
import { Icon } from '@iconify-icon/react';
import { PublicationList, Publication, ImageLink } from './styles/Publications.styled'

// Component adapted from: https://blog.logrocket.com/implementing-copy-clipboard-react-clipboard-api/
function ClipboardCopy({ copyText }) {
    const [isCopied, setIsCopied] = useState(false);
    async function copyTextToClipboard(text) { return await navigator.clipboard.writeText(text); }
    // onClick handler function for the copy button
    const handleCopyClick = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(copyText)
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => { setIsCopied(false); }, 1500);
            })
            .catch((err) => { console.log(err); });
    }
    return (
        <ImageLink> <button onClick={handleCopyClick} aria-label="Copy the bibtex to the clipboard"> {isCopied ? <FaClipboardCheck /> : <Icon icon="file-icons:bibtex" width="2em" height="2em" />} </button> </ImageLink>
    );
}

function withLink(ref, content) {
    const url = (ref.startsWith("http")) ? ref : `https://www.doi.org/${ref}`;
    return <ImageLink><a href={url}>{content}</a></ImageLink>
}

function ResearchDataIcon(researchData) {
    if (researchData.includes("figshare") || researchData.startsWith("10.6084/")) return withLink(researchData, <Icon icon="simple-icons:figshare" width="2em" height="2em" />)
    if (researchData.includes("zenodo") || researchData.startsWith("10.5281/")) return withLink(researchData, <Icon icon="simple-icons:zenodo" width="2em" height="2em" />)
    if (researchData.startsWith("10.17632/")) return withLink(researchData, <Icon icon="simple-icons:mendeley" width="2em" height="2em" />)
    if (researchData.startsWith("10.57967/")) return withLink(researchData, <Icon icon="simple-icons:huggingface" width="2em" height="2em" />)
    if (researchData.startsWith("10.2760/")) return withLink(researchData, <Icon icon="twemoji:flag-european-union" width="2em" height="2em" />)
    if (researchData.includes("arXiv") || researchData.startsWith("10.48550/")) return withLink(researchData, <Icon icon="simple-icons:arxiv" width="2em" height="2em" />)
    if (researchData.startsWith("10.1145/")) return withLink(researchData, <Icon icon="academicons:acmdl" width="2em" height="2em" />)
    return null;
}
function Repo(repo) {
    if (repo.includes("github.com")) return withLink(repo, <Icon icon="fe:github-alt" width="2em" height="2em" />)
    return null;
}

export const CreateNodes = ({nodes, type, theme}) => {
    function pubKey(node) { return `${node.id}-${type}` };
    return (
        <PublicationList>
            {/* <tbody> */}
            {nodes.map((node) => (
                <Publication key={pubKey(node)}>
                    <td>
                        <div aria-label="Team" style={{
                        width:32, 
                        height: 32, 
                        background:`conic-gradient(${node.fields.teams.map((team,index)=>`${theme.colors[team]} ${index*360.0/node.fields.teams.length}deg ${(index+1)*360.0/node.fields.teams.length}deg`).join(", ")})`,
                        borderRadius: 5
                        }} />
                    </td>
                    <td>
                        <span key={`${node.id}-authors`}>
                            {node.authIdHalFullName.map((auth) => <a href={auth["idHal"] ? `https://cv.archives-ouvertes.fr/${auth["idHal"]}` : null}>{auth["fullName"]}</a>)}
                        </span>
                        <a href={`https://hal.science/${node.halId}`} key={`${node.id}-title`}>{node.title}</a>
                        <span key={`${node.id}-citation`} dangerouslySetInnerHTML={{ __html: node.citationRef }} ></span>
                    </td>
                    <td>{node.researchData && node.researchData.map((rData) => ResearchDataIcon(rData))}</td>
                    <td>{node.softCodeRepository && node.softCodeRepository.map((repo) => Repo(repo))}</td>
                    <td><ImageLink>{node.doiId && <a href={`https://www.doi.org/${node.doiId}`} aria-label='Document page using DOI'><Icon icon="academicons:doi" width="2em" height="2em" /></a>}</ImageLink></td>
                    <td><ImageLink>{node.fileMain && <a href={node.fileMain} aria-label='Main document in HAL'><FaFilePdf /></a>}</ImageLink></td>
                    <td>{ClipboardCopy({ copyText: node.label_bibtex })}</td>
                </Publication>
            ))}
            {/* </tbody> */}
        </PublicationList>
    );
}
