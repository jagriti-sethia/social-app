import React ,{useContext}from 'react';
import "./explore.css";
import Leftsidebar from "../../components/leftsidebar/leftsidebar";
import Navbar from '../../components/Navbar/navbar';
import Footer from '../footer/footer';
import Postcard from '../../components/postcard/postcard';
import { DataContext } from "../../contexts/datacontext";
import { getSortedPosts } from "../../utils/sortposts";
import InfiniteScroll from 'react-infinite-scroll-component';

const Explore = () => {
  document.title = "social-studio | Explore";

  const { dataState ,darkMode } = useContext(DataContext);

  const { sortByOption} = useContext(DataContext);

  const sortedPosts = getSortedPosts(dataState?.posts, sortByOption);
  return (
    <>
    <Navbar />
    <div className={`flex-container  ${darkMode && "bgDarkmode"}`}>
      <Leftsidebar />
      <div className={`column2 ${darkMode && "bgDarkmode"}`}>

        <div >
        {/* <InfiniteScroll dataLength={this.state.items.length} style={{ display: 'flex', flexDirection: 'column-reverse' }}> */}

        {sortedPosts?.map((post) => (
                  <Postcard key={post._id} post={post} />
                ))}
        {/* </InfiniteScroll> */}
      

        </div>

      </div>
      {/*  */}
      <Footer />
    </div>

  </>
  )
}

export default Explore