import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Chatbot from "./components/Chatbot";
import "./styles/theme.css";
import Cursor from "./components/Cursor";

function App() {
  return (
    <>
      <Cursor />
      <ThemeSwitcher />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Testimonials />
      <Contact />
      <Chatbot />
    </>
  );
}

export default App;