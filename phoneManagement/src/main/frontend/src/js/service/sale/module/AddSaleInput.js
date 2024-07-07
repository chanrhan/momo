import Popup from "../../../../css/popup.module.css";
import {cm} from "../../../utils/cm";

export function AddSaleInput({name, subject, search, className, readOnly, inputField, children}){

    if(typeof inputField !== 'object'){
        return null;
    }

    return (
        <>
            <label htmlFor={name} className={Popup.customer_label}>{subject}</label>
            <div className={Popup.customer_inp_box}>
                <input type="text" name={name}
                       value={inputField.getInput(name)}
                       className={cm(Popup.customer_inp, `${search && Popup.inp_search}`, className)}
                       readOnly={readOnly}
                       onChange={inputField.handleInput}/>
                {children}
            </div>
        </>
    )
}