import {AppStateType} from "./redux-store";
export const getDialogs=(state:AppStateType)=>state.messagePage.dialogs
export const getSelectedDialog=(state:AppStateType)=>state.messagePage.selectedDialog
export const getDialogsIsFetching=(state:AppStateType)=>state.messagePage.isFetchingDialogs
export const getDialogIsFetching=(state:AppStateType)=>state.messagePage.isFetchingDialog
export const deletingMessagesInProgressSelector=(state:AppStateType)=>state.messagePage.deletingMessagesInProgress
export const getIsMessageSending=(state:AppStateType)=>state.messagePage.isMessageSending
export const getIsDialogsReceived=(state:AppStateType)=>state.messagePage.isDialogsReceived
export const getGettingDialogMessages=(state:AppStateType)=>state.messagePage.gettingMessageCount