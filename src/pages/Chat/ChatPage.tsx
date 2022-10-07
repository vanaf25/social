import React, {useEffect} from 'react';
import { Messages,} from "./Messages/Messages";
import {useDispatch} from "react-redux";
import {startMessagesListening, stopMessagesListening} from "../../state/chat-reducer";
export type ChatMessageType={
    message:string,
    photo:string | null,
    userId:number,
    userName:string,
    withData:boolean,
}
 const ChatPage:React.FC=()=>{
     const dispatch=useDispatch();
     useEffect(()=>{
         dispatch(startMessagesListening());
         return ()=>{
             dispatch(stopMessagesListening());
         }
     },[]);
    return (
            <Messages />
    )
}
export default ChatPage
