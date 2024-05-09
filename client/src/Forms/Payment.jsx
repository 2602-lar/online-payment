import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { SelectInput, TxtArea, TxtInput, TxtInputRequired } from '../reusables/components'

const Payment = ({ payment, setpayment }) => {

    const [accountNumber, setAccountNumber] = useState('')
    const [reason, setReason] = useState('')
    const [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('')

    const currencyOptions = [
        { option: 'USD' },
        { option: 'ZIG' }
    ]
    return (
        <div
            className={payment === true ?
                'fixed z-20 top-0 py-8 px-10 pb-2 left-0 w-full h-full bg-black/80  backdrop-blur-xl '
                :
                `hidden`}
        >
            <div className='h-80% w-60% rounded-lg bg-green-400'>
                <div className=' flex sticky pt-4 top-0 right-0 bg-green-600 backdrop-blur-sm h-[10%] w-full rounded-lg pr-2'>
                    <p className='text-white text-lg font-bold pl-4'>
                        Make Payment
                    </p>

                    <AiOutlineClose className='text-white bg-red-600 rounded-sm text-2xl hover:bg-red-700 hover:rounded-xl  cursor-pointer ml-auto' onClick={() => { setpayment(!payment) }} />
                </div>
                <div className='h-[90%] w-full  rounded-lg grid  px-10 overflow-y-auto'>
                    <TxtInputRequired
                        label={'Destination Account Number'}
                        value={accountNumber}
                        setvalue={setAccountNumber}
                        type={'text'}
                    />

                    <SelectInput
                        label={'Currency'}
                        options={currencyOptions}
                        value={currency}
                        setvalue={setCurrency}
                    />

                    <TxtInputRequired
                        label={'Amount'}
                        value={amount}
                        setvalue={setAmount}
                        type={'text'}
                    />

                    <TxtInputRequired
                        label={'Reason for payment'}
                        value={reason}
                        setvalue={setReason}
                        type={'text'}
                    />
                    <div className='w-full col-span-full items-center p-8 border-t-2 border-green-800 border-solid'>
                        <button className='bg-gray-200 w-24 h-10 rounded-md hover:rounded-2xl'>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Payment