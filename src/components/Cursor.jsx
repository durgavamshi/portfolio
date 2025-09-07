import React, { useEffect, useRef } from "react";
import "../styles/cursor.css";

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const updateCursor = (e) => {
      requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.left = `${e.clientX}px`;
          cursorRef.current.style.top = `${e.clientY}px`;
        }
      });
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  return (
    <div
      className="custom-cursor"
      ref={cursorRef}
    ></div>
  );
};

export default Cursor;