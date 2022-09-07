// @ts-nocheck
import React from 'react'
import './ProfileSide.css'
import '../ProfileCard/ProfileCard.css'
import LogoSign from '../LogoSign/LogoSign.jsx'
import ProfileCard from '../ProfileCard/ProfileCard.jsx'
import FollowCard from '../FollowCard/FollowCard.jsx'
import { useSelector } from 'react-redux'

const ProfileSide = () => {
  const {user} = useSelector((state) => state.AuthReducer.authData)
  
  return (
    <div className="ProfileSide">
        <LogoSign/>
        <ProfileCard user={user} location={"homePage"}/>
        <FollowCard/>
    </div>
  )
}

export default ProfileSide