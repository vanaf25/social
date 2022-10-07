import {AppStateType} from "./redux-store";
export const getUsers=(state:AppStateType)=>{
    return state.users.users
}
/*const getUsersSuperSelector=createSelector(getUsers,users=>{
    return users.filter(u=>true)
})*/
export const getPageSize=(state:AppStateType)=>{
    return state.users.pageSize
}
export const getTotalUserCount=(state:AppStateType)=>{
    return state.users.totalUserCount
 }
 export const getCurrentPage=(state:AppStateType)=>{
    return state.users.currentPage
 }
 export const getIsFetching=(state:AppStateType)=>{
    return state.users.isFetching
 }
 export const getFollowingInProgress=(state:AppStateType)=>{
    return state.users.followingInProgress
 }
 export const getFilter=(state:AppStateType)=>{
    return state.users.filter
 }
 export const getIsUserInArray=(state:AppStateType)=>{
    return state.users.isUserInArray
 }
 export const getUserByIdSelector=(state:AppStateType)=> {
     return state.users.selectedUser
 }