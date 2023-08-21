import React, { useState } from 'react'
import apiProvider from '../../services/apiProvider'

function Login() {

    const [errorStatus, setErrorStatus] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const [successStatus, setSuccessStatus] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")

    const [userObject, setUserObject] = useState({
        username: "",
        password: ""
    })

    const AlertComponent = ({type, msg, state}) => {
        return(
            <div onClick={()=>{ state(false) }} className={`transition shadow-md z-20 rounded p-[1%_2%] text-left h-auto w-auto cursor-pointer fixed right-[2.3%] bottom-[15%] block ${type === "1" 
                ? "hover:bg-green-300 bg-green-200 text-green-900"
                : "hover:bg-red-300 bg-red-200 text-red-900"
            }
            `}>
                <p className={`font-semibold`}>{type === "1" ? "Exitos" : "Error"}</p>
                <p className={`font-light`}>{msg !== "" ? msg : "Mensaje de prueba para creacion de plan"}</p>
            </div>
        )
    }

    return (
        <div className="relative flex h-screen flex-wrap justify-center items-center bg-gray-50">
            {successStatus && <AlertComponent state={setSuccessStatus} type={"1"} msg={successMessage} />}
            {errorStatus && <AlertComponent state={setErrorStatus} type={"2"} msg={errorMessage} />}
            <div className="h-full relative justify-center flex-col flex lg:w-1/2 md:w-1/2 sm:w-full p-40">
                <img className='my-0 mx-auto h-1/2 w-full object-contain' src="/images/logo.jpg" />
                <div className="mb-4">
                    <p className="input-label">{"Usuario"}</p>
                    <input placeholder={"Ingresa tu usuario"} value={userObject.username} onChange={(e)=>{ setUserObject({...userObject, username: e.target.value}) }} type="text" className="focus:border-blue-900 outline-none hover:border-blue-900 transition block relative rounded-md mb-4 border-2 border-blue-300 w-full p-2" />
                </div>
                <div className="mb-10">
                    <p className="input-label">{"Contraseña"}</p>
                    <input placeholder={"Ingresa tu contraseña"} value={userObject.password} onChange={(e)=>{ setUserObject({...userObject, password: e.target.value}) }} type="password" className="focus:border-blue-900 outline-none hover:border-blue-900 transition block relative rounded-md mb-4 border-2 border-blue-300 w-full p-2" />
                </div>
                <div onClick={()=>{ manageSesionLogin() }} className="transition cursor-pointer w-full relative block text-center rounded-md text-white py-3 bg-primary hover:bg-blue-900">Iniciar sesion</div>
            </div>
            <div className="h-full relative block lg:w-1/2 md:w-1/2 sm:w-full">
                <img className='w-full h-full' src="/images/img-login.jpg" />
            </div>
        </div>
    )

    async function manageSesionLogin(){
        
        const form_data = new FormData()
        let json = {
            Usuario: userObject.username,
            clave: userObject.password
        }
        let stringified = JSON.stringify(json)
        form_data.append('Data', stringified)

        apiProvider.getUserLogin(form_data).then((res)=>{
            setErrorStatus(false)
            console.log(res)
            if(res.status === 200){
                localStorage.setItem('token_api', res.data["token"]);
                localStorage.setItem('token', res.data["tokenSecurity"]);

                localStorage.setItem('IdEntidadOperador', res.data["idEntidadOperador"]);
                localStorage.setItem('IdEntidadVendedor', res.data["idEntidadVendedor"]);

                localStorage.setItem('idCorredor', res.data["idCorredor"]);

                localStorage.removeItem('activeLink');
                
                window.location.href = "/"
                //window.location.reload()
            }
        }).catch(function (e) {
            setErrorStatus(true)
            console.log(e)
            if (e.response) {
                let status = e.response.status
                if(status === 401){
                    setErrorMessage("No hay usuario registrados con estas credenciales")    
                }else{
                    setErrorMessage("Hubo un error, intentelo mas tarde")
                }
            }
        });
    }

}

export default Login