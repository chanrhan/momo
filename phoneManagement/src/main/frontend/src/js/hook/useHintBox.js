import {useEffect, useRef, useState} from "react";
import {MouseEventUtils} from "../utils/MouseEventUtils";

export function useHintBox(content, props) {
    const componentRef = useRef(null)
    const [active, setActive] = useState(false)
    const [pos, setPos] = useState({
        top: 0,
        left: 0
    })

    useEffect(() => {
        const onMouseOverEvent = (e: MouseEvent<HTMLParagraphElement>) => {
            if (componentRef.current && !componentRef.current.contains(e.target)) {
                setActive(false)
                window.removeEventListener('mouseover', onMouseOverEvent)
            }
        }

        if (active) {
            window.addEventListener('mouseover', onMouseOverEvent);
        }
        return () => {
            window.removeEventListener('mouseover', onMouseOverEvent)
        }
    }, [active]);

    const COMPONENT = <HintBox {...props} top={props.top+pos.top} left={props.left+pos.left} active={active} componentRef={componentRef}>
        {content}
    </HintBox>

    const open = (e: MouseEvent)=>{
        const {top, left} = MouseEventUtils.getAbsolutePos(e)
        setPos({
            top: top,
            left: left
        })
        setActive(true)
    }

    const close = ()=>{
        setActive(false)
    }

    return {
        component: COMPONENT,
        ref: componentRef,
        open,
        close
    }
}

function HintBox({active, top, left, width, height, maxWidth, maxHeight, minWidth, minHeight, children, componentRef}){
    return (
        <div className={`hint_box ${!active && 'disabled'}`} style={{
            top: `${top}px`,
            left: `${left}px`,
            width: `${width}px`,
            height: `${height}px`,
            maxWidth: `${maxWidth}px`,
            maxHeight: `${maxHeight}px`,
            minWidth: `${minWidth}px`,
            minHeight: `${minHeight}px`
        }} ref={componentRef}>
            {children}
        </div>
    )
}
