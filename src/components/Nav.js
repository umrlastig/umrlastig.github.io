import React from 'react'
import { StyledNav } from './styles/Nav.styled'
import { Dropdown } from './Dropdown'
import { DropdownContainer, Button } from './styles/Dropdown.styled'
import { LocalizedLink as Link } from "@ericcote/gatsby-theme-i18n"
import { useIntl } from "react-intl"

export const Nav = ({ isOpen }) => {
    const intl = useIntl()
    function trans(text) { return intl.formatMessage({ id: text }) }

    return (
        <StyledNav $isOpen={isOpen}>
            <Dropdown name='Lab' options={[['Presentation', '/presentation'], ['History', '/history'], ['Access', '/access']]} />
            <Dropdown name='Research' options={[['Teams', '/teams'], ['Members', '/members'], ['Projects', '/projects']]} />
            <Dropdown name='Production' options={[['Publications', '/publications'], ['Datasets', '/datasets']]} />
            <DropdownContainer><Button $subButton={false}><Link to="/join/" >{trans("Join")}</Link></Button></DropdownContainer>
        </StyledNav>
    )
};
