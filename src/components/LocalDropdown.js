import React, { useState } from "react";
import { navigate } from "gatsby";
import { DropdownButton, DropdownList } from "./styles/LocalDropdown.styled"

export const LocalDropdown = ({ name, options, trans }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <DropdownButton onClick={() => setToggle(!toggle)}>{trans(name)}</DropdownButton>
      {toggle && <DropdownList>
        {options.map((option, index) => (
          <li key={option} >
            <button onClick={() => {
              navigate(`#${option}`);
              setToggle(!toggle);
            }}>{trans(option)}</button>
          </li>
        ))}
      </DropdownList>}
    </div>
  );
};
