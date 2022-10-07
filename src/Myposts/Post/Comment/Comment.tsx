import React, { createElement, useState } from 'react';
import moment from 'moment';
import {Avatar, Tooltip, Comment, Input} from "antd";
import {useDispatch} from "react-redux";
import {profileActions} from "../../../state/profile-reducer";
type CommentType={
    author:string,
    body:string,
    logo:string | null,
    commentId:number,
    postId:number
}
export const CommentComponent:React.FC<CommentType>=(
    {body,author,logo,commentId,postId})=>{
    const dispatch=useDispatch();
    const [editMode,setEditMode]=useState<boolean>(false);
    const deleteCommentHandle=()=>dispatch(profileActions.deleteComment(postId,commentId));
    const changeCommentHandle=(e:React.FocusEvent<HTMLInputElement>)=>{
        dispatch(profileActions.changeComment(postId,commentId,e.target.value));
        setEditMode(false);

    }
    const actions = [
       <span onClick={()=>setEditMode(true)}  key="comment-basic-change-to">Change</span>,
        <span onDoubleClick={deleteCommentHandle} key="comment-basic-reply-to">Delete</span>,
    ];
    return (
        <Comment
            actions={actions}
            author={<small>{author}</small>}
            avatar={

                <Avatar
                    style={{width:30,height:30}}
                    src={logo ? logo:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
                    alt="Han Solo"
                />
            }
            content={
                <small>
                    { editMode ? <Input onBlur={changeCommentHandle} />: <span>{body}</span>}
                </small>
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <small>{moment().fromNow()}</small>
                </Tooltip>
            }
        />
    )
}
