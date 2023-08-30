import React, { useState, useRef, useEffect } from 'react'
import apiProvider from '../../services/apiProvider'
import { useLocation } from 'react-router-dom'
import { FiColumns } from 'react-icons/fi';
import { RiLayoutRowLine } from 'react-icons/ri';
function QuoterRegister() {

    let location = useLocation()

    const firstRef = useRef(null)
    const secondRef = useRef(null)
    const thirdRef = useRef(null)
    const fourthRef = useRef(null)

    const [navbarOnTop, setNavbarOnTop] = useState(false)
    const [toggledSidebar, setToggledSidebar] = useState(false)    
    const [loadedAPI, setLoadedAPI] = useState(false)
    const [errorStatus, setErrorStatus] = useState(false)
    const [successStatus, setSuccessStatus] = useState(false)
    const [loadingQuoterRegister, setLoadingQuoterRegister] = useState(false)
    const [showPricings, setShowPricings] = useState(false)
    const [endosoApplies, setEndosoApplies] = useState(false)
    const [loadingData, setLoadingData] = useState(false)
    const [loadingTotalPlan, setLoadingTotalPlan] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)
    const [updatedPlan, setUpdatedPlan] = useState(false)
    const [disabledSubTotal, setDisabledSubTotal] = useState(false)

    const [activeLink, setActiveLink] = useState("1")
    const [errorMessage, setErrorMessage] = useState("Ocurrio un error, intentelo otra vez ")
    const [successMessage, setSuccessMessage] = useState("")
    const [benefitData, setBenefitData] = useState("")
    const [errorAlertMessage, setErrorAlertMessage] = useState("")
    const [successAlertMessage, setSuccessAlertMessage] = useState("")

    const [formObject, setFormObject] = useState({})
    const [pricingData, setPricingData] = useState({
        subTotal: null,
        impuesto: null,
        totalPlan: null,
        montoDescuento: null
    })

    const [listOfData, setListOfData] = useState([])
    const [listOfProducts, setListOfProducts] = useState([])
    const [listOfPlanOptions, setListOfPlanOptions] = useState([])
    const [listOfPropertyTypes, setListOfPropertyTypes] = useState([])
    const [listOfStatusPlan, setListOfStatusPlan] = useState([])
    const [listOfVigencias, setListOfVigencias] = useState([])
    const [listOfPlanTypes, setListOfPlanTypes] = useState([])
    const [listOfInsurances, setListOfInsurances ] = useState([])
    const [listOfBodilyInjury, setListOfBodilyInjury ] = useState([])
    const [listOfPropertyDamage, setListOfPropertyDamage ] = useState([])
    const [listOfMedicalExpenses, setListOfMedicalExpenses ] = useState([])
    const [listOfTypePlan, setListOfTypePlan] = useState([])
    const [listOfBenefits, setListOfBenefits] = useState([])
    const [listOfBenefitsSelected, setListOfBenefitsSelected] = useState([])
    const [listOfToppingsSelected, setListOfToppingsSelected] = useState([])
    const [listOfLimits, setListOfLimits] = useState([])

    let listOfTypeOfToppings = [listOfBodilyInjury, listOfMedicalExpenses, listOfPropertyDamage]

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

    let firstListOfInputs = [
        {
            label: "Descripcion",
            value: "description",
            placeholder: "Ingrese la descripcion",
            typeOfInput: "text",
            changesFunction: false,
            typeOfFunction: "model",
            type: "input",
            hideOnStatus: false
        },
        {
            label: "Aseguradora",
            value: "idAseguradora",
            placeholder: "Ingrese el nombre de la aseguradora",
            typeOfInput: "text",
            listOfInput: formatListStandart(listOfInsurances, "idCompania", "nombreCompleto"),
            changesFunction: true,
            typeOfFunction: "compania",
            type: "select",
            hideOnStatus: false
        },
        {
            label: "Productos",
            value: "productId",
            placeholder: "Selecciona los productos",
            typeOfInput: "text",
            listOfInput: formatListStandart(listOfProducts, "idProducto", "titulo"),
            changesFunction: true,
            typeOfFunction: "tipo",
            type: "select",
            hideOnStatus: false
        },
        {
            label: "Plan",
            value: "idPlan",
            placeholder: "Selecciona el plan",
            typeOfInput: "text",
            listOfInput: formatListStandart(listOfPlanOptions, "idOpcionPlan", "plan"),
            changesFunction: false,
            typeOfFunction: "model",
            type: "select",
            hideOnStatus: false
        },
        {
            label: "Tipo",
            value: "tipoBien",
            placeholder: "Selecciona el tipo",
            typeOfInput: "text",
            listOfInput: formatListStandart(listOfPropertyTypes, "idTipoBien", "tipoBien"),
            changesFunction: false,
            typeOfFunction: "model",
            type: "select",
            hideOnStatus: false
        },
        {
            label: "Estatus",
            value: "status",
            placeholder: "Selecciona el status",
            typeOfInput: "text",
            listOfInput: formatListStandart(listOfStatusPlan, "idEstatus", "estatus"),
            changesFunction: false,
            typeOfFunction: "model",
            type: "select",
            hideOnStatus: false
        },
        {
            label: "Lesiones Corporales",
            value: "lesionesCorporales",
            placeholder: "Selecciona el limite",
            typeOfInput: "text",
            listOfInput: formatListStandart(listOfBodilyInjury, "idLimite", "descripcion"),
            changesFunction: false,
            typeOfFunction: "lesCorp",
            type: "select",
            hideOnStatus: true
        },
        {
            label: "Daños a la propiedad",
            value: "danosPropiedad",
            placeholder: "Selecciona el status",
            typeOfInput: "text",
            listOfInput: formatListStandart(listOfPropertyDamage, "idLimite", "descripcion"),
            changesFunction: false,
            typeOfFunction: "model",
            type: "select",
            hideOnStatus: true
        },
        {
            label: "Gastos Medicos",
            value: "gastosMedico",
            placeholder: "Selecciona el status",
            typeOfInput: "text",
            listOfInput: formatListStandart(listOfMedicalExpenses, "idLimite", "descripcion"),
            changesFunction: false,
            typeOfFunction: "model",
            type: "select",
            hideOnStatus: true
        }
    ]

    let secondListOfInputs = [
        {
            label: "Sub total",
            value: "subTotal",
            placeholder: "0",
            typeOfInput: "number",
            changesFunction: true,
            typeOfFunction: "subtotal",
            type: "input"
        },
        {
            label: "Monto descuento",
            value: "montoDescuento",
            placeholder: "0",
            typeOfInput: "number",
            changesFunction: true,
            typeOfFunction: "montoDescuento",
            type: "input"
        },
        {
            label: "Impuesto",
            value: "totalImpuesto",
            placeholder: "0",
            typeOfInput: "number",
            changesFunction: true,
            typeOfFunction: "impuesto",
            type: "component"
        },
        {
            label: "Total plan",
            value: "totalPlan",
            placeholder: "0",
            typeOfInput: "number",
            changesFunction: false,
            typeOfFunction: "model",
            type: "input"
        },
        {
            label: "Polizas vendidas",
            value: "polizasVendidas",
            placeholder: "Escriba",
            typeOfInput: "number",
            changesFunction: false,
            typeOfFunction: "model",
            type: "input"
        },
        {
            label: "Vigencia de la poliza",
            value: "vigenciaPoliza",
            placeholder: "Seleccione la vigencia de la poliza",
            typeOfInput: "text",
            listOfInput: formatListStandart(listOfVigencias, "IdVigencia", "Vigencia"),
            changesFunction: false,
            typeOfFunction: "model",
            type: "select"
        },
    ]

    
    function getDataFromValue(value, type){
        setErrorStatus(false)
        setSuccessStatus(false)
        if(type === "tipo"){
            setPricingData({
                subTotal: 0,
                montoDescuento: 0,
                impuesto: 0,
                totalPlan: 0
            })
            apiProvider.getPropertyTypeEndPoint(value).then((res)=>{
                setListOfPropertyTypes(res.data)
            }).catch((e)=>{
                console.log(e)
            })
            handleCalculateCIA(value)
        }
        if(type === "compania"){
            apiProvider.getBeneficiosEndPoint(`?idCompania=${value}`).then((res)=>{
                if(res.status === 200){
                    setListOfBenefits(res.data)
                }
            })
        }


        firstListOfInputs = [...firstListOfInputs]
        secondListOfInputs = [...secondListOfInputs]
    }

    const selectToppingInList = (topping, i) => {
        
        setLoadingTotalPlan(true)

        let list = [...listOfToppingsSelected]

        let id = showPricings ? "IdCobertura" : "idCobertura"

        if(listOfToppingsSelected.some((prv)=>( prv[id] === topping[id] ))){
            listOfTypePlan[i]["prima"] = 0
            listOfTypePlan[i]["idLimite"] = 0
            list = list.filter((prv)=>( prv[id] !== topping[id] ))
        }else{
            list.push(topping)
        }

        let listSelected = list.map((o)=>(parseFloat(o["prima"])))
        pricingData.subTotal = listSelected.reduce(getSum, 0)
        
        setListOfToppingsSelected(list)
        setListOfTypePlan(listOfTypePlan)
        console.log(list)

        setTimeout(() => {
            calculatePricesFromUpdate()
            setLoadingTotalPlan(false)
        }, 100);
    }

    const selectBenefitInList = (benefit) => {
        let list = [...listOfBenefitsSelected]
        if(listOfBenefitsSelected.some((prv)=>( prv["idBeneficio"] === benefit["idBeneficio"] ))){
            list = list.filter((prv)=>( prv["idBeneficio"] !== benefit["idBeneficio"] ))
        }else{
            list.push(benefit)
        }
        setListOfBenefitsSelected(list)
        setListOfBenefits(listOfBenefits)
    }

    
    function handleChangeInToppingList(propValue, indexInList, typeOfValue, typeOfPrice){
        let list = [...listOfTypePlan]
        list[indexInList][typeOfValue] = propValue

        setListOfTypePlan(list)
        handleChangeInPricingData(typeOfPrice, propValue)
    }

    function handleChangeInPricingData(typeOfPrice, propValue){
        setLoadingTotalPlan(true)
        if(typeOfPrice === "subtotal"){
            pricingData.subTotal = propValue
        }
        if(typeOfPrice === "prima"){
            let list = listOfToppingsSelected.map((o)=>(parseFloat(o["prima"])))
            pricingData.subTotal = list.reduce(getSum, 0)
        }
        if(typeOfPrice === "montoDescuento"){
            let dscto = propValue
            pricingData.montoDescuento = propValue === "" ? 0 : parseFloat(dscto).toFixed(2)
        }
        
        let imp = parseFloat(pricingData.subTotal) * 6 / 100
        pricingData.impuesto = imp.toFixed(2)

        let totalPlan = (parseFloat(pricingData.subTotal) + parseFloat(pricingData.impuesto)) - parseFloat(pricingData.montoDescuento) 
        pricingData.totalPlan = parseFloat(totalPlan).toFixed(2)

        setTimeout(() => {
            setLoadingTotalPlan(false)
        }, 100);
    }

    function getSum(total, num){
        return total + num
    }

    const BenefitsDataComponent = ({data}) => {
        return(
            <div onClick={()=>{ selectBenefitInList(data) }} className={`benefits-component ${listOfBenefitsSelected.some((prv)=>( prv["idBeneficio"] === data["idBeneficio"] )) && "selected"}`}>
                <p className="text-primary font-light">#{data["idBeneficio"]}</p>
                <p className="table-data-bold">{data["descripcion"]}</p>
            </div>
        )
    }

    
    const TypePlanLabelsComponent = () => {
        return(
            <div className={`grid ${showPricings ? "grid-cols-4" : "grid-cols-5"} gap-5 my p-[1.5rem_1.5rem_1rem_1.5rem]`}>
                <p className="table-label-bold">#</p>
                <p className="table-label">Cobertura</p>
                <p className="table-label">Limite</p>
                <p className="table-label">Prima</p>
                {!showPricings && <p className="table-label self-center justify-self-center">Aplica</p>}
            </div>
        )
    }

    const SidebarLinkComponent = ({title, number, ownRef}) => {
        return (
            <div onClick={()=>{ setActiveLink(number); executeScroll(ownRef) }} className={`cursor-pointer flex w-full h-auto mb-3 rounded p-2 justify-start items-center ${activeLink === number ? "bg-white border-primary border-2" : "bg-transparent"}`}>
                <p className={`mr-3 font-light flex w-[35px] h-[35px] rounded-full justify-center items-center text-lg border-2 ${activeLink === number ? "bg-primary text-white border-primary" : "bg-transparent text-primary border-primary/40"}`}>{number}</p>
                <p className={`text-sm text-secondary ${activeLink === number ? "font-bold" : "font-light"}`}>{title}</p>
            </div>
        )
    }

    
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

    function getLimitList(id){
        apiProvider.getLimitEndPoint(`?idCobertura=${id}`).then((res)=>{
            return [...res.data]
        })
    }

    function chargeAPI(){
        apiProvider.getLimitEndPoint("?idCobertura=1").then((res)=>{
            setListOfBodilyInjury(res.data)
        })
        apiProvider.getLimitEndPoint("?idCobertura=2").then((res)=>{
            setListOfMedicalExpenses(res.data)
        })
        apiProvider.getLimitEndPoint("?idCobertura=3").then((res)=>{
            setListOfPropertyDamage(res.data)
        })
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
        apiProvider.getStatusPlanEndPoint("").then((res)=>{
            setListOfStatusPlan(res.data)
        }).catch((e)=>{
            console.log(e)
        })
        apiProvider.getVigeniciasEndPoint("").then((res)=>{
            setListOfVigencias(res.data)
        }).catch((e)=>{
            console.log(e)
        })
        apiProvider.getTipoAplicacionPlanEndPoint("").then((res)=>{
            setListOfPlanTypes(res.data)
        }).catch((e)=>{
            console.log(e)
        })

        setLoadedAPI(true)
    }

    const handleCalculateCIA = (propProduct) => {
        console.log("State " + location.state)
        let id = location.state !== null ? location.state["idCompania"] : formObject["idAseguradora"]
        let query = `?IdCcompania=${id}`
        apiProvider.GetTipoEmisionCompaniaEndPoint(query).then((res)=>{
            let object = res.data[0]

            let allowExcludeEndoso = object["permiteExcluirEndoso"]
            let typeEmition = object["idTipoEmision"]
            handleDeciderInCIA(typeEmition, allowExcludeEndoso, propProduct)
        }).catch((e)=>{
            console.log(e)
        })
    }

    const handleDeciderInCIA = (typeEmition, allowExcludeEndoso, propProduct) => {
        //Si typeEmition (idTipoEmision) es 2 se muestran las coberturas automaticamente
        //Si typeEmition (idTipoEmision) es 1 se muestra un boton y campos adicionales

        //Si muestra el boton los datos de las coberturas no se pueden modificar
        if(typeEmition !== 2){
            setShowPricings(false)
            handleGetToppings(propProduct)
        }else{
            setListOfTypePlan([])
            setShowPricings(true)
        }

        if(allowExcludeEndoso === 1){
            setEndosoApplies(true)
        }else{
            setEndosoApplies(false)
        }
    }

    const handleGetToppings = (propProduct) => {

        let id = showPricings ? "IdCobertura" : "idCobertura"
        let query = `?IdCompania=${formObject["idAseguradora"]}&IdProducto=${propProduct}`
        apiProvider.getCoverageEndPoint(query).then(async(res)=>{

            await apiProvider.getLimitEndPoint(``).then((res)=>{
                setListOfLimits(res.data)
            })

            setDisabledSubTotal([...res.data].length > 0 ? true : false)
            setListOfTypePlan(res.data)
            console.log(res.data)
        }).catch((e)=>{
            console.log(e)
        })
    }

    const handleGetPrices = () => {

        let query = `?IdTipoBien=${formObject["tipoBien"]}&AplicaEndoso=${formObject["aplicaEndoso"]}`
        apiProvider.GetDatosValidQuoteEndPoint(query).then((res)=>{
            let object = res.data

            object["idCompania"] = parseInt(formObject["idAseguradora"])
            object["token"] = localStorage.getItem("token_api")
            
            object["idLmLs"] = formObject["lesionesCorporales"]
            object["idLmDanos"] = formObject["danosPropiedad"]
            object["idLmGastos"] = formObject["gastosMedico"]
            
            object["limiteDanos"] = findValueOnList(formObject["danosPropiedad"], listOfPropertyDamage)
            object["limiteGastosMedicos"] = findValueOnList(formObject["gastosMedico"], listOfMedicalExpenses)
            object["limiteLesionesC"] = findValueOnList(formObject["lesionesCorporales"], listOfBodilyInjury)
            
            const form_data = new FormData()
            form_data.append("Json", JSON.stringify(object))
            
            handleAddQuota(object)

        }).catch((e)=>{
            console.log(e)
        })
    }

    const findValueOnList = (value, list) => [...list].find((prv, i)=>( prv["idLimite"] === parseInt(value) ))["descripcion"]
    
    const handleAddQuota = (object) => {
        apiProvider.addQuotaEndPoint(object).then((res)=>{
            let idCotizacion = res.data[0]["IdCotizacion"]
            if(idCotizacion !== undefined){
                setErrorStatus(false)
                handleGetCotizacion(res.data[0]["IdCotizacion"])
                
                if(res.data[0]["CodMensaje"] === "0"){
                    let descuento = res.data[0]["PorcentajeDescuento"]
                    let monto = res.data[0]["Opcion1"]
                    let salcober = 0
                    if(descuento > 0){
                        let dscto = descuento / 100
                        let subtotal = parseFloat(monto) / parseFloat("1.06")
                        let impuesto = parseFloat(monto) - subtotal
                        salcober += res.data[0]["PrimaCobertura"]
                        let mondscto = salcober * dscto

                        setPricingData({
                            subTotal: subtotal.toFixed(2),
                            montoDescuento: mondscto.toFixed(2),
                            impuesto: impuesto.toFixed(2),
                            totalPlan: (subtotal + impuesto).toFixed(2)
                        })
                    }else{
                        let subtotal = parseFloat(monto) / parseFloat("1.06");
                        let impuesto = parseFloat(monto) - subtotal;
                        setPricingData({
                            subTotal: subtotal.toFixed(2),
                            montoDescuento: "0.00",
                            impuesto: impuesto.toFixed(2),
                            totalPlan: (subtotal + impuesto).toFixed(2)
                        })
                    }
                }
                
            }else{
                setErrorStatus(true)
                setErrorMessage("No hubo resultado")
            }
        })

        secondListOfInputs = [...secondListOfInputs]
    }

    const handleGetCotizacion = (idCotizacion) => {
        let query = `?IdCotizacion=${idCotizacion}`
        apiProvider.getCotizacionEndPoint(query).then((res)=>{
            let list = [...res.data]
            if(list.length > 0){
                console.log(list)
                setDisabledSubTotal(true)
                setListOfTypePlan(list)
                setSuccessStatus(true)
                setSuccessMessage("Coberturas generadas")
            }else{
                setDisabledSubTotal(false)
                setErrorStatus(true)
                setErrorMessage("No hubo resultado")
            }
        })
    }
    
    const changeBackground = () => {
        if (window.scrollY >= 1) {
            setNavbarOnTop(true)
        }else{
            setNavbarOnTop(false)
        }
    }

    async function getListOfLimit(id){
        let list = []
        await apiProvider.getLimitEndPoint(`?idCobertura=${id}`).then((res)=>{
            list = [...res.data]
        })
        return list
    }

    function calculatePricesFromUpdate(){
        let selected = listOfTypePlan.filter((prv)=>(prv["prima"] > 0 && prv["idLimite"] !== undefined))
        let list = selected.map((o)=>(parseFloat(o["prima"] ?? 0)))
        let subTotal = list.reduce(getSum, 0)
        
        let imp = parseFloat(subTotal) * 6 / 100
        let impuesto = imp.toFixed(2)
        
        let descuento = pricingData["montoDescuento"] !== null ? pricingData["montoDescuento"] : 0

        let totalPlan = ( parseFloat(subTotal) + parseFloat(impuesto) ) - parseFloat(descuento)
                
        setPricingData({
            subTotal: subTotal,
            impuesto: impuesto,
            totalPlan: totalPlan.toFixed(2),
            montoDescuento: pricingData["montoDescuento"]
        })

    }
    
    function formatPlanToUpdate(){
        let object = {...location.state}
        console.log(object)
        setFormObject({
            description: object["descripcion"],
            idAseguradora: object["idCompania"],
            idPlan: object["idOpcionPlan"],
            productId: object["idProducto"],
            tipoBien: object["idTipoBien"],
            status: object["idEstatus"],
            polizasVendidas: object["totalVentas"],
            vigenciaPoliza: object["idVigencia"],
            idTipoAplicacion: object["idTipoAplicacion"],
            aplicaEndoso: object["aplicaEndoso"]
        })
        
        setPricingData({
            subTotal: object["subtotal"],
            montoDescuento: object["descuento"],
            impuesto: object["totalImpuesto"],
            totalPlan: object["totalPlan"]
        })

        apiProvider.getPropertyTypeEndPoint(object["idProducto"]).then((res)=>{
            setListOfPropertyTypes(res.data)
        })

        setListOfBenefitsSelected(object["beneficio"])

        apiProvider.getBeneficiosEndPoint(`?idCompania=${object["idCompania"]}`).then((res)=>{
            if(res.status === 200){
                setListOfBenefits(res.data)
            }
        })

        let query = `?IdCompania=${object["idCompania"]}&IdProducto=${object["idProducto"]}`
        
        apiProvider.GetTipoEmisionCompaniaEndPoint(`?IdCcompania=${object["idCompania"]}`).then((res)=>{
            let objectInFunction = res.data[0]
            let allowExcludeEndoso = objectInFunction["permiteExcluirEndoso"]
            let typeEmition = objectInFunction["idTipoEmision"]
            setEndosoApplies(allowExcludeEndoso === 1 ? true : false)
            if(typeEmition !== 2){
                setShowPricings(false)
                setDisabledSubTotal(true)
                apiProvider.getCoverageEndPoint(query).then(async(resValue)=>{

                    await apiProvider.getLimitEndPoint(``).then((res)=>{
                        setListOfLimits(res.data)
                    })
                    
                    setListOfTypePlan(resValue.data)
                    handleFormatToppingsSelected(resValue.data, object["detalle"])
                })
            }else{
                setShowPricings(true)
                setDisabledSubTotal(true)
                setListOfTypePlan(object["detalle"])
                setListOfToppingsSelected(object["detalle"])
            }
        })
        
        setUpdatedPlan(true)

    }

    function handleFormatToppingsSelected(listFromAPI, listFromAPIPlan){
        let listMainToppingList = [...listFromAPI]
        let listToFormat = [...listFromAPIPlan]

        let newList = listToFormat.map((prv)=>({
            idCobertura: prv["idCobertura"],
            cantPersonas: prv["cantPersonas"],
            totalCobertra: prv["totalCobertra"],
            idLimite: prv["idLimite"],
            cobertura: prv["cobertura"],
            prima: prv["prima"],
        }))
        
        
        listMainToppingList.forEach((prv, i)=>{
            let findedLimitInSelected = listToFormat.find((selectedLimit) => (selectedLimit["cobertura"] === prv["cobertura"]))
            if(findedLimitInSelected){
                listMainToppingList[i] = {
                    ...listMainToppingList[i],
                    idLimite: findedLimitInSelected["idLimite"],
                    prima: findedLimitInSelected["prima"],
                }
            }
        })

        setListOfTypePlan(listMainToppingList)
        setListOfToppingsSelected(newList)

    }

    function chargePlansAPI(){
        apiProvider.getLimitEndPoint(``).then((res)=>{
            setListOfLimits(res.data)
        })

        apiProvider.getPlanEndPoint("").then((res)=>{
            setListOfData(res.data)
            setLoadingData(true)
        }).catch((e)=>{
            console.log(e)
        })
    }

    useEffect(() => {
        calculatePricesFromUpdate()
    }, [listOfTypePlan])

    useEffect(() => {
        if(location.state !== null){
            formatPlanToUpdate()
        }
    }, [updatedPlan])

    useEffect(() => {
        changeBackground()
        window.addEventListener("scroll", changeBackground)
    })

    useEffect(() => {
        chargePlansAPI()
    }, [loadingData])

    useEffect(() => {
        chargeAPI()
    }, [loadedAPI])

    return (
        <div className="ml-[18%] w-[82%] relative block h-auto bg-slate-50 p-8">
            {successAlert && <AlertComponent state={setSuccessAlert} type={"1"} msg={successAlertMessage} />}
            {errorAlert && <AlertComponent state={setErrorAlert} type={"2"} msg={errorAlertMessage} />}
            <div onClick={()=>{ setToggledSidebar(!toggledSidebar) }} className="fixed right-8 bottom-8 z-10 bg-primary p-5 rounded cursor-pointer hover:bg-secondary transition shadow-xl">
                <span className="text-white material-symbols-outlined">
                    {toggledSidebar ? <RiLayoutRowLine size={25}/> : <FiColumns size={25}/>}
                </span>
            </div>
            {(navbarOnTop && !toggledSidebar) && <div className="shadow-[#7777772f] shadow-2xl transition z-10 fixed bg-white w-[82%] h-fit top-0 right-0">
                <div className="p-4 flex justify-between relative h-auto w-full items-center overflow-x-auto">
                    <div className="mr-10 w-auto">
                        <SidebarLinkComponent ownRef={firstRef} title={"Definición de planes por CIA"} number={"1"} />
                    </div>
                    <div className="mr-10 w-auto">
                        <SidebarLinkComponent ownRef={secondRef} title={"Cotizar"} number={"2"} />
                    </div>
                    <div className="mr-10 w-auto">
                        <SidebarLinkComponent ownRef={thirdRef} title={"Tipo de plan"} number={"3"} />
                    </div>
                    <div className="mr-10 w-auto">
                        <SidebarLinkComponent ownRef={fourthRef} title={"Beneficios"} number={"4"} />
                    </div>
                    <div onClick={()=>{ 
                        manageQuoterRegister()
                    }} className="mb-3 transition cursor-pointer w-auto px-16 relative block text-center rounded-md text-white py-3 bg-primary hover:bg-secondary">Guardar</div>
                </div>
            </div>}
            
            {!toggledSidebar && <div className="flex justify-between relative items-center h-20 w-full overflow-x-auto">
                <div className="mr-10 w-auto">
                    <SidebarLinkComponent ownRef={firstRef} title={"Definición de planes por CIA"} number={"1"} />
                </div>
                <div className="mr-10 w-auto">
                    <SidebarLinkComponent ownRef={secondRef} title={"Cotizar"} number={"2"} />
                </div>
                <div className="mr-10 w-auto">
                    <SidebarLinkComponent ownRef={thirdRef} title={"Tipo de plan"} number={"3"} />
                </div>
                <div className="mr-10 w-auto">
                    <SidebarLinkComponent ownRef={fourthRef} title={"Beneficios"} number={"4"} />
                </div>
                <div onClick={()=>{ 
                    manageQuoterRegister()
                }} className="transition cursor-pointer w-auto px-16 mr-2 relative block text-center rounded-md text-white py-3 bg-primary hover:bg-secondary">Guardar</div>
            </div>}

            <div className="flex w-full justify-between h-full">
                {toggledSidebar && <div className="block relative h-full w-1/3 pr-8">
                    <SidebarLinkComponent ownRef={firstRef} title={"Definición de planes por CIA"} number={"1"} />
                    <SidebarLinkComponent ownRef={secondRef} title={"Cotizar"} number={"2"} />
                    <SidebarLinkComponent ownRef={thirdRef} title={"Tipo de plan"} number={"3"} />
                    <SidebarLinkComponent ownRef={fourthRef} title={"Beneficios"} number={"4"} />
                    {/* <div onClick={()=>{}} className="btn btn-primary mb-3">Buscar</div> */}
                    <div onClick={()=>{ 
                        manageQuoterRegister()
                    }} className="transition cursor-pointer w-auto px-16 mr-2 relative block text-center rounded-md text-white py-3 bg-primary hover:bg-secondary">Guardar</div>

                </div>}
                <div className={`p-3 bg-white rounded-lg h-full overflow-y-auto ${!toggledSidebar ? "w-full" : "w-2/3"}`}>
                    <div className="my-4" ref={firstRef}>
                        <p className={`title-section text-slate-900 px-3 mb-3`}>Definición de planes por CIA</p>
                        <div className="flex flex-wrap content-start">
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} block mb-3 px-3`}>
                                <p className="input-label">Descripcion</p>
                                <input value={formObject.description} placeholder="Ingrese la descripcion" onChange={(e)=>{setFormObject({...formObject, description: e.target.value}) }} type="text" className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} block mb-3 px-3`}>
                                <p className="input-label">Aseguradora</p>
                                <select value={formObject.idAseguradora} onChange={(e)=>{setFormObject({...formObject, idAseguradora: e.target.value}), getDataFromValue(e.target.value, "compania") }} className="form-control">
                                    <option value="">Ingrese el nombre de la aseguradora</option>
                                    {listOfInsurances.map((type)=> <option 
                                    value={type["idCompania"]}>{type["nombreCompleto"]}</option> )}
                                </select>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} block mb-3 px-3`}>
                                <p className="input-label">Productos</p>
                                <select value={formObject.productId} onChange={(e)=>{setFormObject({...formObject, productId: e.target.value}), getDataFromValue(e.target.value, "tipo") }} className="form-control">
                                    <option value="">Selecciona los productos</option>
                                    {listOfProducts.map((type)=> <option 
                                    value={type["idProducto"]}>{type["titulo"]}</option> )}
                                </select>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} block mb-3 px-3`}>
                                <p className="input-label">Plan</p>
                                <select value={formObject.idPlan} onChange={(e)=>{ setFormObject({...formObject, idPlan: e.target.value}) }} className="form-control">
                                    <option value="">Selecciona el plan</option>
                                    {listOfPlanOptions.map((type)=> <option 
                                    value={type["idOpcionPlan"]}>{type["plan"]}</option> )}
                                </select>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} block mb-3 px-3`}>
                                <p className="input-label">Tipo</p>
                                <select value={formObject.tipoBien} onChange={(e)=>{ setFormObject({...formObject, tipoBien: e.target.value}) }} className="form-control">
                                    <option value="">Selecciona el tipo</option>
                                    {listOfPropertyTypes.map((type)=> <option 
                                    value={type["idTipoBien"]}>{type["tipoBien"]}</option> )}
                                </select>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} block mb-3 px-3`}>
                                <p className="input-label">Estatus</p>
                                <select value={formObject.status} onChange={(e)=>{ setFormObject({...formObject, status: e.target.value}) }} className="form-control">
                                    <option value="">Selecciona el status</option>
                                    {listOfStatusPlan.map((type)=> <option 
                                    value={type["idEstatus"]}>{type["estatus"]}</option> )}
                                </select>
                            </div>
                            {showPricings && <><div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} block mb-3 px-3`}>
                                <p className="input-label">Lesiones Corporales</p>
                                <select value={formObject.lesionesCorporales} onChange={(e)=>{ setFormObject({...formObject, lesionesCorporales: e.target.value}) }} className="form-control">
                                    <option value="">Selecciona el limite</option>
                                    {listOfBodilyInjury.map((type)=> <option 
                                    value={type["idLimite"]}>{type["descripcion"]}</option> )}
                                </select>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} block mb-3 px-3`}>
                                <p className="input-label">Daños a la propiedad</p>
                                <select value={formObject.danosPropiedad} onChange={(e)=>{ setFormObject({...formObject, danosPropiedad: e.target.value}) }} className="form-control">
                                    <option value="">Selecciona el status</option>
                                    {listOfPropertyDamage.map((type)=> <option 
                                    value={type["idLimite"]}>{type["descripcion"]}</option> )}
                                </select>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} block mb-3 px-3`}>
                                <p className="input-label">Gastos Medicos</p>
                                <select value={formObject.gastosMedico} onChange={(e)=>{ setFormObject({...formObject, gastosMedico: e.target.value}) }} className="form-control">
                                    <option value="">Selecciona el status</option>
                                    {listOfMedicalExpenses.map((type)=> <option 
                                    value={type["idLimite"]}>{type["descripcion"]}</option> )}
                                </select>
                            </div></>}
                            { endosoApplies && <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} mb-3 px-3`}>
                                <p className="input-label">Aplica endoso</p>
                                <select onChange={(e)=>{setFormObject({...formObject, aplicaEndoso: e.target.value})}} className="form-control">
                                    <option value="">Selecciona si aplica el endoso</option>
                                    <option value="SI">Si</option>
                                    <option value="NO">No</option>
                                </select>
                            </div>}
                        </div>
                    </div>
                    {showPricings && <div className="my-2 flex">
                        <div onClick={()=>{ 
                            handleGetPrices() 
                            //console.log(formObject)
                        }} className="btn btn-primary w-2">Obtener Precios y Coberturas</div>
                    </div>}
                    {errorStatus && <div className="text-red-700 font-bold text-base mt-6">{errorMessage}</div>}
                    {successStatus && <div className="text-green-700 font-bold text-base mt-6">{successMessage}</div>}
                    <div className="my-4" ref={secondRef}>
                        <p className={`title-section text-slate-900 px-3 mb-3`}>Cotizar</p>
                        {showPricings && <div className='flex flex-wrap content-start'>
                            <>
                                {disabledSubTotal ? <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} mb-3 px-3`}>
                                        <p className="input-label">Sub total</p>
                                        <div className="bg-slate-200 cursor-default form-control">{pricingData["subTotal"]}</div>
                                    </div> : 
                                    <div className={`block ${toggledSidebar ? "w-1/2" : "w-1/3"} mb-3 px-3`}>
                                        <p className="input-label">Sub total</p>
                                        <input value={pricingData["subTotal"]} placeholder="0" onChange={(e)=>{ handleChangeInPricingData("subtotal", e.target.value) }} type="number" className="form-control" />
                                    </div>
                                }
                                {showPricings ? <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} mb-3 px-3`}>
                                        <p className="input-label">Monto Descuento</p>
                                        <input defaultValue={pricingData["montoDescuento"]} onChange={(e)=>{handleChangeInPricingData("montoDescuento", e.target.value) }} type="number" className="form-control" />
                                    </div> : 
                                    <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} mb-3 px-3`}>
                                        <p className="input-label">Monto Descuento</p>
                                        <div className="bg-slate-200 cursor-default form-control">{pricingData["montoDescuento"]}</div>
                                    </div>
                                }
                                <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} mb-3 px-3`}>
                                    <p className="input-label">Impuesto</p>
                                    <div className="bg-slate-200 cursor-default form-control">{pricingData["impuesto"]}</div>
                                </div>
                                <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} mb-3 px-3`}>
                                    <p className="input-label">Total Plan</p>
                                    <div className="bg-slate-200 cursor-default form-control">{pricingData["totalPlan"]}</div>
                                </div>           
                            </>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} mb-3 px-3`}>
                                <p className="input-label">Polizas vendidas</p>
                                <input value={formObject.polizasVendidas} onChange={(e)=>{ setFormObject({...formObject, polizasVendidas: e.target.value}) }} type="text" placeholder='' className=" form-control"/>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} mb-3 px-3`}>
                                <p className="input-label">Vigencia de la poliza</p>
                                <select value={formObject.vigenciaPoliza} onChange={(e)=>{setFormObject({...formObject, vigenciaPoliza: e.target.value})}} className="form-control">
                                    <option value="">Seleccione la vigencia de la poliza</option>
                                    {listOfVigencias.map((v, i)=>(
                                        <option key={i} value={v["IdVigencia"]}>{v["Vigencia"]}</option>
                                    ))}
                                </select>
                            </div>
                        </div>}
                        {!showPricings && <div className="flex flex-wrap content-start">
                            {disabledSubTotal ? <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} mb-3 px-3`}>
                                    <p className="input-label">Sub total</p>
                                    <div className="bg-slate-200 cursor-default form-control">{pricingData["subTotal"]}</div>
                                </div> : 
                                <div className={`block ${toggledSidebar ? "w-1/2" : "w-1/3"} mb-3 px-3`}>
                                    <p className="input-label">Sub total</p>
                                    <input value={pricingData["subTotal"]} placeholder="0" onChange={(e)=>{ handleChangeInPricingData("subtotal", +e.target.value) }} type="number" className="form-control" />
                                </div>
                            }
                            <div className={`block ${toggledSidebar ? "w-1/2" : "w-1/3"} mb-3 px-3`}>
                                <p className="input-label">Monto descuento</p>
                                <input defaultValue={pricingData["montoDescuento"]} placeholder="0" onChange={(e)=>{ handleChangeInPricingData("montoDescuento", +e.target.value) }} type="number" className="form-control" />
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} mb-3 px-3`}>
                                <p className="input-label">Impuesto</p>
                                <div className="bg-slate-200 cursor-default form-control">{pricingData["impuesto"]}</div>
                            </div>
                            <div className={`${toggledSidebar ? "w-1/2" : "w-1/3"} mb-3 px-3`}>
                                <p className="input-label">Total plan</p>
                                <div className="bg-slate-200 cursor-default form-control">{loadingTotalPlan ? "..." : pricingData["totalPlan"]}</div>
                            </div>
                            <div className={`block ${toggledSidebar ? "w-1/2" : "w-1/3"} mb-3 px-3`}>
                                <p className="input-label">Polizas vendidas</p>
                                <input value={formObject["polizasVendidas"]} placeholder="0" onChange={(e)=>{ setFormObject({...formObject, polizasVendidas: +e.target.value}) }} type="number" className="form-control" />
                            </div>
                            <div className={`block ${toggledSidebar ? "w-1/2" : "w-1/3"} mb-3 px-3`}>
                                <p className="input-label">Vigencia de la poliza</p>
                                <select value={formObject.vigenciaPoliza} onChange={(e)=>{setFormObject({...formObject, vigenciaPoliza: e.target.value})}} className="form-control">
                                    <option value="">Seleccione la vigencia de la poliza</option>
                                    {formatListStandart(listOfVigencias, "IdVigencia", "Vigencia").map((v, i)=>(
                                        <option key={i} value={v["value"]}>{v["valueText"]}</option>
                                    ))}
                                </select>
                            </div>
                        </div>}
                    </div>
                    <div className="my-4" ref={thirdRef}>
                        <p className='w-1/3 title-section text-slate-900 px-3 mb-3'>Tipo de plan</p>
                        <div className="w-1/3">
                            <select value={formObject.idTipoAplicacion} onChange={(e)=>{ setFormObject({...formObject, idTipoAplicacion: e.target.value}) }} className="form-control">
                                <option value="">{"Seleccionar"}</option>
                                {listOfPlanTypes.map((type)=> <option value={type["Id"]}>{type["Descripcion"]}</option> )}
                            </select>
                        </div>
                        <TypePlanLabelsComponent/>
                        {listOfTypePlan.length > 0 ? 
                                listOfTypePlan.map((d, i)=>{
                                    let idToLimit = location.state !== null ? "limite" : "Limite"
                                    let id = showPricings ? "IdCobertura" : "idCobertura"
                                    let applies = listOfToppingsSelected.some((prv)=>( prv[id] === d[id] ))
                                    let list = listOfLimits.filter((prv)=>( prv["idCobertura"] === d[id] ))

                                    return(
                                        <div className={`table-data-component cursor-default ${showPricings ? "grid-cols-4" : "grid-cols-5"} ${ listOfToppingsSelected.some((prv)=>( prv[id] === d[id] )) && "selected"} ${ i % 2 === 0 ? "bg-slate-100" : "bg-transparent" }`}>
                                            <p className="table-data-bold">{d["idCobertura"] ?? d["IdCobertura"]}</p>
                                            <p className="table-data">{d["cobertura"] ?? d["Cobertura"]}</p>
                                            {!showPricings ? 
                                                <select value={d["idLimite"]} onChange={(e)=>{ handleChangeInToppingList(e.target.value, i, "idLimite", "") }} className='form-control'>
                                                    <option value=""></option>
                                                    {list.map((o, io)=>
                                                        <option key={io} value={o["idLimite"]}>{o["descripcion"]}</option>
                                                    )}
                                                </select>
                                            : <p className="table-data">{(d["totalCobertra"] > 0 ? d["totalCobertra"] : d[idToLimit]) ?? "-"}</p>}
                                            {!showPricings ? <input value={d["prima"]} onChange={(e)=>{ handleChangeInToppingList(parseFloat(e.target.value), i, "prima", "prima") }} type="number" className="form-control" /> : <p className="table-data">{(d["prima"] ?? d["PrimaCobertura"]) ?? "-"}</p>}
                                            {!showPricings && <div onClick={()=>{ selectToppingInList(d, i) }} className={`checkbox-custom-text ${applies ? "checked" : ""}`}></div>}
                                        </div>
                                    )
                                })
                            : 
                            <div className="text-center flex justify-center align-middle h-10 w-full">
                                <p className="font-light text-xl text-primary mt-6">No hay coberturas todavia</p>
                            </div>
                        }
                    </div>
                    <div className="my-4" ref={fourthRef}>
                        <p className={`w-1/3 title-section text-slate-900 px-3 mb-3`}>Beneficios</p>
                        <div className="w-1/2 flex justify-between">
                            <input placeholder='Agregar nuevo beneficio' onChange={(e)=>{ setBenefitData(e.target.value) }} className="form-control w-[48%!important]"/>
                            <div onClick={()=>{ handleAddBenefit() }} className="btn btn-primary w-[48%!important]">Agregar beneficio</div>
                        </div>
                        <div className="flex flex-wrap justify-between content-start">
                            {listOfBenefits.length > 0 ? 
                                listOfBenefits.map((d, i)=><BenefitsDataComponent data={d}/>)
                            : 
                                <div className="text-center flex justify-center align-middle h-10 w-full">
                                    <p className="font-light text-xl text-primary mt-6">No hay beneficios todavia</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    function handleAddBenefit(){

        let index = listOfBenefits.length + 1

        let object = {
            Imagen: "",
            Descripcion: benefitData.toString(),
            IdBeneficio: null,
            IdCompania: parseInt(formObject["idAseguradora"])
        }

        const form_data = new FormData()
        form_data.append("Json", JSON.stringify(object))

        apiProvider.addBenefitEndPoint(object).then((res)=>{
            console.log(res)
            apiProvider.getBeneficiosEndPoint(`?idCompania=${formObject["idAseguradora"]}`).then((res)=>{
                setBenefitData("")
                if(res.status === 200){
                    setListOfBenefits(res.data)
                }
            })
        })

    }

    function formatQuotesList(){
        let idL = showPricings ? "Limite" : "idLimite"
        let id = "idCobertura"
        let cobertura = "cobertura"
        
        let selectedList = listOfToppingsSelected
        selectedList = selectedList.filter((prv, i)=>( prv["idLimite"] !== undefined))

        if(location.state !== null){
            
            selectedList.forEach((prv, i)=>{
                let findedLimitInSelected = listOfTypePlan.find((selectedLimit) => (selectedLimit["cobertura"] === prv["cobertura"]))
                if(findedLimitInSelected){
                    selectedList[i] = {
                        ...selectedList[i],
                        idLimite: findedLimitInSelected["idLimite"],
                        prima: findedLimitInSelected["prima"],
                    }
                }
            })

        }

        let list = selectedList.map((prv, i)=>({
            IdPlan: null,
            IdPlanLimite: null,
            SumaAseguradaDesde: null,
            SumaAseguradaHasta: null,
            Deducible: null,
            idPlanLimite: null,
            IdLimite: parseInt(prv["idLimite"]),
            Limite: findLimitInList(prv["idLimite"]),
            Cobertura: prv[cobertura],
            Orden: i + 1,
            IdCobertura: parseInt(prv[id]),
            Prima: handleGetPriceInList(prv["prima"], prv["PrimaCobertura"]),
            PrimaCobertura: handleGetPriceInList(prv["prima"], prv["PrimaCobertura"]),
        }))
        return list
    }

    function handleGetPriceInList(propValuePrima, propValueTopping){
        let returnedResult = propValuePrima ?? propValueTopping
        return parseFloat(returnedResult)
    }

    function findIdLimitInList(propLimit, propId){
        let list = listOfLimits
        let returnedLimit = list.find((prv, i)=>( prv["descripcion"] === propLimit ))

        return returnedLimit !== undefined ? returnedLimit["idLimite"] : null
    }

    function findLimitInList(propId){
        let list = listOfLimits
        let textReturned = list.find((prv, i)=>( prv["idLimite"] === parseInt(propId)))
        return textReturned ? textReturned["descripcion"] : ""
    }

    function handleValidationFunction(){
        
        let postObject = {
          IdPlan: location.state !== null ? location.state["idPlan"] : null,
          IdPlanPadre: null,
          nombreCorto: null,
          producto: null,
          estatus: null,
          opcionPlan: null,
          nombreCompleto: null,
          IdCompania: parseInt(formObject["idAseguradora"]) ?? 0,
          IdEstatus: parseInt(formObject["status"]) ?? 0,
          idCorredor: localStorage.getItem("idCorredor"),
          IdTipoInteres: 2,
          IdOpcionPlan: parseInt(formObject["idPlan"]) ?? 0,
          IdProducto: parseInt(formObject["productId"]) ?? 0,
          Descripcion: formObject["description"] ?? "",
          TotalImpuesto: parseFloat(pricingData["impuesto"]) ?? 0.0,
          totalPlan: parseFloat(pricingData["totalPlan"]) ?? 0.0,
          Descuento: parseFloat(pricingData["montoDescuento"]) ?? 0.0,
          Subtotal: parseFloat(pricingData["subTotal"]) ?? 0.0,
          TotalVentas: parseInt(formObject["polizasVendidas"]) ?? 0,
          idTipoBien: parseInt(formObject["tipoBien"]) ?? 0,
          idVigencia: parseInt(formObject["vigenciaPoliza"]) ?? 0,
          idTipoAplicacion: parseInt(formObject["idTipoAplicacion"]) ?? 0,
          AplicaEndoso: "SI",
          CantidadLetras: 1,
          idEntidad: 1,
          detalle: formatQuotesList().length > 0 ? formatQuotesList() : [],
          Beneficio: listOfBenefitsSelected.length > 0 ? listOfBenefitsSelected.map((b)=>({
            IdBeneficio: b["idBeneficio"],
            descripcion: b["descripcion"] ?? null,
            Imagen: null,
            IdCompania: null,
          })) : []
        };

        return postObject
    }

    function manageQuoterRegister(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(handleValidationFunction());
        console.log(formatQuotesList())
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let url = "https://emisorapi.azurewebsites.net/api/Configuration/add_plan"

        fetch(url, requestOptions)
        .then((response)=>{
            console.log(response.json())
            if(response.ok){
                setErrorAlert(false)
                setSuccessAlertMessage( location.state !== null ? "Plan actualizado exitosamente" : "Plan creado exitosamente")
                setSuccessAlert(true)
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }else{
                setSuccessAlert(false)
                setErrorAlertMessage(location.state !== null  ? "Ha ocurrido un problema con la actualizacion" : "Ha ocurrido un problema con la creacion")
                setErrorAlert(true)
            }
        }).catch((e)=>{
            console.log(e)
        })
    }

}

export default QuoterRegister