import React, {useState} from "react";
import { UserOutlined } from '@ant-design/icons';
// @ts-ignore
import classes from './Message.module.css';
import {Avatar, Popover} from "antd";
import {deletingMessagesInProgressSelector} from '../../state/dialogs-selectors'
import {useDispatch, useSelector} from "react-redux";
import {getId} from "../../state/auth-selectors";
import {addMessageToSpam, deleteMessage, MessageType} from "../../state/dialogs-reducer";
import {Link} from "react-router-dom";
import {log} from "util";
export const Message:React.FC<MessageType & {photo:string | null,userId:number,addedAt:string}>=React.memo(
    ({body,id,photo,senderId,viewed,userId,addedAt})=>{
    const myId=useSelector(getId);
    const deletingMessagesInProgress=useSelector(deletingMessagesInProgressSelector)
    const [visible,setVisible]=useState(false);
   const handleSetVisible=(visible:boolean)=>setVisible(visible);
   const dispatch=useDispatch();
   const handleDeleteMessage=(e:any)=>{
       e.preventDefault()
       dispatch(deleteMessage(userId, id));
   }
   const handleAddMessageToSpam=(e:any)=>{
       e.preventDefault();
       dispatch(addMessageToSpam(userId,id));
   }
   let [hours,minutes]=new Date(new Date(addedAt)).toLocaleTimeString().split(':')
   const Content=()=>{
       return (
           <div className={`${deletingMessagesInProgress.includes(id) ? classes.disabled :""}`}>
               {
                   myId===senderId ?
               <a style={{display:"block",marginBottom:5}}  onClick={handleDeleteMessage}>Delete</a>:
               <a   onClick={handleAddMessageToSpam}>To spam</a> }
           </div>
       )
   }
        return (
            <div className={classes.message}>
                {   <Popover
                        content={Content}
                        title="Actions"
                        trigger="click"
                        visible={visible}
                        onVisibleChange={handleSetVisible}
                    >
                        <span className={`${deletingMessagesInProgress.includes(id) ? classes.disabled :""}`} style={{color:"#fff",cursor:"pointer"}}>...</span>
                    </Popover> }
                <div  className={`${deletingMessagesInProgress.includes(id) ? classes.disabled : "" } ${classes.message__body} ${myId===senderId ? classes.myMessage :""}` }>
                    <div className={classes.message__image}>
                        {
                         myId!==senderId ?
                         <Link to={`/profile/${senderId}`}> {photo ?
                             <img src={photo} alt={"photo"} />:<Avatar
                             style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>}
                         </Link>
                             :""
                        }
                    </div>
                    <div  className={`${classes.message__content} ${myId===senderId ? classes.myMessageContent :""}`}>
                        <span style={{marginBottom:0,marginRight:10, color:"#fff", display:"inline-block" }}>{body} </span>
                        <span style={{fontSize:"12px",color:"#dddddd"}}>{myId===senderId && viewed && "✓✓"} {`${+hours+2}:${minutes}`}</span>
                    </div>
                </div>
            </div>
        )
    })