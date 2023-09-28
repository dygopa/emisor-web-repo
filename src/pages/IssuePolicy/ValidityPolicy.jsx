import React, { useState, useEffect } from 'react'
import apiProvider from '../../services/apiProvider'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import {FiChevronLeft} from "react-icons/fi";
import moment from 'moment'
import { es } from 'date-fns/locale';
import { InputComponent } from '../../components/DateInput';

function ValidityPolicy() {

    let minDate = moment().toDate()
    let data = useLocation()
    let history = useNavigate()

    const [maxDate, setMaxDate] = useState("-")
    const [sinceDate, setSinceDate] = useState("")

    const [selectedDate, setSelectedDate] = useState(new Date())

    var curr = new Date();
    curr.setDate(curr.getDate() - 1);
    var date = curr.toISOString().substring(0,10);

    const [emmitedPolicy, setEmmitedPolicy] = useState(false)
    const [errorStatus, setErrorStatus] = useState(false)
    const [successStatus, setSuccessStatus] = useState(false)
    const [alreadyPressedVP, setAlreadyPressedVP] = useState(false)
    const [validatingPolicy, setValidatingPolicy] = useState(false)
    const [loadingCheckPolice, setLoadingCheckPolice] = useState(false)
    const [errorInNumber, setErrorInNumber] = useState(false)

    const [dateObject, setDateObject] = useState({
        from: moment().utc().format("YYYY-MM-DD").toString(),
        to: moment().utc().add(1, "y").subtract(1, "d").format("YYYY-MM-DD").toString(),
        toShow: moment().utc().add(1, "y").format("DD/MM/YYYY").toString()
    })

    const [paymentObject, setPaymentObject] = useState({
        typePayment: "",
        //total: data.state[0]["totalplan"],
        total: data.state ? data.state[0]["totalplan"] : 0,
        minimum: 0,
        //paymentAccepted: data.state[0]["totalplan"]
        paymentAccepted: data.state ? data.state[0]["totalplan"] : 0
    })

    const [policy, setPolicy] = useState({})

    const [errorMessage, setErrorMessage] = useState("Ocurrio un error, intentelo otra vez ")
    const [successMessage, setSuccessMessage] = useState("")

    function handleDateChange(type, value){
        setSelectedDate(value)
        let propDate = moment(value).utc().format("YYYY-MM-DD")
        setDateObject({
            from: moment(value).utc().format("YYYY-MM-DD"),
            to: moment(value).utc().add(1, "y").format("YYYY-MM-DD"),
            toShow: moment(value).utc().add(1, "y").format("DD/MM/YYYY")
        })
        console.log(propDate)
    }

    const AlertComponent = ({type, msg, state}) => {
        return(
            <div onClick={()=>{ state(false) }} className={`transition shadow-md z-20 rounded p-[1%_2%] text-left h-auto w-auto cursor-pointer fixed right-[2.3%] bottom-[5%] block ${type === "1" 
                ? "hover:bg-green-300 bg-green-200 text-green-900"
                : "hover:bg-red-300 bg-red-200 text-red-900"
            }
            `}>
                <p className={`font-semibold`}>{type === "1" ? "Exitos" : "Error"}</p>
                <p className={`font-light`}>{msg !== "" ? msg : "Poliza emitida exitosamente"}</p>
            </div>
        )
    }

    useEffect(()=>{
        setErrorInNumber(paymentObject.paymentAccepted > paymentObject.total)
    }, [paymentObject.paymentAccepted, paymentObject.total])

    return (
        <div className="ml-[6%] w-[94%] relative flex justify-center items-center h-screen bg-gray-50 p-8">
            {validatingPolicy && <div className='fixed top-0 left-0 bg-transparent z-50 w-full h-full'></div>}
            {successStatus && <AlertComponent state={setSuccessStatus} type={"1"} msg={successMessage} />}
            {errorStatus && <AlertComponent state={setErrorStatus} type={"2"} msg={errorMessage} />}
            { !emmitedPolicy ? 
                <div className="bg-white w-1/2 h-full p-8 block relative">
                
                <div className="w-fit flex justify-start items-center gap-3 mb-3">
                    <div 
                    onClick={()=>{ history("/to-emmit-policy-register", {state: {...data.state[2], formObject: data.state[3]}, }) }}
                    className="mr-3 cursor-pointer w-fit flex justify-start items-center gap-3">
                        <span className="text-2xl text-primary">
                            <FiChevronLeft/>
                        </span>
                        <p className="text-slate-900 text-base font-medium">Regresar</p>
                    </div>
                    <div className="h-10 relative block">
                        <img src={`./images/logos/logo-${data.state[2]["imagen"]}`} className='h-full box-border w-full object-contain' />
                    </div>
                    <div className="flex flex-col relative text-left justify-center items-left">
                        <p className="font-light text-base text-slate-500">{data.state[2]["descripcion"]}</p>
                        <p className="font-semibold text-base text-slate-900">Total del Plan: <span className="text-xl">${data.state[2]["totalPlan"]}</span></p>
                    </div>
                </div>

                <p className='mb-2 title-section text-slate-900'>Fecha de Vigencia de la Póliza</p>
                <div className="w-full flex mb-4">
                    <div className="mb-3 mr-3 w-1/2">
                        <p className="input-label">Desde</p>
                        <InputComponent fromYear={1950} toYear={moment().year().toString()} customOnChange={(date) => handleDateChange("since", date)} daySelected={selectedDate}/>
                    </div>
                    <div className="mb-3 mr-3 w-1/2">
                        <p className="input-label">Hasta</p>
                        <div className="bg-slate-200 cursor-default form-control">{dateObject.toShow ?? "-"}</div>
                    </div>
                </div>
                <p className='mb-3 title-section text-slate-900'>Pago de la Póliza</p>
                <div className="mb-3 w-full">
                    <p className="input-label">Forma de Pago</p>
                    <select value={paymentObject.typePayment} onChange={(e)=>{ setPaymentObject({...paymentObject, typePayment: e.target.value}) }} type="number" className="form-control">
                        <option value="">Seleccionar</option>
                        <option value="1">Efectivo</option>
                        <option value="2">Tarjeta de Crédito</option>
                    </select>
                </div>
                <div className="w-full flex mb-12">
                    <div className="mb-3 mr-3 w-1/3">
                        <p className="input-label">Total</p>
                        <input disabled={true} value={paymentObject.total} onChange={(e)=>{ setPaymentObject({...paymentObject, total: e.target.value}) }} type="number" className="form-control" />
                    </div>
                    <div className="mb-3 mr-3 w-1/3">
                        <p className="input-label-disabled">Minimo</p>
                        <input disabled={true} value={paymentObject.minimum} onChange={(e)=>{ setPaymentObject({...paymentObject, minimum: e.target.value}) }} type="number" className="form-control-disabled" />
                    </div>
                    <div className="mb-3 mr-3 w-1/3">
                        <p className={`input-label ${errorInNumber && "error"}`}>Pago Aceptado</p>
                        <input disabled={true} placeholder='Pago Aceptado' min={1} max={paymentObject.total.toString()} value={paymentObject.paymentAccepted} onChange={(e)=>{ setPaymentObject({...paymentObject, paymentAccepted: +e.target.value}) }} type="number" className={`form-control ${errorInNumber && "error"}`} />
                        {errorInNumber && <p className="text-xs text-red-600 mt-2">Debe ser menor o igual al total</p>}
                    </div>
                </div>
                <div onClick={()=>{ !validatingPolicy && manageEmityPolice() }} className="transition cursor-pointer w-full px-16 mr-2 relative block text-center rounded-md text-white py-3 bg-primary hover:bg-secondary">
                    {validatingPolicy ? "Cargando..." : "Emitir"}
                </div>
            </div> :
            <div className="bg-white w-1/2 h-full p-8 block relative">
                <p className='mb-2 title-section text-slate-900'>Poliza Emitida</p>
                <div className="mb-5 w-full">
                    <p className="font-bold text-sm text-primary/40 mb">Asegurado</p>
                    <p className="font-light text-2xl text-secondary">{policy?.asegurado}</p>
                </div>
                <div className="mb-5 w-full">
                    <p className="font-bold text-sm text-primary/40 mb">Marca - Modelo</p>
                    <p className="font-light text-2xl text-secondary">{policy?.marca + " - " + policy?.modelo}</p>
                </div>
                <div className="mb-5 w-full">
                    <p className="font-bold text-sm text-primary/40 mb">Numero de Póliza</p>
                    <p className="font-light text-2xl text-secondary">{policy?.poliza}</p>
                </div>
                <div className="mb-5 w-full">
                    <p className="font-bold text-sm text-primary/40 mb">Vigencia Desde</p>
                    <p className="font-light text-2xl text-secondary">{policy?.fechaDesde}</p>
                </div>
                <div className="mb-10 w-full">
                    <p className="font-bold text-sm text-primary/40 mb">Vigencia Hasta</p>
                    <p className="font-light text-2xl text-secondary">{policy?.fechaHasta}</p>
                </div>
                <div onClick={()=>{ !errorInNumber && controllPrint() }} className="transition cursor-pointer w-full px-16 mr-2 relative block text-center rounded-md text-white py-3 bg-primary hover:bg-secondary">Imprimir Póliza</div>
            </div>}
        </div>
    )

    function handleValidationFunction(){
        let postObject = {
            ...data.state[0],
            FechaDesde: dateObject.from,
            FechaHasta: dateObject.to,
            IdFormaPago: paymentObject.typePayment ?? "0",
            Total: paymentObject.total ?? "0",
            Minimo: paymentObject.minimum ?? "0",
            PagoAceptado: paymentObject.paymentAccepted ?? "0",
        }
        return postObject
    }

    function manageEmityPolice(){

        setValidatingPolicy(true)
        
        let object = handleValidationFunction()
        
        const form_data = new FormData()
        form_data.append("Data", JSON.stringify(object))

        data.state[1].forEach((file, i)=>{
            form_data.append(`Documento${i}`, file["file"])
        })
        
        apiProvider.EmisorInternoEndPoint(form_data).then((res)=>{
            if(res.data){
                manageShowPolice(res.data)
            }
        }).catch(function (e) {
            setSuccessStatus(false)
            setErrorStatus(true)
            setValidatingPolicy(false)
            if (e.response) {
                let status = e.response.status
                console.log(e.response)
                if(status === 401){
                    setErrorMessage("Hubo un error, intentelo mas tarde")    
                }else{
                    setErrorMessage(e.response.data[0].Error)
                }
            }
        });
    }

    function manageShowPolice(id){
        apiProvider.getPolizaEndPoint(`?IdPoliza=${id}`).then((res)=>{

            setEmmitedPolicy(true)
            setValidatingPolicy(false)
            setSuccessStatus(true)
            setErrorStatus(false)

            setPolicy(res.data[0])
        }).catch(function (e) {
            setValidatingPolicy(false)
            setSuccessStatus(false)
            setErrorStatus(true)
            if (e.response) {
                let status = e.response.status
                console.log(e.response)
                if(status === 401){
                    setErrorMessage("Hubo un error, intentelo mas tarde")    
                }else{
                    setErrorMessage(e.response.data[0].Error)
                }
            }
        });
    }

    function controllPrint(){
        let pdfText = policy["docpoliza"].replace(" ", "")
        const linkSource = `data:application/pdf;base64,${pdfText}`;
        const downloadLink = document.createElement("a");
        const fileName = "file.pdf";
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

}

export default ValidityPolicy