import {follow, usersActions} from "./users-reducer";
import usersApi from "../api/users-api";
import {ResponseType, ResultCodesEnum} from "../api/api";
const usersApiMock=usersApi as jest.Mocked<typeof usersApi>;
jest.mock("../api/users-api");
const result:ResponseType={
    resultCode:ResultCodesEnum.Error,
    messages:["qwerty"],
    data:{}
}
usersApiMock.follow.mockReturnValue(Promise.resolve(result));
test("followThunk", async()=>{
    const thunk =follow(8);
    const dispatchMock=jest.fn();
    const getStateMock=jest.fn()
 const data=await thunk(dispatchMock,getStateMock,{});
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1,usersActions.followingInProgressActionCreator(true,8));
    expect(dispatchMock).toHaveBeenNthCalledWith(2,usersActions.followActionCreator(8));
    expect(dispatchMock).toHaveBeenNthCalledWith(3,usersActions.followingInProgressActionCreator(false,8));
});
const thunk =
    ({ dispatch, getState }) =>
        next =>
            action => {
                if (typeof action === 'function') {
                    return action(dispatch, getState)
                }

                return next(action)
            }
const create = () => {
    const store = {
        getState: jest.fn(() => ({})),
        dispatch: jest.fn()
    }
    const next = jest.fn()

    const invoke = action => thunk(store)(next)(action)

    return { store, next, invoke }
}