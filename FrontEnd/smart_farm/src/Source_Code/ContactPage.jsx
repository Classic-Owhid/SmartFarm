// ContactPage.js
import React from "react";
import "./CSS/ContactPage.css";
import gmailLogo from "./Images/gmail.png";
import whatsappLogo from "./Images/whatsapp.png";
import fbLogo from "./Images/fb.png";

const ContactPage = () => {
  return (
    <div className="contact-container">
      <div className="contact-left"></div>
      <div className="contact-right">
        <h1>Contact Us</h1>
        <p>Phone: +977 9800000000</p>
        <div className="contact-icons">
          <div className="icon-wrapper">
           
          </div>
          <div className="icon-wrapper">
            <img src={whatsappLogo} alt="WhatsApp" />
            <span className="tooltip">Coming Soon</span>
          </div>
          <div className="icon-wrapper">
            <img src={fbLogo} alt="Facebook" />
            <span className="tooltip">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
