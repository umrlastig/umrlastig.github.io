import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import { theme } from "../theme";
import { useIntl } from "react-intl";
import { NavBar } from "../components/NavBar";
import ProjectsPlot from "../components/ProjectsPlot";
import * as Plot from "@observablehq/plot";

export default function ProjectsPage({ data, pageContext }) {
  const team = pageContext.team;
  const isLastigPage = team.length > 1;
  const intl = useIntl();
  function trans(text) {
    return intl.formatMessage({ id: text });
  }
  const colorDomain = [
    "H2020",
    "ERA4CS",
    "Horizon Europe",
    "ENIAC",
    "ANR",
    "TOSCA",
    "AID",
    "iSite",
    "PEPR",
    "FUI",
    "AAP Excellences",
    "TIGA",
    "PEPS",
    "ACTE",
    "GEOVIS",
    "MEIG",
    "STRUDEL",
  ];
  const projects = data.allProjectsCsv.nodes
    .map((node) => {
      const dates = node.Dates.split("-").map((d) => Number(d.trim()));
      return {
        long_name: node.Contract_Name,
        name: node.Short_Name,
        start_date: dates[0],
        middle_date: (dates[1] + dates[0]) / 2.0,
        end_date: dates[1],
        theme: node.Theme,
        duration: dates[1] - dates[0],
        funding: node.Funding_Origin,
        type: node.Contract_Type,
        teams: node.Teams,
        site: node.Website,
      };
    })
    .filter(({ theme, type }) => theme && colorDomain.includes(type));
  const first_date = Math.min(...projects.map((p) => p.start_date));
  const last_date = Math.max(...projects.map((p) => p.end_date));
  projects.sort(
    (a, b) =>
      a.theme.localeCompare(b.theme) ||
      a.start_date - b.start_date ||
      a.end_date - b.end_date ||
      a.name.localeCompare(b.name),
  );
  const sorted_projects = projects.map((p, index) => {
    return { index: index, ...p };
  });
  // sorted_projects.forEach((p) =>
  //   console.log(p.index, p.theme, p.start_date, p.end_date, p.name),
  // );
  const teams = sorted_projects.flatMap((p) =>
    p.teams.map((t, index) => ({
      end_date: p.end_date,
      team: t,
      index: p.index,
      dx: -(index + 1) * 10,
    })),
  );
  const dxValues = [...new Set(teams.map((t) => t.dx))];
  // teams.forEach((p) => console.log(p.index, p.index, p.dx));
  // dxValues.forEach((dx) => console.log(dx));
  const themes = [...new Set(sorted_projects.map((p) => p.theme))];
  const sorted_themes = themes.map((t) => {
    const theme_projects = sorted_projects.filter(({ theme }) => theme === t);
    const first_index = Math.min(...theme_projects.map((p) => p.index));
    const last_index = Math.max(...theme_projects.map((p) => p.index));
    return {
      theme: t,
      start_date: first_date,
      end_date: last_date,
      index_1: first_index,
      index_2: last_index,
      index_middle: Math.round((first_index + last_index) / 2),
    };
  });
  // sorted_themes.forEach((t) =>
  //   console.log(
  //     t.theme,
  //     t.start_date,
  //     t.end_date,
  //     t.index_1,
  //     t.index_2,
  //     t.index_middle,
  //   ),
  // );
  return (
    <Layout pageTitle={`${isLastigPage ? "LASTIG" : team} Projects`}>
      <h3>{trans(`${isLastigPage ? "LASTIG" : team} Projects`)}</h3>
      {!isLastigPage && (
        <NavBar
          title={team}
          menus={data.site.siteMetadata.menus[team]}
          team={team}
        />
      )}
      <div>
        <ProjectsPlot
          options={{
            width: 1200,
            x: { tickFormat: "d", axis: "both" },
            // y: {tickSize: 0,label: null},
            color: {
              domain: colorDomain,
              range: colorDomain.map((d) => theme.colors[d]),
            },
            marks: [
              Plot.rect(sorted_themes, {
                x1: "start_date",
                x2: "end_date",
                y1: "index_1",
                y2: "index_2",
                // stroke: "red",
                rx: 5,
                title: "theme",
                fill: "#fcf9f9ff",
              }),
              Plot.rect(sorted_projects, {
                x1: "start_date",
                x2: "end_date",
                y: "index",
                rx: 5,
                fill: "type",
                tip: true,
                href: (d) => d.site,
              }),
              Plot.text(sorted_projects, {
                x: "middle_date",
                y: "index",
                text: (d) => d.name,
                lineAnchor: "middle",
                fontWeight: "bold",
              }),
              dxValues.map((value) =>
                Plot.dot(
                  teams.filter(({ dx }) => dx === value),
                  {
                    x: (t) => t.end_date,
                    y: "index",
                    dx: value,
                    dy: -10,
                    fill: "team",
                  },
                ),
              ),
              Plot.text(sorted_themes, {
                x: "start_date",
                y: "index_middle",
                text: (d) => d.theme,
                lineAnchor: "middle",
                rotate: -90,
                dx: 10,
                fontWeight: "bold",
              }),
              Plot.axisY({ tickSize: 0, label: null, tickFormat: null }),
            ],
          }}
        />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ($team: [String]) {
    allProjectsCsv(filter: { Teams: { in: $team } }) {
      nodes {
        Contract_Name
        Short_Name
        Contract_Type
        Dates
        Funding_Origin
        Project_Leader
        Project_Team_Leader
        Teams
        Theme
        id
        Website
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
    title={`${
      pageContext.team.length > 1 ? "LASTIG" : pageContext.team
    } Projects`}
  />
);
