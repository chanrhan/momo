import User from "../../../css/user.module.css";

export function UserFormItem({error, errorText, children}){
    return (
        <li className={`${User.form_item} ${error && `${User.error} error`}`}>
            {children}
            {
                errorText && <p className={User.error_text}>{errorText}</p>
            }
        </li>
    )
}