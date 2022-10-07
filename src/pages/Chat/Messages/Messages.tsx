import React, {useEffect, useRef, useState} from "react";
import {Message} from "./Message/Message";
import {useSelector} from "react-redux";
import {getChatMessages} from "../../../state/chat-selectors";
import ReactAudioPlayer from 'react-audio-player';
import {AddMessageForm} from "../AddMessageForm/AddMessageForm";
export const Messages:React.FC=()=>{
const messages=useSelector(getChatMessages);
const messagesAnchorRef=useRef<HTMLDivElement>(null);
const [isAudioVisible,setIsAudioVisible]=useState<boolean>(false);
const iframeRef=useRef<HTMLIFrameElement>(null);
const audioRef=useRef<HTMLAudioElement>(null);
const [isAutoScroll,setIsAutoScroll]=useState(true);
    let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (!isChrome){
        iframeRef?.current?.remove()
    }
    else {
        audioRef?.current?.remove() // just to make sure that it will not have 2x audio in the background
    }
const scrollHandler=(e:React.UIEvent<HTMLDivElement,UIEvent>)=>{
const element=e.currentTarget;
    if (Math.round(element.scrollHeight-element.scrollTop)===element.clientHeight){
        setIsAutoScroll(true);
    }
    else{
        setIsAutoScroll(false);
    }
}
    useEffect(()=>{
        messagesAnchorRef?.current?.scrollIntoView({behavior:"smooth",block:"end"});
    },[]);
const renderCount=useRef<number>(0);
useEffect(()=>{
    renderCount.current++
    if (renderCount.current>=4){
        setIsAudioVisible(true);
    }
},[messages]);
useEffect(()=>{
    if (isAutoScroll){
        messagesAnchorRef?.current?.scrollIntoView({
            behavior:"smooth",
            block:"center"
        });
    }
},[messages]);
    return <div onScroll={scrollHandler} style={
        {maxHeight:'400px',
            overflowY:'auto',
            background:"#2e2e2e",
        padding:"15px",
            margin:"0 15px",

    }}>
        {messages?.map((item,index,array)=>{
            return <Message
                userId={item.userId}
                userName={item.userName} photo={item.photo}
                withData={array[index-1]?.userId!==item.userId  }
                key={item.id} message={item.message}/>
        })}
        {isAudioVisible &&
            <ReactAudioPlayer
                src="https://audiokaif.ru/wp-content/uploads/2019/04/2-Звук-сообщения-телеграмм.mp3"
                onEnded={()=>setIsAudioVisible(false)}
                autoPlay={true}/>

            }
        <div ref={messagesAnchorRef}> </div>
        <AddMessageForm/>
    </div>
}

