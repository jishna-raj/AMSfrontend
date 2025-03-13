import { commonApi } from "./commonApi"
import { serverUrl } from "./serverurl"

export const AdminregisterApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/admin-reg`, reqBody, "")


}

export const WorkerregisterApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/reg-worker`, reqBody, "")
}
export const AdminloginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/admin-log`, reqBody, "")
}

export const WokerloginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/login-worker`, reqBody, "")



}



export const getalluserapi = async() =>{
    return await commonApi('GET',`${serverUrl}/all-user`)
}


export const deleteUserApi = async(id) => {

    return await commonApi('DELETE',`${serverUrl}/delete-user/${id}`)
}


export const updateUserApi = async(id,reqBody) =>{

    return await commonApi('PUT',`${serverUrl}/update-user/${id}`,reqBody)
}


/* add child */
export const addChildApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/add-child`, reqBody, reqHeader)
}

/* get all child */

export const getallchildApi = async () => {
    return await commonApi('GET', `${serverUrl}/all-child`, "", "")
}

/* get a child */

export const getaChildByIdApi = async (id) => {
    return await commonApi('GET', `${serverUrl}/child/${id}`, "", "");
};


/* update a child */

export const updateChildApi = async (id, reqBody, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/update-child/${id}`, reqBody, reqHeader)
}


/* delete */


export const deleteChildApi = async (id) =>{
    return await commonApi('DELETE', `${serverUrl}/delete-child/${id}`,"","");
}



/* Inventory */

/* add inventory */

export const addInventoryApi = async (reqBody) =>{
    return await commonApi('POST',`${serverUrl}/add-inventory`,reqBody,"")
}


export const getAllinventoryApi = async () =>{
    return await commonApi('GET',`${serverUrl}/all-inventory`,"","")
}


export const updateInventoryApi = async (id,reqBody) => {
    return await commonApi('PUT',`${serverUrl}/update-inventory/${id}`,reqBody,"")
}


export const deleteinventoryApi = async (id) =>{
    return await commonApi('DELETE',`${serverUrl}/delete-inventory/${id}`)
}


/* workers */


export const addWorkerApi = async(reqBody) => {

    return await commonApi('POST',`${serverUrl}/add-worker`,reqBody,'')
}


export const allWorkerApi = async () => {


    return await commonApi('GET',`${serverUrl}/all-worker`)
}

export const getAWorkerApi = async (id) => {
    return await commonApi('GET',`${serverUrl}/get-worker/${id}`,'','')
}


export const updateWorkerApi = async (id,reqBody) => {
    return await commonApi('PUT',`${serverUrl}/update-worker/${id}`,reqBody,'')
}


export const deleteWorkerApi = async (id) => {

return await commonApi('DELETE',`${serverUrl}/delete-worker/${id}`)

}



export const addchildbeneficiaryApi = async (reqBody) =>{
    return await commonApi('POST',`${serverUrl}/add-childbeneficiary`,reqBody,'')
}

export const getallchildbeneficiaryApi = async () =>{

    return await commonApi('GET',`${serverUrl}/all-childbeneficiaries`)
}


export const getachildbeneficiaryApi = async (id) =>{

    return await commonApi('GET',`${serverUrl}/a-childbeneficiary/${id}`)
}



export const updateaChildBeneficiaryApi = async (id,reqBody) => {
    return await commonApi('PUT',`${serverUrl}/update-childbeneficiary/${id}`,reqBody,'')
}



export const deleteChildBeneficiaryApi = async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/delete-childbeneficiaries/${id}`)
}


/* mother */

export const addmotherApi = async(reqBody) =>{

    return await commonApi('POST',`${serverUrl}/add-lact`,reqBody,'')
}


export const getallmotherApi = async() => {
    return await commonApi('GET',`${serverUrl}/all-mother`)
}


export const getamotherApi = async(id) => {

    return await commonApi('GET',`${serverUrl}/a-mother/${id}`)
}


export const updatemotherApi = async (id,reqBody) => {

    return await commonApi('PUT',`${serverUrl}/update-lact/${id}`,reqBody)
}

export const deletemotherApi = async (id) => {

    return await commonApi('DELETE',`${serverUrl}/delete-lact/${id}`)
}


/* pregnant */


export const addPregnantApi = async (reqbody,reqHeader) => {
    return await commonApi('POST',`${serverUrl}/add-pregnant`,reqbody,reqHeader)
}



export const getAllpregnantApi = async()=>{

    return await commonApi('GET',`${serverUrl}/get-allpregnant`)
}



export const getApregnantApi = async(id)=>{

    return await commonApi('GET',`${serverUrl}/getapregnant/${id}`)
}

export const updatepregnantApi = async(id,reqBody)=>{

    return await commonApi('PUT',`${serverUrl}/update-pregnant/${id}`,reqBody)
}


export const deletepregnantApi = async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/delete-pregnant/${id}`)
}


export const parentregisterApi = async(reqBody)=>{

    return await commonApi('POST',`${serverUrl}/parent-register`,reqBody)
}


export const parentLoginApi = async(reqBody) => {

    return await commonApi('POST',`${serverUrl}/parent-login`,reqBody)
}

export const HealthLoginApi = async(reqBody) =>{

    return await commonApi('POST',`${serverUrl}/health-login`,reqBody)
}


export const addHealthComplaintApi = async(reqBody) =>{


    return await commonApi('POST',`${serverUrl}/add-complaint`,reqBody)
}

export const getAllComplaintApi = async() => {

    return await commonApi('GET',`${serverUrl}/get-complaint`)
}

export const getAComplaintApi = async(id) => {

    return await commonApi('GET',`${serverUrl}/get-a-complaint/${id}`)
}


export const updateComplaintApi = async(id,reqBody) =>{

    return await commonApi('PUT',`${serverUrl}/update-complaint/${id}`,reqBody)
}
