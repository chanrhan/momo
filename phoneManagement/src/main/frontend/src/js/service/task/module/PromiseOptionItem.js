import Board from "../../../../css/board.module.css";
import {cm, cmc} from "../../../utils/cm";

export function PromiseOptionItem({content, id, disabled}){
    return (
        <li className={Board.option_item}>
            <div className={cmc(Board.radio_box)}>
                <input type="radio" name="radio" id={id} disabled={disabled}/>
                <label htmlFor={id} className={Board.form_label}>{content}</label>
            </div>
        </li>
    )
}