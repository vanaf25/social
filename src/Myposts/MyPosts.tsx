import React from 'react'
import {profileActions} from "../state/profile-reducer";
import { useDispatch, useSelector} from "react-redux";
import {getProfilePostsData} from "../state/profile-selectors";
import  {Demo} from './Post/Post';
import {Field, Form, Formik} from "formik";
import TextArea from "antd/es/input/TextArea";
import {Button} from "antd";
type setSubmittingType={
    setSubmitting:(isSubmitting:boolean)=>void
}
const MyPostForm:React.FC=()=>{
    const dispatch=useDispatch();
    const onAddPost=(values:addPostValuesType,{setSubmitting,}:setSubmittingType)=>{
       if (values.postText?.trim()){
           dispatch(profileActions.addPostActionCreator(values.postText));
       }
    }
    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{postText:""}}
                onSubmit={onAddPost}
            >
                {() => (
                    <Form style={{maxWidth:"400px",margin:"0px auto"}}>
                        <div className={""}>
                            <Field name={"postText"}
                                   render={({ field }:any) => <TextArea
                                       style={{marginBottom:"10px"}}
                                                                        {...field}
                                                                        placeholder="Введите текст поста"
                                       rows={4} />}
                            />
                            <Button  htmlType={"submit"} type="primary">send</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
type addPostValuesType={
    postText:string
}
const MyPosts:React.FC=()=>{
    const posts=useSelector(getProfilePostsData);
    let postsItem=posts.map(post=><Demo comments={post.comments} id={post.id} text={post.text} disLikeCount={post.disLikesCount} likeCount={post.likesCount} key={post.id}/>)
    return (
        <div className="container">
            <div>
                <MyPostForm/>
                <div className="myPosts__content">
                    {postsItem}
                </div>
            </div>
        </div>
    );
}
export default MyPosts;