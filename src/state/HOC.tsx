import React, {ComponentType} from 'react'
import {compose} from "redux";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter } from 'react-router-dom';
/*const HOC<WP> =(Component:React.Component<WP>)=>{
    return (props)=>{
        <Component {...props} b={1} />
    }
}*/
function HOC<WP extends {b:number}>(WrappedComponent:React.ComponentType<WP>) {
const Component:React.FC<Omit<WP, 'b'>> =(props)=>{
  return  <WrappedComponent {...props as WP} b={6}/>
}
return Component
}
function HOC2<WP extends {a:string}>(WrappedComponent:React.ComponentType<WP>){
  const Component:React.FC<Omit<WP, 'a'>> =(props)=>{
    return <WrappedComponent {...props as WP} a={5}/>
  }
  return Component

}
type C1PropsType={
  text:string,
  age:number,
}
type mapPropsType={
  b:number,
  a:string,
}
type C1paramsType={
  userId:string
}
const C1:React.FC<C1PropsType & mapPropsType & RouteComponentProps<C1paramsType>> =(props)=>{
  return (
      <h1>{props.text}</h1>
  )
}
const C1Container=HOC(C1);
const C1Container2=HOC2(C1Container);
type FromHocPropsType=Omit<C1PropsType, 'b'>
type FromHocType=ComponentType<FromHocPropsType>
type FromHoc2Type=ComponentType<Omit<FromHocPropsType, 'a'>>
/*const superHOC=compose<
    FromHocType,
    ComponentType<C1PropsType>,
    FromHoc2Type
    >
(
    HOC2,
    HOC
);*/
let mstp=(state:any)=>{
return {
    a:"qwe",
      b:2}
}
const C1_connect=connect(mstp)(C1)
const ConnectedWithRouter=withRouter(C1_connect);
const ConnectedWithRouterHoc=compose<
   ComponentType<C1PropsType>
    >
(
    withRouter,
        connect(mstp)
)(C1);
const App=()=>{
  return <ConnectedWithRouterHoc text={"ddd"} age={3} />
}
