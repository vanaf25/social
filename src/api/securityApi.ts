import {instance} from "./api";
export const securityApi = {
    captcha() {
        return instance.get<{url:string}>('security/get-captcha-url').then(res=>res.data)
    }
}