import User from "../../../css/user.module.css"
import {cm} from "../../utils/cm";
import {ObjectUtils} from "../../utils/objectUtil";

export function UserFormInput({value, type = 'text', subject, name, inputField, disabled, className, style, placeholder,
                                  search, isSearching, maxLength = 20, onSearch, onKeyDown, onClick, bg, readOnly, onChange, errorText, children, autoComplete}){

    const handleChange = e=>{
        if(inputField !== null && inputField !== undefined){
            inputField.handleInput(e);
        }
    }

    return (
        <>
            {
                subject && <label htmlFor={name} className={User.form_label}>{subject}</label>
            }
            <div className={`${User.form_inp} ${User.div} ${className} ${search && User.form_search} ${isSearching && User.search_loading}`}>
                <input type={type} disabled={disabled} name={name} value={value ?? inputField.get(name)} className={`inp ${User.inp} ${bg && `${User.bg} bg`}`}
                       placeholder={placeholder} readOnly={(readOnly)} maxLength={maxLength} style={style}
                       onClick={onClick} onKeyDown={onKeyDown}  onChange={onChange ? onChange : handleChange} autoComplete={autoComplete}/>
                {
                    search && <button type="button" className={User.form_search_btn} onClick={onSearch}>검색</button>
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