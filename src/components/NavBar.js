import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import {
  Nav,
  NavBarContainer,
  NavBarLogo,
  MobileIcon,
  NavBarMenu,
  NavItem,
  NavLink,
  NavMenuButton,
  NavMenu,
  NavSubMenu,
  NavMenuItem,
} from "./styles/NavBar.styled";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useIntl } from "react-intl";
import { useLocalization } from "@ericcote/gatsby-theme-i18n";
import { Location } from "@reach/router";
import { StaticImage } from "gatsby-plugin-image";

export const NavBar = ({ title, menus, lastigLogo, useLocale, team }) => {
  const [click, setClick] = useState(false);
  const [scroll, setScroll] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  const closeMobileMenu = () => setClick(false);
  const changeNav = () => {
    setScroll(window.scrollY >= 80);
  };
  useEffect(() => {
    changeNav();
    window.addEventListener("scroll", changeNav);
  }, []);
  const { locale, config } = useLocalization();
  const intl = useIntl();
  function trans(text) {
    return intl.formatMessage({ id: text });
  }
  function createMenuItem(menu, topMenu = false) {
    if (menu.subMenu && menu.subMenu.length > 0) {
      const subMenuItems = menu.subMenu.map((submenu) =>
        createMenuItem(submenu),
      );
      if (topMenu) {
        // console.log(`TOP MENU = ${team}-${menu.link}-${menu.name}`)
        return (
          <NavMenu
            key={`${team}-${menu.link}-${menu.name}`}
            $team={team}
            align="center"
            onClick={(e) => {
              e.stopPropagation();
              e.keepOpen = true;
            }}
            // onItemClick={(e) => console.log(`[Menu onItemClick] ${e.value} clicked`)}
            menuButton={
              <NavMenuButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.keepOpen = true;
                }}
              >
                {trans(menu.name)}
              </NavMenuButton>
            }
          >
            {subMenuItems}
          </NavMenu>
        );
      }
      // console.log(`SUB MENU = ${team}-${menu.link}-${menu.name}`)
      return (
        <NavSubMenu
          key={`${team}-${menu.link}-${menu.name}`}
          align="center"
          $team={team}
          onClick={(e) => {
            // console.log(`[SubMenu] $router{e.value} clicked`);
            // Stop the `onItemClick` of root menu component from firing
            e.stopPropagation();
            // Keep the menu open after this menu item is clicked
            e.keepOpen = true;
          }}
          label={trans(menu.name)}
        >
          {subMenuItems}
        </NavSubMenu>
      );
    }
    // console.log(`ITEM = ${team}-${menu.link}-${menu.name}`)
    return (
      <NavMenuItem
        key={`${team}-${menu.link}-${menu.name}`}
        onClick={(e) => {
          // console.log(`[MenuItem] ${e.value} clicked`);
          // Stop the `onItemClick` of root menu component from firing
          e.stopPropagation = true;
          // Keep the menu open after this menu item is clicked
          e.keepOpen = true;
        }}
      >
        <NavLink to={menu.link}>{trans(menu.name)}</NavLink>
      </NavMenuItem>
    );
  }
  const navMenuItems = menus.map((menu) => {
    if (menu.subMenu && menu.subMenu.length > 0) {
      return <NavItem key={menu.name}>{createMenuItem(menu, true)}</NavItem>;
    }
    return (
      <NavItem key={menu.name}>
        <NavLink to={menu.link}>{trans(menu.name)}</NavLink>
      </NavItem>
    );
  });
  return (
    <>
      <IconContext.Provider value={{ color: "#131313" }}>
        <Nav $active={`${scroll}`} $click={click} $team={team}>
          <NavBarContainer>
            <NavBarLogo
              key="NavBarLogo"
              to="/"
              onClick={closeMobileMenu}
              $team={team}
            >
              {lastigLogo ? (
                <StaticImage
                  src="../images/lastig1.svg"
                  alt="LASTIG LOGO"
                  height={60}
                ></StaticImage>
              ) : (
                title
              )}
            </NavBarLogo>
            <MobileIcon key="NavBarIcon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </MobileIcon>
            <NavBarMenu
              key="NavBarMenu"
              $team={team}
              onClick={handleClick}
              $click={click}
            >
              {navMenuItems}
            </NavBarMenu>
            {useLocale && (
              <Location key="NavBarLocation">
                {({ location }) => (
                  <NavMenu
                    key={"NavBarLocation-" + location.key}
                    $team={team}
                    align="center"
                    menuButton={
                      <NavMenuButton>
                        <img
                          src={"https://languageicon.org/language-icon.svg"}
                          alt="Language"
                          style={{ width: 32, height: 32 }}
                        ></img>
                      </NavMenuButton>
                    }
                  >
                    {config.map((loc) => (
                      <NavMenuItem key={`"NavBarLocation-${loc.code}`}>
                        <NavLink
                          to={location.pathname.replace(`/${locale}/`, "/")}
                          language={loc.code}
                        >
                          {loc.code}
                        </NavLink>
                      </NavMenuItem>
                    ))}
                  </NavMenu>
                )}
              </Location>
            )}
          </NavBarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};
