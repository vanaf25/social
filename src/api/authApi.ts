import {instance, ResultCodesEnum, ResultCodesEnumCaptcha,ResponseType} from "./api";
type LoginDataType={
    userId:number
}
type MeResponseDataType={
    id:number,
    email:string,
    login:string
}
export default {
    authMe:()=>{
        return instance.get<ResponseType<MeResponseDataType>>(`auth/me`).then(res=>res.data)
    },
    login:(email:string,password:string,rememberMe:boolean=false,captcha:null | string=null )=>{
        return instance.post<ResponseType<LoginDataType,ResultCodesEnum | ResultCodesEnumCaptcha>>
        (`auth/login`,{email,password,rememberMe,captcha}).then(res=>res.data);
    },
    logout:()=>{
        localStorage.setItem("key","");
        return instance.delete<ResponseType>(`auth/login`).then(res=>res.data);
    }
}
