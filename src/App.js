
import Mockman from "mockman-js";
import './App.css';
import Home from "./pages/home/home";
import { Route, Routes } from "react-router-dom";
import Bookmarks from "./pages/bookmarks/bookmarks";
import Explore from "./pages/explore/explore";
import Profile from "./pages/profile/profile";
import Likedposts from "./pages/likedposts/likedposts";
import Login from "./pages/login/login";
import RequireAuth from "./components/auth/requireauth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/signup/signup";
import Landing from "./pages/landing/landing";
import PageNotFound from "./pages/pagenotfound/pagenotfound";

function App() {
  return (
    <div className="App">
      
       <div >
       <Routes>
        <Route path='/mockman' element={<Mockman />} />
        <Route path="/register" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route element={<RequireAuth />}>
        <Route path='/' element={<Home />} /> 
        <Route path='/bookmarks' element={<Bookmarks />} /> 
        <Route path='/likedposts' element={<Likedposts />} /> 
        <Route path='/profile/:username' element={<Profile />} /> 
        <Route path="/*" element={<PageNotFound />} />
        </Route>
        <Route path='/explore' element={<Explore />} /> 
        </Routes>
        <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
       </div>
     
       
      
      
    </div>
  );
}

export default App;
