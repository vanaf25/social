import {UserType} from "./types";
import { BaseThunkType, inferActionsType} from "./redux-store";
import { ResultCodesEnum} from "../api/api";
import usersApi from "../api/users-api";
const initialState={
    users:[] as Array<UserType>,
    pageSize:10,
    totalUserCount:0 ,
    currentPage:1 ,
    isFetching:false,
    isUserInArray:false,
    followingInProgress:[] as Array<number>,
    selectedUser:{} as UserType,
    filter:{
        term:"",
        friend:null as  null | boolean
    },
}
export const userReducer=(state=initialState,action:ActionsType):InitialStateType=>{
    switch (action.type) {
        case "follow":{
            return {...state,
                users:state.users.map(u=>{
                    if (u.id===action.userId){
                        return {...u, followed:true}
                    }
                    return u
                })
            }
        }
        case "users/SET_FILTER":{
          return {
              ...state,
              filter:action.payload
          }
        }
        case "unFollow":{
            return {...state,
                users:state.users.map(u=>{
                    if (u.id===action.userId){
                        return {...u, followed:false}
                    }
                    return u
                })
            }
        }
        case "setUsers":{
            return {...state,users:action.users}
        }
        case "setPage":
            return {...state,currentPage:action.currentPage}
        case "userCount":
            return {...state,totalUserCount:action.usersCount}
        case "users/toggleIsFetching":
            return {...state,isFetching: action.isFetching}
        case  "followingInProgress":
            return {...state,followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.actionId] :
                    [...state.followingInProgress].filter(id=>id!==action.actionId)}
        case "users/SET_PAGE_SIZE":
            return  {...state,pageSize: action.payload}
        case "users/IS_USER_IN_ARRAY":{
            return {...state,isUserInArray:
                !!state.users.filter(user => user.id === action.payload).length
            }
        }
        case "users/GET_USER_BY_ID":{
            return {...state, selectedUser: state.users.filter(user=>user.id===action.payload)[0]}
        }
        default:{
            return state
        }
    }
}
export const usersActions={
     followActionCreator:(userId:number)=>({type:"follow", userId} as const),
    unFollowActionCreator:(userId:number)=>({type:"unFollow", userId} as const),
    setUserActionCreator:(users:Array<UserType>)=>({type:"setUsers",users} as const),
     setPageCreator:(currentPage:number)=>({type:"setPage",currentPage} as const),
     setUsersCountCreator:(usersCount:number)=>({type:"userCount",usersCount} as  const),
     toggleIsFetchingCreator:(isFetching:boolean)=>({type:"users/toggleIsFetching",isFetching} as const),
    setFilter:(filter:UsersSearchFormType)=>({type:"users/SET_FILTER",payload:filter} as const),
     followingInProgressActionCreator:(isFetching:boolean,actionId:number)=>({type:"followingInProgress",isFetching,actionId} as const),
    setPageSize:(pageSize:number)=>({type:"users/SET_PAGE_SIZE",payload:pageSize} as const),
    isUserInArray:(id:number | null)=>({type:"users/IS_USER_IN_ARRAY",payload:id} as const),
    getUserById:(id:number | null)=>({type:"users/GET_USER_BY_ID",payload:id} as  const),
}
 export const getUsersThunkCreator=(currentPage:number=1,pageSize:number=10,
                                    filter:UsersSearchFormType={term:"",friend:true},
                                    withOutDispatches:boolean=false):ThunkType=>
     async (dispatch)=>{
       dispatch(usersActions.toggleIsFetchingCreator(true));
       if (currentPage===0) currentPage=1
       if (!withOutDispatches){
           dispatch(usersActions.setPageCreator(currentPage));
           dispatch(usersActions.setFilter(filter));
           dispatch(usersActions.setPageSize(pageSize));
       }
         const data=await  usersApi.getUsers(
             {currentPage: currentPage, pageSize: pageSize, term:filter.term,friend:filter.friend});
         dispatch( usersActions.setUserActionCreator(data.items));
         dispatch(usersActions.setUsersCountCreator(data.totalCount));
         dispatch(usersActions.toggleIsFetchingCreator(false));
     }
export const follow=(id:number):ThunkType=>
    async (dispatch)=>{
       dispatch(usersActions.followingInProgressActionCreator(true,id));
      const data=await  usersApi.follow(id);
               if (data.resultCode===ResultCodesEnum.Success){
                  dispatch(usersActions.followActionCreator(id));
               }
               dispatch(usersActions.followingInProgressActionCreator(false,id));
           }
export const unFollow=(id:number):ThunkType=>
    async (dispatch)=>{
        dispatch(usersActions.followingInProgressActionCreator(true,id));
        const data=await usersApi.unFollow(id);
        if (data.resultCode===ResultCodesEnum.Success){
            dispatch(usersActions.unFollowActionCreator(id));
        }
        dispatch(usersActions.followingInProgressActionCreator(false,id));
    }
export default userReducer
export type InitialStateType=typeof initialState;
type ThunkType=BaseThunkType<ActionsType>;
type ActionsType=inferActionsType<typeof usersActions>;
export type UsersSearchFormType={
    term:string,
    friend:null | boolean
}