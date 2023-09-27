import React, { useState, useRef, useEffect, useMemo } from 'react'
import apiProvider from '../../services/apiProvider'
import { useLocation, useNavigate } from 'react-router-dom'
import Compress from "react-image-file-resizer"
import { FiChevronLeft, FiColumns } from 'react-icons/fi';
import { AiFillLock } from 'react-icons/ai';
import { RiLayoutRowLine } from 'react-icons/ri';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { el, es } from 'date-fns/locale';
import { NumericFormat } from 'react-number-format';
import { InputComponent } from '../../components/DateInput';
import { 
    client_juridic_list, 
    client_natural_list, 
    contractor_juridic_list, 
    contractor_natural_list, 
    pep_juridic_list, 
    pep_list 
} from '../../services/issue-policy/requerired-fields';
import validators from '../../services/validators';

function ToEmmitPolicyRegister() {

    let data = useLocation()
    let history = useNavigate()

    const [navbarOnTop, setNavbarOnTop] = useState(false)
    const [toggledSidebar, setToggledSidebar] = useState(false)
    const [loadedAPI, setLoadedAPI] = useState(false)
    const [loadingFiles, setLoadingFiles] = useState(false)
    const [loadingEmmitPolicy, setLoadingEmmitPolicy] = useState(false)
    const [warningStatus, setWarningStatus] = useState(false)
    const [successStatus, setSuccessStatus] = useState(false)
    const [errorStatus, setErrorStatus] = useState(false)
    const [sameDataContractor, setSameDataContractor] = useState(false)
    const [isPep, setIsPep] = useState(false)
    const [isPepContractor, setIsPepContractor] = useState(false)
    const [imported, setImported] = useState(false)
    const [policeAnualPrime, setPoliceAnualPrime] = useState(false)
    const [policeAnualPrimeContractor, setPoliceAnualPrimeContractor] = useState(false)
    const [loadedIDFromAPI, setLoadedIDFromAPI] = useState(false)
    const [loadedYears, setLoadedYears] = useState(false)
    const [termsPopup, setTermsPopup] = useState(false)

    const minYear = moment().subtract(10, "y").format("YYYY-MM-DD").toString()
    const maxDateBirth = moment().format("YYYY-MM-DD").toString()

    const [dateBirthClient, setDateBirthClient] = useState(new Date())
    const [dateBirthClientContractor, setDateBirthClientContractor] = useState(new Date())

    const [fromPEP, setFromPEP] = useState(new Date())
    const [untilPEP, setUntilPEP] = useState(new Date())

    const [fromPEPContractor, setFromPEPContractor] = useState(new Date())
    const [untilPEPContractor, setUntilPEPContractor] = useState(new Date())

    const [typePersonContractor, setTypePersonContractor] = useState("1")
    const [activeLink, setActiveLink] = useState("1")
    const [warningMessage, setWarningMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("Ocurrio un error, intentelo otra vez ")

    const [formObject, setFormObject] = useState({
        typePersona: "2",
        CantidadPasajeros: 5,
        ValorVehiculo: 0,
        EstadoAuto: 2,
        cantidadReferencias: "1",
        IdPais: 14,
        IdNacionalidadContratante: 14
    })

    const [fieldsClient, setFieldsClient] = useState([])
    const [fieldsContractor, setFieldsContractor] = useState([])

    const [fieldsClientJuridic, setFieldsClientJuridic] = useState([])
    const [fieldsContractorJuridic, setFieldsContractorJuridic] = useState([])

    const [fieldsClientPEP, setFieldsClientPEP] = useState([])
    const [fieldsContractorPEP, setFieldsContractorPEP] = useState([])

    const [listOfGenre, setListOfGenre] = useState([])
    const [listOfCivilStatus, setListOfCivilStatus] = useState([])
    const [listOfProfesion, setListOfProfesion] = useState([])
    const [listOfOcupations, setListOfOcupations] = useState([])
    const [listOfProvincias, setListOfProvincias] = useState([])
    const [listOfDistritos, setListOfDistritos] = useState([])
    const [listOfCorregimientos, setListOfCorregimientos] = useState([])
    const [listOfUrbanizacion, setListOfUrbanizacion] = useState([])
    const [listOfNationalitys, setListOfNationalitys] = useState([])
    const [listOfTypeDocument, setListOfTypeDocument] = useState([])
    const [listOfTypeDocumentContractor, setListOfTypeDocumentContractor] = useState([])

    const [listOfVehiculeBrands, setListOfVehiculeBrands] = useState([])
    const [listOfVehiculeModels, setListOfVehiculeModels] = useState([])
    const [listOfFinancialProfiles, setListOfFinancialProfiles] = useState([])
    const [listOfCountries, setListOfCountries] = useState([])
    const [listOfYears, setListOfYears] = useState([])

    const [filesImg, setFilesImg] = useState([])

    const firstRef = useRef(null)
    const secondRef = useRef(null)
    const thirdRef = useRef(null)
    const fourthRef = useRef(null)
    const fileInputRef = useRef(null)

    async function selectFiles(e){
        setLoadingFiles(true)
        let files = [...e.target.files]
        var list = [...filesImg]
        
        Promise.all(files.map(async (file) => {
            list.push({
                url: "",
                file: file
            })
        }))
        setTimeout(() => {
            setFilesImg(list)
            setLoadingFiles(false)
        }, files.length * 1000);

    }

    const executeScroll = (ref) => ref.current.scrollIntoView()    
    
    const onScroll = (ref, number) => {
        if (ref.current) {
          const { scrollTop, scrollHeight, clientHeight } = ref.current;
          if (scrollTop + clientHeight === scrollHeight) {
            console.log("reached bottom of " + number)
          }
        }
    }

    const formatListStandart = (propList, propValue, propValueText) => {
        let list = []

        list = [...propList].map((prv)=>({
            value: prv[propValue],
            valueText: prv[propValueText]
        }))

        return list
    }

    const SidebarLinkComponent = ({title, number, ownRef}) => {
        return (
            <div onClick={()=>{ setActiveLink(number); executeScroll(ownRef) }} className={`cursor-pointer flex w-full h-auto mb-3 rounded p-2 justify-start items-center ${activeLink === number ? "bg-white border-primary border-2" : "bg-transparent"}`}>
                <p className={`mr-3 font-light flex w-[35px] h-[35px] rounded-full justify-center items-center text-lg border-2 ${activeLink === number ? "bg-primary text-white border-primary" : "bg-transparent text-primary border-primary/40"}`}>{number}</p>
                <p className={`text-sm text-secondary ${activeLink === number ? "font-bold" : "font-light"}`}>{title}</p>
            </div>
        )
    }

    function changeTypePersonContractor(prop){
        
        let type = (prop === "1" || prop === "2") ? "1" : "2"
        clearAllFieldsContractor(type)
        
        setFormObject({...formObject, IdTipoDocumentoContratante: prop})
    }
    
    function clearAllFieldsContractor(prop){
        console.log(prop)
        if(prop !== typePersonContractor){
            setTypePersonContractor(prop)
            //Datos del contratante
            formObject["IdSexoContratante"] = ""
            formObject["NombreContratante"] = ""
            formObject["ApellidoContratante"] = ""
            formObject["ApellidoCasadaContratante"] = ""
            formObject["NombreComercialContratante"] = ""
            formObject["RepresentanteLegalContratante"] = ""
            formObject["ActividadComercialPrincipalContratante"] = ""
            formObject["NombreBeneficiarioContratante"] = ""
            formObject["IdentificacionBeneficiarioContratante"] = ""
            setDateBirthClientContractor(new Date())
            formObject["EmailContratante"] = ""
            formObject["TelefonoContratante"] = ""
            formObject["IdNacionalidadContratante"] = ""
            formObject["IdEsoCivilContratante"] = ""
            formObject["IdProfesionContratante"] = ""
            formObject["IdOcupacionContratante"] = ""
    
            setIsPepContractor(false)
        }

    }

    function clearAllFields(){

        //Datos del contratante
        formObject["idsexo"] = ""
        formObject["names"] = ""
        formObject["lastNames"] = ""
        formObject["marriedLastName"] = ""
        formObject["NombreComercial"] = ""
        formObject["RepresentanteLegal"] = ""
        formObject["ActividadComercialPrincipal"] = ""
        formObject["NombreBeneficiario"] = ""
        formObject["IdentificacionBeneficiario"] = ""
        setDateBirthClient(new Date())
        formObject["email"] = ""
        formObject["cellphone"] = ""
        formObject["PaisResidencia"] = ""
        formObject["IdPais"] = ""
        formObject["idestadocivil"] = ""
        formObject["IdProfesion"] = ""
        formObject["IdOcupacion"] = ""

        setIsPep(false)

    }

    function handleFindIDInformation(){
        if(formObject["numberId"] !== undefined){
            let query = `?idTipoPersona=${formObject.typePersona}&identificacion=${formObject["numberId"]}`
            apiProvider.GetDatosIdentidadxIdentificacionEndPoint(query).then((res)=>{
                let listRes = [...res.data]
                if(listRes.length > 0){
                    
                    let dateBirth = moment(listRes[0]["FechaNacimiento"]).toDate()
                    setDateBirthClient(dateBirth)
                    let json = {...res.data[0]}
                    console.log(json)
                    setWarningStatus(false)
                    setIsPep(json["IdPep"] === 1)

                    formObject.idsexo = json["IdDescDetalleSexo"] ?? 0
                    formObject.names = json["NombreI"] ?? json["RazonSocial"]
                    formObject.lastNames = json["ApellidoI"] ?? ""
                    formObject.marriedLastName = json["ApellidoCasada"] ?? ""
                    formObject.fechanacimiento = dateBirth ?? ""
                    formObject.email = json["Email"] ?? ""
                    formObject.cellphone = json["Celular"] ?? ""
                    formObject.IdPais = json["IdNacionalidad"] ?? 0
                    formObject.NombreComercial = json["RazonSocial"] ?? json["NombreI"]
                    formObject.IdProfesion = json["IdProfesion"] ?? ""
                    formObject.IdOcupacion = json["Ocupacion"] ?? ""
                    formObject.IdPep = json["IdPep"] ?? 2
                    formObject.IdProvincia = parseInt(json["IdProvincia"]) ?? ""
                    formObject.IdDistrito = parseInt(json["IdDistritoIntegracion"]) ?? ""
                    formObject.IdCorregimiento = parseInt(json["IdCorregimientoIntegracion"]) ?? ""
                    formObject.Urbanizacion = parseInt(json["IdUrbanizacion"]) ?? ""
                    formObject.Calle = json["AvenidaCalle"] ?? ""
                    formObject.ApartamentoCasa = json["EdificioCasa"] ?? ""
                    formObject.Direccion = json["Direccion"] ?? ""
                    formObject.marcaid = json["IdMarca"] ?? 0
                    formObject.modeloid = json["IdModelo"] ?? 0
                    formObject.numeroMotor = json["SerialMotor"] ?? ""
                    formObject.numeroChasis = json["SerialCarroceria"] ?? ""
                    formObject.Placa = json["Placa"] ?? ""
                    formObject.Color = json["IdColor"] ?? ""
                    formObject.CantidadPasajeros = json["Pasajeros"] ?? ""
                    formObject.Ano = json["Ano"] ?? ""

                    formObject.NombreConductorAdicional = json["NombreConductorAdicional"] ?? ""
                    formObject.ApellidoConductorAdic = json["ApellidoConductorAdic"] ?? ""
                    formObject.IdentificacionAdic = json["IdentificacionAdic"] ?? ""

                    getDataFromValue(parseInt(json["IdProvincia"]), "provincia")
                    getDataFromValue(parseInt(json["IdDistritoIntegracion"]), "distrito")
                    getDataFromValue(parseInt(json["IdCorregimientoIntegracion"]), "corregimiento")
                    getDataFromValue(formObject["marcaid"], "model")
                    console.log("formObject")
                    console.log(formObject)
                    handleFormatObjectFromAPI(json)
                }else{
                    setWarningStatus(true)
                    setWarningMessage("Asegurado no registrado")
                    setLoadedIDFromAPI(true)
                }
            }).catch((e)=>{
                setWarningStatus(true)
                setWarningMessage("Asegurado no registrado")
                setLoadedIDFromAPI(true)
                console.log(e)
            })
        }
    }
    function handleFormatObjectFromAPI(json){
        
        let query = `?IdEntidad=${json["IdEntidad"]}`
        apiProvider.GetDatosContratanteEndPoint(query).then((res)=>{
            if(res.data[0]){
                
                let dateBirth = moment(res.data[0]["FechaNacimiento"]).format("YYYY-MM-DD").toString()

                let data = {
                    ...formObject,
                    conntratante_idsexo: res.data[0]["IdDescDetalleSexo"] ?? 0,
                    conntratante_names: res.data[0]["NombreI"] ?? "",
                    conntratante_lastNames: res.data[0]["ApellidoI"] ?? "",
                    conntratante_marriedLastName: res.data[0]["ApellidoCasada"] ?? "",
                    conntratante_fechanacimiento: dateBirth ?? "",
                    conntratante_email: res.data[0]["Email"] ?? "",
                    conntratante_cellphone: res.data[0]["Telefono"] ?? "",
                    conntratante_IdPais: res.data[0]["IdNacionalidad"] ?? 0,
                    conntratante_idestadocivil: res.data[0]["RazonSocial"] ?? 0,
                    conntratante_IdProfesion: res.data[0]["RazonSocial"] ?? 0,
                    conntratante_IdOcupacion: res.data[0]["RazonSocial"] ?? 0,
                    conntratante_documentoIdentidad: res.data[0]["RazonSocial"] ?? "",
                }
                setFormObject(data)
            }
            setLoadedIDFromAPI(true)
        }).catch((e)=>{
            setLoadedIDFromAPI(true)
            console.log(e)
        })
    }

    function getDataFromValue(value, type){
        if(type === "model"){
            apiProvider.getVehiculeModelEndPoint(`?idMarca=${value}`).then((res)=>{
                console.log(value)
                setFormObject({...formObject, marcaid: value})
                setListOfVehiculeModels(res.data)
            }).catch((e)=>{
                console.log(e)
            })
        }
        if(type === "provincia"){
            apiProvider.getManzaneroEndPoint(`?Tipo=d&IdProvincia=${value}`).then((res)=>{
                setFormObject({...formObject, IdProvincia: value})
                setListOfDistritos(res.data)
            }).catch((e)=>{
                console.log(e)
            })
        }
        if(type === "distrito"){
            apiProvider.getManzaneroEndPoint(`?Tipo=c&IdProvincia=${formObject["IdProvincia"]}&IdDistrito=${value}`).then((res)=>{
                setFormObject({...formObject, IdDistrito: value})
                setListOfCorregimientos(res.data)
            }).catch((e)=>{
                console.log(e)
            })
        }
        if(type === "corregimiento"){
            apiProvider.getManzaneroEndPoint(`?Tipo=u&&IdProvincia=${formObject["IdProvincia"]}&&IdDistrito=${formObject["IdDistrito"]}&CodCorredimiento=${value}`).then((res)=>{
                setFormObject({...formObject, IdCorregimiento: value})
                setListOfUrbanizacion(res.data)
            }).catch((e)=>{
                console.log(e)
            })
        }

    }

    function chargeTypeOfDocument(type){
        apiProvider.GetTipoDocumentoEndPoint("").then((res)=>{
            let list = [...res.data]
            if(type === "2"){
                list = list.filter(prv => prv["IdTipoDocumento"] !== 3)
                setListOfTypeDocument(list)
            }else{
                list = list.filter(prv => prv["IdTipoDocumento"] === 3)
                setListOfTypeDocument(list)
            }
        }).catch((e)=>{
            console.log(e)
        })
    }

    function chargeAPI(){
        chargeTypeOfDocument("2")
        apiProvider.GetTipoDocumentoEndPoint("").then((res)=>{
            let list = [...res.data]
            setListOfTypeDocumentContractor(list)
        }).catch((e)=>{
            console.log(e)
        })
        apiProvider.GetNacionalidadEndPoint("").then((res)=>{
            setListOfNationalitys(res.data)
        }).catch((e)=>{
            console.log(e)
        })
        apiProvider.getGenreEndPoint("").then((res)=>{
            setListOfGenre(res.data)
        }).catch((e)=>{
            console.log(e)
        })
        apiProvider.getCivilStatusEndPoint("").then((res)=>{
            setListOfCivilStatus(res.data)
        }).catch((e)=>{
            console.log(e)
        })
        apiProvider.GetPerfilFinancieroEndPoint("").then((res)=>{
            setListOfFinancialProfiles(res.data)
        }).catch((e)=>{
            console.log(e)
        })
        apiProvider.GetProfesionEndPoint("").then((res)=>{
            setListOfProfesion(res.data)
        }).catch((e)=>{
            console.log(e)
        })
        apiProvider.GetOcupationEndPoint("").then((res)=>{
            setListOfOcupations(res.data)
        }).catch((e)=>{
            console.log(e)
        })
        apiProvider.getManzaneroEndPoint("?Tipo=P").then((res)=>{
            setListOfProvincias(res.data)
        }).catch((e)=>{
            console.log(e)
        })
        apiProvider.getPaisEndPoint("").then((res)=>{
            setListOfCountries(res.data)
        }).catch((e)=>{
            console.log(e)
        })

        apiProvider.getVehiculeModelEndPoint("").then((res)=>{
            setListOfVehiculeModels(res.data)
        }).catch((e)=>{
            console.log(e)
        })
        apiProvider.getVehiculeBrandEndPoint("").then((res)=>{
            setListOfVehiculeBrands(res.data)
        }).catch((e)=>{
            console.log(e)
        })

        setLoadedAPI(true)
    }

    const changeBackground = () => {
        if (window.scrollY >= 1) {
            setNavbarOnTop(true)
        }else{
            setNavbarOnTop(false)
        }
    }

    function checkChangeOfView(){
        if(filesImg.length >= 2){
            manageQuoterRegister()
        }else{
            setErrorMessage("Debe cargar mas de 2 documentos")
            setErrorStatus(true)
        }
    }

    function chargeYears(){
        let list = []
        
        for (let i = 0; i < 11; i++) {
            const yearNumber = i;
            const year = moment().subtract(yearNumber, "y").format("YYYY").toString()
            list.push(year)
        }

        setListOfYears(list)
        setLoadedYears(true)
    }

    const TermsPopup = () => {
        return(
            <div className='w-full h-screen absolute bg-white/40 backdrop-blur-sm bottom-0 left-0 z-20 flex flex-col justify-center items-center overflow-hidden'>
                <div className='max-w-[50%] w-fit min-w-[10%] h-fit min-h-[10vh]  top-[30%] bg-white border rounded-md overflow-hidden flex flex-col justify-between items-center gap-4 p-6 shadow-md'>
                    <div className='w-full flex flex-col justify-center items-center gap-4'>
                        <p className='font-semibold text-lg text-slate-900'>¿Está seguro que desea guardar los datos ingresados?</p>
                        <p className='font-light text-base text-slate-900'>Declaro y certifico bajo gravedad de juramento que la información declarada (datos personales, datos del auto, historial de conductor, datos del contratante), proveída y/o escrita es real, exacta, correcta y que no he omitido ningún hecho, circunstancia, dato o información relevante que hubieran podido influir de modo directo en la existencia o condiciones del contrato. El incumplimiento de la misma traen consigo la nulidad del mismo a criterio de la aseguradora correspondiente.</p>
                    </div>
                    <div className='w-full flex justify-end items-center gap-6'>
                        <div className='text-base text-slate-900 font-light cursor-pointer' onClick={()=>{ setTermsPopup(false) }}>No acepto</div>
                        <div onClick={()=>{
                            let object = handleValidationFunction()
                            history("/validity-policy", {state: [object, filesImg, data.state]})
                        }} className='btn btn-primary'>Acepto</div>
                    </div>
                </div>
            </div>
        )
    }

    const AlertComponent = ({type, msg, state}) => {
        return(
            <div onClick={()=>{ state(false) }} className={`transition shadow-md z-20 rounded p-[1%_2%] text-left h-auto w-auto cursor-pointer fixed right-[2.3%] bottom-[15%] block ${type === "1" 
                ? "hover:bg-green-300 bg-green-200 text-green-900"
                : type === "2" ? "hover:bg-red-300 bg-red-200 text-red-900"
                : "hover:bg-yellow-300 bg-yellow-200 text-yellow-900"
            }
            `}>
                <p className={`font-semibold`}>{type === "1" ? "Exitos" : type === "2" ? "Error" : "Aviso"}</p>
                <p className={`font-light`}>{msg !== "" ? msg : "Mensaje de prueba para creacion de plan"}</p>
            </div>
        )
    }
    
    useMemo(()=>{
        clearAllFields()
    }, [formObject["typePersona"]])

    useEffect(() => {
        if(!loadedYears) chargeYears()
    }, [loadedYears])

    useEffect(() => {
        if(!loadedAPI) chargeAPI()
    }, [loadedAPI])

    useEffect(() => {
        changeBackground()
        window.addEventListener("scroll", changeBackground)
    }, [navbarOnTop])

    const ErrorText = () => {
        return(
            <p className='text-[0.8rem] mt-2 text-red-700'>Campo requerido (*)</p>
        )
    }

    return (
        <div className={`ml-[6%] w-[94%] relative block h-screen bg-gray-50 p-8 ${termsPopup && "overflow-hidden"}`}>
            {termsPopup && <TermsPopup/>}
            {warningStatus && <AlertComponent state={setWarningStatus} type={"3"} msg={warningMessage} />}
            {successStatus && <AlertComponent state={setSuccessStatus} type={"1"} msg={successMessage} />}
            {errorStatus && <AlertComponent state={setErrorStatus} type={"2"} msg={errorMessage} />}

            {/* <div onClick={()=>{ setToggledSidebar(!toggledSidebar) }} className="fixed right-8 bottom-8 z-20 bg-primary p-5 rounded cursor-pointer hover:bg-secondary transition shadow-xl">
                <span className="text-white material-symbols-outlined">
                    {toggledSidebar ? <RiLayoutRowLine size={25}/> : <FiColumns size={25}/>}
                </span>
            </div> */}

            {/* Horizontal style fixed*/}
            {(navbarOnTop && !toggledSidebar) && <div className="shadow-[#7777772f] shadow-2xl transition z-20 fixed bg-white w-[94%] h-fit top-0 right-0">
                <div className="p-4 flex justify-between relative h-auto w-full items-center overflow-x-auto">
                    <div className="w-fit flex justify-start items-center gap-3">
                        <div onClick={()=>{ history("/to-emmit-policy") }} className="mr-10 cursor-pointer w-fit flex justify-start items-center gap-3">
                            <span className="text-2xl text-primary">
                                <FiChevronLeft/>
                            </span>
                            <p className="text-slate-900 text-base font-medium">Regresar</p>
                        </div>
                        <div className="h-10 relative block">
                            <img src={`./images/logos/logo-${data.state["imagen"]}`} className='h-full box-border w-full object-contain' />
                        </div>
                        <div className="flex flex-col relative text-left justify-center items-left">
                            <p className="font-light text-base text-slate-500">{data.state["descripcion"]}</p>
                            <p className="font-semibold text-base text-slate-900">Total del plan: <span className="text-xl">${data.state["totalPlan"]}</span></p>
                        </div>
                    </div>
                    <div onClick={()=>{
                        checkChangeOfView()
                    }} className="btn btn-primary">Guardar</div>
                </div>
            </div>}
            
            {/* Horizontal style bar */}
            {!toggledSidebar && <div className="flex justify-between relative items-center h-fit w-full overflow-x-auto">
                <div className="w-fit flex justify-start items-center gap-4">
                    <div onClick={()=>{ history("/to-emmit-policy") }} className="bg-white mr-5 rounded-full px-3 py-1 border shadow cursor-pointer w-fit relative flex justify-start items-center gap-3">
                        <span className="text-2xl text-primary">
                            <FiChevronLeft/>
                        </span>
                        <p className="text-slate-900 text-base font-medium">Regresar</p>
                    </div>
                    <div className="h-10 relative block">
                        <img src={`/images/logos/logo-${data.state["imagen"]}`} className='h-full box-border w-full object-contain' />
                    </div>
                    <div className="flex flex-col relative text-left justify-center items-left">
                        <p className="font-light text-base text-slate-500">{data.state["descripcion"]}</p>
                        <p className="font-semibold text-base text-slate-900">Total del plan: <span className="text-xl">${data.state["totalPlan"]}</span></p>
                    </div>
                </div>
                <div onClick={()=>{
                    checkChangeOfView()
                }} className="btn btn-primary">Guardar</div>
            </div>}

            <div className="flex w-full justify-between h-full">
                {/* Vertical style bar */}
                {/* {toggledSidebar && <div className="block relative h-full w-1/3 pr-8">
                    <SidebarLinkComponent ownRef={firstRef} title={"Datos asegurado"} number={"1"} />
                    <SidebarLinkComponent ownRef={secondRef} title={"Datos del contratante"} number={"2"} />
                    <SidebarLinkComponent ownRef={thirdRef} title={"Direccion"} number={"3"} />
                    <SidebarLinkComponent ownRef={fourthRef} title={"Datos automovil"} number={"4"} />
                    <div onClick={()=>{
                        checkChangeOfView()
                    }} className="btn btn-primary">Guardar</div>

                </div>} */}
                <div className={`mt-5 p-3 bg-white rounded-lg h-fit overflow-y-hidden ${!toggledSidebar ? "w-full" : "w-2/3"}`}>
                    <div className="my-4 relative" ref={firstRef}>
                        <p className={`title-section text-slate-900`}>Datos del Asegurado</p>
                        <div className="flex flex-wrap content-start items-end">
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Tipo Persona <span className='text-primary font-bold'>*</span></p>
                                <div className="flex justify-between items-center">
                                    <p className="input-label flex items-center leading-[2px] mr-2">
                                        Jurídico​
                                        <div className="ml-3 w-1/4">
                                            <div onClick={()=>{
                                                setFormObject({...formObject, typePersona: "1"}), chargeTypeOfDocument("1")
                                            }} className="group rounded-full w-5 h-5 border-solid border-[2.2px] p-[0.9px] box-border border-slate-500 overflow-hidden cursor-pointer flex justify-center items-center">
                                                <span className={`rounded-full transition w-full content-none h-full relative ${formObject.typePersona === "1" ? "group-hover:bg-slate-500 bg-primary" : "group-hover:bg-secondary bg-slate-300"}`}></span>
                                            </div>
                                        </div>
                                    </p>
                                        
                                    <p className="input-label flex items-center leading-[2px] mr-2">
                                        Natural
                                        <div className="ml-3 w-1/4">
                                            <div onClick={()=>{
                                                setFormObject({...formObject, typePersona: "2"}), chargeTypeOfDocument("2")
                                            }} className="group rounded-full w-5 h-5 border-solid border-[2.2px] p-[0.9px] box-border border-slate-500 overflow-hidden cursor-pointer flex justify-center items-center">
                                                <span className={`rounded-full transition w-full content-none h-full relative ${formObject.typePersona === "2" ? "group-hover:bg-slate-500 bg-primary" : "group-hover:bg-secondary bg-slate-300"}`}></span>
                                            </div>
                                        </div>
                                    </p>
                                </div>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Tipo de Documento de Identidad​</p>
                                <select autoFocus onChange={(e)=>{ setFormObject({...formObject, idtipodocumento: e.target.value})  }} className="form-control">
                                    <option value="">Seleccione el tipo de documento de identidad</option>
                                    {listOfTypeDocument.map((type)=> <option value={type["IdTipoDocumento"]}>{type["TipoDocumento"]}</option> )}
                                </select>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Número de Identificación​ <span className='text-primary font-bold'>*</span></p>
                                <input placeholder="Ingrese el número de identificación" onChange={(e)=>{ setFormObject({...formObject, numberId: e.target.value}) }} type="text" className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <div onClick={()=>{ handleFindIDInformation() }} className="btn btn-primary">Validar</div>
                            </div>
                        </div>
                        <div className="w-full h-fit flex flex-wrap content-start relative">

                            {!loadedIDFromAPI && <div className='w-full h-full absolute bg-white/40 backdrop-blur-sm bottom-0 left-0 z-10 flex flex-col justify-center items-center'>
                                <AiFillLock size={70} color='#242424'/>
                            </div>}

                            {formObject["typePersona"] !== "1" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Género</p>
                                <select value={formObject["idsexo"]} onChange={(e)=>{ setFormObject({...formObject, idsexo: e.target.value})  }} className="form-control">
                                    <option value="">Seleccione el género</option>
                                    {listOfGenre.map((type)=> <option value={type["idSexo"]}>{type["sexo"]}</option> )}
                                </select>
                                {fieldsClient.includes("idsexo") && <ErrorText/>}
                            </div>}
                            {formObject["typePersona"] !== "1" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Estado Civil <span className='text-primary font-bold'>*</span></p>
                                <select onChange={(e)=>{ setFormObject({...formObject, idestadocivil: e.target.value})  }} className="form-control">
                                    <option value="">Seleccione el estado civil</option>
                                    {listOfCivilStatus.map((type)=> <option value={type["idEstadoCivil"]}>{type["estadoCivil"]}</option> )}
                                </select>
                                {fieldsClient.includes("idestadocivil") && <ErrorText/>}
                            </div>}
                            {formObject["typePersona"] !== "1" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Fecha de Nacimiento <span className='text-primary font-bold'>*</span></p>
                                <InputComponent customOnChange={setDateBirthClient} daySelected={dateBirthClient} fromYear={1950} toYear={2008}/>
                            </div>}
                            {formObject["typePersona"] === "1" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Representante Legal <span className='text-primary font-bold'>*</span></p>
                                <input value={formObject["RepresentanteLegal"]} placeholder="Ingrese el representante legal" onChange={(e)=>{ setFormObject({...formObject, RepresentanteLegal: e.target.value}) }} type="text" className="form-control" />
                                {fieldsClientJuridic.includes("RepresentanteLegal") && <ErrorText/>}
                            </div>}
                            {formObject["typePersona"] === "1" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Actividad Comercial Principal <span className='text-primary font-bold'>*</span></p>
                                <input value={formObject["ActividadComercialPrincipal"]} placeholder="Ingrese la actividad comercial principal" onChange={(e)=>{ setFormObject({...formObject, ActividadComercialPrincipal: e.target.value}) }} type="text" className="form-control" />
                                {fieldsClientJuridic.includes("ActividadComercialPrincipal") && <ErrorText/>}
                            </div>}
                            {formObject["typePersona"] === "1" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Nombre Beneficiario</p>
                                <input value={formObject["NombreBeneficiario"]} placeholder="Ingrese el nombre del beneficiario" onChange={(e)=>{ setFormObject({...formObject, NombreBeneficiario: e.target.value}) }} type="text" className="form-control" />
                                {fieldsClientJuridic.includes("NombreBeneficiario") && <ErrorText/>}
                            </div>}
                            {formObject["typePersona"] === "1" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Identificación Beneficiario</p>
                                <input value={formObject["IdentificacionBeneficiario"]} placeholder="Ingrese la identificacion del beneficiario" onChange={(e)=>{ setFormObject({...formObject, IdentificacionBeneficiario: e.target.value}) }} type="text" className="form-control" />
                                {fieldsClientJuridic.includes("IdentificacionBeneficiario") && <ErrorText/>}
                            </div>}
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Correo Electrónico <span className='text-primary font-bold'>*</span></p>
                                <input value={formObject["email"]} placeholder="Ingrese el correo electrónico" onChange={(e)=>{ setFormObject({...formObject, email: e.target.value}) }} type="email" className="form-control" />
                                {fieldsClient.includes("email") && <ErrorText/>}
                            </div>
                            {formObject["typePersona"] !== "1" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Nombre(s) <span className='text-primary font-bold'>*</span></p>
                                <input value={formObject["names"]} placeholder="Ingrese los nombres" onChange={(e)=>{ setFormObject({...formObject, names: e.target.value}) }} type="text" className="form-control" />
                                {fieldsClient.includes("idsexo") && <ErrorText/>}
                            </div>}
                            {formObject["typePersona"] !== "1" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Apellido(s) <span className='text-primary font-bold'>*</span></p>
                                <input value={formObject["lastNames"]} placeholder="Ingrese los apellidos" onChange={(e)=>{ setFormObject({...formObject, lastNames: e.target.value}) }} type="text" className="form-control" />
                                {fieldsClient.includes("Apellidos") && <ErrorText/>}
                            </div>}
                            {(formObject["idsexo"] === "1" && formObject["typePersona"] !== "1" && formObject["idestadocivil"] !== "1") && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Apellido de Casada</p>
                                <input value={formObject["marriedLastName"]} placeholder="Ingrese el apellido de casada" onChange={(e)=>{ setFormObject({...formObject, marriedLastName: e.target.value}) }} type="text" className="form-control" />
                            </div>}
                            {formObject["typePersona"] === "1" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Nombre Comercial <span className='text-primary font-bold'>*</span></p>
                                <input value={formObject["NombreComercial"]} placeholder="Ingrese el nombre comercial" onChange={(e)=>{ setFormObject({...formObject, NombreComercial: e.target.value}) }} type="text" className="form-control" />
                                {fieldsClientJuridic.includes("NombreComercial") && <ErrorText/>}
                            </div>}
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Número Telefónico <span className='text-primary font-bold'>*</span></p>
                                <input value={formObject["cellphone"]} placeholder="Ingrese el número telefónico" onChange={(e)=>{ setFormObject({...formObject, cellphone: e.target.value}) }} type="phone" className="form-control" />
                                {fieldsClient.includes("telefono") && <ErrorText/>}
                            </div>
                            {formObject["typePersona"] === "1" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">País <span className='text-primary font-bold'>*</span></p>
                                <select value={formObject["PaisResidencia"]} onChange={(e)=>{ setFormObject({...formObject, PaisResidencia: e.target.value})  }} className="form-control">
                                    <option value="">Seleccione el pais</option>
                                    {listOfCountries.map((type)=> <option value={type["IdPais"]}>{type["Pais"]}</option> )}
                                </select>
                                {fieldsClientJuridic.includes("PaisResidencia") && <ErrorText/>}
                            </div>}
                            {formObject["typePersona"] !== "1" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Nacionalidad</p>
                                <select defaultValue={formObject["IdPais"]} value={formObject["IdPais"]} onChange={(e)=>{ setFormObject({...formObject, IdPais: e.target.value})  }} className="form-control">
                                    <option value="">Seleccione la nacionalidad</option>
                                    {listOfNationalitys.map((type)=> <option value={type["IdNacionalidad"]}>{type["Nacionalidad"]}</option> )}
                                </select>
                                {fieldsClient.includes("IdPais") && <ErrorText/>}
                            </div>}
                            {formObject["typePersona"] !== "1" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Profesión</p>
                                <select value={formObject["IdProfesion"]} onChange={(e)=>{ setFormObject({...formObject, IdProfesion: e.target.value})  }} className="form-control">
                                    <option value="">Seleccione la profesión</option>
                                    {listOfProfesion.map((type)=> <option value={type["idprofesion"]}>{type["profesion"]}</option> )}
                                </select>
                                {fieldsClient.includes("IdProfesion") && <ErrorText/>}
                            </div>}
                            {formObject["typePersona"] !== "1" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Ocupación</p>
                                <select value={formObject["IdOcupacion"]} onChange={(e)=>{ setFormObject({...formObject, IdOcupacion: e.target.value})  }} className="form-control">
                                    <option value="">Seleccione la ocupación</option>
                                    {listOfOcupations.map((type)=> <option value={type["idOcupation"]}>{type["oCupation"]}</option> )}
                                </select>
                                {fieldsClient.includes("IdOcupacion") && <ErrorText/>}
                            </div>}
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Documento de Identidad <span className='text-primary font-bold'>*</span></p>
                                <input placeholder="Seleccionar" onChange={selectFiles} type="file" className="form-control" />
                            </div>
                            {formObject["typePersona"] !== "1" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3 flex justify-start items-center `}>
                                <p className="input-label flex items-center leading-[2px] mr-2">
                                    PEP
                                    <div className="ml-3 w-1/4">
                                        <div onClick={()=>{
                                            setIsPep(!isPep)
                                        }} className="group rounded-full w-5 h-5 border-solid border-[2.2px] p-[0.9px] box-border border-slate-500 overflow-hidden cursor-pointer flex justify-center items-center">
                                            <span className={`rounded-full transition w-full content-none h-full relative ${isPep ? "group-hover:bg-slate-500 bg-primary" : "group-hover:bg-secondary bg-slate-300"}`}></span>
                                        </div>
                                    </div>
                                </p>
                            </div>}
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3 flex justify-start items-center `}>
                                <p className="input-label flex items-center leading-tight ">
                                    El contratante es el mismo que el asegurado 
                                    <div className="w-1/4">
                                        <div onClick={()=>{
                                            setSameDataContractor(!sameDataContractor)
                                        }} className="group rounded-full w-5 h-5 border-solid border-[2.2px] p-[0.9px] box-border border-slate-500 overflow-hidden cursor-pointer flex justify-center items-center">
                                            <span className={`rounded-full transition w-full content-none h-full relative ${sameDataContractor ? "group-hover:bg-slate-500 bg-primary" : "group-hover:bg-secondary bg-slate-300"}`}></span>
                                        </div>
                                    </div>
                                </p>
                            </div>

                        </div>
                    </div>

                    {isPep && <div className="my-4">
                        <p className={`title-section text-slate-900`}>Referencias Personales</p>
                        <div className="flex flex-wrap content-start">
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Cantidad Rerencias Personales</p>
                                <select defaultValue={formObject.cantidadReferencias} onChange={(e)=>{ setFormObject({...formObject, cantidadReferencias: e.target.value}) }} className="form-control">
                                    <option value="">Seleccione la cantidad</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-wrap content-start">
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Nombre Referencia - 1 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba el nombre de la referencia"} onChange={(e)=>{ setFormObject({...formObject, NombreReferencia1: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Actividad Referencia - 1 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba la actividad de la referencia"} onChange={(e)=>{ setFormObject({...formObject, ActividadReferencia1: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Relación Cliente referencia - 1 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba la relacion cliente referencia"} onChange={(e)=>{ setFormObject({...formObject, RelacionClienteReferencia1: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Teléfono Referencia - 1 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba el telefono de la referencia"} onChange={(e)=>{ setFormObject({...formObject, TelefonoReferencia1: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                        </div>
                        {(formObject.cantidadReferencias === "2"|| formObject.cantidadReferencias === "3") && <div className="flex flex-wrap content-start">
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Nombre Referencia - 2 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba el nombre de la referencia"} onChange={(e)=>{ setFormObject({...formObject, NombreReferencia2: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Actividad Referencia - 2 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba la actividad de la referencia"} onChange={(e)=>{ setFormObject({...formObject, ActividadReferencia2: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Relación Cliente Referencia - 2 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba la relacion cliente referencia"} onChange={(e)=>{ setFormObject({...formObject, RelacionClienteReferencia2: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Teléfono Referencia - 2 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba el telefono de la referencia"} onChange={(e)=>{ setFormObject({...formObject, TelefonoReferencia2: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                        </div>}
                        {formObject.cantidadReferencias === "3" && <div className="flex flex-wrap content-start">
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Nombre Referencia - 3 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba el nombre de la referencia"} onChange={(e)=>{ setFormObject({...formObject, NombreReferencia3: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Actividad Referencia - 3 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba la actividad de la referencia"} onChange={(e)=>{ setFormObject({...formObject, ActividadReferencia3: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Relación Cliente Referencia - 3 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba la relacion cliente referencia"} onChange={(e)=>{ setFormObject({...formObject, RelacionClienteReferencia3: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Teléfono Referencia - 3 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba el telefono de la referencia"} onChange={(e)=>{ setFormObject({...formObject, TelefonoReferencia3: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                        </div>}
                    </div>}

                    { (isPep && formObject["typePersona"] !== "1") && <div className="my-4" ref={thirdRef}>
                        <p className='title-section text-slate-900'>PEP</p>
                        <div className="flex flex-wrap content-start">
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Relación/Cargo <span className='text-primary font-bold'>*</span></p>
                                <input placeholder='Escriba la relacion/cargo' onChange={(e)=>{ setFormObject({...formObject, RelacionCargoPep: e.target.value})  }} type="text" className="form-control"/>
                                {fieldsClientPEP.includes("RelacionCargoPep") && <ErrorText/>}
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Desde <span className='text-primary font-bold'>*</span></p>
                                <InputComponent fromYear={1950} toYear={moment().year().toString()} customOnChange={setFromPEP} daySelected={fromPEP}/>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Hasta <span className='text-primary font-bold'>*</span></p>
                                <InputComponent fromYear={1950} toYear={moment().year().toString()} customOnChange={setUntilPEP} daySelected={untilPEP}/>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Observación PEP</p>
                                <input placeholder='Escriba la observacion PEP' onChange={(e)=>{ setFormObject({...formObject, ObservacionPep: e.target.value})  }} type="text" className="form-control"/>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Otras Actividades Comerciales <span className='text-primary font-bold'>*</span></p>
                                <input placeholder='Escriba las otras actividades comerciales' onChange={(e)=>{ setFormObject({...formObject, OtrasActividadesComercPep: e.target.value})  }} type="text" className="form-control"/>
                                {fieldsClientPEP.includes("OtrasActividadesComercPep") && <ErrorText/>}
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className={"input-label"}>Perfil Financiero</p>
                                <select value={formObject.IdPerfilFinanciero} onChange={(e)=>{ setFormObject({...formObject, IdPerfilFinanciero: e.target.value})  }} className={"form-control"} >
                                    <option value="">Seleccione el perfil financiero</option>
                                    {listOfFinancialProfiles.map((type)=> <option value={type["IdPerfil"]}>{type["Perfil"]}</option> )}
                                </select>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3 flex justify-start items-center `}>
                                <p className="input-label flex items-center leading-[15px!important] ">
                                    Poliza con prima anual (Mayor a 10.000) <span className='text-primary font-bold'>*</span>
                                    <div className="ml-3 w-1/4">
                                        <div onClick={()=>{
                                            setPoliceAnualPrime(!policeAnualPrime)
                                        }} className="group rounded-full w-5 h-5 border-solid border-[2.2px] p-[0.9px] box-border border-slate-500 overflow-hidden cursor-pointer flex justify-center items-center">
                                            <span className={`rounded-full transition w-full content-none h-full relative ${policeAnualPrime ? "group-hover:bg-slate-500 bg-primary" : "group-hover:bg-secondary bg-slate-300"}`}></span>
                                        </div>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>}
                    
                    {!sameDataContractor && <div className="my-4" ref={secondRef}>
                        <p className={`title-section text-slate-900`}>Datos del Contratante</p>
                        <div className="flex flex-wrap content-start relative h-fit">
                            
                            {!loadedIDFromAPI && <span className='w-full h-full absolute bg-white/40 backdrop-blur-sm bottom-0 left-0 z-10 flex flex-col justify-center items-center'>
                                <AiFillLock size={70} color='#242424'/>
                            </span>}
                            
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Tipo de Documento de Identidad</p>
                                <select value={formObject.IdTipoDocumentoContratante} onChange={(e)=>{ changeTypePersonContractor(e.target.value)  }} className={"form-control"}>
                                    <option value="">Seleccione el tipo de documento de identidad</option>
                                    {listOfTypeDocumentContractor.map((type)=> <option value={type["IdTipoDocumento"]}>{type["TipoDocumento"]}</option> )}
                                </select>
                                {fieldsContractor.includes("IdTipoDocumentoContratante") && <ErrorText/>}
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className={"input-label"}>Número de Identificación <span className='text-primary font-bold'>*</span></p>
                                <input value={formObject.CedulaRucContratante} placeholder="Ingrese el número de identificación" onChange={(e)=>{ setFormObject({...formObject, CedulaRucContratante: e.target.value}) }} type="text" className={"form-control"} />
                                {fieldsContractor.includes("CedulaRucContratante") && <ErrorText/>}
                            </div>

                            {formObject["IdTipoDocumentoContratante"] !== "3" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className={"input-label"}>Género</p>
                                <select value={formObject.IdSexoContratante} onChange={(e)=>{ setFormObject({...formObject, IdSexoContratante: e.target.value})  }} className={"form-control"}>
                                    <option value="">Seleccione el género</option>
                                    {listOfGenre.map((type)=> <option value={type["idSexo"]}>{type["sexo"]}</option> )}
                                </select>
                            </div>}
                            {formObject["IdTipoDocumentoContratante"] !== "3" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className={"input-label"}>Estado Civil <span className='text-primary font-bold'>*</span></p>
                                <select value={formObject.IdEsoCivilContratante} onChange={(e)=>{ setFormObject({...formObject, IdEsoCivilContratante: e.target.value})  }} className={"form-control"} >
                                    <option value="">Seleccione el estado civil</option>
                                    {listOfCivilStatus.map((type)=> <option value={type["idEstadoCivil"]}>{type["estadoCivil"]}</option> )}
                                </select>
                                {fieldsContractor.includes("IdEsoCivilContratante") && <ErrorText/>}
                            </div>}
                            {formObject["IdTipoDocumentoContratante"] !== "3" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className={"input-label"}>Fecha de Nacimiento <span className='text-primary font-bold'>*</span></p>
                                <InputComponent customOnChange={setDateBirthClientContractor} daySelected={dateBirthClientContractor} fromYear={1950} toYear={2008}/>
                            </div>}
                            {formObject["IdTipoDocumentoContratante"] !== "3" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className={"input-label"}>Nombre(s) <span className='text-primary font-bold'>*</span></p>
                                <input placeholder="Ingrese los nombres" value={formObject.NombreContratante} onChange={(e)=>{ setFormObject({...formObject, NombreContratante: e.target.value}) }} type="text" className={"form-control"} />
                                {fieldsContractor.includes("NombreContratante") && <ErrorText/>}
                            </div>}
                            {formObject["IdTipoDocumentoContratante"] !== "3" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className={"input-label"}>Apellido(s) <span className='text-primary font-bold'>*</span></p>
                                <input placeholder="Ingrese los apellidos" value={formObject.ApellidoContratante} onChange={(e)=>{ setFormObject({...formObject, ApellidoContratante: e.target.value}) }} type="text" className={"form-control"} />
                                {fieldsContractor.includes("ApellidoContratante") && <ErrorText/>}
                            </div>}
                            {(formObject["IdSexoContratante"] === "1" && formObject["IdEsoCivilContratante"] !== "1") && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className={"input-label"}>Apellido de Casada</p>
                                <input value={formObject.ApellidoCasadaContratante} placeholder="Ingrese el apellido de casada" onChange={(e)=>{ setFormObject({...formObject, ApellidoCasadaContratante: e.target.value}) }} type="text" className={"form-control"} />
                            </div>}
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className={"input-label"}>Correo Electrónico <span className='text-primary font-bold'>*</span></p>
                                <input placeholder="Ingrese el correo electrónico" value={formObject.EmailContratante} onChange={(e)=>{ setFormObject({...formObject, EmailContratante: e.target.value}) }} type="email" className={"form-control"} />
                                {fieldsContractor.includes("EmailContratante") && <ErrorText/>}
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className={"input-label"}>Número Telefónico</p>
                                <input placeholder="Ingrese el número telefónico" value={formObject.TelefonoContratante} onChange={(e)=>{ setFormObject({...formObject, TelefonoContratante: e.target.value}) }} type="phone" className={"form-control"} />
                            </div>
                            {formObject["IdTipoDocumentoContratante"] === "3" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Nombre Comercial <span className='text-primary font-bold'>*</span></p>
                                <input value={formObject["NombreComercialContratante"]} placeholder="Ingrese el nombre comercial" onChange={(e)=>{ setFormObject({...formObject, NombreComercialContratante: e.target.value}) }} type="text" className="form-control" />
                                {fieldsContractorJuridic.includes("NombreComercialContratante") && <ErrorText/>}
                            </div>}
                            {formObject["IdTipoDocumentoContratante"] === "3" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Representante Legal <span className='text-primary font-bold'>*</span></p>
                                <input value={formObject["RepresentanteLegalContratante"]} placeholder="Ingrese el representante legal" onChange={(e)=>{ setFormObject({...formObject, RepresentanteLegalContratante: e.target.value}) }} type="text" className="form-control" />
                                {fieldsContractorJuridic.includes("RepresentanteLegalContratante") && <ErrorText/>}
                            </div>}
                            {formObject["IdTipoDocumentoContratante"] === "3" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Actividad Comercial Principal <span className='text-primary font-bold'>*</span></p>
                                <input value={formObject["ActividadComercialPrincipalContratante"]} placeholder="Ingrese la actividad comercial principal" onChange={(e)=>{ setFormObject({...formObject, ActividadComercialPrincipalContratante: e.target.value}) }} type="text" className="form-control" />
                                {fieldsContractorJuridic.includes("ActividadComercialPrincipalContratante") && <ErrorText/>}
                            </div>}
                            {formObject["IdTipoDocumentoContratante"] === "3" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Nombre Beneficiario</p>
                                <input value={formObject["NombreBeneficiarioContratante"]} placeholder="Ingrese el nombre del beneficiario" onChange={(e)=>{ setFormObject({...formObject, NombreBeneficiarioContratante: e.target.value}) }} type="text" className="form-control" />
                            </div>}
                            {formObject["IdTipoDocumentoContratante"] === "3" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Identificacion Beneficiario</p>
                                <input value={formObject["IdentificacionBeneficiarioContratante"]} placeholder="Ingrese la identificacion del beneficiario" onChange={(e)=>{ setFormObject({...formObject, IdentificacionBeneficiarioContratante: e.target.value}) }} type="text" className="form-control" />
                            </div>}
                            {formObject["IdTipoDocumentoContratante"] !== "3" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className={"input-label"}>Nacionalidad <span className='text-primary font-bold'>*</span></p>
                                <select value={formObject.IdNacionalidadContratante} onChange={(e)=>{ setFormObject({...formObject, IdNacionalidadContratante: e.target.value})  }} className={"form-control"} >
                                    <option value="">Seleccione la nacionalidad</option>
                                    {listOfNationalitys.map((type)=> <option value={type["IdNacionalidad"]}>{type["Nacionalidad"]}</option> )}
                                </select>
                            </div>}
                            {formObject["IdTipoDocumentoContratante"] !== "3" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className={"input-label"}>Profesión</p>
                                <select value={formObject.IdProfesionContratante} onChange={(e)=>{ setFormObject({...formObject, IdProfesionContratante: e.target.value})  }} className={"form-control"} >
                                    <option value="">Seleccione la profesión</option>
                                    {listOfProfesion.map((type)=> <option value={type["idprofesion"]}>{type["profesion"]}</option> )}
                                </select>
                            </div>}
                            {formObject["IdTipoDocumentoContratante"] !== "3" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className={"input-label"}>Ocupación</p>
                                <select value={formObject.IdOcupacionContratante} onChange={(e)=>{ setFormObject({...formObject, IdOcupacionContratante: e.target.value})  }} className={"form-control"} >
                                    <option value="">Seleccione la ocupación</option>
                                    {listOfOcupations.map((type)=> <option value={type["idOcupation"]}>{type["oCupation"]}</option> )}
                                </select>
                            </div>}
                            {formObject["IdTipoDocumentoContratante"] !== "3" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className={"input-label"}>Documento de identidad <span className='text-primary font-bold'>*</span></p>
                                <input placeholder="Seleccionar" onChange={selectFiles}  type="file" className={"form-control"} />
                            </div>}

                            {formObject["IdTipoDocumentoContratante"] !== "3" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3 flex justify-start items-center `}>
                                <p className="input-label flex items-center leading-[2px] mr-2">
                                    PEP
                                    <div className="ml-3 w-1/4">
                                        <div onClick={()=>{
                                            setIsPepContractor(!isPepContractor)
                                        }} className="group rounded-full w-5 h-5 border-solid border-[2.2px] p-[0.9px] box-border border-slate-500 overflow-hidden cursor-pointer flex justify-center items-center">
                                            <span className={`rounded-full transition w-full content-none h-full relative ${isPepContractor ? "group-hover:bg-slate-500 bg-primary" : "group-hover:bg-secondary bg-slate-300"}`}></span>
                                        </div>
                                    </div>
                                </p>
                            </div>}

                        </div>
                    </div>}

                    {isPepContractor && <div className="my-4">
                        <p className={`title-section text-slate-900`}>Referencias Personales - Contratante</p>
                        <div className="flex flex-wrap content-start">
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Cantidad referencias personales</p>
                                <select defaultValue={formObject.cantidadReferenciasContratante} onChange={(e)=>{ setFormObject({...formObject, cantidadReferenciasContratante: e.target.value}) }} className="form-control">
                                    <option value="">Seleccione la cantidad</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-wrap content-start">
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Nombre Referencia - 1 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba el nombre de la referencia"} onChange={(e)=>{ setFormObject({...formObject, NombreReferencia1Contratante: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Actividad Referencia - 1 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba la actividad de la referencia"} onChange={(e)=>{ setFormObject({...formObject, ActividadReferencia1Contratante: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Relación Cliente Referencia - 1 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba la relacion cliente referencia"} onChange={(e)=>{ setFormObject({...formObject, RelacionClienteReferencia1Contratante: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Teléfono Referencia - 1 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba el telefono de la referencia"} onChange={(e)=>{ setFormObject({...formObject, TelefonoReferencia1Contratante: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                        </div>
                        {(formObject.cantidadReferenciasContratante === "2"|| formObject.cantidadReferenciasContratante === "3") && <div className="flex flex-wrap content-start">
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Nombre Referencia - 2 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba el nombre de la referencia"} onChange={(e)=>{ setFormObject({...formObject, NombreReferencia2Contratante: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Actividad Referencia - 2 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba la actividad de la referencia"} onChange={(e)=>{ setFormObject({...formObject, ActividadReferencia2Contratante: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Relación Cliente Referencia - 2 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba la relacion cliente referencia"} onChange={(e)=>{ setFormObject({...formObject, RelacionClienteReferencia2Contratante: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Teléfono Referencia - 2 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba el telefono de la referencia"} onChange={(e)=>{ setFormObject({...formObject, TelefonoReferencia2Contratante: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                        </div>}
                        {formObject.cantidadReferenciasContratante === "3" && <div className="flex flex-wrap content-start">
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Nombre Referencia - 3 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba el nombre de la referencia"} onChange={(e)=>{ setFormObject({...formObject, NombreReferencia3Contratante: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Actividad Referencia - 3 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba la actividad de la referencia"} onChange={(e)=>{ setFormObject({...formObject, ActividadReferencia3Contratante: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Relación Cliente Referencia - 3 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba la relacion cliente referencia"} onChange={(e)=>{ setFormObject({...formObject, RelacionClienteReferencia3Contratante: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Teléfono Referencia - 3 <span className='text-primary font-bold'>*</span></p>
                                <input placeholder={"Escriba el telefono de la referencia"} onChange={(e)=>{ setFormObject({...formObject, TelefonoReferencia3Contratante: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                        </div>}
                    </div>}

                    { (isPepContractor && formObject["IdTipoDocumentoContratante"] !== "3" && !sameDataContractor) && <div className="my-4" ref={thirdRef}>
                        <p className='title-section text-slate-900'>PEP - Contratante</p>
                        <div className="flex flex-wrap content-start">
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Relación/Cargo <span className='text-primary font-bold'>*</span></p>
                                <input placeholder='Escriba la relacion/cargo' onChange={(e)=>{ setFormObject({...formObject, RelacionCargoPepContratante: e.target.value})  }} type="text" className="form-control"/>
                                {fieldsContractorPEP.includes("RelacionCargoPepContratante") && <ErrorText/>}
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Desde <span className='text-primary font-bold'>*</span></p>
                                <InputComponent fromYear={1950} toYear={moment().year().toString()} customOnChange={setFromPEPContractor} daySelected={fromPEPContractor}/>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Hasta <span className='text-primary font-bold'>*</span></p>
                                <InputComponent fromYear={1950} toYear={moment().year().toString()} customOnChange={setUntilPEPContractor} daySelected={untilPEPContractor}/>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Observacion PEP</p>
                                <input placeholder='Escriba la observacion PEP' onChange={(e)=>{ setFormObject({...formObject, ObservacionPepContratante: e.target.value})  }} type="text" className="form-control"/>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Otras Actividades Comerciales <span className='text-primary font-bold'>*</span></p>
                                <input placeholder='Escriba las otras actividades comerciales' onChange={(e)=>{ setFormObject({...formObject, OtrasActividadesComercPepContratante: e.target.value})  }} type="text" className="form-control"/>
                                {fieldsContractorPEP.includes("OtrasActividadesComercPepContratante") && <ErrorText/>}
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className={"input-label"}>Perfil Financiero</p>
                                <select value={formObject.IdPerfilFinancieroContratante} onChange={(e)=>{ setFormObject({...formObject, IdPerfilFinancieroContratante: e.target.value})  }} className={"form-control"} >
                                    <option value="">Seleccione el perfil financiero</option>
                                    {listOfFinancialProfiles.map((type)=> <option value={type["IdPerfil"]}>{type["Perfil"]}</option> )}
                                </select>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3 flex justify-start items-center `}>
                                <p className="input-label flex items-center leading-[15px!important] ">
                                    Poliza con prima anual (Mayor a 10.000) <span className='text-primary font-bold'>*</span>
                                    <div className="ml-3 w-1/4">
                                        <div onClick={()=>{
                                            setPoliceAnualPrimeContractor(!policeAnualPrimeContractor)
                                        }} className="group rounded-full w-5 h-5 border-solid border-[2.2px] p-[0.9px] box-border border-slate-500 overflow-hidden cursor-pointer flex justify-center items-center">
                                            <span className={`rounded-full transition w-full content-none h-full relative ${policeAnualPrimeContractor ? "group-hover:bg-slate-500 bg-primary" : "group-hover:bg-secondary bg-slate-300"}`}></span>
                                        </div>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>}

                    <div className="my-4" ref={thirdRef}>
                        <p className='title-section text-slate-900'>Dirección</p>
                        <div className="flex flex-wrap content-start relative h-fit">
                            
                            {!loadedIDFromAPI && <span className='w-full h-full absolute bg-white/40 backdrop-blur-sm bottom-0 left-0 z-10 flex flex-col justify-center items-center'>
                                <AiFillLock size={70} color='#242424'/>
                            </span>}

                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Provincia <span className='text-primary font-bold'>*</span></p>
                                <select defaultValue={formObject["IdProvincia"]} onChange={(e)=>{ getDataFromValue(+e.target.value, "provincia") }} className="form-control">
                                    <option value="">Seleccione la provincia</option>
                                    {listOfProvincias.map((type)=> <option value={type["id"]}>{type["descripcion"]}</option> )}
                                </select>
                                {fieldsClient.includes("IdProvincia") && <ErrorText/>}
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Distrito <span className='text-primary font-bold'>*</span></p>
                                <select defaultValue={formObject["IdDistrito"]} onChange={(e)=>{ getDataFromValue(+e.target.value, "distrito") }} className="form-control">
                                    <option value="">Seleccione el distrito</option>
                                    {listOfDistritos.map((type)=> <option value={type["id"]}>{type["descripcion"]}</option> )}
                                </select>
                                {fieldsClient.includes("IdDistrito") && <ErrorText/>}
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Corregimiento <span className='text-primary font-bold'>*</span></p>
                                <select defaultValue={formObject["IdCorregimiento"]} onChange={(e)=>{ getDataFromValue(+e.target.value, "corregimiento") }} className="form-control">
                                    <option value="">Seleccione el distrito</option>
                                    {listOfCorregimientos.map((type)=> <option value={type["id"]}>{type["descripcion"]}</option> )}
                                </select>
                                {fieldsClient.includes("IdCorregimiento") && <ErrorText/>}
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Urbanización <span className='text-primary font-bold'>*</span></p>
                                <input value={formObject["Urbanizacion"]} placeholder='Escriba la urbanización' onChange={(e)=>{ setFormObject({...formObject, Urbanizacion: e.target.value})  }} type="text" className="form-control"/>
                                {fieldsClient.includes("Urbanizacion") && <ErrorText/>}
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Calle <span className='text-primary font-bold'>*</span></p>
                                <input value={formObject["Calle"]} placeholder={"Escriba la calle"} onChange={(e)=>{ setFormObject({...formObject, Calle: e.target.value}) }} type="text" className="form-control" />
                                {fieldsClient.includes("Calle") && <ErrorText/>}
                            </div>
                            {formObject["typePersona"] !== "1" && <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Apartamento / Casa</p>
                                <input value={formObject["ApartamentoCasa"]} placeholder={"Escriba el apartamento / casa"} onChange={(e)=>{ setFormObject({...formObject, ApartamentoCasa: e.target.value}) }} type="text" className="form-control" />
                            </div>}
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Dirección <span className='text-primary font-bold'>*</span></p>
                                <input value={formObject["Direccion"]}  placeholder={"Escriba la dirección"} onChange={(e)=>{ setFormObject({...formObject, Direccion: e.target.value}) }} type="text" className="form-control" />
                                {fieldsClient.includes("Direccion") && <ErrorText/>}
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Observación</p>
                                <textarea placeholder={"Escriba la observacion"} onChange={(e)=>{ setFormObject({...formObject, Observacion: e.target.value}) }} type="text" className="form-control"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="my-4" ref={fourthRef}>
                        <p className={`title-section text-slate-900`}>Conductor Adicional</p>
                        <div className="flex flex-wrap content-start relative">
                            
                            {!loadedIDFromAPI && <span className='w-full h-full absolute bg-white/40 backdrop-blur-sm bottom-0 left-0 z-10 flex flex-col justify-center items-center'>
                                <AiFillLock size={70} color='#242424'/>
                            </span>}

                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Nombre(s)</p>
                                <input defaultValue={formObject["NombreConductorAdicional"]} placeholder={"Escriba los nombres del conductor adicional"} onChange={(e)=>{ setFormObject({...formObject, NombreConductorAdicional: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Apellido(s)</p>
                                <input defaultValue={formObject["ApellidoConductorAdic"]} placeholder={"Escriba los apellidos del conductor adicional"} onChange={(e)=>{ setFormObject({...formObject, ApellidoConductorAdic: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Identificación</p>
                                <input defaultValue={formObject["IdentificacionAdic"]} placeholder={"Escriba el identificacion del conductor adicional"} onChange={(e)=>{ setFormObject({...formObject, IdentificacionAdic: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="my-4" ref={fourthRef}>
                        <p className={`title-section text-slate-900`}>Datos del Automóvil</p>
                        <div className="flex flex-wrap content-start relative">
                            
                            {!loadedIDFromAPI && <span className='w-full h-full absolute bg-white/40 backdrop-blur-sm bottom-0 left-0 z-10 flex flex-col justify-center items-center'>
                                <AiFillLock size={70} color='#242424'/>
                            </span>}

                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Marca <span className='text-primary font-bold'>*</span></p>
                                <select value={formObject["marcaid"]} onChange={(e)=>{ getDataFromValue(+e.target.value, "model")  }} className="form-control">
                                    <option value="">Seleccione la marca</option>
                                    {listOfVehiculeBrands.map((type)=> <option value={type["idMarca"]}>{type["marca"]}</option> )}
                                </select>
                                {fieldsClient.includes("marcaid") && <ErrorText/>}
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Modelo <span className='text-primary font-bold'>*</span></p>
                                <select value={formObject["modeloid"]} onChange={(e)=>{ setFormObject({...formObject, modeloid: +e.target.value})  }} className="form-control">
                                    <option value="">Seleccione el modelo</option>
                                    {listOfVehiculeModels.map((type)=> <option value={type["idModelo"]}>{type["modelo"]}</option> )}
                                </select>
                                {fieldsClient.includes("modeloid") && <ErrorText/>}
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Año <span className='text-primary font-bold'>*</span></p>
                                <select value={formObject["Ano"]} onChange={(e)=>{ setFormObject({...formObject, Ano: e.target.value}) }} className="form-control">
                                    <option value="">Escriba el año</option>
                                    {listOfYears.map((year, i)=> <option value={year} key={i}>{year}</option> )}
                                </select>
                                {fieldsClient.includes("Ano") && <ErrorText/>}
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3 flex justify-start items-center `}>
                                <p className="input-label flex items-center leading-tight ">
                                    Importado 
                                    <div className="ml-3 w-1/4">
                                        <div onClick={()=>{
                                            setImported(!imported)
                                        }} className="group rounded-full w-5 h-5 border-solid border-[2.2px] p-[0.9px] box-border border-slate-500 overflow-hidden cursor-pointer flex justify-center items-center">
                                            <span className={`rounded-full transition w-full content-none h-full relative ${imported ? "group-hover:bg-slate-500 bg-primary" : "group-hover:bg-secondary bg-slate-300"}`}></span>
                                        </div>
                                    </div>
                                </p>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Estado del Auto <span className='text-primary font-bold'>*</span></p>
                                <div className="flex justify-between items-center">
                                    <p className="input-label flex items-center leading-[2px] mr-2">
                                        Nuevo
                                        <div className="ml-3 w-1/4">
                                            <div className="group rounded-full w-5 h-5 border-solid border-[2.2px] p-[0.9px] box-border border-slate-500 overflow-hidden cursor-pointer flex justify-center items-center">
                                                <span className={`rounded-full transition w-full content-none h-full relative ${formObject["Ano"] >= "2023" ? "group-hover:bg-slate-500 bg-primary" : "group-hover:bg-secondary bg-slate-300"}`}></span>
                                            </div>
                                        </div>
                                    </p>
                                        
                                    <p className="input-label flex items-center leading-[2px] mr-2">
                                        Usado
                                        <div className="ml-3 w-1/4">
                                            <div className="group rounded-full w-5 h-5 border-solid border-[2.2px] p-[0.9px] box-border border-slate-500 overflow-hidden cursor-pointer flex justify-center items-center">
                                                <span className={`rounded-full transition w-full content-none h-full relative ${formObject["Ano"] < "2023" ? "group-hover:bg-slate-500 bg-primary" : "group-hover:bg-secondary bg-slate-300"}`}></span>
                                            </div>
                                        </div>
                                    </p>
                                </div>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Remolque <span className='text-primary font-bold'>*</span></p>
                                <div className="flex justify-between items-center">
                                    <p className="input-label flex items-center leading-[2px] mr-2">
                                        Si
                                        <div className="ml-3 w-1/4">
                                            <div onClick={()=>{
                                                setFormObject({...formObject, Remolque: 1})
                                            }} className="group rounded-full w-5 h-5 border-solid border-[2.2px] p-[0.9px] box-border border-slate-500 overflow-hidden cursor-pointer flex justify-center items-center">
                                                <span className={`rounded-full transition w-full content-none h-full relative ${formObject.Remolque === 1 ? "group-hover:bg-slate-500 bg-primary" : "group-hover:bg-secondary bg-slate-300"}`}></span>
                                            </div>
                                        </div>
                                    </p>
                                        
                                    <p className="input-label flex items-center leading-[2px] mr-2">
                                        No
                                        <div className="ml-3 w-1/4">
                                            <div onClick={()=>{
                                                setFormObject({...formObject, Remolque: 2})
                                            }} className="group rounded-full w-5 h-5 border-solid border-[2.2px] p-[0.9px] box-border border-slate-500 overflow-hidden cursor-pointer flex justify-center items-center">
                                                <span className={`rounded-full transition w-full content-none h-full relative ${formObject.Remolque === 2 ? "group-hover:bg-slate-500 bg-primary" : "group-hover:bg-secondary bg-slate-300"}`}></span>
                                            </div>
                                        </div>
                                    </p>
                                </div>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Valor Vehículo <span className='text-primary font-bold'>*</span></p>
                                <NumericFormat value={formObject["ValorVehiculo"]} className="form-control" onChange={(e)=>{ setFormObject({...formObject, ValorVehiculo: e.target.value}) }} thousandSeparator="," />
                                {fieldsClient.includes("ValorVehiculo") && <ErrorText/>}
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Número de Motor <span className='text-primary font-bold'>*</span></p>
                                <input value={formObject["numeroMotor"]} placeholder={"Ingrese el número del motor"} onChange={(e)=>{ setFormObject({...formObject, numeroMotor: e.target.value}) }} type={"text"} className="form-control" />
                                {fieldsClient.includes("motor") && <ErrorText/>}
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Número de Chasis <span className='text-primary font-bold'>*</span></p>
                                <input value={formObject["numeroChasis"]} placeholder={"Ingrese el número de chasis"} onChange={(e)=>{ setFormObject({...formObject, numeroChasis: e.target.value}) }} type={"text"} className="form-control" />
                                {fieldsClient.includes("chasis") && <ErrorText/>}
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Placa <span className='text-primary font-bold'>*</span></p>
                                <input value={formObject["Placa"]} placeholder={"Ingrese la placa"} onChange={(e)=>{ setFormObject({...formObject, Placa: e.target.value}) }} type={"text"} className="form-control" />
                                {fieldsClient.includes("Placa") && <ErrorText/>}
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Color</p>
                                <input value={formObject["Color"]} placeholder={"Escriba el color"} onChange={(e)=>{ setFormObject({...formObject, Color: e.target.value}) }} type={"text"} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Cantidad de Pasajeros <span className='text-primary font-bold'>*</span></p>
                                <input value={formObject["CantidadPasajeros"]} placeholder={"Escriba la cantidad de pasajeros"} onChange={(e)=>{ setFormObject({...formObject, CantidadPasajeros: e.target.value}) }} type={"number"} min={0} className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/4"} mb-3 px-3`}>
                                <p className="input-label">Registro Vehicular (pdf, jpg, png)</p>
                                <input placeholder={"Seleccionar"} onChange={selectFiles} type={"file"} className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
    //8-762-6451
    function handleCopyPasteDataContractor(defaultValue, personValue){
        if(sameDataContractor){
            return personValue
        }
        return defaultValue
    }

    function handleName(){
        let returnedValue = ""
        if(formObject["typePersona"] === "1"){
            returnedValue = formObject["NombreComercial"] ?? ""
        }else{
            returnedValue = formObject["names"] ?? ""
        }
        return returnedValue
    }

    function checkLastName(){
        let lastName = ""
        if(formObject["idsexo"] === "1" && formObject["lastNames"] !== undefined){
            lastName = `${formObject["lastNames"]} ${formObject["marriedLastName"]}`
        }else{
            lastName = `${formObject["lastNames"] ?? ""}`
        }
        
        return lastName
    }

    function handleDateFormat(prop){
        let returnedDate = prop !== undefined ? 
            moment(prop).format("YYYY-MM-DD").toString()
        : ""
        return returnedDate
    }

    function removeDotsAndCommas(prop, symbol){
        if(prop){
            prop = prop.toString()
            let returnedValue = prop.replace(symbol, "")
            return returnedValue
        }
    }

    function handleValidationFunction(){
        let postObject = {
            Ano: formObject["Ano"] ?? "",
            ApartamentoCasa: formObject["ApartamentoCasa"] ?? "",
            Apellidos: checkLastName(),
            nombres: handleName(),
            Calle: formObject["Calle"] ?? "",
            Color: formObject["Color"] ?? "",
            Direccion: formObject["Direccion"] ?? "",
            IdCorregimiento: formObject["IdCorregimiento"] ?? "",
            IdDistrito: formObject["IdDistrito"] ?? "",
            IdEntidadOperador: localStorage.getItem("IdEntidadOperador"),
            IdEntidadVendedor: localStorage.getItem("IdEntidadVendedor"),
            IdOcupacion: formObject["IdOcupacion"] ?? "",
            IdPais: formObject["IdPais"] ?? "",
            IdProfesion: formObject["IdProfesion"] ?? "",
            IdProvincia: formObject["IdProvincia"] ?? "",
            IdTipoEmision: 2,
            Urbanizacion: formObject["Urbanizacion"] ?? "",
            idCorredor: localStorage.getItem("idCorredor"),
            Placa: formObject["Placa"] ?? "",
            Token: localStorage.getItem("token_api"),
            chasis: formObject["numeroChasis"] ?? "",
            dctoPlan: "0",
            email: formObject["email"] ?? "",
            fechanacimiento: handleDateFormat( dateBirthClient ),
            idcompania: data.state["idCompania"],
            identificacion: formObject["numberId"] ?? "",
            idestadocivil: formObject["idestadocivil"] ?? "",
            idplan: data.state["idPlan"],
            idsexo: formObject["idsexo"] ?? 1,
            marcaid: formObject["marcaid"] ?? "",
            modeloid: formObject["modeloid"] ?? "",
            motor: formObject["numeroMotor"] ?? "",
            telefono: formObject["cellphone"] ?? "",
            tipointeres: data.state["tipoInteres"],
            totalplan: data.state["totalPlan"],
            idtipodocumento: formObject["idtipodocumento"] ?? 1,

            IdPep: isPep ? 1 : 2,
            IdPepContratante: isPepContractor ? 1 : 2,
            ContratanteIgualAsegurado: sameDataContractor ? 1 : 2,

            NombreContratante: handleCopyPasteDataContractor( formObject["NombreContratante"], formObject["names"]) ?? "",
            ApellidoContratante: handleCopyPasteDataContractor( formObject["ApellidoContratante"], formObject["lastNames"]) ?? "",
            ApellidoCasadaContratante: handleCopyPasteDataContractor( formObject["ApellidoCasadaContratante"], formObject["marriedLastName"]) ?? "",
            FechaNacimientoContratante: handleCopyPasteDataContractor( handleDateFormat( dateBirthClient ), handleDateFormat( dateBirthClientContractor )) ?? "",
            CedulaRucContratante: handleCopyPasteDataContractor( formObject["CedulaRucContratante"], formObject["numberId"]) ?? "",
            IdTipoDocumentoContratante: sameDataContractor ? "3" : formObject["IdTipoDocumentoContratante"],
            IdTipoPersonaContratante: formObject["IdTipoPersonaContratante"] ?? "",
            IdSexoContratante: handleCopyPasteDataContractor( formObject["IdSexoContratante"], formObject["idsexo"]),
            EmailContratante: handleCopyPasteDataContractor( formObject["EmailContratante"], formObject["email"]) ?? "",
            TelefonoContratante: handleCopyPasteDataContractor( formObject["TelefonoContratante"], formObject["cellphone"]) ?? "",
            IdNacionalidadContratante: handleCopyPasteDataContractor( formObject["IdNacionalidadContratante"], formObject["IdPais"]) ?? "",
            IdEsoCivilContratante: handleCopyPasteDataContractor( formObject["IdEsoCivilContratante"], formObject["idestadocivil"]) ?? "",
            IdProfesionContratante: handleCopyPasteDataContractor( formObject["IdProfesionContratante"], formObject["IdProfesion"]) ?? "",
            IdOcupacionContratante: handleCopyPasteDataContractor( formObject["IdOcupacionContratante"], formObject["IdOcupacion"]) ?? "",
            PolizaAnualMayorLimiteContratante: policeAnualPrime ? 1 : 2,
            PolizaAnualMayorLimiteContratanteContratante: policeAnualPrimeContractor ? 1 : 2,
            IdPerfilFinanciero: formObject["IdPerfilFinanciero"] ?? "",
            IdPerfilFinancieroContratante: formObject["IdPerfilFinancieroContratante"] ?? "",

            NombreComercialContratante: handleCopyPasteDataContractor( formObject["NombreComercialContratante"], formObject["NombreComercial"]) ?? "",
            RepresentanteLegalContratante: handleCopyPasteDataContractor( formObject["RepresentanteLegalContratante"], formObject["RepresentanteLegal"]) ?? "",
            ActividadComercialPrincipalContratante: handleCopyPasteDataContractor( formObject["ActividadComercialPrincipalContratante"], formObject["ActividadComercialPrincipal"]) ?? "",
            NombreBeneficiarioContratante: handleCopyPasteDataContractor( formObject["NombreBeneficiarioContratante"], formObject["NombreBeneficiario"]) ?? "",
            IdentificacionBeneficiarioContratante: handleCopyPasteDataContractor( formObject["IdentificacionBeneficiarioContratante"], formObject["IdentificacionBeneficiario"]) ?? "",

            NombreComercial: formObject["NombreComercial"] ?? "",
            RepresentanteLegal: formObject["RepresentanteLegal"] ?? "",
            PaisResidencia: formObject["PaisResidencia"] ?? "",
            ActividadComercialPrincipal: formObject["ActividadComercialPrincipal"] ?? "",
            NombreBeneficiario: formObject["NombreBeneficiario"] ?? "",
            IdentificacionBeneficiario: formObject["IdentificacionBeneficiario"] ?? "",
            EstadoAuto: formObject["EstadoAuto"] ?? "2",
            Remolque: formObject["Remolque"] ?? "2",

            NombreConductorAdicional: formObject["NombreConductorAdicional"] ?? "",
            ApellidoConductorAdic: formObject["ApellidoConductorAdic"] ?? "",
            IdentificacionAdic: formObject["IdentificacionAdic"] ?? "",
            CantidadPasajeros: formObject["CantidadPasajeros"] ?? 0,
            ImportadoAutomovil: imported ? 1 : 2,
            IdUsoVehiculo: formObject["IdUsoVehiculo"] ?? 1,
            ValorVehiculo: removeDotsAndCommas(formObject["ValorVehiculo"], ",") ?? 0,
            
            RelacionCargoPep: formObject["RelacionCargoPep"] ?? "",
            DesdePep: handleDateFormat( fromPEP ) ?? "",
            HastaPep: handleDateFormat( untilPEP ) ?? "",
            ObservacionPep: formObject["ObservacionPep"] ?? "",
            OtrasActividadesComercPep: formObject["OtrasActividadesComercPep"] ?? "",
            
            RelacionCargoPepContratante: handleCopyPasteDataContractor(formObject["RelacionCargoPepContratante"], formObject["RelacionCargoPep"]) ?? "",
            DesdePepContratante: handleCopyPasteDataContractor(handleDateFormat( fromPEPContractor ), handleDateFormat( fromPEP )) ?? "",
            HastaPepContratante: handleCopyPasteDataContractor(handleDateFormat( untilPEPContractor ), handleDateFormat( untilPEP )) ?? "",
            ObservacionPepContratante: handleCopyPasteDataContractor(formObject["ObservacionPepContratante"], formObject["ObservacionPep"]) ?? "",
            OtrasActividadesComercPepContratante: handleCopyPasteDataContractor(formObject["OtrasActividadesComercPepContratante"], formObject["OtrasActividadesComercPep"]) ?? "",

            NombreReferencia1: formObject["NombreReferencia1"] ?? "",
            ActividadReferencia1: formObject["ActividadReferencia1"] ?? "",
            RelacionClienteReferencia1: formObject["RelacionClienteReferencia1"] ?? "",
            TelefonoReferencia1: formObject["TelefonoReferencia1"] ?? "",
            
            NombreReferencia2: formObject["NombreReferencia2"] ?? "",
            ActividadReferencia2: formObject["ActividadReferencia2"] ?? "",
            RelacionClienteReferencia2: formObject["RelacionClienteReferencia2"] ?? "",
            TelefonoReferencia2: formObject["TelefonoReferencia2"] ?? "",

            NombreReferencia3: formObject["NombreReferencia3"] ?? "",
            ActividadReferencia3: formObject["ActividadReferencia3"] ?? "",
            RelacionClienteReferencia3: formObject["RelacionClienteReferencia3"] ?? "",
            TelefonoReferencia3: formObject["TelefonoReferencia3"] ?? "",
            
            NombreReferencia1Contratante: handleCopyPasteDataContractor(formObject["NombreReferencia1Contratante"], formObject["NombreReferencia1"]) ?? "",
            ActividadReferencia1Contratante: handleCopyPasteDataContractor(formObject["ActividadReferencia1Contratante"], formObject["ActividadReferencia1"]) ?? "",
            RelacionClienteReferencia1Contratante: handleCopyPasteDataContractor(formObject["RelacionClienteReferencia1Contratante"], formObject["RelacionClienteReferencia1"]) ?? "",
            TelefonoReferencia1Contratante: handleCopyPasteDataContractor(formObject["TelefonoReferencia1Contratante"], formObject["TelefonoReferencia1"]) ?? "",
            
            NombreReferencia2Contratante: handleCopyPasteDataContractor(formObject["NombreReferencia2Contratante"], formObject["NombreReferencia2"]) ?? "",
            ActividadReferencia2Contratante: handleCopyPasteDataContractor(formObject["ActividadReferencia2Contratante"], formObject["ActividadReferencia2"]) ?? "",
            RelacionClienteReferencia2Contratante: handleCopyPasteDataContractor(formObject["RelacionClienteReferencia2Contratante"], formObject["RelacionClienteReferencia2"]) ?? "",
            TelefonoReferencia2Contratante: handleCopyPasteDataContractor(formObject["TelefonoReferencia2Contratante"], formObject["TelefonoReferencia2"]) ?? "",

            NombreReferencia3Contratante: handleCopyPasteDataContractor(formObject["NombreReferencia3Contratante"], formObject["NombreReferencia3"]) ?? "",
            ActividadReferencia3Contratante: handleCopyPasteDataContractor(formObject["ActividadReferencia3Contratante"], formObject["ActividadReferencia3"]) ?? "",
            RelacionClienteReferencia3Contratante: handleCopyPasteDataContractor(formObject["RelacionClienteReferencia3Contratante"], formObject["RelacionClienteReferencia3"]) ?? "",
            TelefonoReferencia3Contratante: handleCopyPasteDataContractor(formObject["TelefonoReferencia3Contratante"], formObject["TelefonoReferencia3"])  ?? ""
        }
        return postObject
    }

    function manageQuoterRegister(){
        let object = handleValidationFunction()
        console.log(object)

        let _fieldsClient = validators.validateObjectWithList(client_natural_list, object)
        let _fieldsContractor = validators.validateObjectWithList(contractor_natural_list, object)
        
        if(formObject["typePersona"] === "2") setFieldsClient(_fieldsClient)
        if(formObject["IdTipoDocumentoContratante"] !== "3") setFieldsContractor(_fieldsContractor)
        
        let _fieldsClientJuridic = validators.validateObjectWithList(client_juridic_list, object)
        let _fieldsContractorJuridic = validators.validateObjectWithList(contractor_juridic_list, object)
        
        if(formObject["typePersona"] !== "2") setFieldsClientJuridic(_fieldsClientJuridic)
        if(formObject["IdTipoDocumentoContratante"] === "3") setFieldsContractorJuridic(_fieldsContractorJuridic)
        
        let _fieldsClientPEP = validators.validateObjectWithList(pep_list, object)
        let _fieldsContractorPEP = validators.validateObjectWithList(pep_juridic_list, object)

        if(isPep) setFieldsClientPEP(_fieldsClientPEP)
        if(isPepContractor) setFieldsContractorPEP(_fieldsContractorPEP)

        //Email Validation
        if(!validators.validateField("email", object["email"])){
            setErrorMessage("El email no es correcto")
            setErrorStatus(true)
            return false
        }
        
        //Natural client Validation
        if(formObject["typePersona"].toString() === "2"){
            if(_fieldsClient.length > 0){
                console.log("Aca", _fieldsClient)
                setErrorMessage("Los campos son requeridos")
                setErrorStatus(true)
                return false
            }else{
                setFieldsClient([])
            }
        }else{
            if(_fieldsClientJuridic.length > 0){
                console.log("Aca")
                setErrorMessage("Los campos son requeridos")
                setErrorStatus(true)
                return false
            }else{
                setFieldsClientJuridic([])
            }
        }

        //Natural contractor Validation
        if(!sameDataContractor){
            if(object["IdTipoDocumentoContratante"] !== "3"){
                if(_fieldsContractor.length > 0){
                    console.log("Aca", _fieldsContractor)
                    setErrorMessage("Los campos son requeridos")
                    setErrorStatus(true)
                    return false
                }else{
                    setFieldsContractor([])
                }
            }else{
                if(_fieldsContractorJuridic.length > 0){
                    console.log("Aca", _fieldsContractorJuridic)
                    setErrorMessage("Los campos son requeridos")
                    setErrorStatus(true)
                    return false
                }else{
                    setFieldsContractorJuridic([])
                }
            }
        }

        //PEP's Validation
        if(isPep){
            if(_fieldsClientPEP.length > 0){
                setErrorMessage("Los campos son requeridos")
                setErrorStatus(true)
                return false
            }else{
                setFieldsClientPEP([])
            }
        }
        if(isPepContractor){
            if(_fieldsContractorPEP.length > 0){
                setErrorMessage("Los campos son requeridos")
                setErrorStatus(true)
                return false
            }else{
                setFieldsContractorPEP([])
            }
        }

        //console.log("/validity-policy", object)
        setTermsPopup(true)

    }

}

export default ToEmmitPolicyRegister