import profileReducer, {profileActions} from "./profile-reducer";
const initialState={
    postsData:[
        {id:0,text:"qwerty",likesCount:4,disLikesCount:0},
        {id:1,text:"qwerty",likesCount:4,disLikesCount:0},
        {id:2,text:"qwerty",likesCount:4,disLikesCount:0}
    ],
    profile: null,
    status:null
}
test('newPost should be added', () => {
    const action=profileActions.addPostActionCreator("abbba")
    let newState=profileReducer(initialState,action);
    expect(newState.postsData.length).toBe(1)
});
test('post should remove', () => {
    const action=profileActions.deletePostActionCreator(1)
    let newState=profileReducer(initialState,action);
    expect(newState.postsData.length).toBe(2);
});
test('status should be added', () => {
    const action=profileActions.setStatusActionCreator("qwerty")
    let newState=profileReducer(initialState,action);
    expect(newState.status).toBe("qwerty");
});