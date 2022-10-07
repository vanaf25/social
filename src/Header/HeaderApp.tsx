import React, {useEffect, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import {authMeThunkCreator, loginOut} from "../state/auth-reducer";
import 'antd/dist/antd.css';
import {NavLink, useLocation} from "react-router-dom";
import {getIsAuth, getLogin} from "../state/auth-selectors";
import {Button, Menu} from "antd";
import {Header} from "antd/es/layout/layout";
//@ts-ignore
import styles from './Header.module.css'
export const AppHeader:React.FC<{}>=()=> {
    const dispatch = useDispatch();
    const isAuth = useSelector(getIsAuth);
    const login = useSelector(getLogin);
    const [isMenuOpen,setIsMenuOpen]=useState<boolean>(false);
    const  [typeOfMenu,setTypeOfMenu]=useState<"horizontal" | "vertical">("horizontal");
    const {pathname}=useLocation()
    useEffect(() => {
        dispatch(authMeThunkCreator());
    }, []);
    const loginOutWrap = () => {
        dispatch(loginOut());
    }
    const routes=[
        {path:"/profile",body:"Profile"},
        {path:"/dialogs",body:"Dialogs"},
        {path:"/users",body:"Users"},
        {path: "/chat",body: "Chat"}
    ]
    const setTypeOfMenuHandler=()=>{
        if (window.matchMedia("(max-width: 767px)").matches){
            setTypeOfMenu("vertical")
        }
        else setTypeOfMenu("horizontal")
    }
    useEffect(()=>{
        setTypeOfMenuHandler();
    },[]);
    window.addEventListener("resize",()=>setTypeOfMenuHandler());
        const pathnameArray=pathname.split('/')
        if (pathnameArray.length===3 && pathnameArray[1]==="dialogs" && typeOfMenu==="vertical" ) return <></>;
    return (
        <Header style={{padding:"0"}} className={`${styles.header} ${isMenuOpen ? styles.active :"" }` }>
        <div className={styles.container}>
            <div className={styles.container__menu}>
                <Menu className={`${styles.menu} `} theme={"dark"}
                      defaultSelectedKeys={[pathname==="/" ? "/profile":pathname ]}
                      mode={typeOfMenu}>
                    {routes.map(route=><Menu.Item key={route.path}>
                        <NavLink onClick={()=>typeOfMenu==="vertical" && setIsMenuOpen(false)   }  to={route.path}>{route.body}</NavLink>
                    </Menu.Item>)}
                </Menu>
                <div onClick={()=>setIsMenuOpen(prevState =>!prevState)} className={styles.burger}>
                    <span> </span>
                </div>
            </div>
            <div className={styles.auth}>
                {isAuth ?
                    <>
                        <NavLink   to={'/profile'}
                                   style={{color:'#fff',fontSize:'18px',marginRight:"20px"}}>{login}</NavLink>
                        <Button onClick={loginOutWrap}>LogOut</Button>
                    </>
                    :
                    <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </div>
    </Header>)
};
