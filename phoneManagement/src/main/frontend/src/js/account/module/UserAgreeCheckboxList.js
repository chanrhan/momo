import User from "../../../css/user.module.css"

export function UserAgreeCheckboxList({subject, varName, checked=true, required=true}){
    return (
        <li className={User.agree_item}>
            <input type="checkbox" id={varName} className={User.input} checked={checked}/>
            <label htmlFor={varName} className={User.label}>{required ? '[필수]' : '[선택]'} {subject}</label>
        </li>
    )
}