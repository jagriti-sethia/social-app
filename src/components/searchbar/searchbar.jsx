import React, {  useState,useContext } from "react";
import "./searchbar.css";
import { DataContext } from "../../contexts/datacontext";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);

  const { dataState } = useContext(DataContext);

  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    setSearchInput(e.target.value);
    const filteredResults = dataState?.users?.filter(
      (user) =>
        user.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchedUsers(filteredResults);
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchedUsers([]);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Users"
          value={searchInput}
          onChange={inputChangeHandler}
        />
        {searchInput.trim().length === 0 ? (
          <i className="fa-solid fa-magnifying-glass"></i>
        ) : (
          <i className="fa-solid fa-xmark" onClick={clearSearch}></i>
        )}
      </div>
      <div className="search-main-container">
      {searchedUsers.length > 0 && searchInput.trim().length > 0 ? (
        <div className="searched-users-container">
          {searchedUsers?.map(
            ({ _id, firstName, lastName, username, profileAvatar }) => {
              return (
                <li key={_id} className="searched-user">
                  <div
                    className="searched-user-name-profile"
                    onClick={() => {
                      navigate(`/profile/${username}`);
                      clearSearch();
                    }}
                  >
                    <img
                      className="user-avatar"
                      src={
                        profileAvatar 
                      }
                      alt="avatar"
                    />
                    <div className="searchedUser-name">
                      <span>
                        {firstName} {lastName}
                      </span>
                      <small>@{username}</small>
                    </div>
                  </div>
                </li>
              );
            }
          )}
        </div>
      ) : (
        searchInput.trim().length > 0 && (
          <div className="searched-users-container">
            <p>User not found!</p>
          </div>
        )
      )}
      </div>
    </div>
  );
};

export default SearchBar;