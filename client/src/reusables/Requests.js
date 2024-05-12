import axios from 'axios'
import { toast } from "react-toastify";

export const proxy = 'http://127.0.0.1:8000'
export const DataSubmission = async (method, endPoint, formData, caller) => {
  let response = []
  await axios({
    method: method,
    url: proxy + endPoint,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  }).then((res) => {
    response = [
      { res: res },
      { resText: 'Successfull' }
    ]
    console.log(response)

  }).catch((err) => {
    console.log(err)
    response = [
      { res: err },
      { resText: 'failed' }
    ]

    if (err.code === 'ERR_BAD_REQUEST') {
      var serverResponse = err.response.data
      Object.keys(serverResponse).map(
        key => {
          //toast.error(key + ' : ' + serverResponse[key])
        }
      )
    } else {
      toast.error('Check network status. If problem persists contact service provider.')
    }
  })
  return (
    response
  )
}