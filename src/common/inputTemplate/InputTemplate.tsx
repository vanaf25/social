import React from "react";
// @ts-ignore
import s from './inputTemplate.module.css'
import {Field, WrappedFieldProps} from "redux-form";
import {fieldValidatorType} from "../../validate/validate";
import {LoginFormValuesType} from "../../Login/Login";
export  const TextAreaTemplate:React.FC<WrappedFieldProps>=({input,meta:{touched,error}, ...props})=>{
     const hasError=touched && error;
    return (
        <div>
            <textarea  className={`${s.textarea}`} {...input} {...props}/>
            {hasError && error && <div className={s.errorMessage}>{error}</div>}
        </div>
 )
}
export const InputTemplate:React.FC<WrappedFieldProps>=({meta:{touched,error},input, ...props})=>{
    const hasError=touched && error;
    return (
        <div className={hasError ? s.error:''}>
            <input {...input}  {...props} />
        </div>
    )
}
export function createField<KeysType extends string>(placeholder:string | undefined,
                                      name:KeysType,
                            component:React.FC<WrappedFieldProps> ,
                            validate:Array<fieldValidatorType>,type:string | null,text='') {
    return (<div>
        <Field name={name}
               placeholder={placeholder}
               validate={validate} component={component}
               type={type} />{text}
    </div>)
}