#!/usr/bin/env node
const cheerio = require("cheerio");
var qs = require("qs");
var fs = require("fs");
const { stringify } = require("csv-stringify");
const csv = require("csv-parser");
const { HttpsProxyAgent } = require("https-proxy-agent");

const use_proxy = false;
const axiosDefaultConfig = use_proxy
  ? {
      proxy: false,
      httpsAgent: new HttpsProxyAgent("http://proxy.ign.fr:3128"),
    }
  : {
      proxy: false,
    };

const axios = require("axios").create(axiosDefaultConfig);

function get(url) {
  return axios.get(url);
}
// People
function getPeople(inputPeopleFilename, peopleFilename) {
  return new Promise(function (resolve, reject) {
    const ids = [
      "researcheridId_s",
      "idrefId_s",
      "orcidId_s",
      "viafId_s",
      "isniId_s",
      "google scholarId_s",
      "arxivId_s",
    ];
    var persons = [];
    fs.createReadStream(inputPeopleFilename)
      .pipe(csv())
      .on("data", (data) => {
        //console.log(data);
        persons.push(data);
      })
      .on("end", async () => {
        console.log("Finished reading and found", persons.length);
        const writableStream = fs.createWriteStream(peopleFilename);
        const columns = [
          "firstname",
          "alt_firstname",
          "lastname",
          "teams",
          "statut",
          "status",
          "webpage",
          "HAL",
          "start_date",
          "end_date",
          "member",
          "photo",
          "perm",
          "fid",
          "researcheridId_s",
          "idrefId_s",
          "orcidId_s",
          "viafId_s",
          "isniId_s",
          "google scholarId_s",
          "arxivId_s",
        ];
        const stringifier = stringify({ header: true, columns: columns });
        for (const [fid, personValue] of persons.entries()) {
          var person = JSON.parse(JSON.stringify(personValue));
          person["fid"] = fid;
          console.log(fid);
          const halId = person.HAL;
          if (halId) {
            const url = `https://api.archives-ouvertes.fr/ref/author/?q=idHal_s:${halId}&wt=json&fl=fullName_s,idHal_s,*Id_s`;
            await get(url).then(({ data }) => {
              if (data.response.docs.length > 0) {
                const doc = data.response.docs[0];
                ids.forEach((id) => {
                  person[id] = id in doc ? String(doc[id]) : "";
                });
              } else {
                ids.forEach((id) => {
                  person[id] = "";
                });
              }
            });
          } else {
            ids.forEach((id) => {
              person[id] = "";
            });
          }
          console.log(person.teams);
          stringifier.write([
            person.firstname,
            person.alt_firstname,
            person.lastname,
            person.teams,
            person.statut,
            person.status,
            person.webpage,
            person.HAL,
            person.start_date,
            person.end_date,
            person.member,
            person.photo,
            person.perm,
            person.fid,
            person.researcheridId_s,
            person.idrefId_s,
            person.orcidId_s,
            person.viafId_s,
            person.isniId_s,
            person["google scholarId_s"],
            person.arxivId_s,
          ]);
        }
        stringifier.pipe(writableStream);
        console.log("Finished writing data for persons");
        resolve();
      })
      .on("error", reject);
  });
}

async function getTheses(peopleFilename, thesesFilename) {
  //input people data
  return new Promise(function (resolve, reject) {
    const people = new Map();
    fs.createReadStream(peopleFilename)
      .pipe(csv())
      .on("data", (data) => {
        const o = {
          teams: data.teams,
          webpage: data.webpage,
          HAL: data.HAL,
          firstname: data.firstname,
          lastname: data.lastname,
        };
        people.set(
          `${data.firstname.toLowerCase()} ${data.lastname.toLowerCase()}`,
          o,
        );
        if (data.alt_firstname) {
          people.set(
            `${data.alt_firstname.toLowerCase()} ${data.lastname.toLowerCase()}`,
            o,
          );
        }
      })
      .on("end", async () => {
        console.log(people.size, "persons found for theses");
        const writableStream = fs.createWriteStream(thesesFilename);
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
        const labs = [
          "LASTIG",
          "Laboratoire en Sciences et technologies de l'information géographique",
          "COGIT",
          "Laboratoire Conception Objet et Généralisation de l'Information Topographique",
          "MATIS",
          "Méthodes d'analyses pour le Traitement d'Images et la Stéréorestitution",
        ];
        const statusPatch = new Map();
        statusPatch.set("s213033", "abandoned");
        statusPatch.set("s91800", "abandoned");
        statusPatch.set("s359006", "defended");
        const firstNamePatch = new Map();
        firstNamePatch.set("s379134", "Alexane");

        // GET THESES FROM THESES.FR
        const queryParams = {
          q: `partenairesRechercheN:("${labs.join('" OR "')}")`,
          nombre: 1000,
        };
        const params = qs.stringify(queryParams);
        await get(`https://theses.fr/api/v1/theses/recherche/?${params}`)
          .then((res) => {
            console.log(`https://theses.fr/api/v1/theses/recherche/?${params}`);
            console.info(`Found ${res.data.totalHits} theses`);
            // go through these results
            const promises = res.data.theses.map(async (thesis) => {
              const keywords = thesis.sujets
                .filter((kw) => kw.langue == "fr")
                .map((kw) => kw.libelle);
              const keywordsEN = thesis.sujets
                .filter((kw) => kw.langue == "en")
                .map((kw) => kw.libelle);
              const rameau = thesis.sujetsRameau.map((kw) => kw.libelle);
              const partners = thesis.partenairesDeRecherche.map((p) => p.nom);
              const statusMap = new Map();
              statusMap.set("soutenue", "defended");
              statusMap.set("enCours", "ongoing");
              function reformatDate(d) {
                if (!d) {
                  return "";
                }
                const date = d.split("/");
                return `${date[2]}-${date[1]}-${date[0]}`;
              }
              function getStatusWithPatch() {
                if (statusPatch.has(thesis.id)) {
                  return statusPatch.get(thesis.id);
                }
                return statusMap.get(thesis.status);
              }
              const memberTypeAsRole = new Map();
              memberTypeAsRole.set("president", "president");
              memberTypeAsRole.set("rapporteurs", "reviewer");
              memberTypeAsRole.set("examinateurs", "examiner");
              memberTypeAsRole.set("directeurs", "supervisor");
              function juryMembers(type) {
                const l = thesis[type];
                if (Array.isArray(l)) {
                  if (l.length == 0) {
                    return [];
                  }
                  return l
                    .map((j) => [j.prenom, j.nom, memberTypeAsRole.get(type)])
                    .flat();
                }
                if (!l.prenom) {
                  return [];
                }
                return [l.prenom, l.nom, memberTypeAsRole.get(type)];
              }
              const jury = Array.from(memberTypeAsRole.keys())
                .map((t) => juryMembers(t))
                .flat();
              let authorIdHal = "";
              async function getAuthorHalInfo() {
                const queryParams = {
                  q: `fullName_s:"${thesis.auteurs[0].prenom} ${thesis.auteurs[0].nom}"`,
                  fl: "idHal_s,fullName_s",
                  fq: "idHal_s:*",
                };
                const halApiRequest = `https://api.archives-ouvertes.fr/ref/author/?${qs.stringify(queryParams)}`;
                await get(halApiRequest)
                  .then((hal) => {
                    if (hal.data.response.numFound != 1) {
                      console.warn(
                        `Author: Found ${hal.data.response.numFound} correspondances for ${halApiRequest}`,
                      );
                      return;
                    }
                    const doc = hal.data.response.docs[0];
                    authorIdHal = doc.idHal_s;
                    return;
                  })
                  .catch((err) => console.error(err));
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
                await get(halApiRequest)
                  .then((hal) => {
                    if (hal.data.response.numFound != 1) {
                      console.warn(
                        `Found ${hal.data.response.numFound} correspondances`,
                      );
                      return;
                    }
                    const doc = hal.data.response.docs[0];
                    halId = doc.docid;
                    halUri = doc.uri_s;
                    halFile = doc.fileMain_s;
                    const result = [
                      String(doc.docid),
                      String(doc.uri_s),
                      String(doc.fileMain_s),
                    ];
                    //console.log(`${doc.docid}, ${doc.uri_s}, ${doc.fileMain_s}`);
                    // console.log(result);
                    return;
                  })
                  .catch((err) => console.error(err));
              }
              await getHalInfo();
              let firstname = firstNamePatch.has(thesis.id)
                ? firstNamePatch.get(thesis.id)
                : thesis.auteurs[0].prenom;
              let lastname = thesis.auteurs[0].nom;
              let teams = "";
              let webpage = "";
              let HAL = "";
              if (
                people.has(
                  `${firstname.toLowerCase()} ${lastname.toLowerCase()}`,
                )
              ) {
                const r = people.get(
                  `${firstname.toLowerCase()} ${lastname.toLowerCase()}`,
                );
                teams = r.teams;
                webpage = r.webpage;
                HAL = r.HAL;
              }
              return [
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
                teams,
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
              ].concat(jury);
            });
            Promise.all(promises).then((values) => {
              values.forEach((v) => stringifier.write(v));
              stringifier.pipe(writableStream);
              console.log("Finished writing data for theses");
              resolve();
            });
          })
          .catch((err) => console.error(err));
      })
      .on("error", reject);
  });
}

//HAL
async function getPublications(base, peopleFilename, halFilename) {
  const synonyms = base.synonyms;
  const toRemove = base.toRemove;
  //input people data
  const people = new Array();
  return new Promise((resolve, _reject) => {
    fs.createReadStream(peopleFilename)
      .pipe(csv())
      .on("data", (data) => {
        const o = {
          teams: data.teams,
          webpage: data.webpage,
          HAL: data.HAL,
          firstname: data.firstname,
          alt_firstname: data.alt_firstname,
          lastname: data.lastname,
          fid: data.fid,
        };
        people.push(o);
        // people.set(`${data.firstname.toLowerCase()} ${data.lastname.toLowerCase()}`, o);
        // if (data.alt_firstname) {
        //     people.set(`${data.alt_firstname.toLowerCase()} ${data.lastname.toLowerCase()}`, o);
        // }
      })
      .on("end", async () => {
        console.log(people.length, "persons found for publications");
        const fields = [
          "fileAnnexes_s",
          "fileAnnexesFigure_s",
          "invitedCommunication_s",
          "proceedings_s",
          "popularLevel_s",
          "halId_s",
          "authIdHalFullName_fs",
          "producedDateY_i",
          "docType_s",
          "files_s",
          "fileMain_s",
          "fileMainAnnex_s",
          "linkExtUrl_s",
          "title_s",
          "en_title_s",
          "fr_title_s",
          "label_bibtex",
          "citationRef_s",
          "labStructId_i",
          "journalTitle_s",
          "researchData_s",
          "peerReviewing_s",
          "audience_s",
          "doiId_s",
          "softCodeRepository_s",
          "arxivId_s",
          "anrProjectTitle_s",
          "europeanProjectTitle_s",
          "publicationDate_s",
          "journalUrl_s",
          "keyword_s",
        ];
        // fetch raw data from the HAL api
        const queryParams = {
          q: "*",
          wt: "json",
          sort: "producedDateY_i desc",
          rows: 10000,
          fl: fields.join(","),
          fq: "((labStructId_i:1003089 OR labStructId_i:536752))", // producedDateY_i:[2019 TO *])"
        };
        const params = qs.stringify(queryParams);
        const writableStream = fs.createWriteStream(halFilename);
        const columns = [
          "id",
          "title",
          "halId",
          "authIdHalFullName",
          "docType",
          "producedDate",
          "fileMain",
          "files",
          "citationRef",
          "label_bibtex",
          "proceedings",
          "popularLevel",
          "invitedCommunication",
          "peerReviewing",
          "researchData",
          "audience",
          "doiId",
          "softCodeRepository",
          "arxivId",
          "anrProjectTitle",
          "europeanProjectTitle",
          "publicationDate",
          "teams",
          "authors",
          "keywords",
          "keywords_lastig",
        ];
        const stringifier = stringify({ header: true, columns: columns });
        await get(`https://api.archives-ouvertes.fr/search/?${params}`)
          .then((res) => {
            console.log(`Found ${res.data.response.docs.length} publications`);
            // map into these results and create nodes
            const promises = res.data.response.docs.map((doc, i) => {
              // Create your node object
              const authors = doc.authIdHalFullName_fs.map(
                (authIdHalFullName) => {
                  const [_idHal, _fullName] =
                    authIdHalFullName.split("_FacetSep_");
                  return { fullName: _fullName, idHal: _idHal };
                },
              );
              // Identify the teams
              function match(person, author) {
                function getInitials(name) {
                  let words = name.split(" ");
                  let initials = words.map((word) => word.charAt(0));
                  return initials.join(" ").toUpperCase();
                }
                const ignoreNoise = (str) =>
                  str.replaceAll("-", " ").replaceAll(".", "");
                const removeAccents = (str) =>
                  str.normalize("NFD").replaceAll(/[\u0300-\u036f]/g, "");
                const clean = (str) => ignoreNoise(removeAccents(str));
                const fullName = clean(author.fullName);
                return (
                  (person.HAL && author.idHal === person.HAL) ||
                  fullName.includes(
                    clean(`${person.firstname} ${person.lastname}`),
                  ) ||
                  (!!person.alt_firstname &&
                    fullName.includes(
                      clean(`${person.alt_firstname} ${person.lastname}`),
                    )) ||
                  fullName.includes(
                    clean(
                      `${getInitials(person.firstname)} ${person.lastname}`,
                    ),
                  ) ||
                  fullName.includes(
                    clean(`${person.lastname} ${person.firstname}`),
                  )
                );
              }
              const teams = Array.from(
                new Set(
                  authors.flatMap((author) => {
                    const person = people.filter((peopleNode) =>
                      match(peopleNode, author),
                    );
                    return person.flatMap((p) => p.teams.split(","));
                  }),
                ),
              );
              const authorIds = authors.flatMap((author) => {
                const person = people.filter((peopleNode) =>
                  match(peopleNode, author),
                );
                return person.map((p) => p.fid);
              });
              const keywords = doc.keyword_s ? doc.keyword_s.join(",") : "";
              const keywords_lastig = doc.keyword_s
                ? rewriteKeywords(base, doc.keyword_s).join(",")
                : "";
              return [
                `${i}`,
                doc.title_s ? doc.title_s.join(",") : "",
                doc.halId_s,
                JSON.stringify(authors),
                doc.docType_s,
                doc.producedDateY_i,
                doc.fileMain_s,
                doc.files_s ? doc.files_s.join(",") : "",
                doc.citationRef_s,
                Buffer.from(doc.label_bibtex).toString("base64"),
                doc.proceedings_s,
                doc.popularLevel_s,
                doc.invitedCommunication_s,
                doc.peerReviewing_s,
                doc.researchData_s ? doc.researchData_s.join(",") : "",
                doc.audience_s,
                doc.doiId_s,
                doc.softCodeRepository_s
                  ? doc.softCodeRepository_s.join(",")
                  : "",
                doc.arxivId_s,
                doc.anrProjectTitle_s,
                doc.europeanProjectTitle_s,
                doc.publicationDate_s,
                teams.join(","),
                authorIds.join(","),
                keywords,
                keywords_lastig,
              ];
            });
            Promise.all(promises).then((values) => {
              values.forEach((v) => stringifier.write(v));
              stringifier.pipe(writableStream);
              console.log(
                "Finished writing data for publications with ",
                values.length,
              );
              resolve();
            });
          })
          .catch((err) => console.error(err));
      });
  });
}

async function getKeywordBase(synonymsFilename, toRemoveFilename) {
  const synonyms = new Map();
  const toRemove = [];
  return new Promise((resolve, _reject) => {
    fs.createReadStream(synonymsFilename)
      .pipe(csv({ headers: false }))
      .on("data", (data) => {
        Object.getOwnPropertyNames(data)
          .filter((k) => k != "0")
          .forEach((k) => {
            if (data[k].length > 0) synonyms.set(data[k], data["0"]);
          });
      })
      .on("end", () => {
        fs.createReadStream(toRemoveFilename)
          .pipe(csv({ headers: false }))
          .on("data", (data) => {
            toRemove.push(data["0"]);
          })
          .on("end", () => {
            console.log(toRemove);
            resolve({ synonyms: synonyms, toRemove: toRemove });
          });
      });
  });
}

function rewriteKeywords(base, keywords) {
  if (!keywords) return [];
  // console.log("keywords = ",keywords.join(", "));
  return Array.from(
    new Set(
      keywords
        .map((k) => k.trim())
        .filter((k) => k.length > 2)
        .map((k) => k.toLowerCase())
        .map((k) => (base.synonyms.has(k) ? base.synonyms.get(k) : k))
        .filter((k) => !base.toRemove.includes(k)),
    ),
  );
}
function getKeywords(halFilename, keywordsFilename, cooccurenceFilename) {
  //input hal data
  const publications = new Array();
  const allTeams = ["acte", "meig", "geovis", "strudel", "lastig"];
  // const synonyms = base.synonyms;
  // const toRemove = base.toRemove;
  fs.createReadStream(halFilename)
    .pipe(csv())
    .on("data", (data) => {
      const o = { teams: data.teams, keywords: data.keywords_lastig };
      publications.push(o);
    })
    .on("end", () => {
      console.log(publications.length, "publications as input for Keywords");
      const writableStream = fs.createWriteStream(keywordsFilename);
      const columns = ["keyword", "acte", "meig", "geovis", "strudel", "total"];
      const keywordTeamMap = new Map();
      const keywordCoOccurenceMap = {
        acte: new Map(),
        meig: new Map(),
        geovis: new Map(),
        strudel: new Map(),
        lastig: new Map(),
      };
      const stringifier = stringify({ header: true, columns: columns });
      publications.forEach((v) => {
        const teams = v.teams
          .split(",")
          .map((k) => k.trim())
          .filter((k) => k.length > 0);
        const keywords = v.keywords ? v.keywords.split(",") : []; //rewriteKeywords(v.keywords.split(","))
        // const keywords = Array.from(new Set(v.keywords
        //     .split(",")
        //     .map((k) => k.trim())
        //     .filter((k) => k.length > 2)
        //     .map((k) => k.toLowerCase())
        //     .map((k) => synonyms.has(k) ? synonyms.get(k) : k)
        //     .filter((k) => !toRemove.includes(k))));
        // console.log(keywords, teams);
        if (teams.length > 0) {
          keywords.forEach((keyword) => {
            if (keywordTeamMap.has(keyword)) {
              const entry = keywordTeamMap.get(keyword);
              keywordTeamMap.set(keyword, {
                acte: entry.acte + (teams.includes("ACTE") ? 1 : 0),
                meig: entry.meig + (teams.includes("MEIG") ? 1 : 0),
                geovis: entry.geovis + (teams.includes("GEOVIS") ? 1 : 0),
                strudel: entry.strudel + (teams.includes("STRUDEL") ? 1 : 0),
              });
            } else {
              // console.log(keyword, teams);
              keywordTeamMap.set(keyword, {
                acte: teams.includes("ACTE") ? 1 : 0,
                meig: teams.includes("MEIG") ? 1 : 0,
                geovis: teams.includes("GEOVIS") ? 1 : 0,
                strudel: teams.includes("STRUDEL") ? 1 : 0,
              });
            }
            allTeams.forEach((team) => {
              if (team == "lastig" || teams.includes(team.toUpperCase())) {
                if (keywordCoOccurenceMap[team].has(keyword)) {
                  let entry = keywordCoOccurenceMap[team].get(keyword);
                  keywords
                    .filter((k) => k != keyword)
                    .forEach(
                      (k) =>
                        (entry[k] =
                          (Object.hasOwn(entry, k) ? entry[k] : 0) + 1),
                    );
                  keywordCoOccurenceMap[team].set(keyword, entry);
                } else {
                  keywordCoOccurenceMap[team].set(
                    keyword,
                    Object.fromEntries(
                      new Map(
                        keywords.filter((k) => k != keyword).map((k) => [k, 1]),
                      ),
                    ),
                  );
                }
              }
            });
          });
        }
      });
      // function logMapElements(value, key, map) {
      //     console.log(`map.get('${key}') = ${value}`);
      // };
      // keywordMap.forEach(logMapElements);
      // keywordMap.forEach((value, keyword, map) => stringifier.write([keyword, value[0].join(","), value[1]]));
      keywordTeamMap.forEach((value, keyword, _map) =>
        stringifier.write([
          keyword,
          value.acte,
          value.meig,
          value.geovis,
          value.strudel,
          value.acte + value.meig + value.geovis + value.strudel,
        ]),
      );
      stringifier.pipe(writableStream);
      console.log("Finished writing data for keywords");
      const keywordCoOccurences = {
        acte: {},
        meig: {},
        geovis: {},
        strudel: {},
        lastig: {},
      };
      allTeams.forEach((team) => {
        Array.from(keywordCoOccurenceMap[team].keys()).forEach((k) => {
          const value = keywordTeamMap.get(k);
          // return [k,value.acte + value.meig + value.geovis + value.strudel,keywordCoOccurenceMap.get(k)]
          keywordCoOccurences[team][k] = {
            occurences:
              team == "lastig"
                ? value.acte + value.meig + value.geovis + value.strudel
                : value[team],
            cooccurences: keywordCoOccurenceMap[team].get(k),
          };
        });
      });
      // console.log(JSON.stringify(keywordCoOccurences, null, 2));
      fs.writeFile(
        cooccurenceFilename,
        JSON.stringify(keywordCoOccurences, null, 2),
        (error) => {
          if (error) {
            console.log("An error has occurred ", error);
            return;
          }
          console.log("Data written successfully to disk for co-occurences");
        },
      );
    });
}

function getDatasets(inputDatasetFilename, datasetFilename) {
  //input datasets data
  const datasets = new Array();
  fs.createReadStream(inputDatasetFilename)
    .pipe(csv())
    .on("data", (data) => {
      datasets.push(JSON.parse(JSON.stringify(data)));
    })
    .on("end", async () => {
      console.log(datasets.length, "datasets found");
      const writableStream = fs.createWriteStream(datasetFilename);
      const columns = [
        "name",
        "short_name",
        "doi",
        "url",
        "date",
        "project",
        "theme",
        "teams",
        "image_url",
        "downloads",
      ];
      const stringifier = stringify({ header: true, columns: columns });
      const promises = datasets.map(async (dataset) => {
        var modifiableDataset = JSON.parse(JSON.stringify(dataset));
        let url = dataset.url;
        if (url.includes("zenodo")) {
          url = url.replace("/records/", "/api/records/");
          // console.log("Z = "+url)
          var downloadValue = 0;
          await get(url)
            .then((res) => {
              const downloads = res.data["stats"]["downloads"];
              console.log(`Z => ${downloads} from ${url}`);
              if (downloads) downloadValue = downloads;
            })
            .catch((err) => {
              console.error(err);
            });
          modifiableDataset["downloads"] = downloadValue;
          return modifiableDataset;
        } else {
          if (
            url.includes("dataverse") ||
            url.includes("entrepot.recherche.data.gouv.fr")
          ) {
            var downloadValue = 0;
            // console.log("D = " + url);
            await get(url)
              .then((response) => {
                console.log(`D => ${response.status} status (${url})`);
                if (response.status == 200) {
                  const data = response.data;
                  const $ = cheerio.load(data);
                  const downloads = $(".metrics-count-block")
                    .map((_, block) => {
                      const $block = $(block);
                      return $block
                        .text()
                        .substring(0, $block.text().indexOf(" Downloads"))
                        .replaceAll(",", "");
                    })
                    .toArray()[0];
                  console.log(`D => ${downloads} (${url})`);
                  if (downloads) downloadValue = downloads;
                } else {
                  // use previous values (harvard dataverse blocks requests now apparently)
                  switch (url) {
                    case "https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/ZKRJFA":
                      downloadValue = 8190;
                      break;
                    case "https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/XP8J6P":
                      downloadValue = 6558;
                      break;
                    case "https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/28674":
                      downloadValue = 2543;
                      break;
                    case "https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/CCESX4":
                      downloadValue = 371;
                      break;
                    default:
                      console.log(`Sorry, not found ${url}.`);
                  }
                }
              })
              .catch((err) => {
                console.error(err);
              });
            modifiableDataset["downloads"] = downloadValue;
            return modifiableDataset;
          } else {
            if (url.includes("figshare")) {
              const dataId = url.substring(url.lastIndexOf("/") + 1);
              // console.log(`F = ${url} (${dataId})`);
              var downloadValue = 0;
              await get(`https://stats.figshare.com/total/article/${dataId}`)
                .then((res) => {
                  const downloads = res.data["downloads"];
                  console.log(
                    `F => ${downloads} from ${`https://stats.figshare.com/total/article/${dataId}`}`,
                  );
                  if (downloads) downloadValue = downloads;
                })
                .catch((err) => {
                  console.error(err);
                });
              modifiableDataset["downloads"] = downloadValue;
              return modifiableDataset;
            } else {
              if (url.includes("mendeley")) {
                // console.log("M = "+ url);
                const dataId = url.substring(url.lastIndexOf("/") + 1);
                var downloadValue = 0;
                await get(
                  `https://api.plu.mx/widget/elsevier/artifact?type=mendeley_data_id&id=${dataId}&hidePrint=true&site=plum&href=https://plu.mx/plum/a?mendeley_data_id=${dataId}`,
                )
                  .then((res) => {
                    const downloads =
                      res.data["statistics"]["Usage"][0]["count"];
                    console.log("M => " + downloads);
                    if (downloads) downloadValue = downloads;
                  })
                  .catch((err) => {
                    reporter.error(err);
                  });
                modifiableDataset["downloads"] = downloadValue;
                return modifiableDataset;
              } else {
                modifiableDataset["downloads"] = 0;
                return modifiableDataset;
              }
            }
          }
        }
      });
      Promise.all(promises).then((values) => {
        values.forEach((v) => stringifier.write(v));
        stringifier.pipe(writableStream);
        console.log("Finished writing data for datasets");
      });
    });
}
/*
 TODO: 
- get the input data from lastig_data ?
- add info about previous positions? education?
*/

// getPeople("src/input_data/people.csv", "src/data/people.csv")
//     .then(() => getTheses("src/data/people.csv", "src/data/theses.csv")
//         .then(() => getPublications("src/data/people.csv", "src/data/hal.csv")
//             .then(() => getKeywords("src/data/hal.csv", "src/data/keywords.csv")
//                 // .then(() => getDatasets("src/input_data/dataset.csv", "src/data/dataset.csv"))
//             )
//         )
//     )
// getTheses("src/data/people.csv", "src/data/theses.csv")
getPeople("src/input_data/people.csv", "src/data/people.csv").then(() =>
  getTheses("src/data/people.csv", "src/data/theses.csv").then(() =>
    getKeywordBase(
      "src/input_data/synonyms.csv",
      "src/input_data/remove.csv",
    ).then((kb) =>
      getPublications(kb, "src/data/people.csv", "src/data/hal.csv")
        .then((_kb) =>
          getKeywords(
            "src/data/hal.csv",
            "src/data/keywords.csv",
            "src/data/keywords-co-occurences.json",
          ),
        )
        .then(() =>
          getDatasets("src/input_data/dataset.csv", "src/data/dataset.csv"),
        ),
    ),
  ),
);
