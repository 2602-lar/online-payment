import React, { useContext, useEffect, useState } from 'react'
import Account from '../Forms/Account'
import AuthContext from '../Context/AuthContext'
import { DataSubmission } from '../reusables/Requests'

const Profile = () => {
  const [register, setRegister] = useState(true)
  const [data, setData] = useState(null)
  let {user} = useContext(AuthContext)

  const getUser = async () => {
    var res = await DataSubmission(
      'POST',
      '/payments-api/madhiri/',
      {'user_id' : user.user_id}
    )
    console.log(res)
  }

  useEffect(
    () => {
      getUser()
    },
    []
  )

  return (
    <Account
      register={register}
      setRegister={setRegister}
      data = {data}
    />
  )
}

export default Profile