import React, { useState, useEffect } from 'react'
import apiProvider from '../../services/apiProvider'
import { useNavigate } from 'react-router-dom'

function IssuePolicy() {

    let history = useNavigate()

    const [searchObject, setSearchObject] = useState({})
    const [listOfProducts, setListOfProducts] = useState([])
    const [listOfProperties, setListOfProperties] = useState([])
    const [loadingData, setLoadingData] = useState(false)
    const [loadedProducts, setLoadedProducts] = useState(false)

    function chargePropertiesAPI(){
        setLoadingData(true)

        let concacQueryString = ""
        let listOfString = []

        for (const key in searchObject) {
            if (searchObject[key] !== '') {
                let queryString = `${key}=${searchObject[key]}`
                listOfString.push(queryString)
            }
        }
        
        concacQueryString = "?idTipoInteres=2&idProducto=2"

        apiProvider.getPlanPropertyTypeEndPoint(concacQueryString).then((res)=>{
            console.log(res.data)
            setListOfProperties(res.data)
            setLoadingData(false)
        }).catch((e)=>{
            console.log(e)
        })
    }

    async function loadProductsFromAPI(){
        apiProvider.getProductEndPoint("2").then((res)=>{
            setListOfProducts(res.data)
            setLoadedProducts(true)
        }).catch((e)=>{
            console.log(e)
        })
    }

    const TableDataComponent = ({data}) => {
        return(
            <div onClick={()=>{
                history("/to-emmit-policy", {state: `idTipoInteres=2&idProducto=${searchObject.idProducto}&idTipoBien=${data["idTipoBien"]}`})
            }}
            className='overflow-hidden border border-primary w-[300px] h-[300px] bg-primary/10 rounded-lg flex flex-col justify-center items-center cursor-pointer shadow-xl hover:shadow-sm transition'>
                <img src={data["urlImage"] ?? ""} className="w-full h-full object-cover z-10"/>
                <p className='text-primary font-semibold text-xl tracking-wider absolute'>{data["tipoBien"] ?? "-"}</p>
            </div>
        )
    }

    useEffect(() => {
        chargePropertiesAPI()
    }, [searchObject])
    
    useEffect(() => {
        loadProductsFromAPI()
    }, [loadedProducts])

    return (
        <div className="ml-[6%] w-[94%] relative block h-screen bg-gray-50 p-8">
            <div className="flex w-full justify-start items-center mb-5">
                <p className='title-section text-slate-900'>Emitir Póliza</p>
            </div>
            {/* <div className="my-3 relative flex flex-wrap items-end">
                
                <div className="mr-3 mb-3 w-[30%]">
                    <p className="input-label">Producto</p>
                    <div className="flex justify-start items-center">
                        {listOfProducts.map((value, i)=>{
                            return(
                                <p key={i} className="input-label flex items-center justify-start leading-[2px] w-[50%]">
                                    {value["titulo"] + value["idProducto"]}
                                    <div onClick={()=>{
                                        setSearchObject({...searchObject, idProducto: value["idProducto"]})
                                    }} className="group rounded-full ml-3 w-5 h-5 border-solid border-[2.2px] p-[0.9px] box-border border-slate-500 overflow-hidden cursor-pointer flex justify-center items-center">
                                        <span className={`rounded-full transition w-full content-none h-full relative ${searchObject.idProducto === value["idProducto"] ? "group-hover:bg-slate-500 bg-primary" : "group-hover:bg-secondary bg-slate-300"}`}></span>
                                    </div>
                                </p>
                            )
                        })}
                            
                    </div>
                </div>

            </div> */}
            {/* <p className='title-section text-slate-900'>Resultados</p> */}
            {listOfProperties.length > 0 ?
                <div className="w-full h-[90%] flex items-center justify-center gap-10 mx-auto">
                    {listOfProperties.map((d, i)=><TableDataComponent key={i} data={d}/>)}
                </div>
            : 
                <div className="text-center flex justify-center align-middle h-10 w-full">
                    <p className="font-light text-xl text-primary">{loadingData ? "Cargando datos..." : "No hay datos todavia"}</p>
                </div>
            }
        </div>
    )

}

export default IssuePolicy