import React, { useState, useEffect } from "react";
import "./../styles/navbar.css";
import logo from "./../assets/logo.png";
import LoadingPage from "./Loading";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false); // For hamburger menu
  const [isScrolled, setIsScrolled] = useState(false); // For scroll effect
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [targetPage, setTargetPage] = useState(""); // For target page

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const closeMenu = () => {
    setIsActive(false); // Close the menu when a link or button is clicked
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = (e, target) => {
    e.preventDefault();
    setIsLoading(true);
    setTargetPage(target);
    closeMenu(); // Close the menu immediately on click

    setTimeout(() => {
      setIsLoading(false);
      window.location.href = target;
    }, 2000); // 2 seconds delay
  };

  const wrapLetters = (text) => {
    return text.split("").map((letter, index) => (
      <span
        key={index}
        className="letter"
        style={{ "--letter-index": index }}
      >
        {letter}
      </span>
    ));
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="logo">
          <img src={logo} alt="Durga's Portfolio Logo" />
        </div>
        <ul className={`nav-links ${isActive ? "active" : ""}`}>
          <li>
            <a href="#about" onClick={(e) => handleNavigation(e, "#about")} data-text="About">
              {wrapLetters("About")}
            </a>
          </li>
          <li>
            <a href="#projects" onClick={(e) => handleNavigation(e, "#projects")} data-text="Projects">
              {wrapLetters("Projects")}
            </a>
          </li>
          <li>
            <a href="#testimonials" onClick={(e) => handleNavigation(e, "#testimonials")} data-text="Testimonials">
              {wrapLetters("Testimonials")}
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => handleNavigation(e, "#contact")} data-text="Contact">
              {wrapLetters("Contact")}
            </a>
          </li>
          <li className="hire-me-item">
            <button className="hire-me-btn" onClick={closeMenu}>
              <span>Hire Me</span>
            </button>
          </li>
        </ul>
        <div className={`hamburger ${isActive ? "active" : ""}`} onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;