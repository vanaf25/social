import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt, GraphQLID,
} from 'graphql';
import usersApi from './users-api';
const users=[
    {id:1,name:"vanaf",photos:{small:"ssaa",large:"sfla"},followed:false,status:"qwerrty"},
    {id:2,name:"kasfjklaskla",photos:{small:"ssaa",large:"sfla"},followed:true,status:"saas"},
    {id:3,name:"as;avda",photos:{small:"ssaa",large:"sfla"},followed:false,status:"s;dlaalf"},
    {id:4,name:"aasafda",photos:{small:"ssaa",large:"sfla"},followed:true,status:"qkalka"},
    {id:5,name:"ssaa",photos:{small:"ssaa",large:"sfla"},followed:false,status:"qaklsa"},

]
const UserType=new GraphQLObjectType({
   name:"Response",
   fields:()=>({
    id:{type:GraphQLID},
       name:{type:GraphQLString},
       status:{type:GraphQLString, resolve:user=>user.status},
       photos:{type:GraphQLString},
       followed:{type:GraphQLBoolean,resolve:user=>user.followed},
   }),
    }
);
export const QueryType=new GraphQLObjectType({
   name:"Query",
    fields:{
        movie:{
            type:UserType,
            args:{currentPage:{type:GraphQLInt},pageSize:{type:GraphQLInt}},
            resolve(parent,{currentPage,pageSize}){
                return usersApi.getUsers({currentPage,pageSize});
            }
        }
    }
});
