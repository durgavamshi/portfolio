import React, { useState, useEffect } from "react";
import "./../styles/hero.css";
import javascriptLogo from "../assets/images/javaScript.png";
import git from "../assets/images/git.jpg";
import mango from "../assets/images/MongoDB.png";
import python from "../assets/images/python.png";
import java from "../assets/images/java.png";
import html from "../assets/images/html.png";
import react from "../assets/images/react.png";
import node from "../assets/images/nodejs.jpg";
import cpp from "../assets/images/cpp.png";
import css from "../assets/images/css.png";
import resumePDF from "../assets/VAMSHI_RESUME.pdf";
import { FaDownload } from "react-icons/fa";

const Hero = () => {
  const words = ["Designer", "Coder", "Player"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    const bubble = document.querySelector(".cursor-bubble");
    const heroBtn = document.querySelector(".hero-btn");

    const moveBubble = (e) => {
      bubble.style.left = `${e.clientX}px`;
      bubble.style.top = `${e.clientY + 10}px`;
    };

    window.addEventListener("mousemove", moveBubble);
    bubble.style.opacity = "1";

    heroBtn.addEventListener("mouseenter", () => {
      bubble.classList.add("bubble-large");
    });

    heroBtn.addEventListener("mouseleave", () => {
      bubble.classList.remove("bubble-large");
    });

    return () => {
      window.removeEventListener("mousemove", moveBubble);
    };
  }, []);

  const images = [
    { id: 1, src: javascriptLogo, alt: "JavaScript" },
    { id: 2, src: python, alt: "Python" },
    { id: 3, src: react, alt: "React" },
    { id: 4, src: java, alt: "Java" },
    { id: 5, src: cpp, alt: "C++" },
    { id: 6, src: html, alt: "HTML" },
    { id: 7, src: css, alt: "CSS" },
    { id: 8, src: node, alt: "Node.js" },
    { id: 9, src: git, alt: "Git" },
    { id: 10, src: mango, alt: "MongoDB" },
    { id: 11, src: react, alt: "React" },
  ];

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = resumePDF;
    link.download = "Durga_Vamshi_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="hero" id="hero">
      <div className="cursor-bubble"></div>
      <div className="ripple-background"></div>

      <div className="hero-content">
        <h1 className="hero-title">
          Hello, I'm{" "}
          <span className="hero-name" style={{ "--index": 0 }}>
            Durga Vamshi
          </span>
          !
        </h1>
        <div className="hero-subtitle-wrapper">
          <span className="hero-subtitle">Creative</span>
          <span className="dynamic-word">{words[currentWordIndex]}</span>
        </div>
        <button className="hero-btn" onClick={handleDownloadResume}>
          <span>
            <FaDownload className="download-icon" /> Get Resume
          </span>
        </button>
      </div>

      <div className="orbits-wrapper">
        {Array.from({ length: 5 }).map((_, orbitIndex) => (
          <div key={orbitIndex} className={`orbit orbit-${orbitIndex + 1}`}>
            {images
              .slice(orbitIndex * 2, orbitIndex * 2 + 2)
              .map((image, itemIndex) => (
                <div
                  key={image.id}
                  className="orbit-item"
                  style={{
                    animationDuration: `${15 + orbitIndex * 5}s`,
                    animationDelay: `${itemIndex * 1.5}s`,
                    left: `${itemIndex * 50}%`,
                  }}
                >
                  <img src={image.src} alt={image.alt} className="orbit-image" />
                </div>
              ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;