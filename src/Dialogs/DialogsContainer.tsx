import React from 'react';
import {Button, Col, Row} from "antd";
import Friends from "./Friends/Friends";
import {AddMessageForm} from "./AddMessageForm/AddMessageForm";
import { useParams } from "react-router-dom";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {SendOutlined} from "@ant-design/icons/lib";
import MessagesPart from "./MessagesPart";
//@ts-ignore
import styles from './Dialogs.module.css'
const DialogsPage:React.FC =()=>{
    type params={
        userId:string
    }
    const {userId}=useParams<params>();
    return (
                <>
                    {
                        window.matchMedia("(max-width:767px)").matches ?
                            <div style={{display:'flex',flexDirection:'column',position:"relative"}} >
                                {!userId ?
                                    <Friends isMobileVersion={true} /> :
                                    <>
                                        <MessagesPart isMobileVersion userId={userId}/>
                                        <AddMessageForm userId={userId}/>
                                    </>
                                }
                            </div>:
                        <Row className={styles.dialogsContainer}
                             style={{border:"1px solid #dbdbdb"}}>
                            <Col span={6}>
                                <Friends isMobileVersion={false}/>
                            </Col>
                            <Col className={styles.messageBlock} style={
                                !userId ?
                                    {display:"flex",
                                        justifyContent:"center",
                                        alignItems:"center"
                                    }:{}}     span={18}>
                                {userId ?
                                    <>
                                        <MessagesPart  userId={userId}/>
                                        <AddMessageForm userId={userId}/>
                                    </>:
                                    <div style={
                                        {
                                            display:"flex",
                                            justifyContent:"center",
                                            alignItems:"center",
                                            flexDirection:"column"
                                        }
                                    }>
                                        <div
                                            style={{width:200,height:200,
                                                border:"1px solid #333",borderRadius:"50%",display:"flex",
                                                alignItems:"center", justifyContent:"center"
                                            }}>
                                            <SendOutlined style={{fontSize:80}}  />
                                        </div>
                                        <h2 style={{fontSize:"1.5rem"}}>Send messages to anyone!</h2>
                                        <Button style={{maxWidth:"max-content",margin:"0 auto"}} type={"primary"}>Send
                                        </Button>
                                    </div>
                                }
                            </Col>                        </Row>
                    }
                </>
            )

}
export default  withAuthRedirect(DialogsPage)
