import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../state/redux-store";

const mapStateToPropsForAuth=(state:AppStateType)=>{
    return {
        isAuth:state.auth.isAuth
    }
}
type mapStatePropsType={
    isAuth:boolean
}
export function withAuthRedirect<WCP>(WrappedComponent:React.ComponentType<WCP>){
    const RedirectComponent:React.FC<mapStatePropsType>=(props)=>{
        const {isAuth,...restProps}=props
        if (!isAuth) return <Redirect to={'/login'}/>
        return <WrappedComponent {...restProps as   WCP}/>
    }
    return connect<mapStatePropsType,{},WCP, AppStateType>(mapStateToPropsForAuth)
    (RedirectComponent);
}