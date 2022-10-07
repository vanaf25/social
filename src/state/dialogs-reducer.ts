import {BaseThunkType, inferActionsType} from "./redux-store";
import {dialogsApi} from "../api/dialogsApi";
import {ResultCodesEnum} from "../api/api";
import {ProfilePhotosType} from "./types";
 export type PersonFriendDataType={
    id:number,
    name:string
}
export type MessagesDataType={
    id:number,
    message:string
}
 export type DialogType={
    hasNewMessages:boolean,
    id:number,
    lastDialogActivityDate:string,
    lastUserActivityDate:string,
    newMessagesCount:number,
    photos:ProfilePhotosType,
    userName:string,
}
export type MessageType={
     id:string,
body:string,
    recipientId:number,
    senderId:number,
    senderName:string,
    translatedBody:null,
    viewed:boolean,
    addedAt:string
}
type selectedDialogType={
     error:null | string,
totalCount:number,
    items:Array<MessageType>
}

const initialState={
    personFriendData:[

    ] as Array<PersonFriendDataType> ,
    messagesData:[

    ] as Array<MessagesDataType>,
    dialogs:[] as Array<DialogType>,
    selectedDialog:{
        items:[],
        error:null,
        totalCount:0
    } as selectedDialogType,
    isFetchingDialogs:false, //Ето нужно чтобы узнать загруженн ли  dialogs:[] as Array<DialogType>,
    isFetchingDialog:false,//Ето нужно чтобы узнать загруженн ли  selectedDialog:{} as selectedDialogType,,
    isMessageSending:false,
    deletingMessagesInProgress:[] as Array<string>,
    newMessagesCount:0 as number,
    currentMessagePage:0,
    gettingMessageCount:20,
    isDialogsReceived:false,
}
export const dialogsReducer=(state=initialState,action:actionsType):InitialStateType=>{
    switch (action.type) {
        case "dialogs/ADD_MESSAGE":{
            return {
                ...state,selectedDialog: {...state.selectedDialog,
                    items:[...state.selectedDialog.items,action.payload]}}
        }
        case "dialogs/SET_DIALOG":{
            return {...state}
        }
        case "dialogs/SET_ALL_DIALOGS":{
            return  {...state,dialogs:[...action.payload]}
        }
        case "dialogs/GET_MESSAGE_OF_DIALOG":{
            return {...state,selectedDialog: {...state.selectedDialog,
                    error:action.payload.error,
                    totalCount:action.payload.totalCount,
                    items:[...action.payload.items,...state.selectedDialog.items]}}
        }
        case "dialogs/TOGGLE_IS_FETCHING_DIALOG":{
            return {...state,isFetchingDialog: action.payload}
        }
        case "dialogs/TOGGLE_IS_FETCHING_DIALOGS":{
            return {...state,isFetchingDialogs: action.payload}
        }
        case "dialogs/DELETE_MESSAGE":{
            return {...state,selectedDialog: {...state.selectedDialog,
                    items:state.selectedDialog.items.filter(item=>item.id!==action.payload)}}
        }
        case "dialogs/SET_NEW_MESSAGES":{
            return {...state,newMessagesCount:action.payload}
        }
        case "dialogs/SET_DELETING_IN_PROGRESS":{
            return {...state,deletingMessagesInProgress: action.isFetching ?
                    [...state.deletingMessagesInProgress, action.messageId]
                    :[...state.deletingMessagesInProgress].filter(id=>id!==action.messageId)
            }
        }
        case "dialogs/TOGGLE_MESSAGE_SENDING":{
            return {...state,isMessageSending: action.payload}
        }
        case "dialogs/SET_DIALOG_RECEIVED":{
            return {...state,isDialogsReceived: action.payload}
        }
        case "dialogs/CLEAN_SELECTED_DIALOG":{
            return {...state,selectedDialog: {totalCount:0,error:null,items:[]}}
        }
        case "dialogs/VIEW_MESSAGES_ON_DIALOG":{
            return {...state,dialogs:state.dialogs.map(dialog=>{
                if (dialog.id===action.payload){
                    return {...dialog,hasNewMessages:false,newMessagesCount:0}
                }
                return dialog
                }) }
        }
        default:{
          return state
        }
    }
}
export const dialogsActions={
    PostMessage:(message:MessageType)=>({type:"dialogs/ADD_MESSAGE", payload:message} as const),
    postDialog:(payload:number)=>({type:"dialogs/SET_DIALOG",payload} as const),
    setAllDialogs:(payload:any)=>({type:"dialogs/SET_ALL_DIALOGS",payload} as const),
    getDialog:(payload:selectedDialogType)=>({type:"dialogs/GET_MESSAGE_OF_DIALOG",payload} as const),
    deleteMessage:(id:string)=>({type:"dialogs/DELETE_MESSAGE",payload:id} as const),
    toggleIsFetchingDialog:(isFetching:boolean)=>({type:"dialogs/TOGGLE_IS_FETCHING_DIALOG",payload:isFetching} as const),
    toggleIsFetchingDialogs:(isFetching:boolean)=>({type:"dialogs/TOGGLE_IS_FETCHING_DIALOGS",payload:isFetching} as const),
    setNewMessagesCount:(payload:number)=>({type:"dialogs/SET_NEW_MESSAGES",payload} as const),
    deletingInProgress:(isFetching:boolean,messageId:string)=>({type:"dialogs/SET_DELETING_IN_PROGRESS",isFetching,messageId} as const),
    toggleMessageSending:(payload:boolean)=>({type:"dialogs/TOGGLE_MESSAGE_SENDING",payload} as const),
    setIsDialogReceived:(payload:boolean)=>({type:"dialogs/SET_DIALOG_RECEIVED",payload} as const),
    cleanSelectedDialog:()=>({type:"dialogs/CLEAN_SELECTED_DIALOG"} as const),
    viewMessagesOnDialog:(id:number)=>({type:"dialogs/VIEW_MESSAGES_ON_DIALOG",payload:id} as const)
}
export const createDialog=(userId:number):ThunkType=>async (dispatch)=>{
const data=await dialogsApi.createDialog(userId);
    if (data.resultCode===ResultCodesEnum.Success){
    dispatch(getAllDialogs());
    }
}
export const getAllDialogs=():ThunkType=>async (dispatch)=>{
     dispatch(dialogsActions.toggleIsFetchingDialogs(false))
    const data=await dialogsApi.getAllDialogs();
    dispatch(dialogsActions.setAllDialogs(data));
    dispatch(dialogsActions.toggleIsFetchingDialogs(true));
    dispatch(dialogsActions.setIsDialogReceived(true));
}
export const getDialog=(userId:number,page:number):ThunkType=>async (dispatch)=>{
    dispatch(dialogsActions.toggleIsFetchingDialog(false));
    const data=await dialogsApi.getDialog(userId,page,20);
    dispatch(dialogsActions.getDialog(data));
    dispatch(dialogsActions.toggleIsFetchingDialog(true));
    dispatch(getNewMessages());
    dispatch(dialogsActions.viewMessagesOnDialog(userId));
}
let currentDialog:null | number=null;
export const sendMessageToDialog=(userId:number,message:string):ThunkType=>async dispatch=>{
    dispatch(dialogsActions.toggleMessageSending(true));
    if(currentDialog!==userId){
        currentDialog=userId
        dispatch(createDialog(userId));
    }
    const data=await dialogsApi.postMessageToDialog(userId,message);
    if (data.resultCode===ResultCodesEnum.Success){
        dispatch(dialogsActions.PostMessage(data.data.message));
    }
    dispatch(dialogsActions.toggleMessageSending(false));
}
export const addMessageToSpam=(userId:number, messageId:string):ThunkType=>async dispatch=>{
    if(currentDialog!==userId){
        currentDialog=userId
        dispatch(createDialog(userId));
    }
    dispatch(dialogsActions.deletingInProgress(true,messageId));
    const data= await dialogsApi.postMessageToSpam(messageId);
if (data.resultCode===ResultCodesEnum.Success){
    dispatch(dialogsActions.deleteMessage(messageId));
    dispatch(dialogsActions.deletingInProgress(false,messageId));
}
}
export const deleteMessage=(userId:number,messageId:string):ThunkType=>async dispatch=>{
    if(currentDialog!==userId){
        currentDialog=userId
        dispatch(createDialog(userId));
    }
    dispatch(dialogsActions.deletingInProgress(true,messageId));
const data=await dialogsApi.deleteMessage(messageId);
if (data.resultCode===ResultCodesEnum.Success){
    dispatch(dialogsActions.deleteMessage(messageId))
    dispatch(dialogsActions.deletingInProgress(false,messageId));
}
}
export const getNewMessages=():ThunkType=>async dispatch=>{
     const data=await dialogsApi.getNewMessages();
     dispatch(dialogsActions.setNewMessagesCount(data));
}
export default dialogsReducer;
export type InitialStateType=typeof initialState;
type actionsType=inferActionsType<typeof dialogsActions >
type ThunkType=BaseThunkType<actionsType>;
