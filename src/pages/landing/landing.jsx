import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import studio from "../../assets/socialstudio.webp";
import studio1 from "../../assets/socialstudio1.webp";
import "./landing.css";
import { DataContext } from "../../contexts/datacontext";

const Landing = () => {
  document.title = "tech-social";
  const navigate = useNavigate();

  const { darkMode } = useContext(DataContext);
  return (
    <div className={`landing-container ${darkMode && "bgDarkmode"}`}>
      <div className="landing-main">
        <img src={darkMode?studio1:studio} alt="header" className="header-image" />
        <div className="lending-right">
          <div className="landing-logo">
            {/* <img src={logoGif} alt="logo" /> */}
            <p>Social-studio</p>
          </div>
          <div className="landing-content">
            <p>
              <span>Follow</span>people around the world
            </p>
            <p>
              <span>Connect</span>with your friends
            </p>
            <p>
              <span>Share</span>Your thoughts
            </p>
          </div>
          <button className="join-now-btn" onClick={() => navigate("/signup")}>
            Join Now
          </button>
          <p className="login-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Log In</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;