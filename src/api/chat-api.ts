import {ChatMessageType} from "../pages/Chat/ChatPage";
type MessageReceivedSubscriberType=(messages:Array<ChatMessageType>)=>void
type isFetchingChangedSubscriberType=(isFetching:boolean)=>void
type SubscribesType={
    messageReceived:Array<MessageReceivedSubscriberType>,
    isFetchingChanged:Array<isFetchingChangedSubscriberType>,
    cleanMessages:Array<()=>void>
}
let subscribes:SubscribesType={
    messageReceived:[],
    isFetchingChanged:[],
    cleanMessages:[]
} ;
let ws:WebSocket | null=null;
const closeHandler=()=>{
    console.log('close');
    isFetchingHandler(false);
    setTimeout(createWsChannel,3000);
}
const messageHandler=(e:MessageEvent)=>{
    const newMessage=JSON.parse(e.data);
    subscribes.messageReceived.forEach(s=>s(newMessage));
}
const isFetchingHandler=(isFetching:boolean)=>{
    subscribes.isFetchingChanged.forEach(s=>s(isFetching));
}
const cleanUp=()=>{
    ws?.removeEventListener('close',closeHandler);
    ws?.removeEventListener('message',messageHandler);
    ws?.removeEventListener('open',openHandler);
    ws?.removeEventListener('error',errorHandler);
}
const openHandler=()=>{
    subscribes.cleanMessages.forEach(s=>s());
    isFetchingHandler(true);
}
const errorHandler=()=>{
    console.log(true);
    isFetchingHandler(false);
}
function createWsChannel(){
    cleanUp();
    ws?.close();
    ws=new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    isFetchingHandler(false);
    ws.addEventListener('close',closeHandler);
    ws.addEventListener('message',messageHandler);
    ws.addEventListener('open',openHandler);
    ws.addEventListener('error',errorHandler);
}
type EventsType=  'messageReceived' | 'isFetchingChanged' | 'cleanMessages';
export const chatApi= {
    subscribe: (event:EventsType,callback:MessageReceivedSubscriberType | isFetchingChangedSubscriberType ) => {
        // @ts-ignore
        subscribes[event].push(callback);
        return () => {
            // @ts-ignore
            subscribes[event] = subscribes[event].filter(s => s !== callback);
        }

    },
    sendMessage:(message:string)=>{
    ws?.send(message);
},
    unSubscribe:(event:EventsType,callback:MessageReceivedSubscriberType | isFetchingChangedSubscriberType)=>{
        // @ts-ignore
        subscribes[event] = subscribes[event].filter(s => s !== callback);
    },
    start(){
      createWsChannel();
    },
    stop(){
       cleanUp();
        ws?.close();
        subscribes.messageReceived=[];
        subscribes.isFetchingChanged=[];
    }
}