import React from "react";
// @ts-ignore
import styles from './Paginator.module.css';
type PaginatorPropsType={
    totalUserCount:number,
    pageSize:number,
    onPageChanged:(p:number)=>void,
    currentPage:number
}
const Paginator:React.FC<PaginatorPropsType>
    =({totalUserCount,pageSize,onPageChanged,currentPage})=>{
    const pagesCount=Math.ceil(totalUserCount/pageSize);
    let pagesButton=[];
    for (let i=1;i<=pagesCount;i++){
        pagesButton.push(i)
    }
     return(
         <div>
             {    pagesButton.map((p,index)=><button key={`${p}_${index}`}  onClick={()=>{onPageChanged(p)}}  className={`${styles.selectedPage} ${currentPage  === p ? styles.active :''} `}>{p}</button>)
             }
         </div>
    )
}
export default Paginator