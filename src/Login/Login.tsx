import React from "react";
import { useDispatch, useSelector} from "react-redux";
import {login} from "../state/auth-reducer";
import {Redirect} from "react-router-dom";
import {getCaptchaUrl, getError, getId, getIsAuth} from "../state/auth-selectors";
import { Form, Input, Button, Checkbox } from 'antd';
export type LoginFormValuesType={
    login:string,
    password:string,
    rememberMe:boolean,
    captcha:string
}
     const LoginForm=()=> {
    const errorMessage=useSelector(getError);
         const isAuth=useSelector(getIsAuth);
         const captchaUrl=useSelector(getCaptchaUrl);
         const dispatch=useDispatch();
         const onFinish=(values:LoginFormValuesType)=>{
             console.log(values);
             dispatch(login(values.login, values.password, values.rememberMe,values.captcha))
         }
            const onFinishFailed = (errorInfo: any) => {
                console.log('Failed:', errorInfo);
            };
         if (isAuth) return <Redirect to={'/profile'}/>
            return (
                <div style={{maxWidth:"700px",margin:"0 auto",padding:"0 10px"}}>
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            hasFeedback
                            label="Username"
                            name="login"
                            rules={[{required: true, message: 'Please input your username!'}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            label="Password"
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item name="rememberMe" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item hasFeedback wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                        {captchaUrl &&
                        <>
                            <img style={{marginBottom:"10px"}} src={captchaUrl} alt={"captcha"}/>
                            <Form.Item label="captcha"
                                       rules={[{required:true,
                                           message:"Please input symbols from image"}]}
                                       name="captcha">
                                <Input/>
                            </Form.Item>
                        </>
                        }
                        {errorMessage && <div style={{
                            width:"100%",
                            height:"70px",
                            background:"darkred",
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"center",

                        }}>
                            <h3 style={{margin:0,color:"#ddd", fontWeight:700,
                                textIndent:"4px"}}>{errorMessage}</h3>
                        </div> }
                    </Form>
                </div>
            )
        }
/*const Login:React.FC=()=>{
const isAuth=useSelector(getIsAuth);
const id=useSelector(getId);
const captchaUrl=useSelector(getCaptchaUrl);
const dispatch=useDispatch();
     const onSubmitForm=(values:LoginFormValuesType)=>{
         dispatch(login(values.login, values.password, values.rememberMe,values.captcha))
     }
     if (isAuth) return <Redirect to={`/profile/${id}`}/>
    return(
    <div className="container">
          <LoginReduxForm captchaUrl={captchaUrl}  onSubmit={onSubmitForm} />
        </div>)
}*/
export default LoginForm