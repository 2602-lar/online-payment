import React, { useContext, useState } from 'react'
import { TxtArea, TxtInput } from '../reusables/components'
import AuthContext from '../Context/AuthContext'
import { toast } from 'react-toastify'
import { DataSubmission } from '../reusables/Requests'

const ContactUs = () => {

  const [subject, setSubject] = useState('')
  const [query, setQuery] = useState('')
  let { user } = useContext(AuthContext)

  const submit = async () => {
    const currentDate = new Date()
    let date = currentDate.toJSON().slice(0, 10);
    let nDate = date.slice(0, 4) + '-' + date.slice(5, 7) + '-'
      + date.slice(8, 10)

    if (query.length == 0 || subject.length == 0) {
      toast.warning("Please provide both the subject and also the query")
    } else {
      var res = await DataSubmission(
        'POST',
        '/payment-api/message/',
        {
          'topic' : subject,
          'date' : nDate,
          'account' : user.username,
          'message' : query
        }
      )
      if(res[1].resText === 'Successfull'){
        toast.success("Query has been logged. Your issue will be resolved or Our team will contact you shortly")
      }
    }
    
  }
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

        <button className='w-20 h-10 bg-white rounded-md hover:rounded-3xl font-semibold' onClick={() =>{submit()}}>
          Submit
        </button>


      </div>
    </div>
  )
}

export default ContactUs