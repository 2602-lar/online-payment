import React, { useContext, useState } from 'react'
import { NavTab, logo } from '../reusables/components'
import { Outlet } from 'react-router-dom'
import AuthContext from '../Context/AuthContext'

export const Home = () => {

    let { logoutUser, user } = useContext(AuthContext)
    const [headerText, setHeaderText] = useState('')

    
    console.log(user)
    return (
        <div className='fixed w-screen h-screen flex'>
            <div className='w-[20%] h-full bg-green-500 '>
                <div className='h-[30%] w-full text-center text-white text-3xl p-2'>
                    <img src={logo} alt='Zimbabwe Women Microfinance Bank' className='w-full h-full text-white text-3xl font-bold' />
                </div>
                <NavTab
                    label={'Dashboard'}
                    url={'/home'}
                    setValue={setHeaderText}
                />
                <NavTab
                    label={'Transactions'}
                    url={'/home/transactions'}
                    setValue={setHeaderText}
                />
                <NavTab
                    label={'Profile'}
                    url={'/home/profile'}
                    setValue={setHeaderText}
                />
                <NavTab
                    label={'Contact Us'}
                    url={'/home/contact-us'}
                    setValue={setHeaderText}
                />

                <div className='flex flex-col text-center self-center hover:cursor-pointer hover:border-t-4 border-t-2 border-gray-200 w-full' onClick={() => logoutUser()}>
                    <span className="w-full h-10  text-lg text-white font-semibold" >Logout</span>
                </div>

            </div>


            <div className='w-[80%] h-full bg-green-700'>
                <header className=' flex justify-between h-[9%] w-full bg-green-500 border-l-4 border-green-800 font-extrabold text-3xl text-white'>
                    <span className='ml-4 mt-2'>{headerText === '' ? 'ZWMB Online' : headerText}</span>
                    <span className='text-2xl mr-4 mt-2'>wellcome User</span>
                </header>
                <div className='h-[91%] w-full'>
                    <img src='home.jpg' alt='' className='w-full h-full' />
                    <div className='z-10 fixed h-[91%] w-[80%] bottom-0 right-0 backdrop-blur-sm py-5 px-5'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
