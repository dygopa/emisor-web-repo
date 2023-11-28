import React, { useEffect, useState } from 'react'
import { FiLoader } from 'react-icons/fi'
import apiProvider from '../services/apiProvider';

function ValidationComponent({children}) {

  const [loadedCheck, setLoadedCheck] = useState(false)

  async function checkIfSessionValid(){
    apiProvider.getCompanyEndPoint("").then((_v)=>{
      setLoadedCheck(true)
    }).catch((_e)=>{
      window.location.href = "/login"
    })
  }

  useEffect(() => {
    checkIfSessionValid()
  }, [])

  if(!loadedCheck) return(
    <div className='w-full h-screen bg-white flex flex-col justify-center items-center z-20 fixed overflow-hidden top-0 left-0'>
      <span className="animate-spin text-[2rem] text-primary">
        <FiLoader/>
      </span>
    </div>
  )

  return children
}

export default ValidationComponent