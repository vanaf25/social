import React from "react";
import {ChatMessageType} from "../../ChatPage";
import { UserOutlined } from '@ant-design/icons';
// @ts-ignore
import classes from './Message.module.css';
import {Avatar} from "antd";
import {useSelector} from "react-redux";
import {getId} from "../../../../state/auth-selectors";
import {Link} from "react-router-dom";
export const Message:React.FC<ChatMessageType>=React.memo( ({userId,message, userName,photo,withData})=>{
    console.log(withData);
    const myId=useSelector(getId);
        return (
            <div className={classes.message}>
                <div className={`${classes.message__body} ${myId===userId ? classes.myMessage :""}` }>
                    <div className={classes.message__image}>
                        {
                            myId!==userId && withData &&
                                <Link to={`/profile/${userId}`}>{photo ? <img src={photo} alt={"photo"} />
                                    :<Avatar
                                        style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>}
                                </Link>
                        }
                    </div>
                    <div className={`${classes.message__content} ${myId===userId ? classes.myMessageContent :""}`}>
                        {
                         myId!==userId && withData &&  <h5><Link to={`profile/${userId}`}>{userName}</Link></h5>
                        }
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        )
    })