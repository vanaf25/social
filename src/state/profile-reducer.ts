import profileApi from "../api/profileApi";
import {stopSubmit} from "redux-form";
import {CommentType, PostType, ProfilePhotosType, ProfileType} from "./types";
import { BaseThunkType, inferActionsType} from "./redux-store";
import {ResultCodesEnum} from "../api/api";
import {it} from "jest-circus";
const initialState={
    postsData:[

    ] as Array<PostType>,
    profile:null as unknown as ProfileType,
    status:null as string | null
}
const profileReducer=(state=initialState,action:ActionsType):InitialStateType=>{
    switch (action.type) {
        case "profile/AddPost":{
            let postId=state.postsData.length;
            const newPost={
                id:postId++,
                text:action.newPostText,
                likesCount:0,
                disLikesCount:0,
                comments:[{id:0,body:"qwerty",logo:null,author:'vanaf'}]
            };
            return {
                ...state,
                postsData:[...state.postsData, newPost],
            }
        }
        case "profile/userProfile": {
            return {
                ...state,
                profile: action.profile,
            }
        }
        case "profile/setStatus":{
            return {...state, status:action.status}
        }
        case "profile/deletePost":
            state.postsData.splice(action.postId,1);
            return {...state, postsData: [...state.postsData]}
        case "profile/changePhoto":
            return {...state, profile: {...state.profile, photos:action.photos}}
        case "SN/PROFILE/LIKE_POST":
            return {...state,postsData:state.postsData.map((item:PostType)=>{
                  if (item.id===action.postId){
                    return  {...item,likesCount:++item.likesCount} as PostType
                  }
                  return item
                })}
        case "SN/PROFILE/DISLIKE_POST":
            return {...state,postsData:state.postsData.map((item:PostType)=>{
                    if (item.id===action.postId){
                        return  {...item,disLikesCount:++item.disLikesCount} as PostType
                    }
                    return item as PostType
                })}
        case "profile/ADD_COMMENT":{
            const commentId=state.postsData[action.postId].comments?.length;
            action.comment.id=commentId
            return {...state,postsData: state.postsData.map((item:PostType)=>{
                if (item.id===action.postId){
                    return {...item,comments:[...item.comments,action.comment]}
                }
                return  item
                })}
        }
        case "profile/DELETE_COMMENT":{
            return {...state,postsData:state.postsData.map((item)=>{
                if (item.id===action.postId){
                    return {...item,comments:item.comments
                            .filter(comment=>comment.id!==action.commentId)}
                }
                return item
                    }
                )}
        }
        case "profile/CHANGE_COMMENT": {
                return {...state,postsData: state.postsData.map(item=>{
                    if (item.id===action.postId){
                        return {...item,comments:item.comments.map(comment=>{
                            if (comment.id===action.commentId){
                                return {...comment,body:action.commentText}
                            }
                            return comment
                            })}
                    }
                    return item
                    })}
        }
        default:{
            return state
        }
    }
}
export const profileActions={
    deletePostActionCreator:(postId:number)=>({type:"profile/deletePost",postId} as const),
     userProfileCreator:(profile:ProfileType)=>({type:"profile/userProfile",profile} as const),
    setStatusActionCreator:(status:string | null)=>({type:"profile/setStatus",status } as const),
    addPostActionCreator:(newPostText:string)=>({type: "profile/AddPost", newPostText} as const),
    likePost:(postId:number)=>({type:"SN/PROFILE/LIKE_POST",postId} as const),
    disLikePost:(postId:number)=>({type:"SN/PROFILE/DISLIKE_POST",postId} as const),
    savePhotoSuccessActionCreator:(photos:ProfilePhotosType)=>({type:"profile/changePhoto",photos} as const),
    addComment:(postId:number,comment:CommentType)=>(
        {type:"profile/ADD_COMMENT",postId,comment} as const),
    deleteComment:(postId:number,commentId:number)=>({type:"profile/DELETE_COMMENT",postId,commentId} as const),
    changeComment:(postId:number,commentId:number,commentText:string)=>({type:"profile/CHANGE_COMMENT",
        postId,commentId,commentText} as const)
}
export const getUserThunkCreator=(id:number | null):ThunkType=>async dispatch=>{
    const response=await    profileApi.getUserProfile(id);
        dispatch(profileActions.userProfileCreator(response));
   }
export const getUserStatusThunkCreator=(id:number | null):ThunkType=>async (dispatch:any)=>{
        const response= await profileApi.getStatus(id);
            dispatch(profileActions.setStatusActionCreator(response));
}
export const updateStatusThunkCreator=(newStatus:string):ThunkType=>async (dispatch:any)=>{
    try {
        const response=await profileApi.updateStatus(newStatus);
        if(response.resultCode===ResultCodesEnum.Success){
            dispatch(profileActions.setStatusActionCreator(newStatus));
        } 
    } catch (e) {

    }
   
}
export const savePhotoSuccessThunkCreator=(photo:File):ThunkType=>{
   return  async (dispatch)=>{
        let response=await profileApi.setPhoto(photo);
        if (response.resultCode===ResultCodesEnum.Success){
            dispatch(profileActions.savePhotoSuccessActionCreator(response.data.photos));
        }
    }
}
export const setProfileInfoThunkCreator=(info:ProfileType):ThunkType=>async (dispatch,getState)=>{
    const id=getState().auth.id;
        let response=await profileApi.setProfileInfo(info);
        if (response.resultCode===ResultCodesEnum.Success){
            if (id){
                dispatch(getUserThunkCreator(id));
            }
            else {
                throw new Error("Id cannot be null");
            }
        }
        else{
            const message=response.messages.length>0 ?  response.messages[0] : "Some error"
            dispatch(stopSubmit("edit-profile",{_error:message}));
            return Promise.reject(message);
        }
    }
export default profileReducer;
export type InitialStateType=typeof initialState;
type ActionsType=inferActionsType<typeof profileActions>
type ThunkType=BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>;

