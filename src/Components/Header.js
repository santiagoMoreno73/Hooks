import React, { useState, useContext } from "react";
import ThemeContext from "../Context/ThemeContext";

const Header = () => {
  const [darkmode, setDarkmode] = useState(false);
  const color = useContext(ThemeContext);

  return (
    <div>
      <h1 style={{ color }}>ReactHooks</h1>
      <button type="button" onClick={() => setDarkmode(!darkmode)}>
        {darkmode ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );
};

export default Header;
