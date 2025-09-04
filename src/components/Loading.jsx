import React, { useState, useEffect } from "react";
import "./../styles/loading.css";

const LoadingPage = () => {
  const [isFading, setIsFading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2500); // Start fading after 2.5s

    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3300); // Remove after fade completes (2.5s + 0.8s transition)

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`loading-page ${isFading ? "fade-out" : ""}`}>
      <div className="loading-container">
        <h1 className="loading-text">LOADING</h1>
        <div className="bubble-effect"></div>
      </div>
    </div>
  );
};

export default LoadingPage;