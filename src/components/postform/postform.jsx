import React, { useState, useContext } from "react";
import "./postform.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authcontext";
import { DataContext } from "../../contexts/datacontext";
import Picker from "emoji-picker-react";
import { toast } from "react-toastify";
import { uploadMedia } from "../../utils/uploadMedia";
import { createPostHandler } from "../../utils/createPostHandler";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const PostForm = () => {
  const { authState } = useContext(AuthContext);
  const { dataState, dataDispatch ,darkMode } = useContext(DataContext);
  const [postContent, setPostContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [media, setMedia] = useState(null);
  const navigate = useNavigate();

  const domNode = useOutsideClick(() => setShowEmojiPicker(false));


  const imageSelectHandler = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      Math.round(file.size / 1024000) > 1
        ? toast.error("File size should not be more than 1Mb")
        : setMedia(file);
    };
    input.click();
  };

  const videoSelectHandler = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      Math.round(file.size / 7168000) > 1
        ? toast.error("File size should not be more than 7Mb")
        : setMedia(file);
    };
    input.click();
  };

  const emojiClickHandler = (emojiObj) => {
    const emoji = emojiObj.emoji;
    const updatedContent = postContent + emoji;
    setPostContent(updatedContent);
    setShowEmojiPicker(false);
  };

  const postClickHandler = async () => {
    
    try {
      const response = (await uploadMedia(media));
      
      const res = createPostHandler(
        { content: postContent, mediaURL: response?.url, comments: [] },
        authState?.token,
        dataDispatch
      );
      
      toast.success("Added new post successfully!");
    } catch (e) {
      toast.error("Something went wrong, try again!");
    } finally {
      setPostContent("");
      setMedia(null);
    }
  };

  return (
    <div>
    <div className={`container  ${darkMode && "bgDarkmode"}`}>
        <div className={`headbox  ${darkMode && "bgDarkmode"}`}>
          <img onClick={() => {
            navigate(`/profile/${authState?.user?.username}`);
          }} 
          src={dataState?.users?.find((user) => user._id === authState?.user?._id)
            ?.profileAvatar} 
            alt="hello" 
            />
          <textarea value={postContent}
           className=   {`${darkMode && "bgDarkmode"}`}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Write something.." 
            ></textarea><br />
          <span class="close">&times;</span>
        </div>
        <hr />
        {media && (
        <div className="selected-image-container">
          {media.type.slice(0, 5) === "image" ? (
            <img src={URL.createObjectURL(media)} alt="Post-pic" />
          ) : media.type.slice(0, 5) === "video" ? (
            <video alt="Post-video">
              <source src={URL.createObjectURL(media)} />
            </video>
          ) : null}
          <button onClick={() => setMedia(null)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}
      {/* <div className="post-form-button-container">
        <div className="post-form-icons"> */}
          
         
        <div className="headbox" >
          <div ref={domNode}>
            <i className="fa-regular fa-face-smile" onClick={() => setShowEmojiPicker(!showEmojiPicker)}></i>
            {showEmojiPicker && (
              <div
                className="show-emoji-picker"
                onClick={(e) => e.stopPropagation()}
              >
                <Picker
                  onEmojiClick={emojiClickHandler}
                  width={300}
                  height={450}
                // theme={darkMode ? "dark" : "light"}
                />
              </div>
            )}
          </div>
          <div>
            <i className="fa-regular fa-image" onClick={imageSelectHandler}></i>
          </div>
          <div>
            <i
              className="fa-regular fa-file-video"
              onClick={videoSelectHandler}
            ></i>
            </div>
          <button   onClick={postClickHandler} className="create-post-btn1" > POST</button>
        </div>



      </div>
    </div>
  );
};
export default PostForm;