import Popup from "../../../../css/popup.module.css";
import {cm} from "../../../utils/cm";

export function AddSaleItem({name, subject, children}){
    return (
        <li className={Popup.customer_item}>
            {children}
            {/*<div className={Popup.customer_inp_box}>*/}
            {/*    <input type="text" name={name} className={cm(Popup.customer_inp, `${search && Popup.inp_search}`, className)} readOnly={readOnly}/>*/}
            {/*</div>*/}
        </li>
    )
}