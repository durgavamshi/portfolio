import React, { useState } from "react";
import "./../styles/contact.css";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Your email address where messages should be sent
    const yourEmail = "durgavamshogokinapelli@gmail.com";
    
    // Subject line for the email
    const subject = `Message from ${formData.name || "Portfolio Visitor"}`;
    
    // Body of the email with the user's information
    const body = `
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
    `.trim();
    
    // Create the Gmail compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${yourEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open Gmail in a new tab
    window.open(gmailUrl, '_blank');
    
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      message: ""
    });
    
    // Show confirmation message
    alert("Thank you for your message!");
  };

  return (
    <section id="contact" className="contact">
      <h2 className="contact-title">Get in Touch</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name"
          placeholder="Your Name" 
          className="contact-input" 
          value={formData.name}
          onChange={handleChange}
          required 
        />
        <input 
          type="email" 
          name="email"
          placeholder="Your Email" 
          className="contact-input" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
        <textarea 
          name="message"
          placeholder="Your Message" 
          className="contact-textarea" 
          rows="5" 
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" className="contact-button">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;