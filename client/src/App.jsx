// @ts-nocheck
import AdminClass from "components/AdminPage/AdminClass/AdminClass";
import AdminUser from "components/AdminPage/AdminUser/AdminUser";
import ExerciseManagement from "components/ClassManagementPage/ExerciseManagement/ExerciseManagement";
import ClassProfile from "components/ClassPage/ClassProfile/ClassProfile";
import EveryOne from "components/ClassPage/EveryOne/EveryOne";
import AboutUs from "components/HomePage/AboutUs/AboutUs";
import DeanBoard from "components/HomePage/DeanBoard/DeanBoard";
import Department from "components/HomePage/Department/Department";
import StudyPrograms from "components/HomePage/StudyPrograms/StudyPrograms";
import Admin from "pages/Admin/Admin";
import Chat from "pages/Chat/Chat";
import Class from "pages/Class/Class";
import ClassManagement from "pages/ClassManagement/ClassManagement";
import Error from "pages/Error/Error";
import Exercise from "pages/Exercise/Exercise";
import Home from "pages/Home/Home";
import Profile from "pages/Profile/Profile";
import SocialMedia from "pages/SocialMedia/SocialMedia";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from './pages/Auth/Auth.jsx';

function App() {
  const user = useSelector((state) => state.AuthReducer.authData)
  return (
    <div className="App">
      <div className="blur" style={{top: '-20%', right: '0'}}></div>
      <div className="blur" style={{top: '20%', left: '-20%'}}></div>
      <Routes>
        {/* Authentication */}
        <Route path = "/auth/" element = {user && user?.user.isAdmin ? <Navigate to = "../admin/"/> : user ? <Navigate to = "../home" /> : <Auth/>} />
        <Route  path = "/auth/resetPassword/:userEmail/:id/:token/" element = {user && user?.user.isAdmin ? <Navigate to = "../admin/"/> : user ? <Home/> : <Auth isReset={true}/> } />
        
        {/* Home Route */}
        <Route path = "/" element = { user && user.user.isAdmin ? <Navigate to = "admin/"/> : user ? <Navigate to = "home/"/> : <Navigate to = "auth" />}/>
        <Route path = "/home/"  element = {user ? <Home/> : <Navigate to = "../auth"/>} />
        <Route path = "/home/deanboard/"  element = {user ? <DeanBoard/> : <Navigate to = "../auth"/>} />
        <Route path = "/home/about/"  element = {user ? <AboutUs/> : <Navigate to = "../auth"/>} />
        <Route path = "/home/department/"  element = {user ? <Department/> : <Navigate to = "../auth"/>} />
        <Route path = "/home/studyprograms/"  element = {user ? <StudyPrograms/> : <Navigate to = "../auth"/>} />

        {/* Class Route */}
        <Route path = "/class/"  element = {(user && user.user.isAdmin) || (user && user.user.isTeacher) ? <ClassManagement/> : user ? <Class/> : <Navigate to = "../auth"/>} />
        <Route path = "/class/:id/"  element = {user ? <ClassProfile/> : <Navigate to = "../auth"/>} />
        <Route path = "/class/:id/everyone" element = {user ? <EveryOne/> : <Navigate to = "../auth"/>} />
        <Route path = "/classmanagement/:id/everyone" element = {user ? <EveryOne/> : <Navigate to = "../auth"/>} />
        <Route path = "/class/:id/exercise/:eid" element = {user ? <Exercise/> : <Navigate to = "../auth" />} />

        {/* Class Management for teacher and admin */}
        <Route path = "/classmanagement/:id" element = { (user && user.user.isTeacher) || (user && user.user.isAdmin) ? <ClassProfile/> : <Navigate to = "../auth"/> }/>
        <Route path = "/classmanagement/:id/exercise/:eid" element = { (user && user.user.isTeacher) || (user && user.user.isAdmin) ? <ExerciseManagement/> : <Navigate to = "../auth"/> }/>
        
        {/* Media Route */}
        <Route path = "/media/" element = {user ? <SocialMedia/> : <Navigate to = "../auth" />} />  
        <Route path = "/profile/:id/" element = {user ? <Profile/> : <Navigate to = "../auth"/>} />

        {/* Chat Route */}
        <Route path = "/chat/" element = {user ? <Chat/> : <Navigate to = "../auth"/>} />

        {/* User Route */}
        <Route path = "/admin" element = {user && user.user.isAdmin ? <Admin/> : <Navigate to = "../auth"/> } />
        <Route path = "/classmanagement" element = { (user && user.user.isTeacher) || (user && user.user.isAdmin) ? <ClassManagement/> : <Navigate to = "../auth"/> }/>

        {/* Admin Route */}
        <Route path = "/admin/users" element = {user && user.user.isAdmin ? <AdminUser/> : <Navigate to = "../auth"/> } />
        <Route path = "/admin/class" element = {user && user.user.isAdmin ? <AdminClass/> : <Navigate to = "../auth"/> } />
        <Route path = "/*" element={<Error/>} ></Route>
      </Routes>
    </div>

  );
}

export default App;
