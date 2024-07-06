import User from "../../../css/user.module.css"
import {cm} from "../../utils/cm";

export function UserFormInput({type = 'text', subject, name, inputField, placeholder, search, bg, readOnly, onChange, errorText, children}){

    const handleChange = e=>{
        if(inputField !== null && inputField !== undefined){
            inputField.handleInput(e);
        }
    }

    if(typeof inputField !== 'object'){
        return null;
    }

    return (
        <>
            {
                subject && <label htmlFor={name} className={User.form_label}>{subject}</label>
            }
            <div className={`${User.form_inp} ${User.div} ${search && User.form_search}`}>
                <input type={type} name={name} value={inputField.getInput(name)} className={`inp ${User.inp} ${bg && `${User.bg} bg`}`} placeholder={placeholder} readOnly={(readOnly)}
                        onChange={onChange ? onChange : handleChange}/>
                {
                    search && <button type="button" className={User.form_search_btn}>검색</button>
                }
                {children}
            </div>
            {
                errorText && <>
                    <p className={User.error_text} style={{marginBottom: '15px'}}>{errorText}</p>
                </>
            }

        </>
    )
}