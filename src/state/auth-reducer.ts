import {stopSubmit} from "redux-form";
import { BaseThunkType, inferActionsType} from "./redux-store";
import {ResultCodesEnum, ResultCodesEnumCaptcha} from "../api/api";
import authApi from "../api/authApi";
import {securityApi} from "../api/securityApi";
type NullableType<T> =null | T;
const initialState={
id:null as NullableType<number>,
    email:null as   NullableType<string>,
    login:null as NullableType<string>,
    isAuth:  false,
    captchaUrl:null as NullableType<string>,
    error:null as NullableType<string>,
    loginData:null as NullableType<SetUserDataActionPayloadType>,
}
const authReducer=(state=initialState,action:ActionsType):InitialStateType=>{
    switch (action.type) {
        case "auth/setUserData":
            return {...state,
                email:action.data.email,
                login:action.data.login,
                isAuth: action.data.isAuth,
                id:action.data.id,
          loginData:action.data}
        case "auth/setCaptchaURL":
            return {...state,captchaUrl:action.captchaUrl}
        case "auth/SET_ERROR":{
            return {...state,error: action.payload}
        }
        default:{
            return state
        }
    }
}
const authActions={
    setUserDataActionCreator:(id:null | number,
                              login:string | null,
                              email:string | null,isAuth:boolean)=>(
            {type:"auth/setUserData",data:{id,login,email,isAuth}} as const),
    setCaptchaUrlSuccess:(captchaUrl:string)=>(
         {type:"auth/setCaptchaURL",captchaUrl} as const
    ),
    setError:(errorMessage:string)=>({type:"auth/SET_ERROR",payload:errorMessage} as const)
}
export const authMeThunkCreator=():ThunkType=>async (dispatch)=>{
    const response=await  authApi.authMe();
                if (response.resultCode===ResultCodesEnum.Success){
                    const data=response.data;
                    dispatch(authActions.setUserDataActionCreator(data.id,data.login,data.email,true));
                }
            }
export const login=(email:string,password:string,rememberMe:boolean,captcha:string)
    :ThunkType=> async (dispatch)=>{
        authApi.login(email,password,rememberMe,captcha).then(response=>{
           if (response.resultCode===ResultCodesEnum.Success){
               dispatch(authMeThunkCreator());
           }
           else{
                if (response.resultCode===ResultCodesEnumCaptcha.CaptchaIsRequired){
                    dispatch(getCaptchaUrl());
                }
               let message=response.messages.length>0  ?  response.messages[0] : "Some error"
               dispatch(authActions.setError(message));
           }
        });
    }
export const loginOut=():ThunkType=> async dispatch=>{
    const response= await  authApi.logout();
    if (response.resultCode===0){
        dispatch(authActions.setUserDataActionCreator(null,null,null,false));
    }
}
export const getCaptchaUrl=():ThunkType=>{
    return async dispatch=>{
        const data=await securityApi.captcha();
        dispatch(authActions.setCaptchaUrlSuccess(data.url));
    }
}
export default authReducer;
export type InitialStateType=typeof initialState;
type ActionsType=inferActionsType<typeof authActions>
type ThunkType=BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>;
export type SetUserDataActionPayloadType={
    id:number | null,
    login:string | null,
    email:string | null,
    isAuth:boolean
}
