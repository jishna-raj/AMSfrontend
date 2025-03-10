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
