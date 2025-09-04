import React, { useState, useEffect, useRef } from "react";
import "./../styles/chatbot.css";
import chatbotGif from "../assets/images/chatbot1.gif";
import { FaHome, FaPhone, FaPaperPlane, FaArrowLeft, FaTrash } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  const resumeLink = "https://example.com/durga_vamshi_resume.pdf";
  const githubLink = "https://github.com/yourusername";
  const linkedinLink = "https://linkedin.com/in/yourusername";

  useEffect(() => {
    if (isOpen && !isChatActive && chatHistory.length === 0) {
      const welcomeMessage = {
        type: "bot",
        text: "👋 Hello! I’m Durga Vamshi’s AI Assistant, powered by xAI’s Grok 3 tech. I can dive into my skills, projects, education, or fetch real-time info. What’s on your mind?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setChatHistory([welcomeMessage]);
    }
  }, [isOpen, isChatActive]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  const toggleChat = () => setIsOpen(!isOpen);
  const startChat = () => setIsChatActive(true);
  const goBack = () => setIsChatActive(false);
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

  // Bot response logic (unchanged)
  const predefinedResponses = {
    hi: "Hey there! I’m Durga Vamshi’s AI, here to showcase my expertise or chat about tech. What’s up?",
    hello: "Hi! I’m your guide to Durga Vamshi’s world—skills, projects, and more. Where should we start?",
    "who are you": "I’m Grok 3, an AI built by xAI, customized to reflect Durga Vamshi’s profile. I can talk code, projects, or analyze stuff online. How can I assist?",
    help: "Need assistance? I can detail my skills, walk you through projects, share my resume, or even search the web. What do you need?",
    "what can you do": "I’m packed with features: explore my skills (React, Python, etc.), check out my projects (eCommerce, Job Board), grab my resume, analyze X posts, or get web insights. What’s your pick?",
    skills: "I’m skilled in JavaScript, Python, React, Java, C, HTML, CSS, MySQL, Git, and VS Code. Want a deep dive into one?",
    projects: "My projects include an eCommerce platform with real-time updates, a PDF-to-Audio converter, and a Job Board system. Which one piques your interest?",
    contact: `Reach me at <a href='mailto:durgavamshi3@email.com'>durgavamshi3@email.com</a> or +91 834176XXXX. Socials? <a href='${githubLink}' target='_blank'>GitHub</a>, <a href='${linkedinLink}' target='_blank'>LinkedIn</a>. Anything else?`,
    education: "I’ve got a B.Tech in Computer Science (CGPA: 8.4) from Nalla Narasimha Reddy Education Society and a Diploma in Electrical Engineering (CGPA: 9.5) from Anubose Institute. Curious about specifics?",
    resume: `Here’s my resume: <a href="${resumeLink}" target="_blank" rel="noopener noreferrer" download="Durga_Vamshi_Resume.pdf">Download Resume</a>. Want more details?`,
    bye: "Catch you later! I’m here anytime you need me. Take care!",
    thanks: "Happy to help! What’s next on your list?",
    "thank you": "No problem! I’m here to make things easy. What else can I do?",
    experience: "I’ve worked on real-world projects like an eCommerce site and a Job Board, plus internships in software development. Want details on a specific role?",
    hobbies: "Outside coding, I enjoy tinkering with electronics, reading tech blogs, and hiking. What about you?",
    "tell me a joke": "Why don’t skeletons fight each other? Because they don’t have the guts!",
    "what’s new": "I’m always learning! Recently, I’ve been exploring AI trends and optimizing my code. What’s new with you?",
    "favorite tech": "Tough choice, but I’d say React for its flexibility and Python for its power. What’s your favorite tech stack?",
    "why coding": "I love solving problems and building things from scratch—coding’s the perfect mix of logic and creativity. What drives you?",
    weather: "I can’t check the weather right now, but tell me your city, and I’ll simulate a forecast for you!",
    "your creator": "I’m Grok 3, crafted by the xAI team to assist and inform. Durga Vamshi tuned me to reflect his vibe. Cool, right?",
  };

  const getBotResponse = async (userMessage) => {
    const lowerMessage = userMessage.toLowerCase().trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    if (predefinedResponses[lowerMessage]) {
      return { text: predefinedResponses[lowerMessage], timestamp };
    }

    if (!lowerMessage) {
      return { text: "You didn’t say anything! Give me something to work with—what’s on your mind?", timestamp };
    }

    if (lowerMessage.includes("skill") || lowerMessage.includes("tech")) {
      return { text: "I’ve got a knack for React UIs, Python backends, and more. Pick a skill, and I’ll break it down for you!", timestamp };
    } else if (lowerMessage.includes("project") || lowerMessage.includes("work")) {
      return { text: "My projects? Think eCommerce with live updates, PDF-to-Audio magic, or a sleek Job Board. Which one do you want to unpack?", timestamp };
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("reach")) {
      return { text: `Email me at <a href='mailto:durgavamshi3@email.com'>durgavamshi3@email.com</a>, call +91 834176XXXX, or hit me up on <a href='${githubLink}' target='_blank'>GitHub</a> or <a href='${linkedinLink}' target='_blank'>LinkedIn</a>. What’s your preferred way to connect?`, timestamp };
    } else if (lowerMessage.includes("education") || lowerMessage.includes("study")) {
      return { text: "My B.Tech in CSE gave me coding chops, and my EEE Diploma taught me hardware tricks. Want to know about a course or achievement?", timestamp };
    } else if (lowerMessage.includes("date") || lowerMessage.includes("time")) {
      const now = new Date();
      return { text: `It’s ${now.toLocaleDateString()} at ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}. Time flies—how can I help you today?`, timestamp };
    } else if (lowerMessage.includes("analyze") && (lowerMessage.includes("x profile") || lowerMessage.includes("x post"))) {
      return await analyzeXContent(lowerMessage, timestamp);
    } else if (lowerMessage.includes("search") || lowerMessage.includes("find")) {
      const query = lowerMessage.split("search")[1] || lowerMessage.split("find")[1] || "tech trends";
      return await searchWeb(query.trim(), timestamp);
    } else if (lowerMessage.includes("generate image") || lowerMessage.includes("create image")) {
      return { text: "Image generation? Cool idea! Confirm with 'yes' and tell me what to draw (e.g., 'yes, a coding setup').", timestamp };
    } else if (lowerMessage.startsWith("yes") && chatHistory[chatHistory.length - 1]?.text.includes("generate image")) {
      return { text: "Image generation’s coming soon! For now, I can describe it—like a sleek React dashboard. What else can I do?", timestamp };
    } else if (lowerMessage.includes("death penalty") || lowerMessage.includes("deserve to die")) {
      return { text: "I’m an AI, not a judge—I can’t weigh in on that. How about we discuss ethics or switch gears to tech?", timestamp };
    } else if (lowerMessage.includes("portfolio")) {
      return { text: "My portfolio’s a mix of code and creativity—eCommerce, Job Board, PDF-to-Audio. Want a tour of one?", timestamp };
    } else if (lowerMessage.includes("future") || lowerMessage.includes("plans")) {
      return { text: "I’m eyeing AI-driven projects and mastering new frameworks. What’s your next big thing?", timestamp };
    } else if (lowerMessage.includes("advice") || lowerMessage.includes("tip")) {
      return { text: "For coding? Keep it clean and modular—DRY is your friend. What kind of advice are you after?", timestamp };
    } else if (lowerMessage.includes("fun fact")) {
      return { text: "Did you know Python was named after Monty Python, not the snake? What’s a fun fact you’ve got?", timestamp };
    } else {
      return { text: `Hmm, "${userMessage}" has me stumped. I can talk skills, projects, or search something up—where should we go from here?`, timestamp };
    }
  };

  const analyzeXContent = async (query, timestamp) => {
    if (query.includes("profile")) {
      return { text: "Analyzing an X profile... Imagine tech tweets and code snippets. Give me a username for a real breakdown!", timestamp };
    } else if (query.includes("post")) {
      return { text: "Checking an X post... It might be a hot take or a tutorial. Drop a link or ID for details!", timestamp };
    }
    return { text: "Specify an X profile or post, and I’ll dig in!", timestamp };
  };

  const searchWeb = async (query, timestamp) => {
    return { text: `Searching "${query}"... Picture blog posts, docs, or news—want me to narrow it down or dive deeper?`, timestamp };
  };

  return (
    <div className="chatbot-container">
      {/* Chat Icon */}
      <button className="chatbot-toggle" onClick={toggleChat}>
        {!isOpen ? (
          <img src={chatbotGif} alt="Chat Icon" className="chatbot-icon" />
        ) : (
          <span>×</span>
        )}
      </button>

      {isOpen && (
        <div className="chatbot-box">
          {!isChatActive ? (
            // Initial Welcome Window
            <div className="chatbot-welcome">
              <div className="welcome-message">
                <h3>👋 Hi, I’m Durga Vamshi’s AI</h3>
              </div>
              <button className="chatbot-cta" onClick={startChat}>
                Chat with us
              </button>
              <div className="chatbot-nav">
                <button className="nav-btn"><FaHome /></button>
                <button className="nav-btn" onClick={startChat}><FaPhone /></button>
              </div>
            </div>
          ) : (
            // Active Chat Window
            <div className="chatbot-active">
              <div className="chatbot-header">
                <button className="back-btn" onClick={goBack}><FaArrowLeft /></button>
                <div className="header-profile">
                  <div className="chatbot-logo-wrapper">
                    <img src={chatbotGif} alt="Chatbot Logo" className="chatbot-logo" />
                    <span className="online-dot"></span>
                  </div>
                  <h3>ChatBot</h3>
                </div>
                <div className="header-actions">
                  <button className="clear-btn" onClick={clearChat}><FaTrash /></button>
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
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="chatbot-input"
                  disabled={isTyping}
                  rows="1"
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit(e)}
                />
                <button type="submit" className="chatbot-send" disabled={isTyping}>
                  <FaPaperPlane />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;