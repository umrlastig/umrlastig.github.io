import styled from "styled-components";

import { LocalizedLink as Link } from "@ericcote/gatsby-theme-i18n"
import { FaHamburger } from "react-icons/fa";
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';

export const Nav = styled.nav`
    background: ${({theme, $team}) => $team ? theme.colors[$team] : theme.colors.header};
    height: 80px;
    display: flex;
    justify-content: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: ${({theme, $team}) => $team ? 999:1000};
    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
`

export const NavBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
`

export const NavBarLogo = styled(Link)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    text-decoration: none;
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    font-weight: 600;
    margin-left: 2rem;
`

export const NavIcon = styled(FaHamburger)`
    margin: 0 0.5rem;
    font-size: 1.6rem;
`

export const MobileIcon = styled.div`
    display: none;
    @media screen and (max-width: 960px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 2rem;
        cursor: pointer;
    }
`

export const NavBarMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    @media screen and (max-width: 960px) {
        display: ${({$click}) => ($click ? 'flex' : 'none')};
        flex-direction: column;
        width: 100%;
        // height: 90vh;
        position: absolute;
        margin: 0;
        top: 80px;
        height: 80px;
        // top: ${({$click}) => ($click ? '100%' : '-1000px')};
        opacity: 1;
        padding: 0;
        // transition: all 0.2s ease;
        background: ${({theme, team}) => team ? theme.colors[team] : theme.colors.header};
    }
`

export const NavItem = styled.li`
    height: 80px;
    @media screen and (max-width: 960px) {
        width: 100%;
        background: inherit;
        padding: 0;
        a {
            padding: 0;
        }
    }
`

export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    // padding: 0.5rem 1rem;
    padding: 0rem 1rem;
    height: 100%;
    @media screen and (max-width: 960px) {
        height: 80px;
        text-align: center;
        //padding: 2rem;
        padding: 0rem 1rem;
        width: 100%;
        display: table;
        &:hover {
            color: #ff4040;
            transition: all 0.3s ease;
        }
    }
`

export const NavMenuButton = styled(MenuButton)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    // padding: 0.5rem 1rem;
    padding: 0rem 1rem;
    height: 100%;
    border: none;
    background: inherit;
    font-size: 1rem;
    cursor: pointer;
    @media screen and (max-width: 960px) {
        text-align: center;
        padding: 2rem;
        height: 80px;
        width: 100%;
        display: table;
        &:hover {
            color: #ff4040;
            transition: all 0.3s ease;
        }
    }
`

export const NavMenu = styled(Menu)`
    background: ${({theme, $team}) => $team ? theme.colors[$team] : theme.colors.header};
    ul {
        background: inherit;
    }
`
export const NavSubMenu = styled(SubMenu)`
    align-content: center;
    color: white;
    padding: 0.375rem 2.5rem 0.375rem 1.5rem;
    ul {
        background: ${({theme, $team}) => $team ? theme.colors[$team] : theme.colors.header};
    }
    div {
        padding: 0rem 2.5rem 0rem 1rem;
    }
`
export const NavMenuItem = styled(MenuItem)`
`