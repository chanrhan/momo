import {useEffect, useState} from "react";
import $ from 'jquery'

export const MenuModal = ({children, x, y, width, height, close})=>{

    useEffect(()=>{
        console.log(`menu modal`)
        const timer = setTimeout(()=>{
            window.onclick = (e)=>{
                console.log(`click window`)
                const closest = $(e.target).closest('MenuModal');
                const hasClass = $(e.target).hasClass('modal-menu');
                console.log(`closest`)
                console.table(closest)
                console.log(`hasClass modal-menu ${hasClass}`)
                if(!hasClass && closest.length === 0){
                    console.log(`close!`)
                    window.onclick = null;
                    close();
                }
            }
        }, 100)
        return ()=>{
            clearTimeout(timer);
        }
    },[])

    return (
        <div className='modal-menu' style={{top: y, left: x, width: width, height: height}}>
            <div>
                <button className='btn btn-outline-danger' onClick={close}>임시 닫기 버튼</button>
            </div>
            {children}
        </div>
    )
}