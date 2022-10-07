import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Messages} from "./Messages";
import {
    getDialogIsFetching, getDialogs, getGettingDialogMessages,
    getIsDialogsReceived, getSelectedDialog
} from "../state/dialogs-selectors";
import {dialogsActions, getAllDialogs, getDialog, getNewMessages, MessageType} from "../state/dialogs-reducer";
// @ts-ignore
import c from "./Dialogs.module.css";
import {Link} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import {formatDistanceToNow} from "date-fns"
import { ArrowLeftOutlined } from "@ant-design/icons";
const MessagesPart:React.FC<{userId:string,isMobileVersion?:boolean}>=({userId,isMobileVersion})=> {
    const isDialogsReceived=useSelector(getIsDialogsReceived);
    useEffect(()=>{
        if (!isDialogsReceived) {
            dispatch(getAllDialogs());
        }
    },[]);
    const sortMessages = (messages: Array<MessageType>) => {
        type arrayType = {
            date: string,
            items: Array<MessageType>
        }
        const array: Array<arrayType> = [];
        const dates: any = new Set();
        for (let i = 0; i < messages.length; i++) {
            const element = messages[i];
            const date: number = new Date(element.addedAt).getDate();
            const day: number = new Date(element.addedAt).getDay();
            const month: number = new Date(element.addedAt).getMonth();
            const dateOfAdding=`${day}_${date}_${month}`;
            dates.add(dateOfAdding);
            const datesArray: Array<string> = Array.from(dates);
            datesArray.forEach((elem, index) => {
                if (elem===dateOfAdding){
                    if (array[index]) {
                        array[index].items.push(element);
                    } else {
                        array[index] = {date: elem, items: [element]}
                    }
                }
            });
        }
        return array
    }
    const dispatch = useDispatch();
    useEffect(  () => {
        async function loop() {
            if (userId) {
              await  dispatch(getDialog(+userId,1));
            }
        }
        loop().then(()=>{
            messagesAnchorRef?.current?.scrollIntoView();
            window.scrollTo(0,0);
       });
    }, [userId]);
    const dialog = useSelector(getSelectedDialog);
    const sortedMessages = dialog.items ? sortMessages(dialog.items) : [];
    const dialogs = useSelector(getDialogs);
    let friendData: any;
    if (userId) {
        friendData = dialogs.find(dialog => dialog.id === +userId);
    }
    useEffect(() => {
        if (userId) {
            friendData = dialogs.find(dialog => dialog.id === +userId);
        }
        return ()=>{dispatch(dialogsActions.cleanSelectedDialog())}
    }, [userId]);
    const messagesAnchorRef=useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState<boolean>(false);
    const isFetching = useSelector(getDialogIsFetching);
    const gettingDialogMessages=useSelector(getGettingDialogMessages);
    const pageCount=Math.ceil(dialog.totalCount/gettingDialogMessages);
    const currentPage=useRef<number>(2);
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.round(element.scrollHeight - element.scrollTop) === element.clientHeight) {
            setIsAutoScroll(true);
        }
        if (element.scrollTop===0){
            if (pageCount>=currentPage.current){
                dispatch(getDialog(+userId,currentPage.current));
                currentPage.current++
            }
        }
        else {
            setIsAutoScroll(false);
        }
    }
    const activityChangedDate=friendData?.lastUserActivityDate &&
        new Date(friendData.lastUserActivityDate).setHours(new Date(friendData.lastUserActivityDate).getHours()+2 )
    return (
        <>
            {!isFetching ? <Preloader fontSize={200} /> :
                <div style={{flex:"1 1 auto",position:'relative'}}>
                    <div className={`${c.friends__friendDataContainer} ${isMobileVersion ? c.friends__friendDataContainer_mobile:"" }`}>
                        <div className={c.friends__friendData}>
                            <div className={c.friendData__logo}>
                                <img style={{width:"40px",height:"40px",borderRadius:"50%"}} src={friendData?.photos?.small ? friendData.photos.small:"https://st4.depositphotos.com/9998432/24428/v/450/depositphotos_244284532-stock-illustration-person-gray-photo-placeholder-man.jpg"  } alt="logo"/>
                            </div>
                            <div className={c.friendData__text}>
                                <h4 style={{marginBottom:0}}><Link
                                    to={`/profile/${userId}`}>{friendData?.userName}</Link>
                                </h4>
                                <small style={{fontSize:"12px"}}>
                                    Last activity: {friendData?.lastUserActivityDate &&
                                formatDistanceToNow(new Date(activityChangedDate))} ago
                                </small>
                            </div>
                        </div>
                        {
                           isMobileVersion && <Link to={'/dialogs'}>
                                <ArrowLeftOutlined  style={{fontSize:34}}  />
                            </Link>
                        }
                    </div>
                    <div  onScroll={scrollHandler} style={
                        {
                            maxHeight: '400px',
                            overflowY: 'auto',
                            background: "#2e2e2e",
                            padding: "15px",
                            marginBottom: "10px",
                            height: 400

                        }}>
                        {sortedMessages.map((item,index) => {
                            return <Messages key={index} photo={friendData?.photos?.small} date={item.date} items={item.items} userId={userId}/>
                        })}
                        <div ref={messagesAnchorRef}> </div>
                    </div>
                </div>
            }
        </>
    )
}
export default  MessagesPart