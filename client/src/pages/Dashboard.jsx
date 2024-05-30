import React, { useContext } from 'react'
import DashboardAdmin from './DashboardAdmin'
import AuthContext from '../Context/AuthContext'

const Dashboard = () => {
  let { user } = useContext(AuthContext)
  return (

    <>
      {user.isStaff ?
        <div>Dashboard</div>
        :
        <DashboardAdmin />
      }
    </>
  )
}

export default Dashboard