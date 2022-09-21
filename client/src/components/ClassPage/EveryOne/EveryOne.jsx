import { getUserClass } from 'api/ClassRequest'
import FlashUserCard from 'components/FlashUserCard/FlashUserCard'
import SideBarMotion from 'components/SideBarMotion/SideBarMotion'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ClassHeader from '../ClassHeader/ClassHeader'
import "./EveryOne.css"

const EveryOne = () => {
  const params = useParams();
  const [listUsers, setListUsers] = useState([])
  useEffect(() => {
    const fetchUserInClass = async () => {
      try {
        const {data} = await getUserClass(params.id);
        setListUsers(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserInClass();
  }, [])

  return (
    <div className="sidebar-container">
      <SideBarMotion />
      <div className="sidebar-body">
        <ClassHeader />
        <div className="list-user-class">
          <div className="list-class-title">Teacher</div>
          <hr />
          <div className="list-card-user-class">
            {listUsers.map((user) => (
              <div key={user._id}>
                {user.isTeacher && <FlashUserCard user={user} />}
              </div>
            ))}
          </div>

          <div className="list-class-title">Student</div>
          <hr />
          <div className="list-card-user-class">
            {listUsers.map((user) => (
              <div key={user._id}>
                {!user.isTeacher && !user.isAdmin && <FlashUserCard user={user} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EveryOne