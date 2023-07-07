import React , { useContext, useState }from 'react'
import Leftsidebar from "../../components/leftsidebar/leftsidebar";
import Navbar from '../../components/Navbar/navbar';
import Footer from '../footer/footer';
import PostForm from '../../components/postform/postform';
import Postcard from '../../components/postcard/postcard';
import { DataContext } from "../../contexts/datacontext";
import { AuthContext } from "../../contexts/authcontext";
import {  getSortedPosts } from "../../utils/sortposts";
const Home = () => {
  document.title = "social-studio | Home";

  const { dataState } = useContext(DataContext);
  const { authState } = useContext(AuthContext);
  const { sortByOption,darkMode} = useContext(DataContext);

  


  const loggedInUser = dataState?.users?.find(
    ({ username }) => username === authState?.user?.username
  );

  const postsOfFollowed = dataState?.posts?.filter(
    (post) =>
      loggedInUser?.following?.some(
        ({ username }) => username === post.username
      ) || authState?.user?.username === post.username
  );
  const sortedPosts = getSortedPosts(postsOfFollowed, sortByOption);
console.log(sortedPosts);
  return (
    <>
      <Navbar />
      <div className={`flex-container  ${darkMode && "bgDarkmode"}`}>
        <Leftsidebar />
        <div className={`column2 ${darkMode && "bgDarkmode"}`}>

          

            <PostForm />
            { sortedPosts.map((post) => (
                  <Postcard key={post._id} post={post} />

                ))}

         

        </div>
        {/*  */}
        <Footer />
      </div>

    </>
  )
}

export default Home