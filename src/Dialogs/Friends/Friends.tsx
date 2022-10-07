import React, {FC, useEffect} from "react";
import {Col, Row} from "antd";
// @ts-ignore
import c from "../Dialogs.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getLogin} from "../../state/auth-selectors";
import Friend from "../Friend/Friend";
import {getAllDialogs} from "../../state/dialogs-reducer";
import {getDialogs, getDialogsIsFetching} from "../../state/dialogs-selectors";
import Preloader from "../../common/Preloader/Preloader";
const Friends:React.FC<{isMobileVersion:boolean}>=({isMobileVersion})=>{
    const dialogs=useSelector(getDialogs);
    useEffect(()=>{
        dispatch(getAllDialogs());
    },[]);
    const login=useSelector(getLogin);
    const dispatch = useDispatch();
    const isFetching=useSelector(getDialogsIsFetching);
    return (
        <>
            <Col span={24} className={c.friends}>
                { isFetching ?
                    <div>
                        <div className={c.friends__myLogin}>
                            <h2>{login}</h2>
                        </div>
                        <div style={{padding:"10px 10px 0 10px"}}>
                            {dialogs?.map(friend=><Friend
                                hasNewMessages={friend.hasNewMessages}
                                key={friend.id} id={friend.id}
                                newMessagesCount={friend.newMessagesCount}
                                logo={friend.photos.small} login={friend.userName}/>)}
                        </div>
                    </div>
                    : <Preloader fontSize={100} />}
            </Col>
        </>

    )
}
export default Friends
