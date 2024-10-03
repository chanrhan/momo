import Popup from "../../../css/popup.module.css"
import {cm, cmc} from "../../utils/cm";
import {useEffect, useRef, useState} from "react";
import {ScrollUtils} from "../../utils/ScrollUtils";

export const LayerModal = ({modalRef, children, top, left, width,
                               height, minWidth, maxWidth, minHeight, maxHeight}) => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        let prevScrollY = ScrollUtils.preventScroll(document.body);
        const timer = setTimeout(() => {
            setFadeIn(true)

        }, 100)
        return () => {
            ScrollUtils.allowScroll(document.body, prevScrollY)
            prevScrollY = null;
            clearTimeout(timer);
        }
    }, []);


    return (
        <div className={`scroll-hidden ${cm(Popup.popup_mask, `${fadeIn && Popup.active}`)}`}>
            <div className={Popup.popup} style={
                {
                    top: `${60+top}px`,
                    left: `${left}px`,
                    width: `${width}px`,
                    height: `${height}px`,
                    minWidth: `${minWidth}px`,
                    maxWidth: `${maxWidth}px`,
                    minHeight: `${minHeight}px`,
                    maxHeight: `${maxHeight}px`
                }
            }>
                {children}
            </div>
        </div>
    )
}
