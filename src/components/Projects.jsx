import React, { useEffect, useRef } from "react";
import "./../styles/projects.css";
import ecommerce from "../assets/images/ecom1.jpg";
import pdf from "../assets/images/ecom.jpg";
import job from "../assets/images/job.jpg";

const Projects = () => {
  const projectsRef = useRef(null);
  const projectCardsRef = useRef([]);

  const projectsData = [
    {
      title: "Ecommerce Website",
      image: ecommerce,
      description: [
        "Developed a fully responsive eCommerce platform.",
        "Integrated secure payment gateways like Razorpay.",
        "Built with React.js, Node.js, and MongoDB.",
      ],
      technologies: ["React.js", "Node.js", "MongoDB"],
      year: "2024",
      link: "https://github.com",
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
      link: "https://github.com",
    },
    {
      title: "Job Board Platform",
      image: job,
      description: [
        "Built a job listing site with search functionality.",
        "Implemented user authentication and profiles.",
        "Used React.js and Firebase for real-time updates.",
      ],
      technologies: ["React.js", "Firebase", "CSS"],
      year: "2024",
      link: "https://github.com",
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
              <span className="project-tech">{project.technologies.join(", ")}</span>
              <span className="project-year">{project.year}</span>
              <h3>{project.title}</h3>
              <ul>
                {project.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-project-btn">
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
      <button className="view-all-btn">View All Projects</button>
    </section>
  );
};

export default Projects;