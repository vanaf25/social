import React from "react";
import {Message} from "./Message/Message";
import { MessageType} from "../state/dialogs-reducer";
export const Messages:React.FC<{userId:string,items:Array<MessageType>,date:string,photo:string | null}>
    =({userId,items,date,photo})=>{
    const [day,dateOfMonth,month]:string[]=date.split('_');
    const months:Array<string>=["January","February","March","April","May","June","July","August","September",
        "October","November","December"
    ]
    const daysOfWeek:Array<string>=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday",
        "Saturday"]
    return (
        <>
            {
                <div>
                    <div>
                        <div style={{background:"rgb(186,183,183,0.6)",textAlign:"center",
                            color:"#ddd",padding:"5px 0"
                        }}>
                            {daysOfWeek[+day]} {dateOfMonth} {months[+month]}</div>
                        {items?.map((item)=>{
                            if (userId){
                                return <Message
                                    addedAt={item.addedAt}
                                    userId={+userId}
                                    body={item.body}
                                    senderId={item.senderId}
                                    photo={userId ? item.senderId===+userId ? photo
                                        :"":""}
                                    key={item.id}
                                    id={item.id}
                                    recipientId={item.recipientId}
                                    viewed={item.viewed}
                                    translatedBody={item.translatedBody}
                                    senderName={item.senderName}
                                />
                            }
                        })}
                    </div>
                </div>}
        </>
       )
}

