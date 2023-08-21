import React, { useState, useEffect } from 'react'
import apiProvider from '../../services/apiProvider'
import { useLocation, useNavigate } from 'react-router-dom'

function ToEmmitPolicy() {
    
    let history = useNavigate()
    let data = useLocation()
    
    const [listOfInsurances, setListOfInsurances ] = useState([])
    const [listOfPlanByInsurances, setListOfPlanByInsurances] = useState([])
    
    const [loadingData, setLoadingData] = useState(false)
    const [loadedAPI, setLoadedAPI] = useState(false)

    const [searchObject, setSearchObject] = useState({})

    const formatListStandart = (propList, propValue, propValueText) => {
        let list = []

        list = [...propList].map((prv)=>({
            value: prv[propValue],
            valueText: prv[propValueText]
        }))

        return list
    }

    let images_logos = [
        "./images/logos/logo-assa.png",
        "./images/logos/logo-is.png",
        "./images/logos/logo-mapfre.png",
        "./images/logos/logo-ancon.png",
        "./images/logos/logo-acerta.jpg",
        "./images/logos/logo-sura.png",
        "./images/logos/logo-optima.png",
        "./images/logos/logo-fedpa.png",
        "./images/logos/logo-regionaldeseguros.png",
        "./images/logos/logo-banesco.png",
        "./images/logos/logo-segurosvivir.png",
    ]

    let listOfInputs = [
        {
            label: "Aseguradora",
            value: "idCompania",
            placeholder: "Seleccionar",
            typeOfInput: "text",
            listOfInput: formatListStandart(listOfInsurances, "idCompania", "nombreCompleto"),
            changesFunction: false,
            type: "select"
        }
    ]

    const [listOfData, setListOfData] = useState([])

    const CompanyComponent = ({data, index}) => {
        return(
            <div onClick={()=>{ setSearchObject({...searchObject, idCompania: data["idCompania"]}) }} className={`transition cursor-pointer w-full h-[35vh] overflow-hidden flex flex-col p-5 bg-white justify-center items-center rounded-md border border-blue-200 hover:shadow-none shadow-md gap-3`}>
                <div className='w-[10rem] h-[10rem] overflow-hidden relative'>
                    <img className='w-full h-full object-contain' src={images_logos[parseInt(index)]} />
                </div>
                <p className='font-semibold text-lg text-slate-900'>{data["nombreCompleto"]}</p>
            </div>
        )
    }

    const TableDataComponent = ({data, index}) => {
        
        const [showBenefits, setShowBenefits] = useState(false)

        return(
            <div className={`w-[30%] ${showBenefits ? "h-fit" : "h-[35vh]" } flex flex-col p-5 bg-white justify-between items-center rounded-md border border-blue-200 shadow-md`}>
                {showBenefits ? 
                <>
                    <p className="text-slate-500 text-xl">Beneficios</p>
                    <div className={`relative flex flex-wrap w-full justify-center items-center gap-3 ${showBenefits && 'py-3'}`}>
                        {data["beneficio"].length > 0 && 
                            data["beneficio"].map((b, i)=>
                                <span key={i} className='bg-white rounded text-center text-sm p-[0.4rem_1.5rem] text-primary font-semibold border border-primary'>{b["descripcion"]}</span>
                            )
                        }
                    </div>
                    <div onClick={()=>{setShowBenefits(false)}} className="bg-primary w-full h-fit py-3 rounded-md text-center text-white cursor-pointer">Regresar</div>
                </>
                : <>
                    <div className="relative text-center">
                        <p className="text-slate-500 text-xl">{data["descripcion"] !== "" ? data["descripcion"] : "-"}</p>
                        <p className="text-slate-500">{data["nombreCompleto"]} - {data["idPlan"]}</p>
                    </div>
                    <div className="relative text-center">
                        <p className="text-slate-500 text-md font-medium">Total plan</p>
                        <p className="text-primary text-2xl font-bold">${data["totalPlan"]}</p>
                    </div>
                    <div className="flex gap-2 w-full">
                        <div onClick={()=>{setShowBenefits(true)}} 
                        className="bg-slate-200 w-1/2 h-fit py-3 rounded-md text-sm text-center text-slate-800 cursor-pointer">Beneficios</div>
                        <div onClick={()=>{ history("/to-emmit-policy-register", {state: data}) }}  
                        className="bg-primary w-1/2 h-fit py-3 rounded-md text-sm text-center text-white cursor-pointer">Comprar</div>
                    </div>
                </>}
            </div>
        )
    }

    function chargeAPI(){
        apiProvider.getCompanyEndPoint("").then((res)=>{
            setListOfInsurances(res.data)
        }).catch((e)=>{
            console.log(e)
        })
        apiProvider.getPlanOpcionEndPoint("").then((res)=>{
            setListOfPlanByInsurances(res.data)
        }).catch((e)=>{
            console.log(e)
        })

        setLoadedAPI(true)
    }

    function chargePlansAPI(){
        setLoadingData(true)

        let concacQueryString = ""
        let listOfString = []

        for (const key in searchObject) {
            if (searchObject[key] !== '') {
                let queryString = `${key}=${searchObject[key]}`
                listOfString.push(queryString)
            }
        }
        
        if(listOfString.length > 0){
            concacQueryString = "?" + data.state + "&" + listOfString.join("&")
        }else{
            concacQueryString = "?" + data.state
        }
        console.log(concacQueryString)

        apiProvider.getPlanEndPoint(concacQueryString).then((res)=>{
            console.log(res.data)
            setListOfData([...res.data].sort((a, b) => b["idPlan"] - a["idPlan"] ))
            setLoadingData(false)
        }).catch((e)=>{
            console.log(e)
        })
    }

    useEffect(() => {
        chargePlansAPI()
    }, [searchObject])

    useEffect(() => {
        chargeAPI()
    }, loadedAPI)

    return (
        <div className="ml-[18%] w-[82%] relative block h-screen bg-gray-50 p-8">
            <p className='title-section text-blue-900 mb-6'>Planes por aseguradora</p>
            { searchObject["idCompania"] === undefined ? 
                <div className='w-full h-fit grid grid-cols-4 gap-5 justify-center items-center'>
                    {listOfInsurances.map((elem, i) => <CompanyComponent data={elem} index={i} key={i} />)}
                </div>
            : 
            <>
                <div className="my-3 relative flex flex-wrap items-end">
                    <div className="mb-3 mr-3 w-[25%]">
                        <p className="input-label">Aseguradora</p>
                        <select value={searchObject.idCompania} onChange={(e)=>{ setSearchObject({...searchObject, idCompania: e.target.value}) }} className="form-control">
                            <option value="">Seleccionar</option>
                            {listOfInsurances.map((type)=> <option value={type["idCompania"]}>{type["nombreCompleto"]}</option> )}
                        </select>
                    </div>
                </div>
                <p className='title-section text-blue-900'>Resultados</p>
                {listOfData.length > 0 ? 
                    <div className="flex justify-start items-center w-full flex-wrap gap-10 mt-5">
                        {listOfData.map((d, i)=><TableDataComponent index={i} data={d}/>)}
                    </div>
                    : 
                    <div className="text-center flex justify-center align-middle h-10 w-full">
                        <p className="font-light text-xl text-blue-700">{loadingData ? "Cargando datos..." : "No hay datos todavia"}</p>
                    </div>
                }
            </>
            }
        </div>
    )

}

export default ToEmmitPolicy