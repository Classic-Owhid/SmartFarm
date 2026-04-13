import React, { useRef } from "react";
import { FaArrowRight, FaChevronDown, FaCommentDots } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import CropRecent from "./CropRecent";
import FertilizerRecent from "./FertilizerRecent";
import DiseaseRecent from "./DiseaseRecent";
import "./CSS/HomePage.css";

const HomePage = () => {
  const recentRef = useRef(null);
  const navigate = useNavigate();

  const scrollToNextSection = () => {
    if (recentRef.current) {
      recentRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  const openChat = () => {
    navigate("/chat"); // navigate to chat page
  };

  return (
    <div className="home-container">
      <div className="intro-box">
        <h1>Welcome to SmartFarm</h1>
        <p>Empowering farmers through technology and innovation.</p>
      </div>

      <div className="discover-section">
        <Link to="/services" className="discover-link">
          <div className="circle-btn">
            <FaArrowRight className="arrow-icon" />
          </div>
          <span className="discover-text">DISCOVER MORE</span>
        </Link>
          {/* Floating Chat Icon */}
      <div className="chat-icon" onClick={openChat}>
        <FaCommentDots size={40} color="#fff" />
      </div>
        <div className="freecroprec">
          <Link to="/nfreecroprec">
          <button id="freecrop">🌽 Crop Recommendation</button>
          </Link>
        </div>
        <div className="tip1">
          <h3>Tips:</h3>
          <ul>
            <li>The crop recommendation is free.</li>
            <li>Login to use advanced features.</li>
            <li>Scroll down to study more.</li>
          </ul>
        </div>
      </div>

      <div className="homepagenews">
        <h2 id="news">---Explore More About The Following Section---</h2>
      </div>

      {/* Down arrow for scrolling */}
      <div className="scroll-down-arrow" onClick={scrollToNextSection}>
        <FaChevronDown className="down-arrow-icon" />
      </div>

      <div className="newsrecent">
        <div className="recent-section" ref={recentRef}>
          <CropRecent />
        </div>
        <div className="recentfertilizer-section" ref={recentRef}>
          <FertilizerRecent />
        </div>
        <div className="recentdisease-section" ref={recentRef}>
          <DiseaseRecent />
        </div>
      </div>

    
    </div>
  );
};

export default HomePage;
