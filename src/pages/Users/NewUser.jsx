import React, { useState, useRef, useEffect } from 'react'

function NewUser() {

    const [navbarOnTop, setNavbarOnTop] = useState(false)
    const [toggledSidebar, setToggledSidebar] = useState(false)
    const [activeLink, setActiveLink] = useState("1")
    const firstRef = useRef(null)

    const executeScroll = (ref) => ref.current.scrollIntoView()    

    let firstListOfInputs = [
        {
            label: "Descripcion",
            value: "typePlan",
            placeholder: "Seleccionar",
            typeOfInput: "text",
            type: "input"
        },
        {
            label: "Aseguradora",
            value: "productName",
            placeholder: "Escriba el nombre del producto",
            typeOfInput: "text",
            type: "input"
        },
        {
            label: "Productos",
            value: "typePlan",
            placeholder: "Seleccionar",
            typeOfInput: "text",
            type: "input"
        },
        {
            label: "Plan",
            value: "productName",
            placeholder: "Escriba el nombre del producto",
            typeOfInput: "text",
            type: "input"
        },
        {
            label: "Tipo",
            value: "type",
            placeholder: "Seleccionar",
            typeOfInput: "text",
            type: "select"
        },
        {
            label: "Estatus",
            value: "status",
            placeholder: "Seleccionar",
            typeOfInput: "text",
            type: "select"
        },
    ]

    const SidebarLinkComponent = ({title, number, ownRef, width}) => {
        return (
            <div onClick={()=>{ setActiveLink(number); executeScroll(ownRef) }} className={`cursor-pointer flex w-[${width}] h-auto mb-3 rounded p-2 justify-start items-center ${activeLink === number ? "bg-white border-primary border-2" : "bg-transparent"}`}>
                <p className={`mr-3 font-light flex w-[35px] h-[35px] rounded-full justify-center items-center text-lg border-2 ${activeLink === number ? "bg-primary text-white border-primary" : "bg-transparent text-primary border-primary/40"}`}>{number}</p>
                <p className={`text-sm text-secondary ${activeLink === number ? "font-bold" : "font-light"}`}>{title}</p>
            </div>
        )
    }

    const changeBackground = () => {
        if (window.scrollY >= 1) {
            setNavbarOnTop(true)
        }else{
            setNavbarOnTop(false)
        }
    }
    
    useEffect(() => {
        changeBackground()
        window.addEventListener("scroll", changeBackground)
    })

    return (
        <div className="ml-[18%] w-[82%] relative block h-screen bg-primary/20 p-8">
            <div onClick={()=>{ setToggledSidebar(!toggledSidebar) }} className="fixed right-8 bottom-8 z-10 bg-primary p-5 rounded cursor-pointer hover:bg-secondary transition shadow-xl">
                <span className="text-white material-symbols-outlined">
                    {toggledSidebar ? "view_agenda" : "view_column_2"}
                </span>
            </div>
            {(navbarOnTop && !toggledSidebar) && <div className="shadow-[#7777772f] shadow-2xl transition z-10 fixed bg-white w-[80%] h-fit top-0 right-0">
                <div className="p-4 flex relative h-auto w-full justify-between items-center overflow-x-auto">
                    <SidebarLinkComponent width={"20%"} ownRef={firstRef} title={"Creacion de usuario"} number={"1"} />
                    <div onClick={()=>{}} className="btn btn-primary">Guardar</div>
                </div>
            </div>}
            {!toggledSidebar && <div className="flex justify-between relative items-center h-20 w-full overflow-x-auto">
                <SidebarLinkComponent width={"20%"} ownRef={firstRef} title={"Creacion de usuario"} number={"1"} />
                <div onClick={()=>{}} className="btn btn-primary">Guardar</div>
            </div>}
            <div className="flex w-full justify-between h-full">
                {toggledSidebar && <div className="block relative h-full w-1/3 pr-8">
                    <SidebarLinkComponent width={"100%"} ownRef={firstRef} title={"Creacion de usuario"} number={"1"} />
                    <div onClick={()=>{
                        window.location.href = "/users"
                    }} className="transition cursor-pointer w-auto px-16 mr-2 relative block text-center rounded-md text-white py-3 bg-primary hover:bg-secondary">Guardar</div>
                </div>}
                <div className={`p-3 bg-white rounded-lg h-fit overflow-y-auto ${!toggledSidebar ? "w-full" : "w-2/3"}`}>
                    <div className="my-4" ref={firstRef}>
                        <p className={`title-section text-slate-900`}>Datos personales</p>
                        <div className="flex flex-wrap content-start">
                            {firstListOfInputs.map((v)=>{
                                if(v["type"] === "input"){
                                    return (
                                        <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} mb-3 px-3`}>
                                            <p className="input-label">{v["label"]}</p>
                                            <input placeholder={v["placeholder"]} onChange={(e)=>{ setFormObject({...formObject, [v["value"]]: e.target.value}) }} type={v["typeOfInput"]} className="form-control" />
                                        </div>
                                    )
                                }else{
                                    return (
                                        <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} mb-3 px-3`}>
                                            <p className="input-label">{v["label"]}</p>
                                            <select onChange={(e)=>{ setFormObject({...formObject, [v["value"]]: e.target.value}) }} className="form-control">
                                                <option value="">{v["placeholder"]}</option>
                                            </select>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default NewUser