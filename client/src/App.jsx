// @ts-nocheck
import Profile from "pages/Profile/Profile";
import Chat from "pages/Chat/Chat"
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from './pages/Auth/Auth.jsx';
import SocialMedia from "pages/SocialMedia/SocialMedia";
import Home from "pages/Home/Home";
import DeanBoard from "components/HomePage/DeanBoard/DeanBoard";
import AboutUs from "components/HomePage/AboutUs/AboutUs";
import Department from "components/HomePage/Department/Department";
import StudyPrograms from "components/HomePage/StudyPrograms/StudyPrograms";
import Class from "pages/Class/Class";
import ClassProfile from "components/ClassPage/ClassProfile/ClassProfile";

function App() {
  const user = useSelector((state) => state.AuthReducer.authData)

  return (
    <div className="App">
      <div className="blur" style={{top: '-20%', right: '0'}}></div>
      <div className="blur" style={{top: '20%', left: '-20%'}}></div>
      <Routes>
        <Route path = "/" element = {user ? <Navigate to = "home/"/> : <Navigate to = "auth" />}/>
        <Route path = "/home/"  element = {user ? <Home/> : <Navigate to = "../auth"/>} />
        <Route path = "/home/deanboard/"  element = {user ? <DeanBoard/> : <Navigate to = "../auth"/>} />
        <Route path = "/home/about/"  element = {user ? <AboutUs/> : <Navigate to = "../auth"/>} />
        <Route path = "/home/department/"  element = {user ? <Department/> : <Navigate to = "../auth"/>} />
        <Route path = "/home/studyprograms/"  element = {user ? <StudyPrograms/> : <Navigate to = "../auth"/>} />
        <Route path = "/class/"  element = {user ? <Class/> : <Navigate to = "../auth"/>} />
        <Route path = "/class/:id/"  element = {user ? <ClassProfile/> : <Navigate to = "../auth"/>} />
        <Route path = "/media/" element = {user ? <SocialMedia/> : <Navigate to = "../auth" />} />
        <Route path = "/media/" element = {user ? <SocialMedia/> : <Navigate to = "../auth" />} />
        <Route path = "/auth/" element = {user ? <Navigate to = "../home" /> : <Auth/>} />
        <Route path = "/profile/:id/" element = {user ? <Profile/> : <Navigate to = "../auth"/>} />
        <Route path = "/chat/" element = {user ? <Chat/> : <Navigate to = "../auth"/>} />
      </Routes>
    </div>



  );
}

export default App;
