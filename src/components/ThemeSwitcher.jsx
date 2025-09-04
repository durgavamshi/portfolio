// ThemeSwitcher.jsx
import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.classList.toggle("light-mode", !darkMode);
  }, [darkMode]);

  return (
    <button className="theme-switcher" onClick={toggleTheme} aria-label="Toggle theme">
      {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
};

export default ThemeSwitcher;