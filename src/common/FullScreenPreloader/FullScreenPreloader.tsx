import React from 'react';
import './PreloaderStyles.css';
export const FullScreenPreloader:React.FC=()=>{
    return (
        <div className={"preloader"}>
            <div className="preloader__body">
                <div className="preloader__content">
                    <img
                        src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/c49c83ef51b0c4230f8f39560b8250a3-1596267998/navy_for-light_bg/make-animated-logo-loader-for-your-website.gif"
                         alt="preloader" className={"preloader__image"}/>
                         <p className="preloader__text">Loading...</p>
                </div>
            </div>
        </div>
    )
}