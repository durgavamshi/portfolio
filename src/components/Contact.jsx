import React from "react";
import "./../styles/contact.css";

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <h2 className="contact-title">Get in Touch</h2>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" className="contact-input" required />
        <input type="email" placeholder="Your Email" className="contact-input" required />
        <textarea placeholder="Your Message" className="contact-textarea" rows="5" required></textarea>
        <button type="submit" className="contact-button">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;