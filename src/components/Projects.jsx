import React, { useEffect, useRef } from "react";
import "./../styles/projects.css";
import ecommerce from "../assets/images/facemask.png";
import pdf from "../assets/images/pdf.png";
import job from "../assets/images/wea.png";

const Projects = () => {
  const projectsRef = useRef(null);
  const projectCardsRef = useRef([]);

  const projectsData = [
    {
      title: "Face Mask Detection System",
      image: ecommerce,
      description: [
        "Hybrid deep learning model for automated face mask detection.",
        "Uses ResNet50 for feature extraction and SVM/Decision Trees for classification.",
        "Achieved over 99.6% accuracy on multiple datasets."
      ],
      technologies: ["Python", "TensorFlow", "ResNet50", "SVM", "OpenCV"],
      year: "2025",
      link: "https://github.com/durgavamshi/Facemask-Detection.git",
    },
    {
      title: "PDF to Audio Converter",
      image: pdf,
      description: [
        "Created a tool to convert PDF files to audio.",
        "Utilized Python for text extraction and TTS.",
        "User-friendly interface with Flask.",
      ],
      technologies: ["Python", "Flask", "PyPDF2"],
      year: "2023",
      link: "https://github.com/durgavamshi/pdf-audio-converter.git",
    },
    {
      title: "Weather Now",
      image: job,
      description: [
        "Developed a responsive weather application with real-time data.",
        "Integrated geolocation for local weather and search for global cities.",
        "Displayed forecasts, humidity, wind speed, and interactive maps."
      ],
      technologies: ["React.js", "Open-meto API", "CSS", "Geolocation API"],
      year: "2025",
      link: "https://weather-now-5sfd.vercel.app/",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (projectsRef.current) observer.observe(projectsRef.current);
    projectCardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      if (projectsRef.current) observer.unobserve(projectsRef.current);
      projectCardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <h2>Projects</h2>
      <p>Here are some of my recent works showcasing my skills and creativity.</p>
      <div className="project-grid">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="project-card"
            ref={(el) => (projectCardsRef.current[index] = el)}
          >
            <div className="project-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-content">
              <div className="project-meta">
                <span className="project-tech">{project.technologies.join(", ")}</span>
                <span className="project-year">{project.year}</span>
              </div>
              <h3>{project.title}</h3>
              <ul>
                {project.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <div className="project-button-container">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-project-btn">
                  View Project
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="view-all-btn">View All Projects</button>
    </section>
  );
};

export default Projects;