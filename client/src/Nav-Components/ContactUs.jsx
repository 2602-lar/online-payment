import React, { useState } from 'react'
import { TxtArea, TxtInput } from '../reusables/components'

const ContactUs = () => {

  const [subject, setSubject] = useState('')
  const [query, setQuery] = useState('')
  return (
    <div className='w-[80%] h-[90%] bg-green-500 rounded-xl ml-[10%]'  >
      <div className='w-full mt-0 bg-green-600 h-[10%] text-center text-white font-bold text-2xl'>
        Queries
      </div>

      <div className='mt-10 mx-10'>
        <TxtInput
          label={'Subject'}
          type={'text'}
          value={subject}
          setvalue={setSubject}
        />
        <TxtArea
          label={'Query'}
          type={'password'}
          value={query}
          setvalue={setQuery}
          placeholder={'Any queries to do with transactions please specify transaction reference number'}
        />

        <button className='w-20 h-10 bg-white rounded-md hover:rounded-3xl font-semibold' onClick={''}>
          Submit
        </button>


      </div>
    </div>
  )
}

export default ContactUs