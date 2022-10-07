import {BaseThunkType, inferActionsType} from "./redux-store";
import {ChatMessageType} from "../pages/Chat/ChatPage";
import {chatApi} from "../api/chat-api";
import {Dispatch} from "redux";
import {v1} from 'uuid';
export type ChatMessageTypeWithId=ChatMessageType & {id:string, addedAt?:string}
const initialState={
messages:[] as Array<ChatMessageTypeWithId>,
    isFetching: false,
}
export const chatReducer=(state=initialState,action:actionsType):InitialStateType=>{
    switch (action.type) {
        case "SN/CHAT/MESSAGES_RECEIVED":{
            return  {...state,messages:[...state.messages,
                    ...action.payload.map((m)=>({...m,id:v1()}))]
            }
        }
        case "SN/CHAT/SET_IS_FETCHING":{
            return {...state,isFetching: action.payload}
        }
        case "SN/CHAT/CLEAN_MESSAGES":{
            return  {...state,messages:[]}
        }
        default:
            return state
    }
}
const chatActions={
MessagesReceived:(messages:Array<ChatMessageType>)=>({type:"SN/CHAT/MESSAGES_RECEIVED",payload:messages} as const),
    setIsFetching:(payload:boolean)=>({type:"SN/CHAT/SET_IS_FETCHING",payload} as const),
    cleanMessages:()=>({type:"SN/CHAT/CLEAN_MESSAGES"} as const)
}
let _newMessageHandler:((messages:Array<ChatMessageType>)=>void) | null=null
let _toggleIsFetchingHandler:((isFetching:boolean)=>void ) |null=null;
let _cleanMessagesHandler:(()=>void ) |null=null;

const newMessageHandlerCreator=(dispatch:Dispatch)=>{
    if (_newMessageHandler==null){
        _newMessageHandler=(messages:Array<ChatMessageType>)=>{
            dispatch(chatActions.MessagesReceived(messages));
        }
    }
    return _newMessageHandler
}
const cleanMessagesHandlerCreator=(dispatch:Dispatch)=>{
    if (_cleanMessagesHandler==null){
        _cleanMessagesHandler=()=>{
            dispatch(chatActions.cleanMessages());
        }
    }
    return _cleanMessagesHandler
}
 const toggleIsFetchingHandlerCreator=(dispatch:Dispatch)=>{
    if (_toggleIsFetchingHandler==null){
        _toggleIsFetchingHandler=(isFetching:boolean)=>{
            dispatch(chatActions.setIsFetching(isFetching));
        }
    }
    return _toggleIsFetchingHandler
 }
export const startMessagesListening=():ThunkType=>async dispatch=>{
    chatApi.start();
chatApi.subscribe('messageReceived',newMessageHandlerCreator(dispatch));
chatApi.subscribe("isFetchingChanged",toggleIsFetchingHandlerCreator(dispatch));
chatApi.subscribe("cleanMessages",cleanMessagesHandlerCreator(dispatch));

}
export const stopMessagesListening=():ThunkType=>async dispatch=>{
    chatApi.unSubscribe("messageReceived",newMessageHandlerCreator(dispatch));
    chatApi.unSubscribe("isFetchingChanged",toggleIsFetchingHandlerCreator(dispatch));
    chatApi.stop();
}
export const sendMessage=(message:string):ThunkType=>async dispatch=>{
chatApi.sendMessage(message);
}
type actionsType=inferActionsType<typeof chatActions >
type ThunkType=BaseThunkType<actionsType>;
type InitialStateType=typeof  initialState;
