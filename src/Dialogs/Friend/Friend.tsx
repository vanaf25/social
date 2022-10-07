import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'
//@ts-ignore
import s from "./Dialog.module.css"
import {Badge} from "antd";
type DialogPropsType={
    logo:string | null,
    login:string,
    id:number,
    newMessagesCount:number,
    hasNewMessages:boolean
}
const Friend:FC<DialogPropsType>=({logo,hasNewMessages,newMessagesCount,id,login})=>{
    return (
        <div className={s.user}>
            <NavLink to={`/dialogs/${id}`}>
                <div className={s.user__content}>
                    <div className={s.user__logo}>
                        { hasNewMessages ?  <Badge count={newMessagesCount}>
                           <img src={logo ? logo:"https://agile.yakubovsky.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"} alt="logo"/>
                       </Badge>:<img src={logo ? logo:"https://agile.yakubovsky.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"} alt="logo"/>}
                    </div>
                    <div className={s.user__login}>
                        <p>{login}</p>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}
export default Friend