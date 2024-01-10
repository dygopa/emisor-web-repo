import React, { useState } from 'react'

function Users() {

    let listOfInputs = [
        {
            label: "Nombre de usuario",
            value: "username",
            placeholder: "Escriba el nombre del usuario",
            typeOfInput: "text",
            type: "input"
        },
        {
            label: "Identificacion",
            value: "identification",
            placeholder: "Escriba la identificacion",
            typeOfInput: "text",
            type: "input"
        },
    ]

    const [searchObject, setSearchObject] = useState({})
    
    const [listOfData, setListOfData] = useState([
        {
            id: "1A",
            aseguradora: "ASSA",
            producto: "Danos a terceros",
            plan: "Basico",
            descripcion: "Danos a terceros ASSA intermedio",
            estatus: "Inactivo",
            idEstatus: "2",
            primaPlan: "80,4"
        },
        {
            id: "1B",
            aseguradora: "ASSA",
            producto: "Danos a terceros",
            plan: "Basico",
            descripcion: "Danos a terceros ASSA intermedio",
            estatus: "Inactivo",
            idEstatus: "2",
            primaPlan: "80,4"
        },
        {
            id: "1C",
            aseguradora: "ASSA",
            producto: "Danos a terceros",
            plan: "Basico",
            descripcion: "Danos a terceros ASSA intermedio",
            estatus: "Inactivo",
            idEstatus: "2",
            primaPlan: "80,4"
        },
        {
            id: "1D",
            aseguradora: "ASSA",
            producto: "Danos a terceros",
            plan: "Basico",
            descripcion: "Danos a terceros ASSA intermedio",
            estatus: "Inactivo",
            idEstatus: "2",
            primaPlan: "80,4"
        },
        {
            id: "1E",
            aseguradora: "ASSA",
            producto: "Danos a terceros",
            plan: "Basico",
            descripcion: "Danos a terceros ASSA intermedio",
            estatus: "Inactivo",
            idEstatus: "2",
            primaPlan: "80,4"
        },
    ])

    const TableDataComponent = ({data, index}) => {
        return(
            <div className={`grid-cols-5 table-data-component ${ index % 2 === 0 ? "bg-primary/20" : "bg-transparent" }`}>
                <p className="table-data-bold">{data["aseguradora"]}</p>
                <p className="table-data">{data["aseguradora"]}</p>
                <p className="table-data">{data["producto"]}</p>
                <p className="table-data">{data["plan"]}</p>
                <p className="table-data">{data["producto"]}</p>
            </div>
        )
    }

    const TableLabelsComponent = () => {
        return(
            <div className="grid grid-cols-5 gap-4 my p-[1.5rem_1.5rem_1rem_1.5rem]">
                <p className="table-label">Usuario</p>
                <p className="table-label">Nombre completo</p>
                <p className="table-label">Tipo - ramo - poliza</p>
                <p className="table-label">Ramo</p>
                <p className="table-label">{"Comision (%)"}</p>
            </div>
        )
    }

    return (
        <div className="lg:ml-[6%] lg:w-[94%] w-full relative block h-screen bg-gray-50 p-8">
            <p className='title-section text-slate-900'>Usuarios</p>
            <div className="my-3 relative flex flex-wrap items-end">
                {listOfInputs.map((v)=>{
                    if(v["type"] === "input"){
                        return (
                            <div className="mr-3 mb-3">
                                <p className="input-label">{v["label"]}</p>
                                <input placeholder={v["placeholder"]} onChange={(e)=>{ setSearchObject({...searchObject, [v["value"]]: e.target.value}) }} type={v["typeOfInput"]} className="form-control" />
                            </div>
                        )
                    }else{
                        return (
                            <div className="mr-3 mb-3">
                                <p className="input-label">{v["label"]}</p>
                                <select onChange={(e)=>{ setSearchObject({...searchObject, [v["value"]]: e.target.value}) }} className="form-control">
                                    <option value="">{v["placeholder"]}</option>
                                </select>
                            </div>
                        )
                    }
                })}
                <div onClick={()=>{}} className="btn btn-outline-primary mr-2 mb-3">Buscar</div>
                <div onClick={()=>{ window.location.href = "/new-user" }} className="btn btn-primary mb-3">Nuevo usuario</div>
            </div>
            <p className='title-section text-slate-900'>Resultados</p>
            <TableLabelsComponent/>
            {listOfData.length > 0 ? 
                listOfData.map((d, i)=><TableDataComponent index={i} data={d}/>)
            : 
                <div className="text-center flex justify-center align-middle h-10 w-full">
                    <p className="font-light text-xl text-primary">No hay datos todavia</p>
                </div>
            }
        </div>
    )

}

export default Users