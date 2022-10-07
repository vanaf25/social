import {instance} from "./api";
/*
function withResData<T> (resolving,type:string,url:string):T {
return instance[type]<T>(url).then(res=>res.data);
}*/
import {ResponseType} from "./api";
export const dialogsApi={
    createDialog(userId:number){
        return instance.put<ResponseType>(`dialogs/${userId}`).then(res=>res.data);
    },
    getAllDialogs(){
        return instance.get<any>(`dialogs`).then(res=>res.data);
    },
    getDialog(userId:number,page:number,count:number){
        return instance.get<any>(`dialogs/${userId}/messages?count=${count}&page=${page}`).then(res=>res.data)
    },
    postMessageToDialog(userId:number,message:string){
        return instance.post<any>(`dialogs/${userId}/messages`,{body:message}).then(res=>res.data)
    },
    getIsMessageViewed(dialogsId:number,messageId:number){
        return instance.post<ResponseType>(`dialogs/${dialogsId}messages/${messageId}/viewed`).then(res=>res.data);
    },
    postMessageToSpam(messageId:string){
        return instance.post<ResponseType>(`dialogs/messages/${messageId}/spam`).then(res=>res.data);
    },
    deleteMessage(messageId:string){
        return instance.delete<ResponseType>(`dialogs/messages/${messageId}`).then(res=>res.data);
    },
    restoreMessage(messageId:string){
        return instance.put<ResponseType>(`dialogs/messages/${messageId}/restore`).then(res=>res.data);
    },
    getNewMessages(){
        return instance.get<any>(`dialogs/messages/new/count`).then(res=>res.data);
    }
}