import React, { useContext, useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/authcontext";
import { DataContext } from "../../contexts/datacontext";

const Signup = () => {
  document.title = "social-studio | Signup";
  const navigate = useNavigate();

  const [isPasswordHide, setIsPasswordHide] = useState(true);
  const [isConfirmPasswordHide, setIsConfirmPasswordHide] = useState(true);

  const { userSignup } = useContext(AuthContext);

  const { darkMode } = useContext(DataContext);

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileAvatar:
      "",
  });

  const signupHandler = (e) => {
    e.preventDefault();
    if (
      !userDetails?.firstName.trim() ||
      !userDetails?.lastName.trim() ||
      !userDetails?.username.trim() ||
      !userDetails?.email.trim() ||
      !userDetails?.password.trim() ||
      !userDetails?.confirmPassword.trim()
    ) {
      toast.error("Enter valid input!");
    } else if (userDetails?.password !== userDetails?.confirmPassword) {
      toast.error("Password & Confirm password should match!");
    } else {
      userSignup(userDetails);
    }
  };

  return (
    <div className={` signup-container ${darkMode && "bgDarkmode"}`} >
      <div className={`signup ${darkMode && "bgSecondaryDarkMode"}`} >
        <h2>Sign Up</h2>
        <form onSubmit={(e) => signupHandler(e)}>
          <div className="name">
            <div>
              <label for="first-name">
                First Name <span>*</span>
              </label>
              <input
                className={`${darkMode && "bgDarkmode"}`}
                id="first-name"
                placeholder="Test"
                required
                value={userDetails.firstName}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label for="last-name">
                Last Name <span>*</span>
              </label>
              <input
                className={`${darkMode && "bgDarkmode"}`}
                id="last-name"
                placeholder="Admin"
                required
                value={userDetails.lastName}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div>
            <label for="username">
              Username <span>*</span>
            </label>
            <input
              className={`${darkMode && "bgDarkmode"}`}
              id="username"
              placeholder="testadmin"
              required
              value={userDetails.username}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <label for="email">
              Email <span>*</span>
            </label>
            <input
              className={`${darkMode && "bgDarkmode"}`}
              id="email"
              placeholder="test@gmail.com"
              required
              type="email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <label for="password">
              Password <span>*</span>
            </label>
            <div className="password-wrapper">
              <input
                className={`${darkMode && "bgDarkmode"}`}
                id="password"
                type={isPasswordHide ? "password" : "text"}
                placeholder={isPasswordHide ? "********" : "Enter password"}
                minlength="4"
                maxlength="10"
                required
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              <span
                onClick={() =>
                  setIsPasswordHide((isPasswordHide) => !isPasswordHide)
                }
              >
                {isPasswordHide ? (
                  <i className="fa-regular fa-eye-slash"></i>
                ) : (
                  <i className="fa-regular fa-eye"></i>
                )}
              </span>
            </div>
          </div>

          <div>
            <label for="confirm-password">
              Confirm Password <span>*</span>
            </label>
            <div className="password-wrapper">
              <input
                className={`${darkMode && "bgDarkmode"}`}
                id="confirm-password"
                type={isConfirmPasswordHide ? "password" : "text"}
                placeholder={
                  isConfirmPasswordHide ? "********" : "Enter password"
                }
                required
                value={userDetails.confirmPassword}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
              />
              <span
                onClick={() =>
                  setIsConfirmPasswordHide(
                    (isConfirmPasswordHide) => !isConfirmPasswordHide
                  )
                }
              >
                {isConfirmPasswordHide ? (
                  <i className="fa-regular fa-eye-slash"></i>
                ) : (
                  <i className="fa-regular fa-eye"></i>
                )}
              </span>
            </div>
          </div>

          <button type="submit" className="signup-button">
            Signup
          </button>
        </form>

        <p onClick={() => navigate("/login")}>
          Already have an account <i className="fa-solid fa-angle-right"></i>
        </p>
      </div>
    </div>
  );
};

export default Signup;