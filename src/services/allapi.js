import { commonApi } from "./commonApi"
import { serverUrl } from "./serverurl"

export const registerApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/admin-reg`, reqBody, "")
}
export const loginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/admin-log`, reqBody, "")
}