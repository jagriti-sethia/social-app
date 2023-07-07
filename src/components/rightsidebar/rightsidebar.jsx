import React,{useContext}from "react";
import "./rightsidebar.css";

import { DataContext } from "../../contexts/datacontext";
import SuggestedUser from "../suggesteduser/suggesteduser";
import SearchBar from "../searchbar/searchbar";
import { sortOptions, getSortedPosts } from "../../utils/sortposts";

const Rightsidebar = () => {

  const { dataState,darkMode } = useContext(DataContext);
  const { sortByOption, setSortByOption } = useContext(DataContext);


 



  return (
    <div className={`column3 ${darkMode && "bgDarkmode"}`}>

       <div className={`right-sidebar ${darkMode && "bgDarkmode"}`}>
        <div className="headbox">
        <h3>{sortOptions[sortByOption]}</h3>
                <select onChange={(e) => setSortByOption(e.target.value)}>
                  {Object.keys(sortOptions).map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                  </select>
         
        </div>
        
      <SearchBar />

      <div className={`suggested-users${darkMode && "bgDarkmode"}`}>
        <h4>Suggestions for you</h4>
        <SuggestedUser />
      </div>
      </div>
    </div>
   
   
  );
};

export default Rightsidebar;