export function getPubType(node) {
    if (node.popularLevel === "1") return "PV";
    if (node.popularLevel === "0" && node.docType === "ART" && node.peerReviewing === "0") return "ASCL";
    if (node.popularLevel === "0" && node.docType === "ART" && node.peerReviewing === "1" && node.audience === "2") return "ACL";
    if (node.popularLevel === "0" && node.docType === "ART" && node.peerReviewing === "1") return "ACLN";
    if (node.popularLevel === "0" && node.docType === "COMM" && node.invitedCommunication === "1") return "INV";
    if (node.popularLevel === "0" && node.docType === "COMM" && node.invitedCommunication === "0" && node.proceedings === "0") return "COM";
    if (node.popularLevel === "0" && node.docType === "COMM" && node.invitedCommunication === "0" && node.proceedings === "1" && node.audience === "2") return "ACTI";
    if (node.popularLevel === "0" && node.docType === "COMM" && node.invitedCommunication === "0" && node.proceedings === "1") return "ACTN";
    if (node.docType === "COUV") return "OS";
    if (node.docType === "DOUV") return "DO";
    if (node.docType === "REPORT" || node.docType === "UNDEFINED") return "AP";
    if (node.docType === "THESE" || node.docType === "HDR") return "TH";
    if (node.docType === "POSTER") return "AFF";
    return "OTHER";
}
