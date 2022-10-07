import React, {Suspense} from "react";
import Preloader from "../common/Preloader/Preloader";
export default function withSuspense<WCP>(WrappedComponent:React.ComponentType<WCP>) {
    return (props:WCP)=>{
        return  <Suspense fallback={<div><Preloader fontSize={50}/></div>}>
            <WrappedComponent {...props}/></Suspense>
    }
}
