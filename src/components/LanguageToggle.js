import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./LanguageToggle.scss"; // Import the SCSS file

const LanguageToggle = () => {
  const languages = ["Eng", "Rus"];
  const { t, i18n } = useTranslation("global");
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);

  const toggleLanguage = () => {
    setCurrentLanguageIndex((prevIndex) => (prevIndex + 1) % languages.length);
  };

  useEffect(() => {
    i18n.changeLanguage(languages[currentLanguageIndex].toLowerCase());
  }, [currentLanguageIndex]);

  return (
    <div className="toggle-container">
      <div style={{ position: "relative" }}>
        <div
          className="language-toggle"
          onClick={() => {
            toggleLanguage();
          }}
        >
          <span className="language-text">
            {languages[currentLanguageIndex]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LanguageToggle;
