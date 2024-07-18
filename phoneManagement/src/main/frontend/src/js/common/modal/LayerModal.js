import Popup from "../../../css/popup.module.css"
import {cm, cmc} from "../../utils/cm";
import {useEffect, useState} from "react";

export const LayerModal = ({modalRef, children, width, height}) => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeIn(true)

        }, 100)
        return () => {
            clearTimeout(timer);
        }
    }, []);

    return (
        <div ref={modalRef} className={cm(Popup.popup_mask, `${fadeIn && Popup.active}`)}
             style={
                 {
                     width: width,
                     height: height
                 }
             }>
            {children}
        </div>
    )
}
