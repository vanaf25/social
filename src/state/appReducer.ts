import {authMeThunkCreator} from "./auth-reducer";
import {inferActionsType} from "./redux-store";
import {BaseThunkType} from "./redux-store";
let initialState={
    initialized:false
}
const appReducer=(state=initialState,action:ActionsType):InitialStateType=>{
    switch (action.type) {
        case "SN/App/initialized":
            return {...state,initialized: true}
        default:
            return  state
    }
}
export const appActions={
    setInitializedSuccess:()=>({type:"SN/App/initialized"} as const)
}
export const initializingApp=():ThunkType=>async (dispatch)=>{
    const promise=dispatch(authMeThunkCreator());
    Promise.all([promise]).then(()=>{
        dispatch(appActions.setInitializedSuccess())
    });
}
export default appReducer
type InitialStateType=typeof initialState
type ActionsType=inferActionsType<typeof appActions>
type ThunkType=BaseThunkType<ActionsType>