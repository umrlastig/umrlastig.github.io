import * as React from 'react'
// import { Link, useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import {
  container,
  // heading,
  navContainer,
  navLinks,
  navLinkLogo,
  navLinkItem,
  navLinkText,
  // siteTitle,
} from './layout.module.css'
// import { StaticImage } from 'gatsby-plugin-image'

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)
  return (
    <div className={container}>
      {/* <header className={siteTitle}>{data.site.siteMetadata.title}</header> */}
      <div className={navContainer}>
      <nav>
        <ul className={navLinks}>
          <li className={navLinkLogo}>
            <Link to="/" className={navLinkText}>
              <img src={'https://www.umr-lastig.fr/img/lastig1.svg'} alt="LASTIG LOGO" style={{width:"auto",height:60}}></img>
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/about" className={navLinkText}>
              About
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/teams" className={navLinkText}>
              Teams
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/members" className={navLinkText}>
              Members
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/publications" className={navLinkText}>
              Publications
            </Link>
          </li>
          {/* <li className={navLinkItem}>
            <Link to="/positions" className={navLinkText}>
              Positions
            </Link>
          </li> */}
        </ul>
      </nav>
      </div>
      <main>
        {/* <h1 className={heading}>{pageTitle}</h1> */}
        {children}
      </main>
    </div>
  )
}

export default Layout