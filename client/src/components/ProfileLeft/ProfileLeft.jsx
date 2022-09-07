import React from 'react'
import './ProfileLeft.css'
import LogoSign from '../LogoSign/LogoSign.jsx'
import InfoCard from '../InfoCard/InfoCard.jsx'
import FollowCard from '../FollowCard/FollowCard.jsx'

const ProfileLeft = () => {
  return (
    <div className="ProfileLeft">
      <LogoSign/>
      <InfoCard/>
      <FollowCard/>
    </div>
  )
}

export default ProfileLeft