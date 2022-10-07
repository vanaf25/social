import React, {useEffect, useState} from "react";
import {Button,Input, Popover} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage} from "../../../state/chat-reducer";
import {getIsFetching} from "../../../state/chat-selectors";
import Picker from 'emoji-picker-react';
import { SmileOutlined } from "@ant-design/icons";
export const AddMessageForm:React.FC=()=>{
    const [message,setMessage]=useState('');
    const dispatch=useDispatch();
    const isFetching=useSelector(getIsFetching);
    const sendMessageHandler=()=>{
        if (!message?.trim()) return
        dispatch(sendMessage(message));
        setMessage("");
    }
    const [isPopoverEmojiVisible,setIsPopoverEmojiVisible]=useState(false);
    const handleVisibleChange=(visible:boolean)=>{
        setIsPopoverEmojiVisible(visible)
    }
    const [chosenEmoji, setChosenEmoji] = useState<any>(null);
    const onEmojiClick = (obj:any, emojiObject:any) => {
        setChosenEmoji(emojiObject);
        setIsPopoverEmojiVisible(false);
    };
    useEffect(()=>{
        if (chosenEmoji){
            setMessage(message=>`${message}${chosenEmoji.emoji}`)
        }

    },[chosenEmoji]);
    return <div style={{maxWidth:"500px"}}>
        <div style={{display:"flex"}}>
                <Input
                    maxLength={100}
                    prefix={
                        <Popover
                            content={<Picker onEmojiClick={onEmojiClick} />}
                            visible={isPopoverEmojiVisible}
                            onVisibleChange={handleVisibleChange}
                            trigger="click">
                            <div style={{width:30,cursor:"pointer",height:30,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",border:"1px solid #000"}}>
                                <SmileOutlined  />
                            </div>
                        </Popover>

                    }
                    suffix={<Button  style={{alignSelf:"center",cursor:"pointer", marginBottom:"5px"}} disabled={!isFetching} onClick={sendMessageHandler}>
                        send
                    </Button>}
                    onChange={(e)=>setMessage(e.currentTarget.value)}
                    value={message}

                    style={{marginBottom:"5px",maxWidth:"500px",marginRight:10}}  />

        </div>
    </div>
}
