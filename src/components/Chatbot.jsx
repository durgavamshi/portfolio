import React, { useState, useEffect, useRef } from "react";
import "./../styles/chatbot.css";
import chatbotGif from "../assets/images/chatbot.gif";
import { FaTrash, FaTimes, FaPaperPlane } from "react-icons/fa";
import resumePDF from "../assets/VAMSHI_RESUME.pdf";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  const githubLink = "https://github.com/durgavamshi";
  const linkedinLink = "https://linkedin.com/in/durga-vamshi-gokinapelli";

  // Function to handle resume download
  const handleResumeDownload = (e) => {
    if (e) e.preventDefault();
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Durga_Vamshi_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Check screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Detect keyboard open/close on mobile
  useEffect(() => {
    const handleFocus = () => {
      if (isMobile) {
        setIsKeyboardOpen(true);
      }
    };

    const handleBlur = () => {
      if (isMobile) {
        setIsKeyboardOpen(false);
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);
      inputElement.addEventListener('blur', handleBlur);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
        inputElement.removeEventListener('blur', handleBlur);
      }
    };
  }, [isMobile, isOpen]);

  useEffect(() => {
    if (isOpen && chatHistory.length === 0) {
      const welcomeMessage = {
        type: "bot",
        text: "👋 Hello! I'm Durga Vamshi's AI Assistant, powered by advanced AI technology. I can tell you about my skills, projects, education, or help with technical queries. What would you like to know?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setChatHistory([welcomeMessage]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsKeyboardOpen(false);
  };
  
  const clearChat = () => {
    setChatHistory([]);
    setIsTyping(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessageObj = {
      type: "user",
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setChatHistory((prev) => [...prev, userMessageObj]);
    setMessage("");
    setIsTyping(true);

    const botResponse = await getBotResponse(message);
    setTimeout(() => {
      setChatHistory((prev) => [...prev, { type: "bot", ...botResponse }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  // Enhanced predefined responses with more personalized options
  const predefinedResponses = {
    hi: "Hey there! I'm Durga Vamshi's AI assistant. I can tell you about my technical skills, projects, education, or experience. What would you like to know?",
    hello: "Hello! I'm here to showcase Durga Vamshi's profile. I can discuss skills, projects, education, or help with technical questions. Where should we start?",
    "who are you": "I'm an AI assistant representing Durga Vamshi Gokinapelli, a software developer with expertise in Java, Python, JavaScript, and web technologies. How can I assist you today?",
    help: "I can help you learn about Durga Vamshi's technical skills, projects, education background, certifications, and work experience. You can also ask me technical questions related to programming. What would you like to know?",
    "what can you do": "I can discuss Durga Vamshi's technical skills (Java, Python, React, etc.), projects (Face Mask Detection, PDF to Audio Converter), education, certifications, and answer programming-related questions. What interests you?",
    skills: "My technical skills include: Java, Python, C, JavaScript, React.js, HTML, CSS, MySQL, Git, and VS Code. I'm particularly experienced in building responsive web applications and optimizing code performance. Would you like details about any specific technology?",
    projects: `I've worked on several interesting projects:
    - <strong>Face Mask Detection System</strong> (2025): Built with Python, OpenCV, and Deep Learning using resnetv50 architecture. Achieved 95% accuracy and deployed on edge devices.
    - <strong>PDF to Audio Converter</strong> (2024): Developed with Python, Flask, gTTS, and PyPDF2. Converts PDF content to audio with secure file upload features.
    Which project would you like to know more about?`,
    contact: `You can reach Durga Vamshi at:
    - Email: <a href='mailto:durgavamshogokinapelli@gmail.com'>durgavamshogokinapelli@gmail.com</a>
    - Phone: +91 8341764997
    - <a href='${githubLink}' target='_blank'>GitHub</a>
    - <a href='${linkedinLink}' target='_blank'>LinkedIn</a>
    Feel free to connect for opportunities or technical discussions!`,
    education: `My educational background:
    - <strong>B.Tech in Computer Science and Engineering</strong> (2022-2025) from Nalla Narasimha Reddy Education Society, Hyderabad - CGPA: 8.5
    - <strong>Diploma in Electrical and Electronics Engineering</strong> (2019-2022) from Anubose Institute of Technology, Palwancha - CGPA: 9.5
    - <strong>SSC</strong> (2018-2019) from ZPSS School, Palwancha - CGPA: 8.5
    Would you like more details about any specific qualification?`,
    resume: `You can download my resume here: <a href="#" class="resume-download-link">Download Resume</a>. It contains detailed information about my skills, projects, and experience.`,
    experience: "I have hands-on experience through projects in software development, particularly in web applications and AI/ML implementations. My projects demonstrate practical application of technologies like Python, React, and various frameworks. Would you like to know about specific projects or technologies?",
    certifications: `I've earned several certifications:
    - Python for Data Science - NPTEL
    - HTML, CSS, JavaScript - Infosys Springboard
    - Generative AI - EAIESB & Sangam Software Solutions
    - Python Programming - DevTown
    - PG Diploma in Computer Applications - Govt. Certified
    Would you like details about any specific certification?`,
    "programming languages": "I'm proficient in Java, Python, C, and JavaScript. I use Java for backend development, Python for AI/ML projects and scripting, C for system-level programming, and JavaScript for frontend development with React. Which language would you like to discuss?",
    frameworks: "I have experience with React.js for building responsive user interfaces, Flask for Python backend development, and various AI/ML libraries like TensorFlow and OpenCV for computer vision projects.",
    database: "I'm experienced with MySQL for relational database management, including designing schemas, writing complex queries, and optimizing database performance for web applications.",
    tools: "I regularly use Git for version control, VS Code as my primary code editor, and various development tools for testing, debugging, and deployment.",
    bye: "Thank you for chatting! Feel free to reach out if you have more questions. Have a great day!",
    thanks: "You're welcome! I'm happy to help. Is there anything else you'd like to know about my skills or experience?",
    "thank you": "My pleasure! I'm here to help you learn more about my technical background. What else can I assist with?",
  };

  const getBotResponse = async (userMessage) => {
    const lowerMessage = userMessage.toLowerCase().trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Check for exact matches first
    if (predefinedResponses[lowerMessage]) {
      return { text: predefinedResponses[lowerMessage], timestamp };
    }

    // Check for partial matches with improved keyword detection
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return { text: response, timestamp };
      }
    }

    if (!lowerMessage) {
      return { text: "I didn't quite catch that. Could you please rephrase your question? I can tell you about my skills, projects, education, or experience.", timestamp };
    }

    // Enhanced keyword detection with better context understanding
    if (lowerMessage.includes("java") || lowerMessage.includes("java programming")) {
      return { text: "I have experience with Java for backend development. I've used it to build scalable applications and understand OOP principles, multithreading, and Java frameworks. Would you like to know more about my Java projects?", timestamp };
    } else if (lowerMessage.includes("python") || lowerMessage.includes("python programming")) {
      return { text: "Python is one of my strongest languages. I've used it for AI/ML projects like the Face Mask Detection System, web development with Flask, and various automation scripts. I'm also certified in Python for Data Science. What specifically would you like to know?", timestamp };
    } else if (lowerMessage.includes("javascript") || lowerMessage.includes("js")) {
      return { text: "I'm proficient in JavaScript and have used it with React.js to build responsive web applications. I understand modern ES6+ features, asynchronous programming, and DOM manipulation. Would you like to know about my web projects?", timestamp };
    } else if (lowerMessage.includes("react") || lowerMessage.includes("react.js")) {
      return { text: "I have experience with React.js for building interactive user interfaces. I understand components, hooks, state management, and integrating with backend APIs. I've used React in several projects to create responsive web applications.", timestamp };
    } else if (lowerMessage.includes("mask detection") || lowerMessage.includes("face mask")) {
      return { text: "The Face Mask Detection System is one of my significant projects. I built a real-time application using resnetv50. The model achieved 95% accuracy on test data through data augmentation and fine-tuning techniques. It was deployed on local edge devices for low-latency performance. Would you like technical details about the implementation?", timestamp };
    } else if (lowerMessage.includes("pdf") || lowerMessage.includes("audio converter") || lowerMessage.includes("text to speech")) {
      return { text: "The PDF to Audio Converter was a web application I developed using Flask. It converts PDF content into spoken audio using Google Text-to-Speech (gTTS). I implemented secure file upload functionality and basic natural language processing to enhance the audio output. The frontend was designed with HTML for simplicity and usability. Would you like to know more about the technical implementation?", timestamp };
    } else if (lowerMessage.includes("deep learning") || lowerMessage.includes("machine learning") || lowerMessage.includes("ai")) {
      return { text: "I have experience with deep learning and AI technologies, as demonstrated in my Face Mask Detection project. I'm familiar with TensorFlow, OpenCV, and computer vision concepts. I also have a certification in Generative AI. What specific AI/ML topic are you interested in?", timestamp };
    } else if (lowerMessage.includes("web development") || lowerMessage.includes("frontend") || lowerMessage.includes("backend")) {
      return { text: "I have full-stack web development skills. For frontend, I use HTML, CSS, JavaScript, and React.js. For backend, I work with Python/Flask and Java. I'm also experienced with MySQL databases. My projects include responsive web applications with real-time features. Would you like to know about a specific aspect of web development?", timestamp };
    } else if (lowerMessage.includes("certification") || lowerMessage.includes("certified")) {
      return { text: predefinedResponses.certifications, timestamp };
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("phone") || lowerMessage.includes("linkedin") || lowerMessage.includes("github")) {
      return { text: predefinedResponses.contact, timestamp };
    } else if (lowerMessage.includes("resume") || lowerMessage.includes("cv")) {
      return { 
        text: `You can download my resume here: <a href="#" class="resume-download-link">Download Resume</a>. It contains detailed information about my skills, projects, and experience.`, 
        timestamp 
      };
    } else if (lowerMessage.includes("education") || lowerMessage.includes("degree") || lowerMessage.includes("college") || lowerMessage.includes("school")) {
      return { text: predefinedResponses.education, timestamp };
    } else if (lowerMessage.includes("skill") || lowerMessage.includes("technology") || lowerMessage.includes("tech stack")) {
      return { text: predefinedResponses.skills, timestamp };
    } else if (lowerMessage.includes("project") || lowerMessage.includes("work") || lowerMessage.includes("portfolio")) {
      return { text: predefinedResponses.projects, timestamp };
    } else if (lowerMessage.includes("experience") || lowerMessage.includes("work experience")) {
      return { text: predefinedResponses.experience, timestamp };
    } else if (lowerMessage.includes("date") || lowerMessage.includes("time")) {
      const now = new Date();
      return { text: `It's ${now.toLocaleDateString()} at ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}. How can I help you with information about my skills or experience?`, timestamp };
    } else {
      // Improved fallback with suggestions
      return { text: `I'm not sure I understand "${userMessage}". I can tell you about my skills, projects, education, certifications, or experience. Try asking about:
      - My technical skills (Java, Python, React, etc.)
      - My projects (Face Mask Detection, PDF to Audio Converter)
      - My education background
      - My certifications
      - How to contact me`, timestamp };
    }
  };

  // Add event listeners for resume download links
  useEffect(() => {
    const handleResumeClick = (e) => {
      if (e.target.classList.contains('resume-download-link')) {
        e.preventDefault();
        handleResumeDownload();
      }
    };

    document.addEventListener('click', handleResumeClick);
    
    return () => {
      document.removeEventListener('click', handleResumeClick);
    };
  }, []);

  return (
    <div className={`chatbot-container ${isMobile ? 'mobile' : ''}`}>
      {/* Chat Icon */}
      {!isOpen && (
        <button className="chatbot-toggle" onClick={toggleChat} aria-label="Open chat">
          <img src={chatbotGif} alt="Chat Icon" className="chatbot-icon" />
        </button>
      )}

      {isOpen && (
        <div className={`chatbot-box ${isKeyboardOpen ? 'keyboard-open' : ''}`}>
          {/* Active Chat Window - Always shown when open */}
          <div className="chatbot-active">
            <div className="chatbot-header">
              <div className="header-profile">
                <div className="chatbot-logo-wrapper">
                  <img src={chatbotGif} alt="Chatbot Logo" className="chatbot-logo" />
                  <span className="online-dot"></span>
                </div>
                <h3>Durga's Assistant</h3>
              </div>
              <div className="header-actions">
                <button className="clear-btn" onClick={clearChat} aria-label="Clear chat"><FaTrash /></button>
                <button className="close-btn" onClick={toggleChat} aria-label="Close chat"><FaTimes /></button>
              </div>
            </div>
            <div className="chatbot-messages" ref={chatContainerRef}>
              {chatHistory.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                  <div className="message-content" dangerouslySetInnerHTML={{ __html: msg.text }} />
                  <span className="message-timestamp">{msg.timestamp}</span>
                </div>
              ))}
              {isTyping && (
                <div className="message bot typing">
                  <div className="message-content">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="chatbot-form">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about my skills, projects, or experience..."
                className="chatbot-input"
                disabled={isTyping}
              />
              <button
                type="submit"
                className="chatbot-send"
                disabled={isTyping || !message.trim()}
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;