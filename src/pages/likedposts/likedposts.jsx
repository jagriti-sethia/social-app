import React , { useContext, useEffect, useState } from 'react';
import"./likedposts.css";
import Leftsidebar from "../../components/leftsidebar/leftsidebar";
import Navbar from '../../components/Navbar/navbar';
import Footer from '../footer/footer';
import Postcard from '../../components/postcard/postcard';
import { DataContext } from "../../contexts/datacontext";
import { AuthContext } from "../../contexts/authcontext";

const Likedposts = () => {

  document.title = "social-studio | Liked Posts";

  const { authState } = useContext(AuthContext);
  const { dataState , darkMode} = useContext(DataContext);
  const [postsLikedByUser, setPostsLikedByUser] = useState([]);

  useEffect(() => {
    setPostsLikedByUser(
      dataState?.posts?.filter((currPost) =>
        currPost.likes.likedBy.find(
          (currUser) => currUser.username === authState?.user?.username
        )
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataState?.posts]);


  return (
    <>
    <Navbar />
    <div className={`flex-container  ${darkMode && "bgDarkmode"}`}>
      <Leftsidebar />
      <div className={`column2 ${darkMode && "bgDarkmode"}`}>

      {postsLikedByUser?.length === 0 ? (
            <h3>No liked Posts Yet</h3>
          ) : (
            <>
              {postsLikedByUser?.map((post) => (
                <Postcard key={post._id} post={post} />
              ))}
            </>
          )}

       

      </div>
      {/*  */}
      <Footer />
    </div>

  </>
  )
}

export default Likedposts