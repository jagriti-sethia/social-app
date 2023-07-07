import React , { useContext } from 'react';
import"./bookmarks.css";
import Leftsidebar from "../../components/leftsidebar/leftsidebar";
import Navbar from '../../components/Navbar/navbar';
import Footer from '../footer/footer';
import Postcard from '../../components/postcard/postcard';
import { DataContext } from "../../contexts/datacontext";
import { AuthContext } from "../../contexts/authcontext";

const Bookmarks = () => {

  document.title = "social-studio | Bookmarks";

  const { dataState ,darkMode } = useContext(DataContext);
 


  const getBookmarkPosts = (postId) =>
  dataState?.posts?.filter((post) => post._id === postId)[0];





  return (
    <>
    <Navbar />
    <div className={`flex-container  ${darkMode && "bgDarkmode"}`}>
      <Leftsidebar />
      <div className={`column2 ${darkMode && "bgDarkmode"}`}>

        <div >
        {dataState?.bookmarks?.length === 0 ? (
            <h3>No Bookmarks Yet</h3>
          ) : (
            dataState?.bookmarks.map((post) => (
              <Postcard key={post?._id} post={getBookmarkPosts(post?._id)} />
            ))
          )}

        </div>

      </div>
      {/*  */}
      <Footer />
    </div>

  </>
  );
};

export default Bookmarks;