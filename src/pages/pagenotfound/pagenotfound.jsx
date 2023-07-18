import React, { useContext } from "react";
import ErrorImage from "../../assets/404errorimage.jpg";
import { useNavigate } from "react-router-dom";
import "./pagenotfound.css";
import { DataContext } from "../../contexts/datacontext";

const PageNotFound = () => {
  const { darkMode } = useContext(DataContext);
  const navigate = useNavigate();
  document.title = "Page Not Found";
  return (
    <div className={`page-not-found-main ${darkMode && "bgDarkmode"}`}>
      <div className="page-not-found-page">
        <img src={ErrorImage} alt="page-not-found-img" />
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
};

export default PageNotFound;