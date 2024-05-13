import React, { useContext, useEffect, useState } from 'react'
import Payment from '../Forms/Payment'
import { DataSubmission } from '../reusables/Requests'
import AuthContext from '../Context/AuthContext'

const Transactions = () => {

  const [payment, setPayment] = useState(false)
  let { user } = useContext(AuthContext)
  const [transactions, setTransactions] = useState([])

  const fetchData = async () => {
    const accountNumber = user.username
    var res = await DataSubmission('POST', '/payment-api/client-transactions/', { 'account_number': accountNumber })
    setTransactions(res[0].res.data)
  }

  useEffect(() => {
    fetchData()
  },
    [payment]
  )
  return (
    <div className='w-full h-full bg-green-500 rounded-lg'>
      <Payment payment={payment} setpayment={setPayment} user={user} />
      <div className='w-full mt-0 bg-green-600 h-[8%] text-center text-white font-bold text-2xl'>
        Account Transactions
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
                Account Name
              </th>
              <th>
                Opening Balance
              </th>
              <th>
                Transaction Amount
              </th>
              <th>
                Closing Balance
              </th>
            </tr>
          </thead>
          <tbody className='overflow-y-scroll h-4'>
            {transactions.length == 0 ?
              <tr>
                <td colSpan={6} className='text-center'>
                  No data available for preview
                </td>
              </tr>
              :
              <>
                {transactions.map(transaction => {
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
          <button className='  w-40 bg-white rounded-md hover:rounded-3xl font-semibold' onClick={() => { setPayment(!payment) }}>
            Make Payment
          </button>
        </div>
      </div>
    </div>
  )
}

export default Transactions