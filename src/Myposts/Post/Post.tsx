import React, {createElement, useState} from 'react'
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import {Comment, Tooltip, Avatar, Input, Button} from 'antd';
import moment from 'moment';
import {useDispatch, useSelector} from "react-redux";
import {profileActions} from "../../state/profile-reducer";
import {CommentType} from "../../state/types";
import {CommentComponent} from "./Comment/Comment";
import {getProfileInfo} from "../../state/profile-selectors";
type PostPropsType={
    likeCount:number,
    disLikeCount:number
    text:string,
    id:number,
    comments:Array<CommentType>
}
export const Demo:React.FC<PostPropsType> = ({comments,likeCount,text,id,disLikeCount}) => {
    const dispatch=useDispatch();
    const [action, setAction] = useState<null | string>(null);
    const like = () => {
        dispatch(profileActions.likePost(id));
        setAction('liked');
    };
    const dislike = () => {
      dispatch(profileActions.disLikePost(id))
        setAction('disliked');
    };
    const [isOpenComment,setIsOpenComments]=useState<boolean>(false);
    const deletePost=()=>{
        dispatch(profileActions.deletePostActionCreator(id));
    }
    const AddCommentHandler=()=>{
        if (comValue?.trim()){
            const comment={
                id:0,
                body:comValue?.trim(),
                logo:profile.photos.small,
                author:profile.fullName
            }
            dispatch(profileActions.addComment(id,comment))
        }
    }
    const [comValue,setComValue]=useState<string>("");
    const profile=useSelector(getProfileInfo);
    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likeCount}</span>
      </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{disLikeCount}</span>
      </span>
        </Tooltip>,
        <span onClick={deletePost} key="comment-basic-reply-to">Delete</span>,
        <div style={{display:"flex"}}>
            <Input value={comValue} onChange={(e)=>setComValue(e.target.value)}  />
            <Button style={{marginLeft:"5px"}} onClick={AddCommentHandler}>Добавить</Button>
        </div>

    ];
    return (
        <Comment
            actions={actions}
            avatar={
                <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                />
            }
            content={
                <div>
                    <p>
                        {text}
                    </p>
                    <small onClick={()=>setIsOpenComments(prevState => !prevState)}
                           style={{cursor:"pointer"}} >
                        {
                            isOpenComment ? "Hide comments" :`Show comments(${comments.length})`
                        }

                    </small>

                    { isOpenComment && comments.map(comment=>{
                      return  <CommentComponent
                          key={comment.id}
                          author={comment.author} body={comment.body}
                                          logo={comment.logo} commentId={comment.id} postId={id} />
                    })}
                </div>

            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                </Tooltip>
            }
        />
    );
};
