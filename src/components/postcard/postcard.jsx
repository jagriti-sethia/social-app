import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./postcard.css";
import PostModal from '../postModal/postmodal';
import { DataContext } from "../../contexts/datacontext";
import { AuthContext } from "../../contexts/authcontext";
import { getPostDate } from "../../utils/getPostDate";
import { isFollowed } from "../../utils/isFollowed";
import { followUserHandler } from "../../utils/followUserHandler";
import { unfollowUserHandler } from "../../utils/unfollowUserHandler";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { deletePostHandler } from "../../utils/deletePostHandler";
import { likePostHandler } from "../../utils/likePostHandler";
import { dislikePostHandler } from "../../utils/dislikePostHandler";
import { removeFromBookmarkPostHandler } from "../../utils/removeFromBookmarkHandler";
import { addToBookmarkPostHandler } from "../../utils/bookmarkPostHandler";

const Postcard = ({ post }) => {

  const { _id, content, mediaURL, likes, comments, username, createdAt } = post;


  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { dataState, dataDispatch, darkMode } = useContext(DataContext);
  const { authState } = useContext(AuthContext);
  const domNode = useOutsideClick(() => setShowOptions(false));



  const editClickHandler = () => {
    setShowOptions(false);
    setShowEditModal(true);
  };

  const deleteClickHandler = () => {
    deletePostHandler(authState?.token, _id, dataDispatch);
    if (pathname === `/post/${_id}`) {
      setTimeout(() => {
        navigate("/");
        window.scroll({ top: 0, behavior: "smooth" });
      }, 2000);
    }
    setShowOptions((prev) => !prev);
  };

  const isliked = () =>
    likes?.likedBy?.filter(({ _id }) => _id === authState?.user?._id)
      ?.length !== 0;


      const isBookmarked = () =>
      dataState?.bookmarks?.filter((postId) => postId._id === _id)?.length !== 0;

      const bookmarkClickHandler = () => {
        if (isBookmarked()) {
          removeFromBookmarkPostHandler(authState?.token, _id, dataDispatch);
          toast.success("Removed from Bookmarks");
        } else {
          addToBookmarkPostHandler(authState?.token, _id, dataDispatch);
          toast.success("Added to Bookmarks");
        }
      };

  const userData = dataState?.users?.find(
    (user) => user?.username === username
  );

  const { pathname } = useLocation();


  return (
    <div>
      <div className={`postcard-main ${darkMode && "bgDarkmode"}`}>
        <div className="postcard-header">
          <div
            className="postcard-header-left"
            onClick={() => navigate(`/profile/${username}`)}

          >

            <img
              src={
                dataState?.users?.find((user) => user.username === username)
                  ?.profileAvatar ||
                "https://images.pexels.com/photos/6740748/pexels-photo-6740748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
              alt="avatar"
            />
            {/* <img
                            src={mediaURL}
                            alt="avatar"
                        /> */}
            <div>
              <h4>
                {dataState?.users?.find((user) => user.username === username)
                  ?.firstName}{"  "}{dataState?.users?.find((user) => user.username === username)
                    ?.lastName}</h4>
              <small>
                @{username}
                {" - "}
                <span>{getPostDate(createdAt)}</span>
              </small>
            </div>
          </div>
          <div className="edit-delete-icon" ref={domNode} >
            <i
              className="fa-solid fa-ellipsis"
              onClick={(e) => {
                e.stopPropagation();
                setShowOptions(!showOptions);
              }}
            ></i>
            {showOptions &&
              (username === authState?.user?.username ? (
                <div className="edit-delete-post-modal">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      editClickHandler();
                    }}
                  >
                    Edit
                  </div>
                  <hr />
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteClickHandler();
                    }}
                  >
                    Delete
                  </div>
                </div>
              ) : (
                <div className="edit-delete-post-modal">
                  <div
                    onClick={() => {
                      if (authState?.token) {
                        if (isFollowed(dataState?.users, userData._id)) {
                          unfollowUserHandler(
                            authState?.token,
                            userData?._id,
                            dataDispatch
                          );
                          setShowOptions(false);
                        } else {
                          followUserHandler(
                            authState?.token,
                            userData?._id,
                            dataDispatch
                          );
                          setShowOptions(false);
                        }
                      } else {
                        toast.error("Please login to follow");
                        navigate("/login");
                      }
                    }}
                  >
                    {isFollowed(dataState?.users, userData?._id)
                      ? "unFollow"
                      : "Follow"}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className='post-card-content'>
          <p>{content}</p>

          <div>
          {mediaURL && mediaURL.split("/")[4] === "image" ? (
          <img
            src={mediaURL}
            alt="post-pic"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        ) : (
          mediaURL && (
            <video
              controls
              onClick={(e) => e.stopPropagation()}
              src={mediaURL}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            ></video>
          )
        )}
          </div>

          <hr />
          <div className='postcard-buttons'>
            <div><i className={`${isliked() ? "fa-solid" : "fa-regular"} fa-heart`}
              onClick={() => {
                if (!authState?.token) {
                  toast.error("Please login to proceed!");
                } else {
                  isliked()
                    ? dislikePostHandler(authState?.token, _id, dataDispatch)
                    : likePostHandler(authState?.token, _id, dataDispatch);
                }
              }}>{likes?.likeCount}</i></div>
            <div>
              <i className="fa-regular fa-comment"></i></div>
            <div>  
            <i
            className={`${
              isBookmarked() ? "fa-solid" : "fa-regular"
            } fa-bookmark`}
            onClick={() => {
              if (!authState?.token) {
                toast.error("Please login to proceed!");
              } else {
                bookmarkClickHandler();
              }
            }}
          ></i></div>
            <div> <i className="fa-regular fa-share-from-square"></i></div>

          </div>
        </div>
      </div>
      {showEditModal && (
        <PostModal post={post} setShowEditModal={setShowEditModal} />
      )}
      </div>
  )
}

export default Postcard