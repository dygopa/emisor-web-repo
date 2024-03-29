import React, {useEffect, useState} from 'react'

function Sidebar() {

    const [id, setId] = useState("")

    const [permition, setPermition] = useState({})

    let url = window.location.href
    let activeLink = localStorage.getItem("activeLink") ?? "a"
    let parentLinkActive = activeLink.split("").length > 1 && activeLink.split("")[0]

    function changeActiveLink(link){
        localStorage.setItem("activeLink", link)
    }

    useEffect(()=>{
        let object = localStorage.getItem("ja.sjson")
        setPermition(JSON.parse(object))
    },[])

    const LinkComponent = ({hasSublinks, children, link, thisId, srcImg, srcImgActive, linkTitle, fromParentLink, hidden}) => {
        
        let parentId = parentLinkActive

        const [open, setOpen] = useState(parentId ? true : false)
        return (
            <div className={ hidden ? "hidden" : "visible"} title={linkTitle}>
                <div onClick={()=>{ hasSublinks ? (setOpen(!open), changeActiveLink(thisId)) : ((window.location.href = link), changeActiveLink(thisId)) }} className={`flex group h-10 w-full items-center hover:text-secondary px-7 my-1 cursor-pointer`}>
                    <span className="w-[30px] h-[30px]">
                        <img className="w-full h-full object-cover" src={activeLink === thisId ? srcImgActive : srcImg} alt="" />
                    </span>
                    {/* <p className={`text-[1rem] group-hover:text-primary w-4/6 transition ${activeLink === thisId ? "text-primary font-semibold" : "text-gray-400"}`}>{linkTitle}</p> */}
                    {hasSublinks && <p className="text-lg text-gray-400 group-hover:text-primary w-1/6 transition font-bold">{open ? "-" : "+"}</p>}
                </div>
                <div className={`px-3 transition ${ open ? "h-auto visible" : "h-0 invisible" }`}>
                    {hasSublinks && children}
                </div>
            </div>
        )
    }

    return (
        <div className={[
            "w-[6%] h-screen lg:block hidden fixed top-0 left-0 bg-white z-20 shadow-xl shadow-slate-100 border-r border-slate-200",
        ]}>
            <div className={[
                "flex flex-col relative justify-between h-full"
            ]}>
                <div className="z-10 w-full h-[18vh] p-4 bg-white absolute top-0 left-0">
                    <img src={import.meta.env.VITE_ISOTIPO_APP} className='my-0 mx-auto h-full box-border w-full object-contain' />
                </div>
                <div className="w-full flex flex-col relative h-[78%] mt-[5rem] justify-center overflow-y-auto">
                    {/* <LinkComponent fromParentLink="" linkTitle="Estadísticas" srcImgActive="/images/estadisticas-ico-active.png" srcImg="/images/estadisticas-ico.png" link={"/a"} hasSublinks={false} thisId={"e"} /> */}
                    <LinkComponent hidden={permition["VerConfiguracionDanoDT"] === 2} fromParentLink="" linkTitle="Daños a Terceros" srcImgActive="/images/configuracion-ico-active.png" srcImg="/images/configuracion-ico.png" link={"/quotes"} hasSublinks={false} thisId={"ca"} />
                    {/* <LinkComponent fromParentLink="" linkTitle="Cotizadores" srcImgActive="/images/cotizadores-ico-active.png" srcImg="/images/cotizadores-ico.png" link={"/quotes"} hasSublinks={false} thisId={"m"} /> */}
                    <LinkComponent hidden={permition["VerEmisionPoliza"] === 2} fromParentLink="" linkTitle="Emitir Póliza" srcImgActive="/images/emitir-ico-active.png" srcImg="/images/emitir-ico.png" link={"/issue-policy"} hasSublinks={false} thisId={"n"} />

                    {/* <LinkComponent fromParentLink="" linkTitle="Reportes" srcImgActive="/images/reporte-ico-active.png" srcImg="/images/reporte-ico.png" link={"/c"} hasSublinks={false} thisId={"o"} /> */}
                    {/* <LinkComponent fromParentLink="" linkTitle="Usuarios" srcImgActive="/images/usuario-ico-active.png" srcImg="/images/usuario-ico.png" link={"/users"} hasSublinks={false} thisId={"u"} /> */}
                    {/* <LinkComponent fromParentLink="" linkTitle="Administración" srcImgActive="/images/agregar-usuario-ico-active.png" srcImg="/images/agregar-usuario-ico.png" link={"/d"} hasSublinks={false} thisId={"p"} /> */}
                </div>
                <div className="w-full absolute bottom-0 left-0 flex flex-col justify-center items-center">
                    {/* <p className="mb-3 text-slate-500 text-sm">Hecho por <a href='https://swfactorygroup.com/' target="_blank" className='text-primary'>Software Factory</a></p> */}
                    <div className="w-full h-20 border-t bg-white border-slate-200 flex flex-col justify-center">
                        <LinkComponent fromParentLink="" linkTitle="Salir" srcImgActive="/images/salir-ico-active.png" srcImg="/images/salir-ico.png" link={"/login"} hasSublinks={false} thisId={"q"} />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Sidebar