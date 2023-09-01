import React, { useState, useEffect, useMemo } from 'react'
import apiProvider from '../../services/apiProvider'
import { useLocation, useNavigate } from 'react-router-dom'
import {FiArrowDown, FiChevronDown, FiChevronUp, FiShield, FiStar} from "react-icons/fi"

function ToEmmitPolicy() {
    
    let history = useNavigate()
    let data = useLocation()
    
    const [listOfInsurances, setListOfInsurances ] = useState([])
    const [listOfPlanByInsurances, setListOfPlanByInsurances] = useState([])
    const [listOfPlans, setListOfPlans] = useState([])
    
    const [loadingData, setLoadingData] = useState(false)
    const [loadedAPI, setLoadedAPI] = useState(false)

    const [activeTypePlan, setActiveTypePlan] = useState("BASICO")

    const [searchObject, setSearchObject] = useState({})

    const formatListStandart = (propList, propValue, propValueText) => {
        let list = []

        list = [...propList].map((prv)=>({
            value: prv[propValue],
            valueText: prv[propValueText]
        }))

        return list
    }

    let type_of_plans = [
        {
            title: "Básico",
            value: "BASICO"
        },
        {
            title: "Intermedio",
            value: "INTERMEDIO"
        },
        {
            title: "Recomendado",
            value: "RECOMENDADO"
        },
    ]

    let images_logos = [
        "assa.png",
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
            <div onClick={()=>{ setSearchObject({...searchObject, idCompania: data["idCompania"]}) }} className={`transition cursor-pointer w-full h-[35vh] overflow-hidden flex flex-col p-5 bg-white justify-center items-center rounded-md border border-primary/40 hover:shadow-none shadow-md gap-3`}>
                <div className='w-[10rem] h-[10rem] overflow-hidden relative'>
                    <img className='w-full h-full object-contain' src={images_logos[parseInt(index)]} />
                </div>
                <p className='font-semibold text-lg text-slate-900'>{data["nombreCompleto"]}</p>
            </div>
        )
    }

    const CardComponent = ({data, index}) => {
        
        const [showBenefits, setShowBenefits] = useState(false)
        const [showToppings, setShowToppings] = useState(false)

        let onlyThree = []

        if(data["beneficio"][0]) onlyThree.push(data["beneficio"][0])
        if(data["beneficio"][1]) onlyThree.push(data["beneficio"][1])
        if(data["beneficio"][2]) onlyThree.push(data["beneficio"][2])

        return(
            <div className={`w-full h-[70vh] p-5 bg-white rounded-md border border-primary/30 shadow-md`}>
                <div className='w-full h-full flex flex-col justify-between items-center'>
                    <div className="w-full h-[17%] relative text-center flex justify-between items-center gap-1">
                        <span className='w-1/2 h-14 overflow-hidden'>
                            <img className='w-full h-full object-contain' alt={data["descripcion"]} src={`./images/logos/logo-${data["imagen"]}`} />
                        </span>
                        <div className="w-1/2 relative flex flex-col justify-center items-center">
                            <p className="text-primary text-[1.30rem] font-bold">${data["totalPlan"]}</p>
                            <p className="text-slate-900 text-sm font-normal">{data["descripcion"]}</p>
                        </div>
                    </div>
                    <div className="w-full relative flex flex-col justify-start items-center h-[70%]">
                        {!showBenefits && <>
                        <div onClick={()=>{setShowToppings(!showToppings)}} className='w-full py-2 flex justify-between items-center border-b '>
                            <div className="flex justify-start items-center gap-2">
                                <span className='text-primary text-lg'>
                                    <FiShield/>
                                </span>
                                <p className='font-semibold text-slate-900 text-sm'>Coberturas</p>
                            </div>
                        </div>
                        <div className={`w-full h-fit overflow-y-auto flex flex-col justify-start items-start gap-1 mt-2`}>
                            {data["detalle"].length > 0 && data["detalle"].map((b, i)=>{
                                    return(
                                        <div key={i} className='flex flex-col justify-start items-start'>
                                            <p className='text-sm text-slate-900 font-medium'>{b["cobertura"]}</p>
                                            <p className='text-sm text-green-600 font-medium'>{b["limite"]}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        </>}
                        {data["beneficio"].length > 0 && 
                            <div className={`w-full flex flex-col justify-start items-center`}>
                                <div className='w-full py-2 flex justify-between items-center border-b '>
                                    <div className="flex justify-start items-center gap-2">
                                        <span className='text-primary text-lg'>
                                            <FiStar/>
                                        </span>
                                        <p className='font-semibold text-slate-900 text-sm'>Beneficios</p>
                                    </div>
                                    <span 
                                    onClick={()=>{ setShowBenefits(!showBenefits) }}
                                    className='text-slate-900 cursor-pointer text-xl'>
                                        {showBenefits ? <FiChevronUp/> : <FiChevronDown/>}
                                    </span>
                                </div>
                                <div className={`w-full flex flex-wrap justify-start items-start gap-1 mt-2 h-fit`}>
                                    {( showBenefits ? data["beneficio"] : onlyThree).map((b, i)=>
                                        <span key={i} className='bg-white rounded border px-3 py-1 text-xs text-slate-900 font-medium'>{b["descripcion"]}</span>
                                    )}
                                </div>
                            </div>
                        }
                    </div>
                    <div onClick={()=>{ history("/to-emmit-policy-register", {state: data}) }}  
                    className="bg-primary w-full h-fit py-3 rounded-md text-sm text-center text-white cursor-pointer">Comprar</div>
                </div>
            </div>
        )
    }

    const TypePlan = ({data}) => {
        return(
            <span
                onClick={()=>{ setActiveTypePlan(data["value"]) }}
                className={`cursor-pointer w-fit h-fit px-5 py-2 font-normal text-sm text-slate-primary rounded-md ${activeTypePlan === data["value"] ? "text-white bg-primary" : "bg-slate-200"}`}
            >
                {data["title"]}
            </span>
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
            setListOfPlans([...res.data].sort((a, b) => b["idPlan"] - a["idPlan"] ))
            setLoadingData(false)
        }).catch((e)=>{
            console.log(e)
        })
    }

    function filterPlans(){
        let list = [...listOfData]
        list = list.filter(elem => elem["opcionPlan"] === activeTypePlan)
        setListOfPlans(list)
    }

    useMemo(()=>{
        filterPlans()
    },[activeTypePlan])

    useEffect(() => {
        chargePlansAPI()
    }, [searchObject])

    useEffect(() => {
        if(!loadedAPI) chargeAPI()
    }, [loadedAPI])

    return (
        <div className="ml-[6%] w-[94%] relative block h-screen bg-gray-50 p-8">
            <p className='title-section text-slate-900 mb-6'>Planes por Aseguradora​</p>
            <div className="my-3 relative flex flex-wrap justify-start items-end">
                <div className="mb-3 mr-3 w-fit">
                    <p className="input-label">Tipo de Plan</p>
                    <div className="w-full flex justify-start items-center gap-2">
                        {type_of_plans.map((elem, i) => <TypePlan data={elem} key={i} />)}
                    </div>
                </div>
                <div className="mb-3 mr-3 w-[25%]">
                    <p className="input-label">Aseguradora</p>
                    <select value={searchObject.idCompania} onChange={(e)=>{ setSearchObject({...searchObject, idCompania: e.target.value}) }} className="form-control">
                        <option value="">Seleccionar</option>
                        {listOfInsurances.map((type)=> <option value={type["idCompania"]}>{type["nombreCompleto"]}</option> )}
                    </select>
                </div>
            </div>
            <p className='title-section text-slate-900'>Resultados</p>
            {listOfPlans.length > 0 ? 
                <div className="grid grid-cols-3 w-full flex-wrap gap-5 mt-5">
                    {listOfPlans.map((d, i)=><CardComponent index={i} data={d}/>)}
                </div>
                : 
                <div className="text-center flex justify-center align-middle h-10 w-full">
                    <p className="font-light text-xl text-primary">{loadingData ? "Cargando datos..." : "No hay datos todavia"}</p>
                </div>
            }
        </div>
    )

}

export default ToEmmitPolicy