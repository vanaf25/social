import React, {useRef, useState} from "react";
import {Button, Col, Input, Row} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useDispatch, useSelector} from "react-redux";
import {sendMessageToDialog} from "../../state/dialogs-reducer";
import {getDialogIsFetching, getIsMessageSending} from "../../state/dialogs-selectors";
export const AddMessageForm:React.FC<{userId:string | undefined}>=({userId})=>{
    const [message,setMessage]=useState('');
    const isFetching = useSelector(getDialogIsFetching);
    const dispatch=useDispatch();
    const isMessageSending=useSelector(getIsMessageSending);
    const sendMessageHandler=()=>{
        if (!message?.trim()) return
        if (userId){
            dispatch(sendMessageToDialog(+userId,message));
        }
        setMessage("");
    }
    const onChangeInput=(e:any)=>{
        setMessage(e.currentTarget.value);
    }
    return (
        <>
            { isFetching &&
            <div style={{maxWidth:"500px",bottom:0, padding:"0 10px" }}>
                <Row>
                    <Col span={24}  >
                        <TextArea  onChange={onChangeInput} value={message}  rows={5}
                                   style={{marginBottom:"5px",resize:"none"}}  />
                    </Col>
                    <Col>
                        <Button style={{marginBottom:"10px"}} disabled={isMessageSending}  onClick={sendMessageHandler}>
                            send
                        </Button>
                    </Col>
                </Row>
            </div>}
        </>
    )
}