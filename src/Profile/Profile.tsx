// @ts-ignore
import Classes from "./Main.module.css";
import UserInfo from "./UserInfo/userInfo";
import React from "react";
import MyPosts from "../Myposts/MyPosts";
export type UserInfoPropsType={
    isOwner:boolean,
    userId:number | null
}
const Profile:React.FC<UserInfoPropsType>=
    React.memo(
        ({isOwner,userId})=> {
    return (
        <main className={Classes.main}>
            <div className="container">
                <div className={Classes.main__content}>
                    <UserInfo
                        userId={userId}
                              isOwner={isOwner}
                              />
                    {
                        isOwner && <MyPosts/>
                    }
                </div>
            </div>
        </main>
    )
})
export default Profile
