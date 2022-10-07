import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {Button, Form, Input, Switch,} from 'antd';
import {ProfileContactsType, ProfilePhotosType, ProfileType} from "../../../state/types";
import {setProfileInfoThunkCreator} from "../../../state/profile-reducer";
type ProfileDataOwnPropsType={
    initialValues:ProfileType,
    disActivateEditMode:()=>void,
}
export const ProfileDataForm:React.FC<ProfileDataOwnPropsType>=({disActivateEditMode,initialValues})=> {
    const dispatch = useDispatch();
    console.log(initialValues)
    type SizeType = Parameters<typeof Form>[0]['size'];
        const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
        const onSubmit = (values: any) => {
            console.log(values);
            values.contacts={}
            for (let key in values){
                if (key in initialValues.contacts){
                    values.contacts[key]=values[key]
                    delete values[key]
                }
            }
            console.log(values);
            dispatch(setProfileInfoThunkCreator(values));
            disActivateEditMode();
        }
        type itemsType= [string, string | boolean | ProfilePhotosType | ProfileContactsType];
    console.log(Object.assign({},initialValues,initialValues.contacts));
        const items=Object.entries(initialValues).map((value)=>{
            if (typeof value[1]!=="object" || value[1]===null){
                if(value[0]!=="userId"){
                    return   <Form.Item key={value[0]} label={value[0]} name={value[0]}>
                        {typeof value[1]==="boolean" ?  <Switch defaultChecked={value[1]}/>:
                            <Input/>
                        }
                    </Form.Item>
                }
            }
        });
    const contacts=Object.entries(initialValues.contacts).map((contact:any)=>{
        return <Form.Item  key={`contacts.${contact[0]}`} label={contact[0]} name={`${contact[0]}`}>
            <Input   />
        </Form.Item>
    });
        return (
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                initialValues={Object.assign({},initialValues,initialValues.contacts)}
                size={componentSize as SizeType}
                onFinish={onSubmit}
            >
                {items}
                {contacts}
                <div style={{display:"flex",maxWidth:"max-content",margin:"0 auto"}}>
                    <Form.Item style={{marginRight:"20px"}}>
                        <Button type={"primary"} htmlType={"submit"}>Send</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={disActivateEditMode}>Cancel</Button>
                    </Form.Item>
                </div>

            </Form>
        )
}