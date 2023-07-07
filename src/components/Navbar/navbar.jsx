import React, { useContext } from "react";
import "./navbar.css";
import logo from "../../assets/social.png";
import logo1 from "../../assets/social1.png";
import { AuthContext } from "../../contexts/authcontext";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/datacontext";

const Navbar = () => {
  const { authState } = useContext(AuthContext);
  const { dataState, darkMode, setDarkMode } = useContext(DataContext);

  const navigate = useNavigate();
  return (
    <div className={`navbar ${darkMode && "bgDarkmode"}`}>
      <nav>
        <div className="left-nav" onClick={() => navigate("/")}>
          <img src={darkMode?logo1:logo} alt="logo" />
          
        </div>
        <div className="right-nav">
            {/* //light-dark button// */}
            {darkMode ? (
            <i class="fa-solid fa-sun" onClick={() => setDarkMode(false)}></i>
          ) : (
            <i
              className="fa-solid fa-moon"
              onClick={() => setDarkMode(true)}
            ></i>
          )}

          {authState?.token && (
            <img
              onClick={() => {
                navigate(`/profile/${authState?.user?.username}`);
              }}
              src={
                dataState?.users?.find(
                  (user) => user._id === authState?.user?._id
                )?.profileAvatar
                //  ||
                // `https://res.cloudinary.com/dqlasoiaw/image/upload/v1686688962/tech-social/blank-profile-picture-973460_1280_d1qnjd.png`
              }
              alt="profile-pic"
            />
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;