import {useEffect, useState} from "react";

export const SnackbarModal = ({children, x, y, width, height, close, timeout})=>{

    const [fadeout, setFadeOut] = useState(null)

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setFadeOut('modal-fade-out')
        }, timeout)

        return ()=>{
            clearTimeout(timer);
        }
    },[])

    useEffect(()=>{
        let timer;
        if(fadeout !== null){
            timer = setTimeout(close, 400)
        }
        return ()=>{
            clearTimeout(timer);
        }
    },[fadeout])

    return (
        <div>
            <div className={`modal-snackbar ${fadeout}`} style={{top: y, left: x, width: width, height: height}}>
                {children}
            </div>
        </div>

    )
}