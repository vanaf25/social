import React from 'react';
// @ts-ignore
import c from './News.module.css';
const News=()=>{
    return (
        <div className={c.dialogsWrapper}>
            <div className="container">
                <div className={c.dialogs__content}>
                    <h1>News</h1>
                </div>
            </div>
        </div>
    )
}
export default News;