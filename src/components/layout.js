import * as React from 'react'
// import { Link, Trans, useI18next } from 'gatsby-plugin-react-i18next';
import { useLocalization } from "@ericcote/gatsby-theme-i18n"
import { LocalizedLink as Link } from "@ericcote/gatsby-theme-i18n"
import { useIntl } from "react-intl"
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

const Layout = ({ children }) => {
  // const { languages, originalPath } = useI18next();
  const { localizedPath, config } = useLocalization();
  const intl = useIntl()
  function trans(text) { return intl.formatMessage({ id: text }) }
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
                <Link to="/" className={navLinkText}>{intl.formatMessage({ id: "Lab" })}</Link>
                <ul>
                  <li className={navLinkItem}><Link to="/presentation/" className={navLinkText}>{trans("Presentation")}</Link></li>
                  <li className={navLinkItem}><Link to="/history/" className={navLinkText}>{trans("History")}</Link></li>
                  <li className={navLinkItem}><Link to="/access/" className={navLinkText}>{trans("Access")}</Link></li>
                </ul>
              </li>
              <li className={navLinkItem}>
                <Link to="/" className={navLinkText}>{intl.formatMessage({ id: "Research" })}</Link>
                <ul>
                  <li className={navLinkItem}><Link to="/teams/" className={navLinkText}>{trans("Teams")}</Link></li>
                  <li className={navLinkItem}><Link to="/members/" className={navLinkText}>{trans("Members")}</Link></li>
                  <li className={navLinkItem}><Link to="/projects/" className={navLinkText}>{trans("Projects")}</Link></li>
                </ul>
              </li>
              <li className={navLinkItem}>
                <Link to="/" className={navLinkText}>{intl.formatMessage({ id: "Production" })}</Link>
                <ul>
                  <li className={navLinkItem}><Link to="/publications/" className={navLinkText}>{trans("Publications")}</Link></li>
                  <li className={navLinkItem}><Link to="/datasets/" className={navLinkText}>{trans("Datasets")}</Link></li>
                </ul>
              </li>
              <li className={navLinkItem}>
                <Link to="/join/" className={navLinkText}>{trans("Join")}</Link>
              </li>
              <li className={navLinkLogo} >
                <Link to="/" className={navLinkText}>
                  <img src={'https://languageicon.org/language-icon.svg'} alt="Select Language" style={{ width: "auto", height: 60 }}></img>
                </Link>
                <ul> {/* className={navLanguages} */}
                  {config.map((locale) => (
                    <li className={navLinkItem} key={locale.code}>
                      <Link className={navLinkText} to="/" language={locale.code}>{locale.localName}</Link>
                    </li>
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
              <div><Link to="/access/" className={navLinkText}>Access</Link></div>
            </div>
          </section>
          <section className={footerColumn}>
            <div className={footerColumnContent}>
              <div><Link to="/legal/" className={navLinkText}>Legal</Link></div>
              <div><a href="https://github.com/umrlastig/lastig-gatsby" className={navLinkText}>Source</a></div>
            </div>
          </section>
          <section className={footerColumn}>
            <div className={footerColumnContent}>
              <div><a href="https://x.com/LASTIG_lab" className={navLinkText}>Twitter</a></div>
              <div><a href="https://www.youtube.com/channel/UCpVokwKUh9S4pqZ4cd-GTCQ" className={navLinkText}>Youtube</a></div>
              <div><a href="https://github.com/umrlastig" className={navLinkText}>GitHub</a></div>
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

export default Layout