import {useEffect, useRef, useState} from "react";

export const MenuModal = ({modalRef, children, x, y, width, height, close}) => {
    return (
        <div ref={modalRef} className='modal-menu' style={{top: y, left: x, width: width, height: height}}>
            {children}
        </div>
    )
}