import React, { useContext } from "react";
import { DataContext } from "../../contexts/datacontext";
import { AuthContext } from "../../contexts/authcontext";
import "./suggesteduser.css";
import { useNavigate } from "react-router-dom";
import { followUserHandler } from "../../utils/followUserHandler";
import { unfollowUserHandler } from "../../utils/unfollowUserHandler";
import { toast } from "react-toastify";
import { isFollowed } from "../../utils/isFollowed";

const SuggestedUser = () => {
    const { dataState, dataDispatch ,darkMode} = useContext(DataContext);
  
    const { authState } = useContext(AuthContext);
  
    const userData = dataState?.users?.find(
      (user) => user.username === authState?.user?.username
    );
  
    const suggestedUsers = dataState?.users
      ?.filter((user) => user.username !== userData?.username)
      ?.filter(
        (eachUser) =>
          !userData?.following?.find(
            (data) => data.username === eachUser.username
          )
      );
  
    const navigate = useNavigate();
  
    return (
        < >
        
        <div className= {`${darkMode && "bgDarkmode"}`}>
      {/* {dataState.usersLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ClipLoader color="var(--primary-dark)" size={50} />
        </div>
      ) : ( */}
        <div className={`suggested-users-main ${darkMode && "bgDarkmode"}`}>
          {suggestedUsers?.length > 0 ? (
            suggestedUsers
              ?.splice(0, 3)
              ?.map(({ _id, firstName, lastName, username, profileAvatar }) => {
                return (
                  <li key={_id} className="suggested-user">
                    <div
                      className="suggested-user-name-profile"
                    //   onClick={() => {
                    //     navigate(`/profile/${username}`);
                    //   }}
                    >
                      <img
                        className="user-avatar"
                        src={
                          profileAvatar 
                        }
                        alt="avatar"
                      />
                      <div className="suggestedUser-name">
                        <span>
                          {firstName} {lastName}
                        </span>
                        <small>@{username}</small>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (authState?.token) {
                          if (isFollowed(dataState?.users, _id)) {
                            unfollowUserHandler(
                              authState?.token,
                              _id,
                              dataDispatch
                            );
                          } else {
                            followUserHandler(
                              authState?.token,
                              _id,
                              dataDispatch
                            );
                          }
                        } else {
                          toast.error("Please login to follow");
                          navigate("/login");
                        }
                      }}
                    >
                      {isFollowed(dataState?.users, _id)
                        ? "Following"
                        : "Follow"}

                        
                    </button>
                  </li>
                );
              })
          ) : (
            <p>No suggested user is present.</p>
          )}
        </div>
      {/* )} */}
    </div>
        
        </>
    )

}
export default SuggestedUser;

