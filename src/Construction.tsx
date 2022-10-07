import React from "react";
import News from './News/News';
import Setting from './Setting/Setting';
import Music from './Music/Music';
import {BrowserRouter, Link, NavLink, Redirect, Route, Switch, withRouter,} from 'react-router-dom';
import Login from "./Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import 'antd/dist/antd.css';
import store, {AppStateType} from "./state/redux-store";
import {initializingApp} from "./state/appReducer";
import Preloader from "./common/Preloader/Preloader";
import withSuspense from "./hoc/withSuspense";
import './App.css';
import {Layout} from 'antd';
import {AppHeader} from "./Header/HeaderApp";
import {getNewMessages} from "./state/dialogs-reducer";
import {FullScreenPreloader} from "./common/FullScreenPreloader/FullScreenPreloader";
const {  Content, Footer } = Layout;
const DialogsContainer = React.lazy(() => import('./Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./Users/Users'));
const ChatPage=React.lazy(()=> import('./pages/Chat/ChatPage'));
type mapStatePropsType={
    newMessagesCount:number
    initialized:boolean
}
type mapDispatchPropsType={
    initializingApp:()=>void,
    getNewMessages:()=>void
}
type ownPropsType={

}
const  SuspendedDialogs=withSuspense(DialogsContainer);
const  SuspendedProfileContainer=withSuspense(ProfileContainer);
const  SuspendedUsersContainer=withSuspense(UsersContainer);
const SuspendedChatPage=withSuspense(ChatPage);
type propsType=mapStatePropsType & mapDispatchPropsType & ownPropsType
class App extends React.Component<propsType, {isMobileMenuOpen:boolean}> {
    catchAllUnHandleErrors=(e:PromiseRejectionEvent)=>{
    }
    constructor(props:propsType) {
        super(props);
this.state={isMobileMenuOpen:false}
    }
    componentDidMount() {
        this.props.initializingApp();
        window.addEventListener('unhandledrejection',this.catchAllUnHandleErrors);
        this.props.getNewMessages();
    }
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection',this.catchAllUnHandleErrors)
    }
    render() {
        if (!this.props.initialized) return <FullScreenPreloader/>
      return  <Layout  className={"wrapper"}>
            <AppHeader/>
            <Content  className={"wrapper__main"}>
                <Layout className="site-layout-background"
                        style={{ padding: '24px 0' }}>
                    <Content style={{minHeight: 280 }}>
                        <Switch>
                            <Route exact path='/' render={()=><Redirect to={'/profile'}/>}/>
                            <Route  path='/dialogs/:userId?' render={()=><SuspendedDialogs/>}/>
                            <Route exact path='/news' component={News}/>
                            <Route exact path='/setting' component={Setting}/>
                            <Route exact path='/music' component={Music}/>
                            <Route  path='/profile/:userId?' render={()=><SuspendedProfileContainer/>}/>
                            <Route exact path='/users' render={()=><SuspendedUsersContainer/>}/>
                            <Route exact path='/login' render={() => <Login/>}/>
                            <Route exact path='/chat' render={() => <SuspendedChatPage/>}/>
                            <Route exact path="*" render={()=><h1>404 NOT FOUND</h1>}/>
                        </Switch>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{backgroundColor:"#2e2e2e",
                textAlign: 'center',
                height:"70px",
                fontSize:"20px",
                color:"#fff"
            }}>
                <p>Created by <a style={{fontSize:"25px"}} href="https://www.instagram.com/html_css_js_react/">vanaf</a></p>
            </Footer>
        </Layout>
    }
}
const mapStateToProps=(state:AppStateType)=>{
    return {
        newMessagesCount:state.messagePage.newMessagesCount,
        initialized:state.app.initialized,
    }
}
const AppContainer=compose<React.ComponentType>(
    withRouter,
    connect<mapStatePropsType,mapDispatchPropsType,ownPropsType,AppStateType>(mapStateToProps,{
        getNewMessages,
        initializingApp}))(App);
 const MainApp:React.FC=()=>{
    return (
        <BrowserRouter>
                <Provider store={store}>
                    <AppContainer/>
                </Provider>
        </BrowserRouter>
    )
}
export default MainApp;