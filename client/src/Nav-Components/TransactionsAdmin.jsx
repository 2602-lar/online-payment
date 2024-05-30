import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../Context/AuthContext'
import { DataSubmission } from '../reusables/Requests'
import { TxtInputRequired } from '../reusables/components'

const TransactionsAdmin = () => {

  let { user } = useContext(AuthContext)
  const [deposit, setDeposit] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [filter, setFilter] = useState('')
  const [transactionDisplayed, setTransactionDisplayed] = useState([])

  const fetchData = async () => {
    const accountNumber = user.username
    var res = await DataSubmission('POST', '/payment-api/client-transactions/', { 'account_number': accountNumber })
    setTransactions(res[0].res.data)
  }

  useEffect(() => {
    fetchData()
  },
    []
  )

  //golobal filter functionality
  useEffect(() => {
    setTransactionDisplayed([])
    transactions.map(transaction => {
      if (filter.length === 0) {
        setTransactionDisplayed(transactions)
      } else {
        setTransactionDisplayed(transactions.filter(
          trans => {
            return (
              trans.reference_number.toString().toLowerCase().includes(filter.toLowerCase()) ||
              trans.recipient.account_owner.name.toString().toLowerCase().includes(filter.toLowerCase()) ||
              trans.recipient.account_owner.last_name.toString().toLowerCase().includes(filter.toLowerCase()) || 
              trans.sender.account_owner.name.toString().toLowerCase().includes(filter.toLowerCase()) || 
              trans.sender.account_owner.last_name.toString().toLowerCase().includes(filter.toLowerCase()) 
            )
          }
        ))
      }
    })
  }, [filter])

  return (
    <div className='w-full h-full bg-green-500 rounded-lg'>
      <div className='w-full mt-0 bg-green-600 h-[8%] text-center text-white font-bold text-2xl'>
        Transactions
      </div>

      <div className='w-full h-[75%] px-5 py-5 gap-y-2'>
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
                Reciever Account Name
              </th>
              <th>
                Sender Account Name
              </th>
              <th>
                Amount
              </th>
            </tr>
          </thead>
          <tbody className='overflow-y-scroll h-4'>
            {transactionDisplayed.length == 0 ?
              <tr>
                <td colSpan={6} className='text-center'>
                  No data available for preview
                </td>
              </tr>
              :
              <>
                {transactionDisplayed.map(transaction => {
                  return (
                    <tr>
                      <td className='text-center'>{transaction.date}</td>
                      <td className='text-center'>{transaction.reference_number}
                      </td>
                      <td className='text-center'>{
                        transaction.recipient.account_owner.name + " " + transaction.recipient.account_owner.last_name
                      }</td>
                      <td className='text-center'>{
                        transaction.sender.account_owner.name + " " + transaction.sender.account_owner.last_name
                      }</td>
                      <td className='text-center'>{transaction.currency === 'USD' ?
                        'USD' + transaction.amount
                        :
                        'ZIG' + transaction.amount}</td>
                    </tr>
                  )
                })}
              </>
            }
          </tbody>
        </table>

        <div className=' w-full h-[25%]  py-4 px-4'>
          <div className='  w-100  rounded-md hover:rounded-3xl font-semibold'>
            <TxtInputRequired
              label={'Search with Reference No./ Account Name'}
              value={filter}
              setvalue={setFilter}
              type={'text'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsAdmin