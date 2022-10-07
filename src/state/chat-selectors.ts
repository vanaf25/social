import {AppStateType} from "./redux-store";

export const getChatMessages=(state:AppStateType)=>{
    return state.chat.messages
}
export const getIsFetching=(state:AppStateType)=>{
    return state.chat.isFetching
}