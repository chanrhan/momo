import Popup from "../../../../css/popup.module.css";
import {cm, cmc, toCssModules} from "../../../utils/cm";
import User from "../../../../css/user.module.css";
import {SelectIndexLayer} from "../../../common/module/SelectIndexLayer";
import {LMD} from "../../../common/LMD";



export function SaleFilterItem({inputField, index}){
    return (
        <li className={Popup.filter_item}>
            <div className={`${cmc(Popup.select_box)} ${Popup.add}`}>
                {
                    index > 0 && (
                        <SelectIndexLayer values={LMD.filter_and}
                                          onChange={(v)=>{
                                                inputField.put(index, 'and', v);
                                            }}
                                          value={LMD.filter_and[inputField.get(index, 'and')]}/>
                    )
                }
            </div>
            <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                <input type="hidden" id=""/>
                <SelectIndexLayer values={LMD.filter_type}
                                  cssModules={toCssModules(Popup,User)}
                                  value={LMD.filter_type[inputField.get(index,'type')]}
                                  onChange={(v)=>{
                                       inputField.put(index, 'type', v);
                                   }}/>
            </div>
            <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                <input type="hidden" id=""/>
                <SelectIndexLayer values={LMD.filter_option}
                                  cssModules={toCssModules(Popup,User)}
                                  value={LMD.filter_option[inputField.get(index, 'option')]}
                                  onChange={(v)=>{
                                       inputField.put(index, 'option', v);
                                   }}/>
            </div>
            <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                <input type="hidden" id=""/>
                <SelectIndexLayer values={['11','22','33']}
                                  cssModules={toCssModules(Popup,User)}
                                  onChange={(v)=>{
                                       inputField.put(index, 'target', v);
                                   }}/>
            </div>
            <div className={`${cmc(Popup.select_box)} ${Popup.del}`}>
                <button type="button" className={Popup.filter_del} onClick={()=>{
                    inputField.removeItem(index)
                }}>삭제</button>
            </div>
        </li>
    )
}