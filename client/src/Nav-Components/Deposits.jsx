import React, { useContext, useEffect, useState } from 'react'
import DepositsForm from '../Forms/DepositsForm'
import AuthContext from '../Context/AuthContext'
import { DataSubmission } from '../reusables/Requests'
import { TxtInputRequired } from '../reusables/components'

const Deposits = () => {

  let {user} = useContext(AuthContext)
  const [deposit, setDeposit] = useState(false)
  const [deposits, setDeposits] = useState([])
  const [depositsDisplayed, setDepositsDisplayed] = useState([])
  const [filter, setFilter] = useState('')

  const fetchData = async () => {
    const accountNumber = user.username
    var res = await DataSubmission('POST', '/payment-api/all-deposits/', { 'account_number': accountNumber })
    if (res[0].res.data) {
      setDeposits(res[0].res.data)
      setDepositsDisplayed(res[0].res.data)
    }
  }

  useEffect(() => {
    fetchData()
  },
    [deposit]
  )

  //golobal filter functionality
  useEffect(() => {
    setDepositsDisplayed(deposits)
    if (filter.length === 0) {
      setDepositsDisplayed(deposits)
    } else {
      setDepositsDisplayed(deposits.filter(
        trans => {
          return (
            trans.account.account_number.toString().toLowerCase().includes(filter.toLowerCase()) ||
            trans.reference_number.toString().toLowerCase().includes(filter.toLowerCase())
          )
        }
      ))
    }
  }, [filter])

  return (
    <div className='w-full h-full bg-green-500 rounded-lg'>
      <DepositsForm deposit={deposit} setDeposit={setDeposit} user={user} />
      <div className='w-full mt-0 bg-green-600 h-[8%] text-center text-white font-bold text-2xl'>
        Deposits
      </div>

      <div className='w-full h-[92%] px-5 py-5 gap-y-2'>
        <table className='w-full table-fixed top-0 h-[75%] text-white overflow-y-auto border-b-2 border-green-700 border-solid'>
          <thead className='sticky top-0'>
            <tr>
              <th>
                Date
              </th>
              <th>
                Reference Number
              </th>
              <th>
                Account Number
              </th>
              <th>
                Opening Balance
              </th>
              <th>
                Amount
              </th>
              <th>
                Closing Balance
              </th>
            </tr>
          </thead>
          <tbody className='overflow-y-scroll h-4'>
            {depositsDisplayed.length == 0 ?
              <tr>
                <td colSpan={6} className='text-center'>
                  No data available for preview
                </td>
              </tr>
              :
              <>
                {depositsDisplayed.map(transaction => {
                  return (
                    <tr>
                      <td className='text-center'>{transaction.date}</td>
                      <td className='text-center'>{transaction.reference_number}
                      </td>
                      <td className='text-center'>{transaction.account.account_number}</td>
                      <td className='text-center'>{transaction.currency === 'USD' ?
                        'USD' + transaction.usd_opening_balance
                        :
                        'ZIG' + transaction.zig_opening_balance}</td>
                      <td className='text-center'>{transaction.currency === 'USD' ?
                        'USD' + transaction.amount
                        :
                        'ZIG' + transaction.amount}</td>
                      <td className='text-center'>{transaction.currency === 'USD' ?
                        'USD' + transaction.usd_closing_balance
                        :
                        'ZIG' + transaction.zig_closing_balance}</td>
                    </tr>
                  )
                })}
              </>
            }
          </tbody>
        </table>

        <div className=' w-full h-[25%] py-4 px-4'>
          <TxtInputRequired
            label={'Search with Account Number./ Reference Number'}
            value={filter}
            setvalue={setFilter}
            type={'text'}
          />
          <button className='  w-40 bg-white rounded-md hover:rounded-3xl font-semibold' onClick={() => { setDeposit(!deposit) }}>
            Make Deposit
          </button>
        </div>
      </div>
    </div>
  )

}

export default Deposits