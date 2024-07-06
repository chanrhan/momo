import {cm} from "../../../utils/cm";
import Popup from "../../../../css/popup.module.css";

export function AddSaleCheckItem({name, subject}){
    return (
        <li className={cm(Popup.customer_item, Popup.li)}>
            <input type="checkbox" name={name} className={cm(Popup.check_inp, Popup.input)} checked={true}/>
            <label htmlFor={name} className={Popup.check_label}>{subject}</label>
        </li>
    )
}