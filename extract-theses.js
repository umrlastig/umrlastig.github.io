#!/usr/bin/env node
const axios = require('axios')
const crypto = require('crypto')
const cheerio = require('cheerio')
var qs = require('qs')
var fs = require('fs')
const { stringify } = require("csv-stringify");
const csv = require('csv-parser');
const peopleFilename = "src/data/people.csv";

const people = new Map();
fs.createReadStream(peopleFilename)
 .pipe(csv())
 .on("data", (data) => {
    const o = {team: data.team, webpage: data.webpage, HAL: data.HAL};
    people.set(`${data.firstname} ${data.lastname}`, o);
    if (data.alt_firstname) {
        people.set(`${data.alt_firstname} ${data.lastname}`, o);
    }
 })
 .on("end", () => {
   console.log(people)
 });

const filename = "src/data/theses.csv";
const writableStream = fs.createWriteStream(filename);

const columns = [
    "id",
    "titre",
    "titreEN",
    "etablissement",
    "defense",
    "start",
    "authorFirstName",
    "authorLastName",
    "authorIdHal",
    "authorHAL",
    "authorTeam",
    "authorWebpage",
    "discipline",
    "status",
    "school",
    "keywords",
    "keywordsEN",
    "rameau",
    "partners",
    "halId",
    "halUri",
    "halFile",
    "jury1FirstName",
    "jury1LastName",
    "jury1role",
    "jury2FirstName",
    "jury2LastName",
    "jury2role",
    "jury3FirstName",
    "jury3LastName",
    "jury3role",
    "jury4FirstName",
    "jury4LastName",
    "jury4role",
    "jury5FirstName",
    "jury5LastName",
    "jury5role",
    "jury6FirstName",
    "jury6LastName",
    "jury6role",
    "jury7FirstName",
    "jury7LastName",
    "jury7role",
    "jury8FirstName",
    "jury8LastName",
    "jury8role",
    "jury9FirstName",
    "jury9LastName",
    "jury9role",
    "jury10FirstName",
    "jury10LastName",
    "jury10role",
];
const stringifier = stringify({ header: true, columns: columns });
const labs = ["LASTIG", "Laboratoire en Sciences et technologies de l'information géographique", "COGIT", "Laboratoire Conception Objet et Généralisation de l'Information Topographique", "MATIS", "Méthodes d'analyses pour le Traitement d'Images et la Stéréorestitution"];
const statusPatch = new Map();
statusPatch.set('s213033', 'abandoned');
statusPatch.set('s91800', 'abandoned');
statusPatch.set('s359006', 'defended');
const firstNamePatch = new Map();
firstNamePatch.set('s379134', 'Alexane');

(async () => {
    const queryParams = {
        q: `partenairesRechercheN:("${labs.join('" OR "')}")`,
        nombre: 1000,
    };
    const params = qs.stringify(queryParams);
    try {
        await axios.get(`https://theses.fr/api/v1/theses/recherche/?${params}`).then(res => {
            console.log(`https://theses.fr/api/v1/theses/recherche/?${params}`);
            console.info(`Found ${res.data.totalHits} theses`);
            // go through these results
            res.data.theses.forEach(async (thesis) => {
                const keywords = thesis.sujets.filter((kw) => kw.langue == "fr").map((kw) => kw.libelle);
                const keywordsEN = thesis.sujets.filter((kw) => kw.langue == "en").map((kw) => kw.libelle);
                const rameau = thesis.sujetsRameau.map((kw) => kw.libelle);
                const partners = thesis.partenairesDeRecherche.map((p) => p.nom);
                const statusMap = new Map();
                statusMap.set('soutenue', 'defended');
                statusMap.set('enCours', 'ongoing');
                function reformatDate(d) {
                    if (!d) {
                        return "";
                    }
                    const date = d.split('/')
                    return `${date[2]}-${date[1]}-${date[0]}`;
                }
                function getStatusWithPatch() {
                    if (statusPatch.has(thesis.id)) {
                        return statusPatch.get(thesis.id);
                    }
                    return statusMap.get(thesis.status);
                }
                const memberTypeAsRole = new Map();
                memberTypeAsRole.set('president', 'president');
                memberTypeAsRole.set('rapporteurs', 'reviewer');
                memberTypeAsRole.set('examinateurs', 'examiner');
                memberTypeAsRole.set('directeurs', 'supervisor');
                function juryMembers(type) {
                    const l = thesis[type];
                    if (Array.isArray(l)) {
                        if (l.length == 0) {
                            return [];
                        }
                        return l.map((j) => [j.prenom, j.nom, memberTypeAsRole.get(type)]).flat()
                    }
                    if (!l.prenom) {
                        return [];
                    }
                    return [l.prenom, l.nom, memberTypeAsRole.get(type)]
                }
                const jury = Array.from(memberTypeAsRole.keys()).map((t) => juryMembers(t)).flat();
                let authorIdHal = "";
                async function getAuthorHalInfo() {
                    const queryParams = {
                        q: `fullName_s:"${thesis.auteurs[0].prenom} ${thesis.auteurs[0].nom}"`,
                        fl: "idHal_s,fullName_s",
                        fq: "idHal_s:*"
                    };
                    const halApiRequest = `https://api.archives-ouvertes.fr/ref/author/?${qs.stringify(queryParams)}`;
                    await axios.get(halApiRequest).then(hal => {
                        if (hal.data.response.numFound != 1) {
                            console.warn(`Author: Found ${hal.data.response.numFound} correspondances for ${halApiRequest}`);
                            return;
                        }
                        const doc = hal.data.response.docs[0];
                        authorIdHal = doc.idHal_s;
                        return;
                    }).catch(err => console.error(err));
                }
                await getAuthorHalInfo();
                let halId = "";
                let halUri = "";
                let halFile = "";
                const status = getStatusWithPatch();
                async function getHalInfo() {
                    if (status !== "defended") {
                        return;
                    }
                    const halApiRequest = `https://api.archives-ouvertes.fr/search/tel/?q=nntId_s:${thesis.id}&fl=docid,uri_s,fileMain_s`;
                    await axios.get(halApiRequest).then(hal => {
                        if (hal.data.response.numFound != 1) {
                            console.warn(`Found ${hal.data.response.numFound} correspondances`);
                            return;
                        }
                        const doc = hal.data.response.docs[0];
                        halId = doc.docid;
                        halUri = doc.uri_s;
                        halFile = doc.fileMain_s;
                        const result = [String(doc.docid), String(doc.uri_s), String(doc.fileMain_s)];
                        //console.log(`${doc.docid}, ${doc.uri_s}, ${doc.fileMain_s}`);
                        // console.log(result);
                        return;
                    }).catch(err => console.error(err));
                }
                await getHalInfo();
                let firstname = (firstNamePatch.has(thesis.id)) ? firstNamePatch.get(thesis.id) : thesis.auteurs[0].prenom;
                let lastname = thesis.auteurs[0].nom;
                let team = "";
                let webpage = "";
                let HAL = "";
                if (people.has(`${firstname} ${lastname}`)) {
                    const r = people.get(`${firstname} ${lastname}`);
                    team = r.team;
                    webpage = r.webpage;
                    HAL = r.HAL;
                }
                stringifier.write([
                    thesis.id,
                    thesis.titrePrincipal,
                    thesis.titreEN,
                    thesis.etabSoutenanceN,
                    reformatDate(thesis.dateSoutenance),
                    reformatDate(thesis.datePremiereInscriptionDoctorat),
                    firstname,
                    lastname,
                    authorIdHal,
                    HAL,
                    team,
                    webpage,
                    thesis.discipline,
                    status,
                    thesis.ecolesDoctorale[0].nom,
                    keywords.join(";"),
                    keywordsEN.join(";"),
                    rameau.join(";"),
                    partners.join(";"),
                    halId,
                    halUri,
                    halFile,
                ].concat(jury));
            });
        }).catch(err => console.error(err));
    } catch (e) {
        // Deal with the fact the chain failed
    }

    stringifier.pipe(writableStream);
    console.log("Finished writing data");
})();
