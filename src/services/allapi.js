import { commonApi } from "./commonApi"
import { serverUrl } from "./serverurl"

export const AdminregisterApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/admin-reg`, reqBody, "")


}

export const WorkerregisterApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/reg-worker`, reqBody, "")
}
export const loginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/admin-log`, reqBody, "")
}