import React ,{useContext,useState}from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import "./leftsidebar.css";
import { AuthContext } from "../../contexts/authcontext";
import { DataContext } from "../../contexts/datacontext";
import PostModal from '../postModal/postmodal';
const Leftsidebar = () => {
  const { userLogout } = useContext(AuthContext);
  const { authState } = useContext(AuthContext);
  const {  darkMode } = useContext(DataContext);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const navigate = useNavigate();
  const getActiveStyle = ({ isActive }) => ({
    color: isActive && "#f2f4f7",
    backgroundColor: isActive && "var(--primary-color)",
  });



  return (
    <>


      <div className={`column1 ${darkMode && "bgDarkmode"}`}>
        <div className={`left-sidebar  ${darkMode && "bgDarkmode"}`}>
          <NavLink to="/" className={`left-sidebar-items  ${darkMode && "bgDarkmode"}`} style={getActiveStyle }>
            <i className="fa-solid fa-house"></i> <span>Homeae</span>
          </NavLink>
          <NavLink
            to="/explore"
            className={`left-sidebar-items  ${darkMode && "bgDarkmode"}`}
            style={getActiveStyle}
          >
            <i className="fa-solid fa-compass"></i> <span>Explore</span>
          </NavLink>
          <NavLink
            to="/bookmarks"
            className={`left-sidebar-items  ${darkMode && "bgDarkmode"}`}
            style={getActiveStyle}
          >
            <i className="fa-solid fa-bookmark"></i> <span>Bookmarks</span>
          </NavLink>
          <NavLink
            to="/likedposts"
            className={`left-sidebar-items  ${darkMode && "bgDarkmode"}`}
            style={getActiveStyle}
          >
            <i className="fa-solid fa-heart"></i> <span>Liked Posts</span>
          </NavLink>
          <NavLink
           to={`/profile/${authState?.user?.username}`}
            className={`left-sidebar-items  ${darkMode && "bgDarkmode"}`}
            style={getActiveStyle}
          >
            <i className="fa-solid fa-user"></i> <span>Profile</span>
          </NavLink>
          {authState?.token ? (
          <p onClick={() => userLogout()} className={`left-sidebar-items  ${darkMode && "bgDarkmode"}`}>
            <i className="fa-solid fa-right-from-bracket"></i> <span>Logout</span>
          </p>
        ) : (
          <p onClick={() => navigate("/login")} className={`left-sidebar-items  ${darkMode && "bgDarkmode"}`}>
            <i className="fa-solid fa-right-to-bracket"></i> <span>Login</span>
          </p>
        )}
          <button
            className="create-post-btn"
          //   style={{ cursor: !authState?.token && "not-allowed" }}
          //   disabled={!authState?.token && true}
            onClick={() => setShowCreatePostModal((prev) => !prev)}
          >
            Create New Post
          </button>
        </div>
        {showCreatePostModal && (
        <PostModal
          setShowCreatePostModal={setShowCreatePostModal}
        />
      )}
      {/* <div className="edit-post-modal-container">
      {showCreatePostModal && (<PostModal/>)
      
      }
      </div> */}
     
      </div>

    </>
  )
}

export default Leftsidebar;