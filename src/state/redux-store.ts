import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import userReducer from "./users-reducer";
import { reducer as formReducer } from 'redux-form'
import thunkMiddleWare, {ThunkAction} from "redux-thunk"
import appReducer from "./appReducer";
import authReducer from "./auth-reducer";
import {chatReducer} from "./chat-reducer";
    const rootReducer=combineReducers({
        profilePage:profileReducer,
        messagePage:dialogsReducer,
        users:userReducer,
        auth:authReducer,
        form:formReducer,
        app:appReducer,
        chat:chatReducer
    });
 // @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)));
export   type AppStateType=ReturnType<typeof  rootReducer>;
export type BaseThunkType<A extends Action,R=Promise<void> >=ThunkAction<R,AppStateType,unknown,A>
/*
export type inferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
*/
/*
export type inferActionsType<T>=T extends {[key:string]:(...args:any[])=>infer U} ? U:never
*/
export type inferActionsType<T> =T extends {[key:string]:(...args:any[])=>infer U } ? U:never
// @ts-ignore
window.store=store;
export default store

