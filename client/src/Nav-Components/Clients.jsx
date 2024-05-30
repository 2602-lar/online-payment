import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../Context/AuthContext'
import Account from '../Forms/Account'
import { DataSubmission } from '../reusables/Requests'
import { TxtInputRequired } from '../reusables/components'

const Clients = () => {

  let { user } = useContext(AuthContext)
  const [client, setClient] = useState(false)
  const [clients, setClients] = useState([])
  const [clientDisplayed, setClientDisplayed] = useState([])
  const [filter, setFilter] = useState('')

  const fetchData = async () => {
    const accountNumber = user.username
    var res = await DataSubmission('POST', '/payment-api/all-clients/', { 'account_number': accountNumber })
    if (res[0].res.data) {
      setClients(res[0].res.data)
      setClientDisplayed(res[0].res.data)
    }
  }

  useEffect(() => {
    fetchData()
  },
    []
  )

  //golobal filter functionality
  useEffect(() => {
    setClientDisplayed(clients)
    if (filter.length === 0) {
      setClientDisplayed(clients)
    } else {
      setClientDisplayed(clients.filter(
        trans => {
          return (
            trans.account_number.toString().toLowerCase().includes(filter.toLowerCase()) ||
            trans.account_owner.name.toString().toLowerCase().includes(filter.toLowerCase()) ||
            trans.account_owner.last_name.toString().toLowerCase().includes(filter.toLowerCase())
          )
        }
      ))
    }
  }, [filter])

  return (
    <div className='w-full h-full pb-4 bg-green-500 rounded-lg overflow-y-auto'>
      <Account
        register={client}
        setRegister={setClient}
      />
      <div className='w-full mt-0 bg-green-600 h-[8%] text-center text-white font-bold text-2xl'>
        Clients
      </div>

      <div className='w-full h-[92%] px-5 py-5 gap-y-2 '>
        <table className='w-full table-fixed top-0 h-[75%] text-white overflow-y-auto border-b-2 border-green-700 border-solid'>
          <thead className='sticky top-0'>
            <tr>
              <th>
                Full Name
              </th>
              <th>
                Account Number
              </th>
              <th>
                Balance ZIG
              </th>
              <th>
                Balance USD
              </th>
              <th>
                Contact Phone
              </th>
              <th>
                Contact Email
              </th>
            </tr>
          </thead>
          <tbody className='overflow-y-scroll h-4'>
            {clientDisplayed.length == 0 ?
              <tr>
                <td colSpan={6} className='text-center'>
                  No data available for preview
                </td>
              </tr>
              :
              <>
                {clientDisplayed.map(account_holder => {
                  return (
                    <tr>
                      <td className='text-center'>{
                        account_holder.account_owner.name + ' ' + account_holder.account_owner.last_name
                      }</td>
                      <td className='text-center'>{account_holder.account_number}</td>
                      <td className='text-center'>{'ZIG' + account_holder.balance_ZIG}</td>
                      <td className='text-center'>{'USD' + account_holder.balance_USD}</td>
                      <td className='text-center'>{account_holder.account_owner.phone_home}</td>
                      <td className='text-center'>{account_holder.account_owner.email}</td>
                    </tr>
                  )
                })}
              </>
            }
          </tbody>
        </table>
        <div className=' w-full h-[25%] py-4 px-4'>
          <TxtInputRequired
            label={'Search with Account Number./ Account Name'}
            value={filter}
            setvalue={setFilter}
            type={'text'}
          />
          <button className='  w-40 bg-white rounded-md hover:rounded-3xl font-semibold' onClick={() => { setClient(!client) }}>
            Add Client
          </button>
        </div>
      </div>
    </div>
  )
}

export default Clients