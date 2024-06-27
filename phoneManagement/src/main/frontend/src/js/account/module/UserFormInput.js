import User from "../../../css/user.module.css"
import {cm} from "../../utils/cm";

export function UserFormInput({type = 'text', subject, varName, placeholder, error, errorText, search, bg, readOnly, children}){
    return (
        <>
            {
                subject && <label htmlFor={varName} className={User.form_label}>{subject}</label>
            }
            <div className={`${User.form_inp} ${search && User.form_search}`}>
                <input type={type} id={varName} className={`inp ${User.inp} ${bg && `${User.bg} bg`}`} placeholder={placeholder} readOnly={(readOnly)}/>
                {
                    search && <buttom type="button" className={User.form_search_btn}>검색</buttom>
                }
                {children}
            </div>
            {/*{*/}
            {/*    errorText && <p className={User.error_text}>{errorText}</p>*/}
            {/*}*/}

        </>
    )
}