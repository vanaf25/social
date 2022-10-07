import React from "react";
import {Pagination} from "antd";
import './../App.css';
import './PaginationStyles.css'
type PaginatorPropsType={
totalUserCount:number,
    pageSize:number,
    currentPage:number,
    onPageChanged:(pageNumber:number,pageSize:number)=>void
}

const Paginator:React.FC<PaginatorPropsType>=({totalUserCount,
pageSize,
                                                  currentPage,onPageChanged})=>{
    function onShowSizeChange(pageNumber:number, pageSize:number) {
        onPageChanged(pageNumber,pageSize);
    }
    function onChange(pageNumber:number,pageSize:any) {
        console.log(pageNumber,pageSize)
        onPageChanged(pageNumber,pageSize);
    }
    return(
        <div className={"container"}>
            <Pagination
                style={{maxWidth:"max-content",margin:"0 auto 15px auto",fontSize:14}}
                onChange={onChange}
                showSizeChanger
                showQuickJumper
                defaultPageSize={pageSize}
                onShowSizeChange={onShowSizeChange}
                defaultCurrent={currentPage}
                total={totalUserCount} />
        </div>

    )
}
export default Paginator