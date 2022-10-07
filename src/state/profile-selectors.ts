import {AppStateType} from "./redux-store";
export const getProfileInfo=(state:AppStateType)=>{
    return state.profilePage.profile
}
export const getProfileStatus=(state:AppStateType)=>{
    return state.profilePage.status
}
export const getProfilePostsData=(state:AppStateType)=>{
    return state.profilePage.postsData;
}
export const getProfilePhotos=(state:AppStateType)=>{
    return state.profilePage.profile
}