export function SelectLayer({width, top, left, className, active, children}){

    return (
        <ul className={`select_layer ${className} ${active && 'active'}`}
            style={{
                position: 'absolute',
                // display: 'block',
                width: width,
                top: top,
                left: left,
            }}>
            {/*활성화시 active 추가 -->*/}
            {children}
        </ul>
    )
}

export function SelectItem({children, onClick}) {
    return (
        <li className="select_item">
            <button type="button" onClick={onClick}>{children}</button>
        </li>
    )
}