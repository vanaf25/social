export type CommentType={
    author:string,
    logo:string | null
    body:string,
    id:number
}
export type PostType={
    id:number,
    text:string,
    likesCount:number,
    disLikesCount:number
    comments:Array<CommentType>
}
export type ProfileContactsType={
    facebook:string | null,
    github:string | null
    website:string | null,
    vk:string | null,
    twitter:string | null,
    instagram:string | null,
    youtube:string | null,
    mainLinK:string | null
}
export  type ProfilePhotosType={
    small:string | null,
    large:string | null
}
export type ProfileType={
    aboutMe:string,
    contacts:ProfileContactsType,
    fullName:string,
    lookingForAJob:true,
    lookingForAJobDescription:string,
    photos:ProfilePhotosType,
    userId:number
}
export type UserType={
    id:number,
    name:string,
    status:string,
    photos:ProfilePhotosType,
    followed:boolean
}