import React, {ChangeEvent, useState} from 'react'
// @ts-ignore
import Classes from './userinfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileData from "./ProfileData/ProfileData";
import {UserInfoPropsType} from "../Profile";
import {useDispatch, useSelector} from "react-redux";
import {getProfileInfo} from "../../state/profile-selectors";
import {savePhotoSuccessThunkCreator} from "../../state/profile-reducer";
import {ProfileDataForm} from "./ProfileDataForm/ProfileDataForm";
import {getIsAuth} from "../../state/auth-selectors";
import {follow, unFollow, usersActions} from "../../state/users-reducer";
import {getIsUserInArray, getUserByIdSelector} from "../../state/users-selectors";
const UserInfo:React.FC<UserInfoPropsType>=React.memo(({isOwner,userId})=>{
    const dispatch=useDispatch();
    const dispatchActions=()=>{
        dispatch(usersActions.isUserInArray(userId));
        dispatch(usersActions.getUserById(userId));
    }
    if (userId){
        dispatchActions();
    }
    const userById=useSelector(getUserByIdSelector);
    const isUserInArray=useSelector(getIsUserInArray);
    console.log(userById,isUserInArray);
    let [editMode,setEditMode]=useState(false);
    const isAuth=useSelector(getIsAuth);
    const profile=useSelector(getProfileInfo);
/*
    const createDialogHandler=()=>dispatch(createDialog(userId));
*/
/*
    const followHandler=()=>dispatch(follow(userId));
*/
/*
    const unFollowHandler=()=>dispatch(unFollow(userId));
*/
    const onMainPhotoSelected=(e:ChangeEvent<HTMLInputElement>)=>{
        console.log(e.target.files);
        if (e.target.files?.length){
          dispatch(savePhotoSuccessThunkCreator(e.target.files[0]));
        }
    }
    if (!profile){
        return <Preloader fontSize={200}/>
    }
    else {
        return (
            <>
                <div className={Classes.main__header}>
                    <img
                        src={profile.photos.large ?
                           profile.photos.large
                            :"data:image/png;base64,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"} alt="img"/>
                </div>
                <div className={Classes.main__buttonNewPhoto}>
                    {isOwner ? <div>
                                <label
                                    style={{display:"block"}}
                                   className={"ant-btn ant-btn-primary"}
                                    htmlFor="file">Выберете картинку</label>
                        <input style={{display:"none"}} name={"file"} type={"file"}  id={"file"} onChange={onMainPhotoSelected}/>
                    </div> :<div style={{display:"flex"}}>
                        {isAuth &&
                            <>
                                {/*<Button style={{marginRight:10}}    onClick={createDialogHandler} type={"primary"}>
                                    <Link to={`/dialogs/${userId}`}>
                                        Написать
                                    </Link>
                                </Button>*/}
                               {/* { isUserInArray
                                && Object.keys(userById).length  && userById.followed ?
                                    <Button    onClick={unFollowHandler}>
                                        unFollow
                                </Button> :
                                    <Button    onClick={followHandler} type={"primary"}>
                                        Follow
                                    </Button>
                                }*/}
                            </>
                       }
                    </div>
                        }
                </div>
                <div className={Classes.main__body}>
                    {editMode ? <ProfileDataForm
                        initialValues={profile}
                        disActivateEditMode={()=>setEditMode(false)}
                        /> :
                        <ProfileData
                            profile={profile}
                            isOwner={isOwner}
                            activateEditMode={()=>setEditMode(true)}
                        />
                    }
                </div>
            </>
        )
    }
});
export default UserInfo