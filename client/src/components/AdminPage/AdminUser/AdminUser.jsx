import DirectChat from 'components/DirectChat/DirectChat'
import React from 'react'
import AdminSidebar from '../AdminSideBar/AdminSidebar'
import UserGrid from '../UserGrid/UserGrid'

const AdminUser = () => {
  return (
    <div className="admin">
      <AdminSidebar />
      <div className="admin-body">
        <div className="direct-side">
          <DirectChat />
        </div>
        <UserGrid/>
      </div>
    </div>
  )
}

export default AdminUser