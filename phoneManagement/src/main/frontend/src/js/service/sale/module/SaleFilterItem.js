import Popup from "../../../../css/popup.module.css";
import {cm, cmc, toCssModules} from "../../../utils/cm";
import User from "../../../../css/user.module.css";
import {SelectIndexLayer} from "../../../common/module/SelectIndexLayer";

export function SaleFilterItem({filterInputField, index}){
    return (
        <li className={Popup.filter_item}>
            <div className={`${cmc(Popup.select_box)} ${Popup.add}`}>
                {
                    index > 0 && (
                        <SelectIndexLayer values={['그리고','또는']} onChange={(v)=>{
                            filterInputField.putAnd(index, v);
                        }}/>
                    )
                }
            </div>
            <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                <input type="hidden" id=""/>
                <SelectIndexLayer values={['11','22','33']}
                                  cssModules={toCssModules(Popup,User)}
                                  onChange={(v)=>{
                                       filterInputField.putType(index, v);
                                   }}/>
            </div>
            <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                <input type="hidden" id=""/>
                <SelectIndexLayer values={['11','22','33']}
                                  cssModules={toCssModules(Popup,User)}
                                  onChange={(v)=>{
                                       filterInputField.putOption(index, v);
                                   }}/>
            </div>
            <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                <input type="hidden" id=""/>
                <SelectIndexLayer values={['11','22','33']}
                                  cssModules={toCssModules(Popup,User)}
                                  onChange={(v)=>{
                                       filterInputField.putData(index, v);
                                   }}/>
            </div>
            <div className={`${cmc(Popup.select_box)} ${Popup.del}`}>
                <button type="button" className={Popup.filter_del} onClick={()=>{
                    filterInputField.removeItem(index)
                }}>삭제</button>
            </div>
        </li>
    )
}