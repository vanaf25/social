import React, {useEffect} from "react"
import {connect} from "react-redux";
import {
    getUserStatusThunkCreator,
    getUserThunkCreator,
    updateStatusThunkCreator
} from "../state/profile-reducer";
import {withRouter} from "react-router-dom";
import Profile from "./Profile";
import {compose} from "redux";
import {AppStateType} from "../state/redux-store";
import {RouteComponentProps} from 'react-router-dom'
import {ProfileType} from "../state/types";
import {getProfileInfo} from "../state/profile-selectors";
type MapStatePropsType={
    profile:ProfileType,
    isAuth:boolean,
    userId:number | null,
}
 export type mapDispatchPropsType={
    getUserThunkCreator:(userId:number | null)=>void,
    getStatus:(userId:number | null)=>void,
    updateStatus:(status:string)=>void,
}
type ownPropsType={

}
type PathParamsType={
    userId:string
}
type MatchParamsType=RouteComponentProps<PathParamsType>
type ProfileContainerPropsType=MapStatePropsType & ownPropsType
    & mapDispatchPropsType & MatchParamsType;
class ProfileContainer extends React.Component<ProfileContainerPropsType>{
     userId:number | null =+this.props.match.params.userId;
    refreshProfile(){
        console.log('refreshProfile',this.userId)
        if(!this.userId){
            console.log(this.userId);
            this.userId= this.props.userId;
            if (!this.userId){
                this.props.history.push('/login');
            }
        }
            this.props.getUserThunkCreator(this.userId);
        this.props.getStatus(this.userId);
    }
    componentDidMount() {
     this.refreshProfile();
    }
    componentDidUpdate(prevProps:ProfileContainerPropsType) {
        if (this.props.match.params.userId!==prevProps.match.params.userId){
            console.log('id: ',this.props.match.params.userId)
            this.userId =+this.props.match.params.userId
            this.refreshProfile();
        }
    }
    render() {
        return <Profile
            userId={this.userId}
            isOwner={!this.props.match.params.userId}
        />
    }
}
const mapStateToProps=(state:AppStateType):MapStatePropsType=> {
    return {
        profile:getProfileInfo(state),
        isAuth:state.auth.isAuth,
        userId:state.auth.id,
    }
}
export default compose<React.ComponentType>(
    withRouter,
    connect<MapStatePropsType,mapDispatchPropsType,ownPropsType,AppStateType>(mapStateToProps,
        {
            getUserThunkCreator,
            getStatus:getUserStatusThunkCreator,
            updateStatus:updateStatusThunkCreator,
        })
)(ProfileContainer)