import {ProfilePhotosType, ProfileType} from "../state/types";
import {instance, ResponseType} from "./api";
type setPhotoDataType={
    photos:ProfilePhotosType
}
export default {
     getUserProfile(userId:number | null){
        return instance.get<ProfileType>(`profile/${userId}`).then(data=>data.data);
    },
    getStatus(userId:number | null){
        return instance.get<string | null>(`profile/status/${userId}`).then(res=>res.data)
    },
    updateStatus(status:string){
        return instance.put<ResponseType>(`profile/status/`,{status}).then(res=>res.data);
    },
    setPhoto(photoFile:File){
        const formData=new FormData()
        formData.append("image",photoFile)
        return instance.put<ResponseType<setPhotoDataType>>(`profile/photo`,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then(res=>res.data)
    },
    setProfileInfo(info:ProfileType){
        return instance.put<ResponseType>(`/profile`,info).then(res=>res.data);
    }
}