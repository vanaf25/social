import axios from "axios";
import {UserType} from "../state/types";
import {QueryType} from "./theme";
import {GraphQLSchema} from "graphql";
const apiKeys={
    vanaf:"04f60982-c0c6-4688-b8f7-74c748e909f8",
    messi:"b774922c-f2cb-4b3b-9d16-f5fab39a2bed",
    html:"616f512c-eb35-4929-9ec4-18c02be0b107"
}
let apiKey:any;
if (localStorage.getItem("key")
    && localStorage.getItem('key')!==JSON.parse(JSON.stringify("null"))
    && localStorage.getItem('key')!==JSON.parse(JSON.stringify(" ").trim())
){
    //@ts-ignore
    apiKey=JSON.parse(localStorage.getItem('key'));
}
else{
    apiKey=prompt("Введите apiKey.Он сохраниться в localStorage");
}
localStorage.setItem("key",JSON.stringify(apiKey));
export const instance=axios.create({
   withCredentials:true,
   baseURL:"https://social-network.samuraijs.com/api/1.0/",
   headers:{
      "API-KEY":apiKey ? apiKey:apiKeys.vanaf
   }
});
 export enum ResultCodesEnum{
    Success=0,
      Error=1,
}
export enum ResultCodesEnumCaptcha{
    CaptchaIsRequired=10
}
export type getUsersResponseType={
    items:Array<UserType>,
    totalCount:number,
    error:string | null
}
export type ResponseType<D={},RC=ResultCodesEnum>={
     data:D,
    messages:Array<string>,
    resultCode:RC
}
export default new GraphQLSchema({
    query: QueryType,
});
