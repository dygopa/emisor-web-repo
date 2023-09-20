import axios from "axios"

let localHostURL = "http://swfcalidad.eastus.cloudapp.azure.com/sf-cotizador-api/"
let webDevURL = "https://emisorapi.azurewebsites.net/"
let url = window.location.href
let urlAPI = url.includes("http://127.0.0.1:5173/") 
            ? localHostURL 
            : webDevURL

let loginEndPoint = "api/Configuration/login"
let getProductEndPoint = "api/Configuration/get_product?IdTipoInteres=2"
let getPlanPropertyTypeEndPoint = "api/Companies/get_plan_property_type"
let getPlanOpcionEndPoint = "api/Configuration/get_plan_opcion"
let getPropertyTypeEndPoint = "api/Configuration/get_property_type?IdProducto="
let getDTPlansEndpoint = "api/Companies/GetPlanesDT"
let getStatusPlanEndPoint = "api/Configuration/get_status_plan"
let getVigeniciasEndPoint = "api/Configuration/get_vigenicias"
let getTipoAplicacionPlanEndPoint = "api/Configuration/get_tipoaplicacion_plan"
let getPlanEndPoint = "api/Configuration/get_plan"
let getCompanyEndPoint = "api/Configuration/get_company"

let getGenreEndPoint = "api/Configuration/get_genre"
let getPaisEndPoint = "api/Configuration/get_pais"
let getCivilStatusEndPoint = "api/Configuration/get_civil_status"
let GetProfesionEndPoint = "api/Companies/Get_Profesion"
let GetOcupationEndPoint = "api/Companies/Get_Ocupation"
let getManzaneroEndPoint = "api/Configuration/get_Manzanero"
let getVehiculeBrandEndPoint = "api/Configuration/get_vehicule_brand"
let getVehiculeModelEndPoint = "api/Configuration/get_vehicule_model"
let GetTipoDocumentoEndPoint = "api/Configuration/Get_TipoDocumento"

let EmisorInternoEndPoint = "api/Companies/Emisor_Interno"
let addBenefitEndPoint = "api/Configuration/add_benefit"
let emitirPolizaEndPoint = "api/Companies/emitir_poliza"
let addPlanEndPoint = "api/Configuration/add_plan"
let GetPerfilFinancieroEndPoint = "api/Configuration/Get_Perfil_Financiero"
let getBeneficiosEndPoint = "api/Configuration/get_benefit"
let getCoberturasPlanSaludEndPoint = "api/Configuration/get_CoberturasPlanSalud"
let GetNacionalidadEndPoint = "api/Configuration/Get_Nacionalidad"

let GetTipoEmisionCompaniaEndPoint = "api/Companies/Get_TipoEmisionCompania"
let getCoverageEndPoint = "api/Configuration/get_coverage"
let getCotizacionEndPoint = "api/Quotation/get_Cotizacion"
let getPolizaEndPoint = "api/Quotation/get_Poliza"
let GetDatosValidQuoteEndPoint = "api/Companies/Get_DatosValidQuote"
let addQuotaEndPoint = "api/Quotation/add_quota"
let getLimitEndPoint = "api/Configuration/get_limit"
let GetDatosIdentidadxIdentificacionEndPoint = "api/Configuration/Get_DatosIdentidadxIdentificacion"
let GetDatosContratanteEndPoint = "api/Configuration/Get_DatosContratante"
let updateBenefitEndPoint = "api/Configuration/Update_benefit"

let token = localStorage.getItem('token');

const config = {
    headers: { Authorization: `Bearer ${token}` }
};

class ApiProvider{

    async addPlanEndPoint(data){
        let url = urlAPI + addPlanEndPoint
        return await axios.post(url, data, config)
    }

    async emitirPolizaEndPoint(data){
        let url = urlAPI + emitirPolizaEndPoint
        return await axios.post(url, data, config)
    }

    async addBenefitEndPoint(data){
        let url = urlAPI + addBenefitEndPoint
        return await axios.post(url, data, config)
    }

    async EmisorInternoEndPoint(data){
        let url = urlAPI + EmisorInternoEndPoint
        return await axios.post(url, data, config)
    }

    async addQuotaEndPoint(data){
        let url = urlAPI + `${addQuotaEndPoint}`
        return await axios.post(url, data, config)
    }

    async GetTipoDocumentoEndPoint(queryString){
        let url = urlAPI + GetTipoDocumentoEndPoint + queryString

        return await axios.get(url, config)
    }

    async getPaisEndPoint(queryString){
        let url = urlAPI + getPaisEndPoint + queryString

        return await axios.get(url, config)
    }
    
    async getCotizacionEndPoint(queryString){
        let url = urlAPI + getCotizacionEndPoint + queryString

        return await axios.get(url, config)
    }
    
    async getCotizacionEndPoint(queryString){
        let url = urlAPI + getCotizacionEndPoint + queryString

        return await axios.get(url, config)
    }

    async getPolizaEndPoint(queryString){
        let url = urlAPI + getPolizaEndPoint + queryString

        return await axios.get(url, config)
    }

    async getLimitEndPoint(queryString){
        let url = urlAPI + getLimitEndPoint + queryString

        return await axios.get(url, config)
    }

    async GetDatosValidQuoteEndPoint(queryString){
        let url = urlAPI + GetDatosValidQuoteEndPoint + queryString

        return await axios.get(url, config)
    }

    async GetDatosContratanteEndPoint(queryString){
        let url = urlAPI + GetDatosContratanteEndPoint + queryString

        return await axios.get(url, config)
    }

    async GetDatosIdentidadxIdentificacionEndPoint(queryString){
        let url = urlAPI + GetDatosIdentidadxIdentificacionEndPoint + queryString

        return await axios.get(url, config)
    }

    async getCoverageEndPoint(queryString){
        let url = urlAPI + getCoverageEndPoint + queryString

        return await axios.get(url, config)
    }

    async GetTipoEmisionCompaniaEndPoint(queryString){
        let url = urlAPI + GetTipoEmisionCompaniaEndPoint + queryString

        return await axios.get(url, config)
    }

    async GetNacionalidadEndPoint(queryString){
        let url = urlAPI + GetNacionalidadEndPoint + queryString

        return await axios.get(url, config)
    }

    async getCoberturasPlanSaludEndPoint(queryString){
        let url = urlAPI + getCoberturasPlanSaludEndPoint + queryString

        return await axios.get(url, config)
    }

    async getPlanPropertyTypeEndPoint(queryString){
        let url = urlAPI + getPlanPropertyTypeEndPoint + queryString
        return await axios.get(url, config)
    }

    async getBeneficiosEndPoint(queryString){
        let url = urlAPI + getBeneficiosEndPoint + queryString

        return await axios.get(url, config)
    }

    async GetPerfilFinancieroEndPoint(queryString){
        let url = urlAPI + GetPerfilFinancieroEndPoint + queryString

        return await axios.get(url, config)
    }

    async getVehiculeModelEndPoint(queryString){
        let url = urlAPI + getVehiculeModelEndPoint + queryString

        return await axios.get(url, config)
    }
    
    async getVehiculeBrandEndPoint(queryString){
        let url = urlAPI + getVehiculeBrandEndPoint + queryString

        return await axios.get(url, config)
    }
    
    async getManzaneroEndPoint(queryString){
        let url = urlAPI + getManzaneroEndPoint + queryString

        return await axios.get(url, config)
    }

    async GetOcupationEndPoint(queryString){
        let url = urlAPI + GetOcupationEndPoint + queryString

        return await axios.get(url, config)
    }

    async GetProfesionEndPoint(queryString){
        let url = urlAPI + GetProfesionEndPoint + queryString

        return await axios.get(url, config)
    }

    async getCivilStatusEndPoint(queryString){
        let url = urlAPI + getCivilStatusEndPoint + queryString

        return await axios.get(url, config)
    }

    async getGenreEndPoint(queryString){
        let url = urlAPI + getGenreEndPoint + queryString

        return await axios.get(url, config)
    }

    async getPlanEndPoint(queryString){
        let url = urlAPI + getPlanEndPoint + queryString

        return await axios.get(url, config)
    }

    async getCompanyEndPoint(queryString){
        let url = urlAPI + getCompanyEndPoint + queryString

        return await axios.get(url, config)
    }

    async getProductEndPoint(queryString){
        let url = urlAPI + getProductEndPoint + queryString

        return await axios.get(url, config)
    }

    async getPlanOpcionEndPoint(queryString){
        let url = urlAPI + getPlanOpcionEndPoint + queryString

        return await axios.get(url, config)
    }
    
    async getDTPlans(queryString){
        let url = urlAPI + getDTPlansEndpoint + queryString

        return await axios.get(url, config)
    }

    async getPropertyTypeEndPoint(queryString){
        let url = urlAPI + getPropertyTypeEndPoint + queryString

        return await axios.get(url, config)
    }
    
    async getStatusPlanEndPoint(queryString){
        let url = urlAPI + getStatusPlanEndPoint + queryString

        return await axios.get(url, config)
    }
    
    async getStatusPlanEndPoint(queryString){
        let url = urlAPI + getStatusPlanEndPoint + queryString

        return await axios.get(url, config)
    }
    
    async getVigeniciasEndPoint(queryString){
        let url = urlAPI + getVigeniciasEndPoint + queryString

        return await axios.get(url, config)
    }
    
    async getTipoAplicacionPlanEndPoint(queryString){
        let url = urlAPI + getTipoAplicacionPlanEndPoint + queryString

        return await axios.get(url, config)
    }
    
    async updateBenefit(data){
        let url = urlAPI + updateBenefitEndPoint
        return await axios.post(url, data, config)
    }

    async postCrearOrdenCR(data){
        let url = urlAPI + postCrearOrdenCREndPoint
        return await axios.post(url, data, config)
    }

    async getUserLogin(data){
        let url = urlAPI + loginEndPoint
        return await axios.post(url, data, config)
    }
    
    async testAPI(){
        let url = urlAPI + "api/Configuration/test"
        return await axios.get(url, config)
    }

}

export default new ApiProvider()