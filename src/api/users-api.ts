import {getUsersResponseType, instance,ResponseType} from "./api";
type  GetUsersParamType={
    currentPage:number,
    pageSize:number,
    term?:string,
    friend?:null | boolean
}
export default {
    getUsers:({currentPage,pageSize,friend,term}:GetUsersParamType)=>{
        return  instance.get<getUsersResponseType>(`users?page=${currentPage}
        &count=${pageSize}
        &term=${term}${friend==null ? "" :`&friend=${friend}` }`).then(response=>response.data)
    },
    follow:(id:number)=> {
        return    instance.post<ResponseType>(`follow/${id}`).then(response=>response.data)
    },
    unFollow:(id:number)=>{
        return instance.delete<ResponseType>(`follow/${id}`).then(response=>response.data);
    }

}
