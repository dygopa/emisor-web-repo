import React, { useState, useEffect } from 'react'
import apiProvider from '../../services/apiProvider'
import { useNavigate } from 'react-router-dom'

function Quoters() {
    let history = useNavigate()

    const [searchObject, setSearchObject] = useState({})
    
    const [listOfData, setListOfData] = useState([])
    const [listOfProducts, setListOfProducts] = useState([])
    const [listOfPlanOptions, setListOfPlanOptions] = useState([])
    const [listOfInsurances, setListOfInsurances ] = useState([])

    const [loadingData, setLoadingData] = useState(false)
    const [loadedAPI, setLoadedAPI] = useState(false)

    const formatListStandart = (propList, propValue, propValueText) => {
        let list = []

        list = [...propList].map((prv)=>({
            value: prv[propValue],
            valueText: prv[propValueText]
        }))

        return list
    }

    let listOfInputs = [
        {
            label: "Tipo de Plan",
            value: "IdOpcionPlan",
            placeholder: "Seleccione el tipo de plan",
            typeOfInput: "text",
            listOfInput: formatListStandart(listOfPlanOptions, "idOpcionPlan", "plan"),
            type: "select"
        },
        {
            label: "Nombre del Producto",
            value: "idProducto",
            placeholder: "Escriba el nombre del producto",
            typeOfInput: "text",
            listOfInput: formatListStandart(listOfProducts, "idProducto", "titulo"),
            type: "select"
        },
        {
            label: "Descripción",
            value: "descripcion",
            placeholder: "Escriba la descripcion del producto",
            typeOfInput: "text",
            listOfInput: [],
            type: "input"
        },
        {
            label: "Aseguradora",
            value: "idCompania",
            placeholder: "Escriba la aseguradora",
            typeOfInput: "text",
            listOfInput: formatListStandart(listOfInsurances, "idCompania", "nombreCompleto"),
            type: "select"
        },
    ]

    const TableDataComponent = ({data, index}) => {
        return(
            <div
            onClick={()=>{ history("/quoter-register", {state: data}) }}
            className={`grid-cols-7 table-data-component ${ index % 2 === 0 ? "bg-primary/5" : "bg-transparent" }`}>
                <p className="table-data-bold">{data["idPlan"]}</p>
                <p className="table-data">{data["nombreCompleto"]}</p>
                <p className="table-data">{data["producto"]}</p>
                <p className="table-data">{data["opcionPlan"]}</p>
                <p className="table-data">{data["descripcion"]}</p>
                <div className={data["idEstatus"] === "1" ? 
                "font-bold px-5 py-1 w-fit relative flex flex-col justify-center text-center rounded-md bg-red-200 text-red-700" : 
                "font-bold px-5 py-1 w-fit relative flex flex-col justify-center text-center rounded-md bg-green-100 text-green-700" }>{data["estatus"]}</div>
                <p className="text-primary">{data["totalPlan"]}</p>
            </div>
        )
    }

    const TableLabelsComponent = () => {
        return(
            <div className="grid grid-cols-7 gap-4 my p-[1.5rem_1.5rem_1rem_1.5rem]">
                <p className="table-label-bold">#</p>
                <p className="table-label">Aseguradora</p>
                <p className="table-label">Producto</p>
                <p className="table-label">Plan</p>
                <p className="table-label">Descripción</p>
                <p className="table-label">Estatus</p>
                <p className="table-label">Prima Plan</p>
            </div>
        )
    }

    function chargeAPI(){
        apiProvider.getCompanyEndPoint("").then((res)=>{
            setListOfInsurances(res.data)
        }).catch((e)=>{
            console.log(e)
        })
        apiProvider.getProductEndPoint("").then((res)=>{
            setListOfProducts(res.data)
        }).catch((e)=>{
            console.log(e)
        })
        apiProvider.getPlanOpcionEndPoint("").then((res)=>{
            setListOfPlanOptions(res.data)
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
        
        concacQueryString = "?" + listOfString.join("&")
        apiProvider.getPlanEndPoint(concacQueryString).then((res)=>{
            setListOfData([...res.data].sort((a, b) => b["idPlan"] - a["idPlan"] ))
            setLoadingData(false)
        }).catch((e)=>{
            console.log(e)
        })
    }

    useEffect(() => {
        chargeAPI()
    }, [loadedAPI])

    useEffect(() => {
        chargePlansAPI()
    }, [searchObject])

    return (
        <div className="lg:ml-[6%] lg:w-[94%] w-full relative block h-screen bg-gray-50 p-8">
            <p className='title-section text-slate-900'>Consulta para la creación de planes DT</p>
            <div className="my-3 relative flex flex-wrap items-end">
                {listOfInputs.map((v, i)=>{
                    if(v["type"] === "input"){
                        return (
                            <div key={i} className="mr-3 mb-3">
                                <p className="input-label">{v["label"]}</p>
                                <input placeholder={v["placeholder"]} onChange={(e)=>{ setSearchObject({...searchObject, [v["value"]]: e.target.value}) }} type={v["typeOfInput"]} className="form-control" />
                            </div>
                        )
                    }else{
                        return (
                            <div key={i} className="mr-3 mb-3">
                                <p className="input-label">{v["label"]}</p>
                                <select onChange={(e)=>{ setSearchObject({...searchObject, [v["value"]]: e.target.value}) }} className="form-control">
                                    <option value="">{v["placeholder"]}</option>
                                    {[...v["listOfInput"]].map((type)=> <option value={type["value"]}>{type["valueText"]}</option> )}
                                </select>
                            </div>
                        )
                    }
                })}
                <div onClick={()=>{ window.location.href = "/quoter-register" }} className="btn btn-primary mb-3">Nuevo</div>
            </div>
            <p className='title-section text-slate-900'>Planes</p>
            <TableLabelsComponent/>
            {listOfData.length > 0 ? 
                listOfData.map((d, i)=><TableDataComponent index={i} data={d}/>)
            : 
                <div className="text-center flex justify-center align-middle h-10 w-full">
                    <p className="font-light text-xl text-primary">{loadingData ? "Cargando datos..." : "No hay datos todavia"}</p>
                </div>
            }
        </div>
    )

}

export default Quoters