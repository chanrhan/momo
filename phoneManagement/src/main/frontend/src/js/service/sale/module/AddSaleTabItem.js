import Popup from "../../../../css/popup.module.css";
import {cmc} from "../../../utils/cm";

export function AddSaleTabItem({inputField, depth, name, subject, values}){

    return (
        <li className={Popup.customer_item}>
            <label htmlFor={name} className={Popup.customer_label}>{subject}</label>
            <div className={Popup.customer_inp_box}>
                <div className={Popup.popup_tab}>
                    <ul className={`${cmc(Popup.tab_list)} ${Popup[`depth${depth}`]}`}>
                        {
                            values && values.map((v,i)=>{
                                return <li key={i} className={cmc(Popup.tab_item, Popup.active)}>
                                   <button type="button" className={Popup.tab_btn}>{v}</button>
                                </li>
                            })
                        }
                        {/*<li className="tab_item active">*/}
                        {/*    <button type="button" className="tab_btn">남자</button>*/}
                        {/*</li>*/}
                        {/*<li className="tab_item">*/}
                        {/*    <button type="button" className="tab_btn">여자</button>*/}
                        {/*</li>*/}
                        {/*<li className="tab_item">*/}
                        {/*    <button type="button" className="tab_btn">법인</button>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
        </li>
    )
}