/*
import userReducer, {InitialStateType, usersActions} from "./users-reducer";
let state:InitialStateType;
beforeEach(()=>{
   state={
       users:[
           {
               id:0,
               name:"qwerty",
               followed:false,
               photos:{
                   small:null,
                   large:null
               },
               status:"qwerty",},
           {
               id:1,
               name:"aafsa",
               followed:true,
               photos:{
                   small:null,
                   large:null
               },
               status:"al;sjfkal",},
           {
               id:2,
               name:"aklfdas",
               followed:false,
               photos:{
                   small:null,
                   large:null
               },
               status:"alsvkjldjal;",},
           {
               id:3,
               name:"asdfkl;s",
               followed:true,
               photos:{
                   small:null,
                   large:null
               },
               status:"ajkfjalk",}],
       pageSize:30,
       totalUserCount:0 ,
       currentPage:1 ,
       isFetching:false,
       followingInProgress:[]
   }
});

test("follow success",()=>{
const newState=userReducer(state,usersActions.followActionCreator(2))
    expect(newState.users[0].followed).toBe(false);
expect(newState.users[2].followed).toBe(true);
});
test("unFollow success",()=>{
    const newState=userReducer(state,usersActions.unFollowActionCreator(3))
    expect(newState.users[3].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();

});*/
