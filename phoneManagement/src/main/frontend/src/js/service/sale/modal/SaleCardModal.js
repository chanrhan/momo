import {LayerModal} from "../../../common/modal/LayerModal";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import Popup from "../../../../css/popup.module.css"
import User from "../../../../css/user.module.css"
import {cm, cmc, toCssModules} from "../../../utils/cm";
import {SelectIndexLayer} from "../../../common/module/SelectIndexLayer";
import {useObjectArrayInputField} from "../../../hook/useObjectArrayInputField";
import {LMD} from "../../../common/LMD";
import {ObjectUtils} from "../../../utils/objectUtil";
import {useEffect} from "react";

const CARD_ITEM = {
    card_nm: 0,
    card_tp: 0
}

function SaleCardModal(props){
    const modal = useModal();
    // console.table(props.data)
    const inputField = useObjectArrayInputField(CARD_ITEM, props.data)

    useEffect(() => {
        console.table(inputField.input)
    }, [inputField.input]);

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Sale_Card)
    }

    const submit = ()=>{
        if(props.onSubmit){
            props.onSubmit(inputField.input)
        }
        close();
    }

    return (
        <LayerModal>
            <div className={cm(Popup.popup, Popup.active)} style={{
                top: '130px'
            }}>
                {/*활성화시 active 추가 -->*/}
                <div className={Popup.popup_title}>카드</div>

                <form className={cm(Popup.user_form, Popup.inp_type2, User.user_form)}>
                    <div className={Popup.popup_cont}>
                        <div className={cmc(Popup.ta_r)}>
                            <button type="button" className={`btn_blue ${cmc(Popup.btn, Popup.btn_small)}`} onClick={inputField.addItem}>항목추가</button>
                        </div>
                        <div className={Popup.list_title}>
                            <label htmlFor="card_nm" className={cm(Popup.form_label, User.form_label)}>카드명</label>
                            <label htmlFor="card_nm" className={cm(Popup.form_label, User.form_label)}>카드 유형</label>
                        </div>
                        {
                            inputField.length() > 0 && inputField.input.map((v,i)=>{
                                return <CardItem index={i} inputField={inputField}/>
                            })
                        }
                    </div>

                    <div className={Popup.popup_btn_box}>
                        <button type="button" className={`btn_blue ${cmc(Popup.btn)}`} onClick={submit}>확인</button>
                    </div>
                </form>

                <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
            </div>
        </LayerModal>
    )
}

function CardItem({index, inputField}){
    // console.log(`item idx: ${index}`)
    return (
        <ul className={cm(Popup.half, Popup.form_list)}>
            <li className={cm(Popup.form_item, User.form_item)}>
                {/*<label htmlFor="card_nm" className={cm(Popup.form_label, User.form_label)}>카드명</label>*/}
                <div className={User.form_inp}>
                    <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                        {/*<input type="hidden" id="card"/>*/}
                        <SelectIndexLayer buttonClassName={Popup.type2}
                                          name='card_nm' cssModules={toCssModules(Popup, User)}
                                          value={LMD.card_nm[inputField.get(index, 'card_nm') ?? 0]}
                                          onChange={v => {
                                              inputField.put(index, 'card_nm', v)
                                          }}
                                          values={LMD.card_nm}/>
                    </div>
                </div>
            </li>
            <li className={cm(Popup.form_item, User.form_item)}>
                {/*<label htmlFor="card_tp" className={cm(Popup.form_label, User.form_label)}>카드 유형</label>*/}
                <div className={cm(User.form_inp, Popup.card_form)}>
                    <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                        {/*<input type="hidden" id="card"/>*/}
                        <SelectIndexLayer buttonClassName={Popup.type2}
                                          name='card_tp' cssModules={toCssModules(Popup, User)}
                                          value={LMD.card_tp[inputField.get(index, 'card_tp') ?? 0]}
                                          onChange={v => {
                                              inputField.put(index, 'card_tp', v)
                                          }}
                                          values={LMD.card_tp}/>
                    </div>
                    <button type="button" className={Popup.check_del}
                            onClick={() => {
                                inputField.removeItem(index)
                            }}>
                    </button>
                </div>
            </li>
        </ul>
    )
}

export default SaleCardModal;