import React, { useEffect, useRef, useState } from "react";
import "./../styles/about.css";
import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn, FaInstagram, FaJava } from "react-icons/fa";
import { SiC, SiPython, SiMysql, SiReact, SiJavascript, SiHtml5, SiCss3, SiGit } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const About = () => {
  const aboutRef = useRef(null);
  const contentRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const contactInfoRef = useRef(null);
  const socialIconsRef = useRef(null);
  const verticalTextRef = useRef(null);
  const educationSkillsRef = useRef(null);
  const educationRef = useRef(null);
  const skillsRef = useRef(null);

  const [skillWidths, setSkillWidths] = useState({
    c: 0,
    python: 0,
    java: 0,
    mysql: 0,
    react: 0,
    javascript: 0,
    html: 0,
    css: 0,
    vscode: 0,
    git: 0,
  });

  useEffect(() => {
    const observerOptions = { threshold: [0.1, 0.3] };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          if (entry.target === skillsRef.current) {
            setSkillWidths({
              c: 85,
              python: 90,
              java: 80,
              mysql: 70,
              react: 60,
              javascript: 85,
              html: 90,
              css: 85,
              vscode: 80,
              git: 75,
            });
          }
        } else {
          entry.target.classList.remove("visible");
          if (entry.target === skillsRef.current) {
            setSkillWidths({
              c: 0,
              python: 0,
              java: 0,
              mysql: 0,
              react: 0,
              javascript: 0,
              html: 0,
              css: 0,
              vscode: 0,
              git: 0,
            });
          }
        }
      });
    }, observerOptions);

    const elements = [
      aboutRef,
      contentRef,
      headingRef,
      paragraphRef,
      contactInfoRef,
      socialIconsRef,
      verticalTextRef,
      educationSkillsRef,
      educationRef,
      skillsRef,
    ];

    elements.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      elements.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <>
      <section className="about" id="about" ref={aboutRef}>
        <div className="about-container">
          <div className="about-content" ref={contentRef}>
            <h2 ref={headingRef}>About Me</h2>
            <p ref={paragraphRef}>
              👋 Hi, I’m Durga Vamshi Gokinapelli, a passionate Web & Software Developer skilled in Java, Python, JavaScript, React.js, and MySQL. I love building responsive web apps, AI-powered projects, and scalable software solutions while constantly learning new technologies.
            </p>
            <div className="contact-info" ref={contactInfoRef}>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+91 8341764997</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>durgavamshogokinapelli@email.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🌐</span>
                <span>English, Hindi, Telugu</span>
              </div>
            </div>
            <div className="social-icons" ref={socialIconsRef}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon facebook">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon twitter">
                <FaTwitter />
              </a>
              <a href="https://github.com/durgavamshi" target="_blank" rel="noopener noreferrer" className="icon github">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/durga-vamshi/" target="_blank" rel="noopener noreferrer" className="icon linkedin">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
          <div className="vertical-text" ref={verticalTextRef}>
            DURGA VAMSHI
          </div>
        </div>
      </section>

      <section className="education-skills" id="education-skills" ref={educationSkillsRef}>
        <div className="education-skills-container">
          <div className="education-section" ref={educationRef}>
            <h3>Education</h3>
            <h4 className="education-heading">Academic Background</h4>
            <div className="education-item">
              <span className="education-year">2022 – 2025</span>
              <div className="education-details">
                <h5>Nalla Narasimha Reddy Education Society</h5>
                <p>B.Tech, Computer Science and Engineering – CGPA: 8.4</p>
                <p>Hyderabad, Telangana</p>
              </div>
            </div>
            <div className="education-item">
              <span className="education-year">2019 – 2022</span>
              <div className="education-details">
                <h5>Anubose Institute of Technology</h5>
                <p>Diploma, Electrical and Electronics Engineering – CGPA: 9.5</p>
                <p>Palwancha, Telangana</p>
              </div>
            </div>
          </div>

          <div className="skills-section" ref={skillsRef}>
            <h3>Technical Skills</h3>
            <div className="skill-item">
              <span className="skill-name">
                <span className="skill-icons">
                  <SiC title="C" />
                </span>
                C
              </span>
              <span className="skill-bar">
                <span className="skill-progress" style={{ width: `${skillWidths.c}%` }}></span>
              </span>
            </div>
            <div className="skill-item">
              <span className="skill-name">
                <span className="skill-icons">
                  <SiPython title="Python" />
                </span>
                Python
              </span>
              <span className="skill-bar">
                <span className="skill-progress" style={{ width: `${skillWidths.python}%` }}></span>
              </span>
            </div>
            <div className="skill-item">
              <span className="skill-name">
                <span className="skill-icons">
                  <FaJava title="Java" />
                </span>
                Java
              </span>
              <span className="skill-bar">
                <span className="skill-progress" style={{ width: `${skillWidths.java}%` }}></span>
              </span>
            </div>
            <div className="skill-item">
              <span className="skill-name">
                <span className="skill-icons">
                  <SiMysql title="MySQL" />
                </span>
                MySQL
              </span>
              <span className="skill-bar">
                <span className="skill-progress" style={{ width: `${skillWidths.mysql}%` }}></span>
              </span>
            </div>
            <div className="skill-item">
              <span className="skill-name">
                <span className="skill-icons">
                  <SiReact title="React.js" />
                </span>
                React.js
              </span>
              <span className="skill-bar">
                <span className="skill-progress" style={{ width: `${skillWidths.react}%` }}></span>
              </span>
            </div>
            <div className="skill-item">
              <span className="skill-name">
                <span className="skill-icons">
                  <SiJavascript title="JavaScript" />
                </span>
                JavaScript
              </span>
              <span className="skill-bar">
                <span className="skill-progress" style={{ width: `${skillWidths.javascript}%` }}></span>
              </span>
            </div>
            <div className="skill-item">
              <span className="skill-name">
                <span className="skill-icons">
                  <SiHtml5 title="HTML" />
                </span>
                HTML
              </span>
              <span className="skill-bar">
                <span className="skill-progress" style={{ width: `${skillWidths.html}%` }}></span>
              </span>
            </div>
            <div className="skill-item">
              <span className="skill-name">
                <span className="skill-icons">
                  <SiCss3 title="CSS" />
                </span>
                CSS
              </span>
              <span className="skill-bar">
                <span className="skill-progress" style={{ width: `${skillWidths.css}%` }}></span>
              </span>
            </div>
            <div className="skill-item">
              <span className="skill-name">
                <span className="skill-icons">
                  <VscVscode title="VS Code" />
                </span>
                VS Code
              </span>
              <span className="skill-bar">
                <span className="skill-progress" style={{ width: `${skillWidths.vscode}%` }}></span>
              </span>
            </div>
            <div className="skill-item">
              <span className="skill-name">
                <span className="skill-icons">
                  <SiGit title="Git" />
                </span>
                Git
              </span>
              <span className="skill-bar">
                <span className="skill-progress" style={{ width: `${skillWidths.git}%` }}></span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;