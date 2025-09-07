import React, { useState, useEffect } from "react";
import "./../styles/navbar.css";
import logo from "./../assets/image.png";
import LoadingPage from "./Loading";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [targetPage, setTargetPage] = useState("");
  const [showEmailOptions, setShowEmailOptions] = useState(false);

  const toggleMenu = () => setIsActive(!isActive);
  const closeMenu = () => setIsActive(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (e, target) => {
    e.preventDefault();
    setIsLoading(true);
    setTargetPage(target);
    closeMenu();

    setTimeout(() => {
      setIsLoading(false);
      window.location.href = target;
    }, 2000);
  };

  const handleHireMeClick = () => {
    closeMenu();
    setShowEmailOptions(true);
  };

  const handleContactOption = (option) => {
    if (option === 'gmail') {
      const email = "durgavamshogokinapelli@gmail.com";
      const subject = "Job Opportunity";
      const body = "Hello, I would like to discuss a potential collaboration.";
      
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    } else if (option === 'whatsapp') {
      // Updated phone number with country code (India: 91)
      const phoneNumber = "918341764997"; // Added 91 country code
      const message = "Hello, I would like to discuss a potential collaboration.";
      
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }
    
    setShowEmailOptions(false);
  };

  const wrapLetters = (text) => {
    return text.split("").map((letter, index) => (
      <span key={index} className="letter" style={{ "--letter-index": index }}>
        {letter}
      </span>
    ));
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      {showEmailOptions && (
        <div className="email-modal-overlay">
          <div className="email-modal">
            <h3>Contact Options</h3>
            <p>How would you like to contact me?</p>
            <div className="email-options">
              <button onClick={() => handleContactOption('gmail')}>Open Gmail</button>
              <button onClick={() => handleContactOption('whatsapp')}>Open WhatsApp</button>
            </div>
            <button className="close-modal" onClick={() => setShowEmailOptions(false)}>Cancel</button>
          </div>
        </div>
      )}

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
            <a href="#certificates" onClick={(e) => handleNavigation(e, "#certificates")} data-text="Certificates">
              {wrapLetters("Certificates")}
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => handleNavigation(e, "#contact")} data-text="Contact">
              {wrapLetters("Contact")}
            </a>
          </li>
          <li className="hire-me-item">
            <button className="hire-me-btn" onClick={handleHireMeClick}>
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