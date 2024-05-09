import React, { useState } from 'react'
import Payment from '../Forms/Payment'

const Transactions = () => {

  const[payment, setPayment] =useState(false)
  return (
    <div className='w-full h-full bg-green-500 rounded-lg'>
      <Payment payment={payment} setpayment={setPayment}/>
      <div className='w-full mt-0 bg-green-600 h-[8%] text-center text-white font-bold text-2xl'>
        Account Transactions
      </div>

      <div className='w-full h-[92%] px-5 py-5 gap-y-2'>
        <table className='w-full h-[88%] text-white border-2 border-green-700 border-solid'>
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
        </table>

        <div className=' w-full h-[12%] border-2 border-green-700 border-solid py-4 px-4'>
          <button className='  w-40 bg-white rounded-md hover:rounded-3xl font-semibold' onClick={() => {setPayment(!payment)}}>
            Make Payment
          </button>
        </div>
      </div>
    </div>
  )
}

export default Transactions