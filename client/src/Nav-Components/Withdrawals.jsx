import React, { useContext, useState } from 'react'
import AuthContext from '../Context/AuthContext'
import WithdrawalsForm from '../Forms/WithdrawalsForm'

const Withdrawals = () => {

  let { user } = useContext(AuthContext)
  const [withdrawal, setWithdrawal] = useState(false)
  const [deposits, setDeposits] = useState([])
  return (
    <div className='w-full h-full bg-green-500 rounded-lg'>
      <WithdrawalsForm withdrawal={withdrawal} setWithdrawal={setWithdrawal} user={user} />
      <div className='w-full mt-0 bg-green-600 h-[8%] text-center text-white font-bold text-2xl'>
        Withdrawals
      </div>

      <div className='w-full h-[92%] px-5 py-5 gap-y-2'>
        <table className='w-full table-fixed top-0 h-[88%] text-white border-2 border-green-700 border-solid'>
          <thead className='sticky top-0'>
            <tr>
              <th>
                Date
              </th>
              <th>
                Reference Number
              </th>
              <th>
                Account Name
              </th>
              <th>
                Currency
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
            {deposits.length == 0 ?
              <tr>
                <td colSpan={6} className='text-center'>
                  No data available for preview
                </td>
              </tr>
              :
              <>
                {deposits.map(transaction => {
                  return (
                    <tr>
                      <td className='text-center'>{transaction.date}</td>
                      <td className='text-center'>{transaction.reference_number}
                      </td>
                      <td className='text-center'>{transaction.recipient.account_owner.name + " " + transaction.recipient.account_owner.last_name}</td>
                      <td className='text-center'>{transaction.reason}</td>
                      <td className='text-center'>{transaction.currency === 'USD' ?
                        'USD' + transaction.sender_opening_balance
                        :
                        'ZIG' + transaction.sender_opening_balance}</td>
                      <td className='text-center'>{transaction.currency === 'USD' ?
                        'USD' + transaction.amount
                        :
                        'ZIG' + transaction.amount}</td>
                      <td className='text-center'>{transaction.currency === 'USD' ?
                        'USD' + transaction.sender_closing_balance
                        :
                        'ZIG' + transaction.sender_closing_balance}</td>
                    </tr>
                  )
                })}
              </>
            }
          </tbody>
        </table>

        <div className=' w-full h-[12%] border-2 border-green-700 border-solid py-4 px-4'>
          <button className='  w-40 bg-white rounded-md hover:rounded-3xl font-semibold' onClick={() => { setWithdrawal(!withdrawal) }}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  )
}
export default Withdrawals