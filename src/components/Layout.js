import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { ThemeProvider } from "styled-components";
import { LocalizedLink as Link } from "@ericcote/gatsby-theme-i18n";
import { useIntl } from "react-intl";
import { GlobalStyles } from "./styles/Global";
import {
  FaYoutube,
  FaGithub,
  FaLocationPin,
  FaLinkedin,
} from "react-icons/fa6";
import {
  VerticalContainer,
  HorizontalContainer,
  MainContainer,
  HorizontalCenteredContainer,
} from "./styles/Container.styled";
import { Footer } from "./styles/Footer.styled";
import { Button } from "./styles/Dropdown.styled";
import { theme } from "../theme";
import { NavBar } from "./NavBar";

const Layout = ({ children }) => {
  const intl = useIntl();
  function trans(text) {
    return intl.formatMessage({ id: text });
  }
  const data = useStaticQuery(graphql`
    query MenuQuery {
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
        }
      }
    }
  `);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <VerticalContainer>
        <NavBar
          title="LASTIG"
          menus={data.site.siteMetadata.menuLinks}
          lastigLogo="true"
          useLocale="true"
        />
        <main>
          <MainContainer>{children}</MainContainer>
        </main>
        <Footer>
          <HorizontalContainer>
            <section>
              <div>
                <Button>
                  <Link to="/access/">
                    <FaLocationPin /> {trans("Access")}
                  </Link>
                </Button>
              </div>
            </section>
            <section>
              <div>
                {/* <Button>
                  <Link to="/legal/">
                    <FaScaleBalanced /> {trans("Legal")}
                  </Link>
                </Button> */}
                <Button>
                  <a href="https://github.com/umrlastig/umrlastig.github.io">
                    <FaGithub /> {trans("Source")}
                  </a>
                </Button>
              </div>
            </section>
            <section>
              <div>
                <Button>
                  <a href="https://www.linkedin.com/search/results/all/?keywords=%23lastig&origin=HASH_TAG_FROM_FEED&sid=RuS">
                    <FaLinkedin /> Linkedin
                  </a>
                </Button>
                <Button>
                  <a href="https://www.youtube.com/channel/UCpVokwKUh9S4pqZ4cd-GTCQ">
                    <FaYoutube /> YouTube
                  </a>
                </Button>
                <Button>
                  <a href="https://github.com/umrlastig">
                    <FaGithub /> GitHub
                  </a>
                </Button>
              </div>
            </section>
          </HorizontalContainer>
          <HorizontalCenteredContainer>
            <a href="https://www.univ-gustave-eiffel.fr">
              <img
                src="https://www.univ-gustave-eiffel.fr/fileadmin/logo_eiffel_white.svg"
                style={{ width: "auto", height: 30, filter: "invert(1)" }}
                alt="Université Gustave Eiffel"
              ></img>
            </a>
            <a href="https://geodata-paris.fr">
              <img
                src="https://geodata-paris.fr/files/ensg/styles/thumbnail/public/2025-10/G%C3%A9odata_Paris_logo.png"
                style={{ width: "auto", height: 30, filter: "invert(1)" }}
                alt="Géodata Paris"
              ></img>
            </a>
            <a href="https://www.eivp-paris.fr/">
              <img
                src="https://www.univ-gustave-eiffel.fr/fileadmin/_processed_/2/6/csm_EIVP-footer-logo_dd40d6347f.png"
                style={{ width: "auto", height: 60, filter: "invert(1)" }}
                alt="EIVP"
              ></img>
            </a>
          </HorizontalCenteredContainer>
        </Footer>
      </VerticalContainer>
    </ThemeProvider>
  );
};

export default Layout;
