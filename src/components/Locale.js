import React from "react";
import { useLocalization } from "@ericcote/gatsby-theme-i18n";
import { Dropdown } from "./Dropdown";

const Locale = () => {
  const { config } = useLocalization();
  return (
    <Dropdown
      name="Language"
      image="https://languageicon.org/language-icon.svg"
      options={config.map((locale) => [
        locale.localName,
        "/",
        locale.code,
        true,
      ])}
    />
  );
};

export default Locale;
