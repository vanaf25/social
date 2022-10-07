import React, {useEffect, useState} from "react";
import {UsersSearchFormType} from "../state/users-reducer";
import {useSelector} from "react-redux";
import {getFilter} from "../state/users-selectors";
import { Input,  Select} from "antd";
import useDebounce from "./useDebounce";
const {Option}=Select;
 type UsersSearchFormPropsType={
    onFilter:(values:UsersSearchFormType)=>void,
}
type FriendFormType="null" | "true" | "false"
type FormType={
     term:string,
    friend:FriendFormType
}
export const UsersSearchForm:React.FC<UsersSearchFormPropsType> = ({onFilter}) => {
     const filter=useSelector(getFilter);
     const [term,setTerm]=useState("");
     const [selectValue,setSelectValue]=useState<FriendFormType>("null");
    const debouncedSearchTerm = useDebounce(term, 500);
    useEffect(
        () => {
            if (debouncedSearchTerm) {
                submit({term,friend:selectValue});
            }
        },
        [debouncedSearchTerm]
    );
    const submit = (values: FormType,) => {
        const filter:UsersSearchFormType={
            term:values.term ? values.term :"",
            friend:values.friend==="null" ?
                null :values.friend==="true" ?
                    true:values.friend==="false" ? false :null
        };
        onFilter(filter);
    }
    const onSelectChange=(value:FriendFormType)=>{
        setSelectValue(value)
        submit({term,friend:value})
    }
    return (
                        <div  style={{maxWidth:"800px",margin:"0 auto 20px auto",
                            display:"flex",justifyContent:"center"}}>
                            <Input style={{width:"40%",marginRight:"10px"}}
                                   value={term} onChange={(e:any)=>setTerm(e.target.value)}/>
                            <Select value={String(filter.friend) as FriendFormType}  onChange={onSelectChange}
                                    style={{width:"30%"}} >
                                <Option value={"null"}>All</Option>
                                <Option value={"true"}>Only followed</Option>
                                <Option value={"false"}>Only unFollowed</Option>
                            </Select>
                        </div>
    );
}