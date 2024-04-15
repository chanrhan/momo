import {useEffect, useState} from "react";

export const PopupModal = ({children, width, height})=>{

    return (
        <div className='modal-popup' >
            <div className='modal-popup-main' style={{width: width, height: height}}>
                {children}
            </div>
        </div>
    )
}