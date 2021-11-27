import type { NextPage } from 'next'
import FormData from 'form-data'
import { useState } from 'react'
import * as axios from 'axios'
const formdata = new FormData()
const Upload: NextPage = () => {
  const form=(file: any)=>{
    formdata.append('file', file)
    return formdata
  }
  const [done, setDone]=useState<boolean>(false)
  const [uploading, setUploading]=useState<boolean>(false)
  
  return (
    <div>
      <input type="file" id="profile_pic" name="file" onChange={async(data)=>{
        const file=data.target.files?data.target.files:null
        console.log(data.target.files)
        setUploading(true)
        await axios.default.post(`http://localhost:3003/account/${window.location.pathname.split('/')[1]}/newfile`,form(file), {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials:true
      } ).catch(err=>console.warn(err))
      setTimeout(()=>setDone(true), 1000)
      
      }}/>
      {
        
        // eslint-disable-next-line react/jsx-key
        done?[<div>done</div>, <button onClick={()=>window.location.reload()}>Upload Another?</button>]:uploading?<div>Uploading</div>:null
      }
    </div>

  )
}

export default Upload
