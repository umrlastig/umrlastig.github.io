import * as React from 'react'
// import { useStaticQuery, graphql } from 'gatsby'
import { Link, Trans, useI18next } from 'gatsby-plugin-react-i18next';
import {
  container,
  // heading,
  navContainer,
  navLinks,
  navLinkLogo,
  navLinkItem,
  navLinkText,
  // navLanguages,
  footerContainer,
  footerRow,
  footerColumn,
  footerColumnContent,
  siteTitle,
} from './layout.module.css'
// import { StaticImage } from 'gatsby-plugin-image'

const Layout = ({ children }) => {
  // const { t } = useTranslation();
  const { languages, originalPath } = useI18next();
  // const data = useStaticQuery(graphql`
  //   query ($language: String!) {
  //     locales: allLocale(filter: {language: {eq: $language}}) {
  //       edges {
  //         node {
  //           ns
  //           data
  //           language
  //         }
  //       }
  //     }
  //   }
  // `)
  return (
    <div className={container}>
      <header className={siteTitle}>
        {/* {data.site.siteMetadata.title} */}
        <div className={navContainer}>
          <nav>
            <ul className={navLinks}>
              <li className={navLinkLogo}>
                <Link to="/" className={navLinkText}>
                  <img src={'https://www.umr-lastig.fr/img/lastig1.svg'} alt="LASTIG LOGO" style={{ width: "auto", height: 60 }}></img>
                </Link>
              </li>
              <li className={navLinkItem}>
                <Link to="/" className={navLinkText}><Trans>Lab</Trans></Link>
                <ul>
                  <li className={navLinkItem}><Link to="/presentation/" className={navLinkText}><Trans>Presentation</Trans></Link></li>
                  <li className={navLinkItem}><Link to="/history/" className={navLinkText}><Trans>History</Trans></Link></li>
                  <li className={navLinkItem}><Link to="/access/" className={navLinkText}><Trans>Access</Trans></Link></li>
                </ul>
              </li>
              <li className={navLinkItem}>
                <Link to="/" className={navLinkText}><Trans>Research</Trans></Link>
                <ul>
                  <li className={navLinkItem}><Link to="/teams/" className={navLinkText}><Trans>Teams</Trans></Link></li>
                  <li className={navLinkItem}><Link to="/members/" className={navLinkText}><Trans>Members</Trans></Link></li>
                  <li className={navLinkItem}><Link to="/projects/" className={navLinkText}><Trans>Projects</Trans></Link></li>
                  <li className={navLinkItem}><Link to="/publications/" className={navLinkText}><Trans>Publications</Trans></Link></li>
                  <li className={navLinkItem}><Link to="/datasets/" className={navLinkText}><Trans>Datasets</Trans></Link></li>
                </ul>
              </li>
              {/* <li className={navLinkItem}>
            <Link to="/positions" className={navLinkText}>
              Positions
            </Link>
          </li> */}
              <li className={navLinkLogo} >
                <Link to="/" className={navLinkText}>
                  <img src={'https://languageicon.org/language-icon.svg'} alt="Select Language" style={{ width: "auto", height: 60 }}></img>
                </Link>
                <ul> {/* className={navLanguages} */}
                  {languages.map((lng) => (
                    <li className={navLinkItem} key={lng}><Link className={navLinkText} to={originalPath} language={lng}>{lng}</Link></li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        {/* <h1 className={heading}>{pageTitle}</h1> */}
        {children}
      </main>
      <footer className={footerContainer}>
        <div className={footerRow}>
          <section className={footerColumn}>
            <div className={footerColumnContent}>
              <div><Link to="/access/" className={navLinkText}><Trans>Access</Trans></Link></div>
            </div>
          </section>
          <section className={footerColumn}>
            <div className={footerColumnContent}>
              <div><Link to="/legal/" className={navLinkText}><Trans>Legal</Trans></Link></div>
              <div><a href="https://github.com/umrlastig/lastig-gatsby" className={navLinkText}><Trans>Source</Trans></a></div>
            </div>
          </section>
          <section className={footerColumn}>
            <div className={footerColumnContent}>
              <div><a href="https://x.com/LASTIG_lab" className={navLinkText}><Trans>Twitter</Trans></a></div>
              <div><a href="https://www.youtube.com/channel/UCpVokwKUh9S4pqZ4cd-GTCQ" className={navLinkText}><Trans>Youtube</Trans></a></div>
              <div><a href="https://github.com/umrlastig" className={navLinkText}><Trans>GitHub</Trans></a></div>
            </div>
          </section>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around !important' }}>
          <div>
            <a href='https://www.univ-gustave-eiffel.fr'>
              <img src='https://www.univ-gustave-eiffel.fr/fileadmin/logo_eiffel_white.svg' style={{ width: "auto", height: 60 }} alt='Université Gustave Eiffel'></img>
            </a>
            <a href='https://ensg.eu'>
              <img src='https://www.univ-gustave-eiffel.fr/fileadmin/_processed_/9/6/csm_ENSG-footer-logo_c0b9f2880f.png' style={{ width: "auto", height: 60 }} alt='ENSG'></img>
            </a>
            <a href='https://www.eivp-paris.fr/'>
              <img src='https://www.univ-gustave-eiffel.fr/fileadmin/_processed_/2/6/csm_EIVP-footer-logo_dd40d6347f.png' style={{ width: "auto", height: 60 }} alt='EIVP'></img>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
// export const query = graphql`
//   query ($language: String!) {
//     locales: allLocale(filter: {language: {eq: $language}}) {
//       edges {
//         node {
//           ns
//           data
//           language
//         }
//       }
//     }
//   }
// `;
export default Layout