import React, { useContext, useState } from 'react'

import AuthContext from '../Context/AuthContext'
import { toast } from 'react-toastify'
import { DataSubmission } from '../reusables/Requests'
import { AiOutlineClose } from 'react-icons/ai'
import { SelectInput, TxtInput, TxtInputRequired } from '../reusables/components'

const DepositsForm = ({ deposit, setDeposit }) => {
    const [accountNumber, setAccountNumber] = useState('')
    const [reason, setReason] = useState('')
    const [amount, setAmount] = useState(0.0)
    const [currency, setCurrency] = useState('')
    let { user } = useContext(AuthContext)

    const currencyOptions = [
        { option: 'USD' },
        { option: 'ZIG' }
    ]

    const submit = async () => {
        const feedback = toast.loading('Processing Request...')
        if (accountNumber.length === 0 || currency.length === 0) {
            toast.update(feedback, { render: "Fill in all the details below", type: "warning", isLoading: false, autoClose: 4000 })
        } else if (amount <= 0) {
            toast.update(feedback, { render: "Amount can not be less than 1", type: "warning", isLoading: false, autoClose: 4000 })
        } else {
            toast.update(feedback, { render: "Validating transaction...", type: "warning", isLoading: true })
            var res = await DataSubmission(
                'POST',
                '/payment-api/account-verification-deposit/',
                {
                    'account_number': accountNumber,
                })
            if (res[1].resText === "Successfull") {
                if (res[0].res.data.message === 'all good') {
                    toast.update(feedback, { render: "Account Validation Complete", type: "success", isLoading: false, autoClose: 3000 })
                    let pin = prompt(
                        "Depositing : " + currency + amount + " into account " + accountNumber + ". Please provide password below to confirm withdrawal."
                    )
                    if (pin === null || pin === "") {
                        toast.warning("Transaction cancelled by user !")
                    } else {
                        const notice = toast.loading('Processing Deposit...')
                        const currentDate = new Date()
                        let date = currentDate.toJSON().slice(0, 10);
                        let nDate = date.slice(0, 4) + '-' + date.slice(5, 7) + '-'
                            + date.slice(8, 10)
                        var depositRes = await DataSubmission(
                            'POST',
                            '/payment-api/process-deposit/',
                            {
                                'username': user.username,
                                'account_number': accountNumber,
                                'amount': amount,
                                'currency': currency,
                                'password': pin,
                                'date': nDate,
                            })
                        if (depositRes[1].resText === "Successfull") {
                            if (depositRes[0].res.data.message === 'Deposit failed!. Incorrect pin provided') {
                                toast.update(notice, { render: depositRes[0].res.data.message, type: "error", isLoading: false, autoClose: 4000 })
                            } else {
                                if (depositRes[0].res.data.message === 'Funds deposited successfully.') {
                                    var type = 'success'
                                    setDeposit(!deposit)
                                } else {
                                    type = 'error'
                                }
                                toast.update(notice, { render: depositRes[0].res.data.message, type: type, isLoading: false, autoClose: 4000 })
                            }
                        }
                    }
                } else {
                    toast.update(feedback, { render: res[0].res.data.message, type: "error", isLoading: false, autoClose: 4000 })
                }
            } else {
                toast.update(feedback, { render: "Error! Please try again later", type: "error", isLoading: false, autoClose: 3000 })
            }
        }
    }
    return (
        <div
            className={deposit === true ?
                'fixed z-20 top-0 py-8 px-10 pb-2 left-0 w-full h-full bg-black/80  backdrop-blur-xl '
                :
                `hidden`}
        >
            <div className='h-80% w-60% rounded-lg bg-green-400'>
                <div className=' flex sticky pt-4 top-0 right-0 bg-green-600 backdrop-blur-sm h-[10%] w-full rounded-lg pr-2'>
                    <p className='text-white text-lg font-bold pl-4'>
                        Make Deposit
                    </p>

                    <AiOutlineClose className='text-white bg-red-600 rounded-sm text-2xl hover:bg-red-700 hover:rounded-xl  cursor-pointer ml-auto' onClick={() => { setDeposit(!deposit) }} />
                </div>
                <div className='h-[90%] w-full  rounded-lg grid  px-10 overflow-y-auto'>
                    <TxtInput
                        label={'Account Number'}
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
                    <div className='w-full col-span-full items-center p-8 border-t-2 border-green-800 border-solid'>
                        <button className='bg-gray-200 w-24 h-10 rounded-md hover:rounded-2xl' onClick={() => { submit() }}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DepositsForm