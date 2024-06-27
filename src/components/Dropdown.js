import React, { useState } from 'react'
import { DropdownContainer, Box, Button } from './styles/Dropdown.styled'
import { LocalizedLink as Link, LocaleContext } from "@ericcote/gatsby-theme-i18n"
import { useIntl } from "react-intl"

export const Dropdown = ({ name, image, options }) => {
    const currentLocale = React.useContext(LocaleContext)
    const intl = useIntl()
    function trans(text) { return intl.formatMessage({ id: text }) }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const toggleDropdown = () => { setIsDropdownOpen(!isDropdownOpen) }
    return (
        <DropdownContainer>
            <Button onClick={toggleDropdown} $subButton={false}>
                {image ? <img src={image} alt={trans(name)}></img>:trans(name)}
            </Button>
            <Box $isDropdownOpen={isDropdownOpen}>{options.map((option, index) => (
                <Button key={index} $subButton={true}>
                    <Link to={option[1]} language={option[2] || currentLocale}>{option[3]?option[0]:trans(option[0])}</Link>
                </Button>
            ))}
            </Box>
        </DropdownContainer>
    )
}
