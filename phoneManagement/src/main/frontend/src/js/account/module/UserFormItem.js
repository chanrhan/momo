import User from "../../../css/user.module.css";
import {cmc} from "../../utils/cm";

export function UserFormItem({active, errorText, children}){
    return (
        <li className={`${User.form_item} ${active && cmc(User.active)} ${errorText && cmc(User.error)}`}>
            {children}
            {
                (active !== false && errorText) && <p className={User.error_text}>{errorText}</p>
            }
        </li>
    )
}