import ClassManagementBody from 'components/ClassManagementPage/ClassManagementBody/ClassManagementBody'
import SideBarMotion from 'components/SideBarMotion/SideBarMotion'
import React from 'react'
import "./ClassManagement.css"

const ClassManagement = () => {
  return (
    <div className="class-management">
      <SideBarMotion/>
      <ClassManagementBody/>
    </div>
  )
}

export default ClassManagement