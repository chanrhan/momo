import {LayerModal} from "../../../common/modal/LayerModal";
import Popup from "../../../../css/popup.module.css"
import User from "../../../../css/user.module.css"
import {cm, cmc, toCssModules} from "../../../utils/cm";
import {TabList} from "../../../common/module/TabList";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import {SelectIndexLayer} from "../../../common/module/SelectIndexLayer";
import {useObjectInputField} from "../../../hook/useObjectInputField";
import {LMD} from "../../../common/LMD";

export function SaleWtPlanModal(props){
    const inputField = useObjectInputField(props.data ?? {
        wt_actv_div: 0,
        wt_cms: 0,
        internet_plan: 1,
        tv_plan: 1
    })
    const modal = useModal();

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Sale_Wt_Plan)
    }

    const submit = ()=>{
        if(props.onSubmit){
            props.onSubmit(inputField.input);
        }
        close();
    }

    return (
        <LayerModal>
            <div className={cm(Popup.popup, Popup.active)} style={{
                maxWidth: '548px',
                top: '130px'
            }}>
                {/*활성화시 active 추가 -->*/}
                <div className={Popup.popup_title}>유선</div>

                <form className={cm(Popup.user_form, User.user_form, Popup.inp_type2)}>
                    <div className={Popup.popup_cont}>
                        <ul className={cm(Popup.half, Popup.form_list, User.form_list)}>
                            <li className={cm(Popup.form_item, User.form_item)}>
                                <label className={cm(Popup.form_label, User.form_label)}>개통 유형</label>
                                <div className={User.form_inp}>
                                    <div className={Popup.popup_tab}>
                                        <TabList name='wt_actv_div' inputField={inputField} theme={Popup} values={LMD.wt_actv_div}/>
                                    </div>
                                </div>
                            </li>
                            <li className={cm(Popup.form_item,User.form_item)}>
                                <label htmlFor="wt_cms" className={cm(Popup.form_label, User.form_label)}>유선 판매 수수료(정책)</label>
                                <div className={User.form_inp}>
                                    <input type="text" name="wt_cms" className={cmc(Popup.inp, Popup.ta_r)}
                                           value={inputField.getInput('wt_cms')}
                                           onChange={inputField.handleInput} />
                                </div>
                            </li>
                        </ul>
                        <ul className={cm(Popup.half, Popup.form_list, User.form_list)}>
                            <li className={cm(Popup.form_item, User.form_item)}>
                                <label htmlFor="net" className={cm(Popup.form_label, User.form_label)}>인터넷 요금제</label>
                                <div className={User.form_inp}>
                                    <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                                        <input type="hidden" id="net"/>
                                        <SelectIndexLayer name='internet_plan' inputField={inputField} values={[1, 2, 3]}
                                                          cssModules={toCssModules(Popup, User)}/>
                                    </div>
                                </div>
                            </li>
                            <li className={cm(Popup.form_item, User.form_item)}>
                                <label htmlFor="net" className={cm(Popup.form_label, User.form_label)}>TV 요금제</label>
                                <div className={User.form_inp}>
                                    <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                                        <input type="hidden" id="net"/>
                                        <SelectIndexLayer name='tv_plan' inputField={inputField} values={[1, 2, 3]}
                                                          cssModules={toCssModules(Popup, User)}/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className={Popup.popup_btn_box}>
                        <button type="button" className={`btn_blue ${cmc(Popup.btn)}`} onClick={submit}>저장</button>
                    </div>
                </form>

                <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
            </div>
        </LayerModal>
    )
}
