import React, { useContext, useEffect, useState } from 'react'
import { Account } from '../Forms/Account'
import AuthContext from '../Context/AuthContext'
import { DataSubmission } from '../reusables/Requests'

const Profile = () => {
  const [register, setRegister] = useState(true)
  const [data, setData] = useState(null)
  let { user } = useContext(AuthContext)

  const getUser = async () => {
    var res = await DataSubmission(
      'POST',
      '/payment-api/madhiri/',
      { 'user_id': user.user_id }
    )

    if (res[1].resText === "Successfull") {
      setData(res[0].res.data[0])
    }
    console.log(res)
  }

  useEffect(
    () => {
      getUser()
    },
    [data]
  )

  console.log(data)
  return (
    <>
      {
        data ?
          <Account
            register={register}
            setRegister={setRegister}
            data={data}
          />
          :
          <></>
      }
    </>
  )
}

export default Profile