import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { SelectInput, TxtArea, TxtInput, TxtInputRequired } from '../reusables/components'

const Account = ({ register, setRegister }) => {
    const [name, setName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [idNumber, setIdNumber] = useState('')
    const [gender, setGender] = useState('')
    const [maritalStatus, setMaritalStatus] = useState('')
    const [dob, setDob] = useState('')
    const [nationality, setNationality] = useState('')
    const [email, setEmail] = useState('')
    const [phoneHome, setPhoneHome] = useState('')
    const [phoneWork, setPhoneWork] = useState('')
    const [address, setAddress] = useState('')
    const [nokName, setNokName] = useState('')
    const [nokRelationship, setNokRelationship] = useState('')
    const [nokPhone, setNokPhone] = useState('')
    const [nokEmail, setNokEmail] = useState('')
    const [nokAddress, setNokAddress] = useState('')
    const [pin, setPin] = useState('')
    const [pinCon, setPinCon] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCon, setPasswordCon] = useState('')

    const genderOptions = [
        { option: 'male' },
        { option: 'female' }
    ]

    const maritalStatusOptions = [
        { option: 'Single' },
        { option: 'Married' },
        { option: 'Widow/Widower' },
        { option: 'Divorced' }
    ]

    const Sectionhead = ({ text }) => {
        return (
            <div className='py-2 col-span-full'>
                <div className='w-full h-8  bg-green-500 text-white text-md rounded-xl text-center font-semibold'>
                    {text}
                </div>
            </div>
        )
    }
    return (
        <div
            className={register === true ?
                'fixed z-20 top-0 py-8 px-10 pb-2 left-0 w-screen h-screen bg-green-200/50  backdrop-blur-sm '
                :
                `hidden`}
        >
            <div className='h-full w-full rounded-lg bg-green-400'>
                <div className=' flex sticky pt-4 top-0 right-0 bg-green-600 backdrop-blur-sm h-[10%] w-full rounded-lg pr-2'>
                    <p className='text-white text-lg font-bold pl-4'>
                        Account Registration
                    </p>

                    <AiOutlineClose className='text-white bg-red-600 rounded-sm text-2xl hover:bg-red-700 cursor-pointer ml-auto' onClick={() => { setRegister(!register) }} />
                </div>
                <div className='h-[90%] w-full  rounded-lg grid grid-cols-3 px-10 overflow-y-auto'>

                    <Sectionhead text={'Personal Details'} />
                    <TxtInputRequired
                        label={'Firstname'}
                        value={name}
                        setvalue={setName}
                        type={'text'}
                    />

                    <TxtInput
                        label={'Middle Name'}
                        value={middleName}
                        setvalue={setMiddleName}
                        type={'text'}
                    />

                    <TxtInputRequired
                        label={'Last Name'}
                        value={lastName}
                        setvalue={setLastName}
                        type={'text'}
                    />

                    <SelectInput
                        label={'Gender'}
                        options={genderOptions}
                        value={gender}
                        setvalue={setGender}
                    />

                    <TxtInputRequired
                        label={'Date of Birth'}
                        value={dob}
                        setvalue={setDob}
                        type={'date'}
                    />

                    <SelectInput
                        label={'Marital Status'}
                        options={maritalStatusOptions}
                        value={maritalStatus}
                        setvalue={setMaritalStatus}
                    />

                    <TxtInputRequired
                        label={'Nationality'}
                        value={nationality}
                        setvalue={setNationality}
                        type={'text'}
                    />

                    <TxtInputRequired
                        label={'Id number'}
                        value={idNumber}
                        setvalue={setIdNumber}
                        type={'text'}
                    />

                    <Sectionhead text={'Address and Contact Info'} />
                    <TxtInput
                        label={'Email'}
                        value={email}
                        setvalue={setEmail}
                        type={'email'}
                    />

                    <TxtInputRequired
                        label={'Mobile Phone'}
                        value={phoneHome}
                        setvalue={setPhoneHome}
                        type={'text'}
                    />

                    <TxtInput
                        label={'Office No.'}
                        value={phoneWork}
                        setvalue={setPhoneWork}
                        type={'text'}
                    />

                    <TxtArea
                        label={'Address'}
                        value={address}
                        setvalue={setAddress}
                        type={'text'}
                        placeholder={'house no, street name, location/suburb, city '}
                    />

                    <Sectionhead text={'Next of Kin'} />
                    <TxtInputRequired
                        label={'Fullname'}
                        value={nokName}
                        setvalue={setNokName}
                        type={'text'}
                    />

                    <TxtInputRequired
                        label={'Relationship'}
                        value={nokRelationship}
                        setvalue={setNokRelationship}
                        type={'text'}
                        placeholder={'e.g Father/mother'}
                    />

                    <TxtInputRequired
                        label={'Phone No.'}
                        value={nokPhone}
                        setvalue={setNokPhone}
                        type={'text'}
                    />

                    <TxtInput
                        label={'Email'}
                        value={nokEmail}
                        setvalue={setNokEmail}
                        type={'text'}
                    />

                    <TxtArea
                        label={'Address'}
                        value={nokAddress}
                        setvalue={setNokAddress}
                        type={'text'}
                        placeholder={'house no, street name, location/suburb, city '}
                    />

                    <Sectionhead text={'Account Setup'} />
                    <TxtInputRequired
                        label={'Pin'}
                        value={pin}
                        setvalue={setPin}
                        type={'password'}
                        placeholder={'XXXX'}
                    />

                    <TxtInputRequired
                        label={'Confirm Pin'}
                        value={pinCon}
                        setvalue={setPinCon}
                        type={'password'}
                        placeholder={'Enter pin again to confirm'}
                    />

                    <TxtInputRequired
                        label={'Recovery Password'}
                        value={password}
                        setvalue={setPassword}
                        type={'password'}
                        placeholder={'Allways remember this incase you forget the pin'}
                    />

                    <TxtInputRequired
                        label={'Confirm Password'}
                        value={passwordCon}
                        setvalue={setPasswordCon}
                        type={'password'}
                        placeholder={'Enter password again to confirm'}
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

export default Account