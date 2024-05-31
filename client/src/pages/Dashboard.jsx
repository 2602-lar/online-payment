import React, { useContext, useEffect, useState } from 'react'
import DashboardAdmin from './DashboardAdmin'
import AuthContext from '../Context/AuthContext'
import { DataSubmission } from '../reusables/Requests'

const Dashboard = () => {
  let { user } = useContext(AuthContext)
  const [accountStats, setAccountStats] = useState(null)
  const fetchData = async () => {
    const accountNumber = user.username
    var res = await DataSubmission('POST', '/payment-api/account-stats/', { 'account_number': accountNumber })
    if (res[0].res.data) {
      setAccountStats(res[0].res.data)
    }
  }

  useEffect(() => {
    fetchData()
  },
    []
  )

  return (
    <>
      {user.is_staff ?
        <DashboardAdmin />
        :
        <div className='w-[80%] h-[90%] bg-green-500 rounded-xl ml-[10%]'  >
          <div className='w-full mt-0 bg-green-600 h-[10%] text-center text-white font-bold text-2xl'>
            Mini Statement
          </div>
          <div className='mt-10 mx-10 overflow-y-auto text-white font-bold text-lg '>
            {accountStats ?
              <div>
                Balance ZIG : ZIG{accountStats.balance_zig} <br/>
                Balance USD : USD{accountStats.balance_usd}
              </div>
              :
              <div>loading... </div>}
          </div>
        </div>
      }
    </>
  )
}

export default Dashboard