import React, { useState, useEffect, useRef } from "react";
import "./../styles/testimonials.css";
import testimonial1 from "../assets/images/me.jpg";
import testimonial2 from "../assets/images/me1.jpg";
import testimonial3 from "../assets/images/me3.png";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(false); // Trigger for re-animation
  const sectionRef = useRef(null);

  const testimonialsData = [
    {
      image: testimonial1,
      text: "Durga's work on our project was exceptional. His attention to detail and problem-solving skills are top-notch!",
      name: "John Doe",
      role: "Graphic Designer",
    },
    {
      image: testimonial2,
      text: "Working with Durga was a pleasure. He delivered a high-quality product on time and exceeded our expectations.",
      name: "Jane Smith",
      role: "Content Manager",
    },
    {
      image: testimonial3,
      text: "Durga's technical expertise and creativity brought our vision to life. Highly recommended!",
      name: "Alex Johnson",
      role: "Project Manager",
    },
    {
      image: testimonial1,
      text: "Durga brought incredible value to our team with his innovative solutions. A true professional!",
      name: "Emily Brown",
      role: "Marketing Lead",
    },
    {
      image: testimonial2,
      text: "The project was a success thanks to Durga's dedication and expertise. I look forward to working with him again!",
      name: "Michael Lee",
      role: "Product Manager",
    },
    {
      image: testimonial3,
      text: "Durga's ability to understand our needs and deliver beyond expectations was impressive. Fantastic work!",
      name: "Sarah Davis",
      role: "UX Designer",
    },
  ];

  // Effect for testimonial sliding
  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
          setIsAnimating(false);
        }, 1000);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [testimonialsData.length, isPaused]);

  // Effect for triggering animations on scroll/visit
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setTriggerAnimation(true); // Trigger animation when in view
        } else {
          setTriggerAnimation(false); // Reset when out of view
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
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

  const getVisibleTestimonials = () => {
    const firstIndex = currentIndex % testimonialsData.length;
    const secondIndex = (currentIndex + 1) % testimonialsData.length;
    return [testimonialsData[firstIndex], testimonialsData[secondIndex]];
  };

  const visibleTestimonials = getVisibleTestimonials();

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="dark-theme" ref={sectionRef}>
      <div className="testimonials-header">
        <span
          className={`testimonials-subtitle ${
            triggerAnimation ? "animate-from-top" : ""
          }`}
        >
          Clients Review
        </span>
        <h2
          className={`testimonials-title ${
            triggerAnimation ? "animate-from-bottom" : ""
          }`}
        >
          Testimonials
        </h2>
      </div>
      <div
        className="testimonials-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {visibleTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`testimonial-card ${
              index === 0
                ? isAnimating
                  ? "slide-out-left"
                  : "left"
                : isAnimating
                ? "move-to-left"
                : "right"
            }`}
          >
            <div className="testimonial-image-container">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="testimonial-image"
              />
            </div>
            <div className="testimonial-content">
              <div className="stars">★★★★★</div>
              <div className="testimonial-details">
                <h3
                  className={`testimonial-name ${
                    triggerAnimation ? "animate-from-left" : ""
                  }`}
                >
                  {testimonial.name}
                </h3>
                <span
                  className={`testimonial-role ${
                    triggerAnimation ? "animate-from-right" : ""
                  }`}
                >
                  {testimonial.role}
                </span>
                <p
                  className={`testimonial-text ${
                    triggerAnimation ? "animate-from-bottom" : ""
                  }`}
                >
                  "{testimonial.text}"
                </p>
                <div className="quote-icon">❞</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="dots-container">
        {testimonialsData.map((_, index) => (
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

export default Testimonials;