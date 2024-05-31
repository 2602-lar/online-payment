import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../Context/AuthContext'
import WithdrawalsForm from '../Forms/WithdrawalsForm'
import { DataSubmission } from '../reusables/Requests'
import { TxtInputRequired } from '../reusables/components'

const Withdrawals = () => {

  let { user } = useContext(AuthContext)
  const [withdrawal, setWithdrawal] = useState(false)
  const [withdrawals, setWithdrawals] = useState([])
  const [withdrawalsDisplayed, setWithdrawalsDisplayed] = useState([])
  const [filter, setFilter] = useState('')

  const fetchData = async () => {
    const accountNumber = user.username
    var res = await DataSubmission('POST', '/payment-api/all-withdrawals/', { 'account_number': accountNumber })
    if (res[0].res.data) {
      setWithdrawals(res[0].res.data)
      setWithdrawalsDisplayed(res[0].res.data)
    }
  }

  useEffect(() => {
    fetchData()
  },
    [withdrawal]
  )

  //golobal filter functionality
  useEffect(() => {
    setWithdrawalsDisplayed(withdrawals)
    if (filter.length === 0) {
      setWithdrawalsDisplayed(withdrawals)
    } else {
      setWithdrawalsDisplayed(withdrawals.filter(
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
    <div className='w-full h-full bg-green-500 rounded-lg overflow-y-auto'>
      <WithdrawalsForm withdrawal={withdrawal} setWithdrawal={setWithdrawal} user={user} />
      <div className='w-full mt-0 bg-green-600 h-[8%] text-center text-white font-bold text-2xl'>
        Withdrawals
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
            {withdrawalsDisplayed.length == 0 ?
              <tr>
                <td colSpan={6} className='text-center'>
                  No data available for preview
                </td>
              </tr>
              :
              <>
                {withdrawalsDisplayed.map(transaction => {
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
          <button className='  w-40 bg-white rounded-md hover:rounded-3xl font-semibold' onClick={() => { setWithdrawal(!withdrawal) }}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  )
}
export default Withdrawals