import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { LocalizedLink as Link } from "@ericcote/gatsby-theme-i18n"
import { useIntl } from "react-intl"
import {Nav} from './Nav'
import {NavButton} from './styles/Nav.styled'
import Locale from './Locale'
import { GlobalStyles } from './styles/Global'
import { FaAlignJustify, FaScaleBalanced, FaTwitter, FaYoutube, FaGithub, FaLocationPin} from "react-icons/fa6"
import {Header} from './styles/Header.styled'
import {VerticalContainer, HorizontalContainer, MainContainer, HorizontalCenteredContainer} from './styles/Container.styled'
import {Footer} from './styles/Footer.styled'
import {LastigLogo} from './styles/LastigLogo.styled'
import {Button} from './styles/Dropdown.styled'
import {theme} from '../theme'

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => { setIsOpen(!isOpen) }
  const intl = useIntl()
  function trans(text) { return intl.formatMessage({ id: text }) }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <VerticalContainer>
        <Header>
          <HorizontalContainer>
            <LastigLogo to="/">
              <img src={'https://www.umr-lastig.fr/img/lastig1.svg'} alt="LASTIG LOGO" style={{ width: "auto", height: 60 }}></img>
            </LastigLogo>
            <VerticalContainer>
              <NavButton onClick={toggleMenu}>
                <FaAlignJustify />
              </NavButton>
              <Nav isOpen={isOpen} />
            </VerticalContainer>
            <Locale />
          </HorizontalContainer>
        </Header>
        <main>
          <MainContainer>
            {children}
          </MainContainer>
        </main>
        <Footer>
            <HorizontalContainer>
              <section>
                <div>
                  <Button><Link to="/access/"><FaLocationPin /> {trans('Access')}</Link></Button>
                </div>
              </section>
              <section>
                <div>
                  <Button><Link to="/legal/"><FaScaleBalanced /> {trans('Legal')}</Link></Button>
                  <Button><a href="https://github.com/umrlastig/lastig-gatsby"><FaGithub /> {trans('Source')}</a></Button>
                </div>
              </section>
              <section>
                <div>
                  <Button><a href="https://x.com/LASTIG_lab"><FaTwitter /> Twitter</a></Button>
                  <Button><a href="https://www.youtube.com/channel/UCpVokwKUh9S4pqZ4cd-GTCQ"><FaYoutube /> YouTube</a></Button>
                  <Button><a href="https://github.com/umrlastig"><FaGithub /> GitHub</a></Button>
                </div>
              </section>
            </HorizontalContainer>
            <HorizontalCenteredContainer>
              <a href='https://www.univ-gustave-eiffel.fr'>
                <img src='https://www.univ-gustave-eiffel.fr/fileadmin/logo_eiffel_white.svg' style={{ width: "auto", height: 60 }} alt='Université Gustave Eiffel'></img>
              </a>
              <a href='https://ensg.eu'>
                <img src='https://www.univ-gustave-eiffel.fr/fileadmin/_processed_/9/6/csm_ENSG-footer-logo_c0b9f2880f.png' style={{ width: "auto", height: 60 }} alt='ENSG'></img>
              </a>
              <a href='https://www.eivp-paris.fr/'>
                <img src='https://www.univ-gustave-eiffel.fr/fileadmin/_processed_/2/6/csm_EIVP-footer-logo_dd40d6347f.png' style={{ width: "auto", height: 60 }} alt='EIVP'></img>
              </a>
            </HorizontalCenteredContainer>
        </Footer>
      </VerticalContainer>
    </ThemeProvider>
  )
}

export default Layout