import React, {useEffect, useState} from "react";

import User from "./User/User";
import Paginator from "./Paginator";
import {UsersSearchForm} from "./UsersSearchForm";
import {follow, getUsersThunkCreator, unFollow,  UsersSearchFormType} from "../state/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage, getFilter, getFollowingInProgress, getIsFetching,
    getPageSize,
    getTotalUserCount,
    getUsers,
} from "../state/users-selectors";
import { useHistory } from "react-router-dom";
import * as queryString from "querystring";
import Preloader from "../common/Preloader/Preloader";
import {Empty} from "antd";
const Users:React.FC=()=>{
type QueryParamsType={term?:string,page?:string,friend?:string,size?:string}
    const initializedUsers=useSelector(getUsers);
    const followingInProgress=useSelector(getFollowingInProgress);
    const followWrap=(id:number)=>{
        dispatch(follow(id));
    }
    const unFollowWrap=(id:number)=>{
        dispatch(unFollow(id));
    }
    const users=initializedUsers.map(user=><User
        unFollow={unFollowWrap} follow={followWrap}
        followingInProgress={followingInProgress}
        photos={user.photos}
        status={user.status}
        key={user.id} id={user.id} followed={user.followed}
        name={user.name}/>);
    const totalUserCount=useSelector(getTotalUserCount);
    const currentPage=useSelector(getCurrentPage);
    let pageSize=useSelector(getPageSize);
    const filter=useSelector(getFilter);
    const dispatch=useDispatch();
    const history=useHistory();
    useEffect(()=>{
        const parsed=queryString.parse(history.location.search.substr(1)) as QueryParamsType;
        let actualPage=currentPage;
        let  actualFilter=filter;
        let actualPageSize=pageSize
        if (!!parsed.page) actualPage=Number(parsed.page)
        if (!!parsed.term) actualFilter={...actualFilter,term: parsed.term}
        if (!!parsed.friend) actualFilter={...actualFilter,friend: parsed.friend==="null" ? null
                : parsed.friend==="true" ? true:parsed.friend==="false" ? false :null
        }
        if (!!parsed.size){
            actualPageSize=Number(parsed.size)
        }
        dispatch(getUsersThunkCreator(actualPage,actualPageSize,actualFilter));
        },[]);
    useEffect(()=>{
        const query:QueryParamsType={

        }
        if (!!filter.term) query.term=filter.term
        if (filter.friend!==null) query.friend=String(filter.friend)
        if (currentPage>1) query.page=String(currentPage);
        if (pageSize>10) query.size=String(pageSize)
       history.push({
           pathname:"/users",
           search:queryString.stringify(query)
       });
    },[filter,currentPage,pageSize]);
   const onFilter=(values:UsersSearchFormType)=>{
        dispatch(getUsersThunkCreator(1,pageSize,values));
    }
    useEffect(()=>{
        console.log('currentPage', currentPage);
    },[currentPage])
    useEffect(()=>{
        console.log('pageSize',pageSize);
    },[pageSize])
    const onPageChanged=(pageNumber:number,pageSize:number)=>{
        console.log(pageNumber,pageSize);
        dispatch(getUsersThunkCreator(pageNumber,pageSize,filter));
    }
    const isFetching=useSelector(getIsFetching);
    return(
        <div className="container">
                <div style={isFetching ? {pointerEvents:"none",opacity:"0.7"}:{} }>
                    <UsersSearchForm  onFilter={onFilter}/>
                    {users.length ?
                        <Paginator onPageChanged={onPageChanged}
                                   totalUserCount={totalUserCount} pageSize={pageSize}
                               currentPage={currentPage}/>:""}
                </div>
            {isFetching ? <Preloader fontSize={200}/>:users?.length ? <div style={
                {display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
                {users}
            </div>: <Empty/> }
        </div>
   )
}
export default Users
