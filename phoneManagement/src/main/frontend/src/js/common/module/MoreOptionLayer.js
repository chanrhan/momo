import {cm} from "../../utils/cm";
import Board from "../../../css/board.module.css";
import {useEffect, useRef, useState} from "react";
import {ObjectUtils} from "../../utils/objectUtil";

export function MoreOptionLayer({className, children, cssModule, cssModules}) {
    const [active, setActive] = useState(false)
    const componentRef = useRef(null)
    const onclickRef = useRef()


    useEffect(() => {
        if (active) {
            attachOnClick();
        } else {
            detachOnClick()
        }
    }, [active]);

    const attachOnClick = () => {
        if (window.onclick) {
            onclickRef.current = window.onclick;
        }
        const timer = setTimeout(() => {
            window.onclick = e => {
                // e.preventDefault()
                if (componentRef.current && !componentRef.current.contains(e.target)) {
                    setActive(false)
                    // detachOnClick();
                }
            }
            clearTimeout(timer);
        }, 10)

    }

    const detachOnClick = () => {
        if (window.onclick) {
            const timer = setTimeout(() => {
                window.onclick = onclickRef.current;
                onclickRef.current = null;
                clearTimeout(timer)
            }, 10)
        }
    }

    const fromCssModule = key => {
        if (!ObjectUtils.isEmpty(cssModule)) {
            return cssModule[key]
        }
        if (ObjectUtils.isEmpty(cssModules)) {
            return ''
        }
        if (cssModules && !Array.isArray(cssModules)) {
            return cssModules[key];
        }
        if (cssModules.length === 1) {
            return cssModules[0][key];
        }

        return cssModules.map(cm => cm[key]).join(' ');
    }

    return (
        <>
            <button type="button" className='btn_more' onClick={() => {
                setActive(!active)
            }}>더보기
            </button>
            <ul ref={componentRef}
                className={`select_layer add_icon left ${active && `active ${fromCssModule('active')}`}`}
                onClick={()=>{
                    setActive(false)
                }}>
                {children}
            </ul>
        </>
    )
}