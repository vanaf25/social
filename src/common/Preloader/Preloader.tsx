import React from "react";
import {LoadingOutlined} from "@ant-design/icons/lib";
import {Spin} from "antd";
type PreloaderPropsType={
    fontSize:number
}
const Preloader:React.FC<PreloaderPropsType>=({fontSize})=>{
    const antIcon = <LoadingOutlined style={{ fontSize }} spin />;
    return (
        <Spin  indicator={antIcon} />
    )
}
export default Preloader
