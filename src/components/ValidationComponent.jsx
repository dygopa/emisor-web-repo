import React, { useEffect, useState } from 'react'
import { FiLoader } from 'react-icons/fi'
import apiProvider from '../services/apiProvider';

function ValidationComponent({children, nameLink}) {

  const [loadedCheck, setLoadedCheck] = useState(false)

  const [permition, setPermition] = useState({})

  async function checkIfSessionValid(){
    apiProvider.getCompanyEndPoint("").then((_v)=>{
      setLoadedCheck(true)
    }).catch((_e)=>{
      window.location.href = "/login"
    })
  }


  useEffect(()=>{
    let object = localStorage.getItem("ja.sjson")
    setPermition(JSON.parse(object))
  },[])

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

  if(loadedCheck && permition[`${nameLink}`] === 2 ) return(
    <div className='w-full h-screen bg-white overflow-hidden block'>
    </div>
  )

  return children
}

export default ValidationComponent