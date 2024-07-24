import Popup from "../../../../css/popup.module.css";
import {cm} from "../../../utils/cm";

export function AddSaleInput({value, name, subject, search, className, onClick, readOnly, inputField, children}){

    if(typeof inputField !== 'object'){
        return null;
    }

    return (
        <>
            <label htmlFor={name} className={Popup.customer_label}>{subject}</label>
            <div className={Popup.customer_inp_box}>
                <input type="text" name={name}
                       value={value ?? inputField.get(name)}
                       className={cm(Popup.customer_inp, `${search && Popup.inp_search}`, className)}
                       readOnly={readOnly}
                       onChange={inputField.handleInput}
                       onClick={onClick}/>
                {children}
            </div>
        </>
    )
}