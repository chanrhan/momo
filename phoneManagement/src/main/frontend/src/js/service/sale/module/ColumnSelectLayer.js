import {cm, cmc} from "../../../utils/cm";
import Board from "../../../../css/board.module.css";
import {LMD} from "../../../common/LMD";
import {SaleColumnItem} from "./SaleColumnItem";
import {useEffect, useRef, useState} from "react";

export function ColumnSelectLayer({columns}){
    const [active, setActive] = useState(false)
    const componentRef = useRef(null)
    const onclickRef = useRef()

    const [keyword, setKeyword] = useState('')


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

    return (
        <>
            <button type="button" className={cm(Board.board_btn, Board.board_filter)} onClick={()=>{
                setActive(!active)
            }}>
                컬럼 선택
            </button>
            <div className={cm(Board.filter_layer, `${active && Board.active}`)} ref={componentRef}>
                {/*활성화시 active 추가 -->*/}
                <input type="text" className={`${cmc(Board.inp)} ${cm(Board.filter_inp)}`} value={keyword}
                       onChange={e=>{
                           setKeyword(e.target.value)
                       }}
                       placeholder="검색"/>
                <div className={Board.filter_scroll}>
                    <ul className='filter_list'>
                        {
                            LMD.sale_column_names.map((v, i) => {
                                if (!v.includes(keyword)) {
                                    return null;
                                }
                                return <li key={i} className={cm(Board.filter_item)}>
                                    <div className={cmc(Board.check_box)}>
                                        <input type="checkbox" id={`filter_${i}`} checked={columns.get(i)} readOnly/>
                                        <label className={Board.label} htmlFor={`filter_${i}`}
                                               onClick={() => {
                                                   columns.toggle(i)
                                               }}>{v}</label>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}