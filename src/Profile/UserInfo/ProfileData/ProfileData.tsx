import React, {useEffect, useState} from "react";
// @ts-ignore
import Classes from "./profileData.module.css"
import {ProfileContactsType, ProfileType} from "../../../state/types";
import {Button, Descriptions, Input, Popconfirm} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getProfileStatus} from "../../../state/profile-selectors";
import {updateStatusThunkCreator} from "../../../state/profile-reducer";
import { CheckCircleTwoTone } from "@ant-design/icons";
import {CloseCircleOutlined} from "@ant-design/icons/lib";
type ProfileDataPropsType={
profile: ProfileType,
    isOwner:boolean,
    activateEditMode:()=>void,
}
const ProfileData:React.FC<ProfileDataPropsType>=React.memo((
    {profile,isOwner,activateEditMode})=>{
    const status=useSelector(getProfileStatus);
    const [statusMode,setStatusMode]=useState<boolean>(false);
    const [newStatus,setNewStatus]=useState<string | null>(status);
    useEffect(()=>{
        setNewStatus(status);
    },[status])
    const [onUpdate,setOnUpdate]=useState<boolean>(false);
    const dispatch=useDispatch();
    type ShowContactsDataPropsType={
        contactTitle:string,
        contactValue:string | null
    }
   const updateStatusHandler=()=>{
        setStatusMode(false);
        if (newStatus!==status){
            dispatch(updateStatusThunkCreator(newStatus as string));
        }
   }
    const ShowContactsData:React.FC<ShowContactsDataPropsType>=
        ({contactTitle,contactValue})=>{
            return <div className={Classes.contact}><b>{contactTitle}:</b>
                {contactValue ? <a href={contactValue}> {contactValue}</a>:' ---'}</div>
        }
    return (
        <div style={{marginBottom:"20px"}}>
            <Descriptions layout="vertical" bordered>
                <Descriptions.Item label="Name">{profile.fullName}</Descriptions.Item>
                <Descriptions.Item label="About">{profile.aboutMe ? profile.aboutMe :"---" }</Descriptions.Item>
                <Descriptions.Item label="lookingForAJob">{profile.lookingForAJob ?     <CheckCircleTwoTone twoToneColor="#52c41a" />
                    :<CloseCircleOutlined className="site-result-demo-error-icon" />}</Descriptions.Item>
                <Descriptions.Item label="lookingForAJobDescription: ">{profile.lookingForAJobDescription ?
                    profile.lookingForAJobDescription :"---"}</Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                    {statusMode ?
                        isOwner &&
                        <Popconfirm
                            title="Change the status?"
                            visible={onUpdate}
                            onConfirm={()=>{
                                updateStatusHandler();
                                setOnUpdate(false);
                            }}
                            onCancel={()=>{
                                setStatusMode(false);
                                setOnUpdate(false);
                            }}>
                            <Input value={newStatus ? newStatus :""}
                                   onChange={(e)=>setNewStatus(e.target.value)}
                                   onBlur={()=>setOnUpdate(true)}/>
                        </Popconfirm>:
                        <span style={!isOwner ? {pointerEvents:"none"}:{}} onDoubleClick={isOwner ? ()=>setStatusMode(true):()=>undefined}>{status ? status : "---"}</span>}
                </Descriptions.Item>
                <Descriptions.Item span={24} label="Config Info">
                    {Object.keys(profile.contacts).map((key)=>{
                        return <ShowContactsData key={key} contactTitle={key}
                                                 contactValue={profile.contacts
                                                     [key as keyof ProfileContactsType]}/>
                    })}
                </Descriptions.Item>
            </Descriptions>
            {isOwner && <Button onClick={activateEditMode} type={"primary"} style={{width:"300px",margin:"0 auto",display:"block"}}>Edit</Button>}
        </div>
    )
})
export default ProfileData