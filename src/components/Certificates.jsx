import React, { useState, useEffect, useRef } from "react";
import "./../styles/certificates.css";
import certificate1 from "../assets/images/html2.png";
import certificate2 from "../assets/images/css2.jpg";
import certificate3 from "../assets/images/java2.jpg";
import certificate4 from "../assets/images/python2.jpg";

const Certificates = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('right');
  const [isPaused, setIsPaused] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const sectionRef = useRef(null);

  const certificatesData = [
    { image: certificate1 },
    { image: certificate2 },
    { image: certificate3 },
    { image: certificate4 },
  ];

  // Effect for certificate sliding
  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setDirection('right');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % certificatesData.length);
      }, 3000); // Slide every 3 seconds
    }
    return () => clearInterval(interval);
  }, [certificatesData.length, isPaused]);

  // Effect for triggering animations on scroll/visit
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setTriggerAnimation(true);
        } else {
          setTriggerAnimation(false);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleDotClick = (index) => {
    if (index !== currentIndex) {
      setDirection(index > currentIndex ? 'right' : 'left');
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? certificatesData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certificatesData.length);
  };

  return (
    <section id="certificates" className="dark-theme" ref={sectionRef}>
      <div className="certificates-header">
        <span
          className={`certificates-subtitle ${
            triggerAnimation ? "animate-from-top" : ""
          }`}
        >
          My Achievements
        </span>
        <h2
          className={`certificates-title ${
            triggerAnimation ? "animate-from-bottom" : ""
          }`}
        >
          Certificates
        </h2>
      </div>
      
      <div className="carousel-container">
        <button className="carousel-button prev" onClick={handlePrev}>
          &#8249;
        </button>
        
        <div
          className="certificates-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {certificatesData.map((certificate, index) => {
            let position = 'hidden';
            
            if (index === currentIndex) {
              position = 'active';
            } else if (
              (direction === 'right' && 
               index === (currentIndex - 1 + certificatesData.length) % certificatesData.length) ||
              (direction === 'left' && 
               index === (currentIndex + 1) % certificatesData.length)
            ) {
              position = direction === 'right' ? 'exit-left' : 'exit-right';
            }
            
            return (
              <div
                key={index}
                className={`certificate-card ${position}`}
              >
                <div className="certificate-image-container">
                  <img
                    src={certificate.image}
                    alt={`Certificate ${index + 1}`}
                    className="certificate-image"
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        <button className="carousel-button next" onClick={handleNext}>
          &#8250;
        </button>
      </div>
      
      <div className="dots-container">
        {certificatesData.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Certificates;