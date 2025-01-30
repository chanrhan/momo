import {cm, cmc} from "../../utils/cm";
import Board from "../../../css/board.module.css";
import {useRef} from "react";

export function BoardTable({caption, colgroup, children, tableRef, style, onScrollLimit, className, onKeyDown}){
    const handleScroll = (e: UIEvent)=>{
        const target = e.target;

        const scrollTop = target.scrollTop;
        const scrollHeight = target.scrollHeight;
        const clientHeight = target.clientHeight;

        if(scrollTop + clientHeight >= scrollHeight){
            if(onScrollLimit){
                onScrollLimit();
            }
        }
    }

    return (
        <div className={`board_body ${Board.sticky} ${className}`} style={style} onScroll={handleScroll}>
            <table className={Board.td_board} ref={tableRef} onKeyDown={onKeyDown}>
                <caption>{caption}</caption>
                <colgroup>
                    {colgroup}
                </colgroup>
                {children}
            </table>
        </div>
    )
}

// 보드 테이블 헤더 (thead)
export function Bthead({children}){
    return (
        <thead className={Board.thead}>
            <tr>
                {children}
            </tr>
        </thead>
    )
}

export function Btbody({br, children}){
    return (
        <tbody className={`${Board.tbody} ${!br && Board.br_none}`}>
        {children}
        </tbody>
    )
}

export function Bth({index, children, className, checked,
                        checkbox, name, sort, onClick, onCheck, onMouseOver}){
    const thRef = useRef()

    const resizeColumn = (e) => {
        const startX = e.clientX;
        // const table = tableRef.current;
        // const th = table.querySelectorAll('th')[index];
        const th = thRef.current;
        const startWidth = th.offsetWidth;

        const onMouseMove = (e) => {
            const newWidth = startWidth + (e.clientX - startX);
            if (newWidth > 50) {  // 최소 너비 설정
                th.style.width = `${newWidth}px`;
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return (
        <th key={index} className={`${cm(Board.th)} ${className} ${(sort && !checkbox) && Board.sort} ${checkbox && 'ta_c'}`}
            scope='col' onClick={onClick} onMouseOver={onMouseOver} ref={thRef}>
            {
                checkbox && (
                    <div className={cmc(Board.check_box)}>
                        <input type="checkbox" id={name}checked={checked} readOnly/>
                        <label htmlFor={name} className={cm(Board.label)} onClick={onCheck}>선택</label>
                    </div>
                )
            }
            {children}
            <div className={Board.resize_handle} onMouseDown={(e)=>{
                resizeColumn(e);
            }}></div>
        </th>
    )
}

export function Btd({children, width, className, stopPropagation, checkbox, onCheck, checked, name}) {
    return (
        <td className={`${Board.td} ${checkbox && 'ta_c'} ${className ? className : ''}`}
            style={{
                width: `${width}px`
            }}
            onClick={e=>{
            if(checkbox || stopPropagation)
            e.stopPropagation();
        }}>
            {
                checkbox && (
                    <div className={cmc(Board.check_box)}>
                        <input type="checkbox" id={name} className={cm(Board.input)} checked={checked} readOnly/>
                        <label htmlFor={name} className={cm(Board.label)} onClick={onCheck}>선택</label>
                    </div>
                )
            }
            {children}
        </td>
    )
}
