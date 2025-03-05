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
    return await commonApi('DELETE', `${serverUrl}/delete-child/${id}`);
}