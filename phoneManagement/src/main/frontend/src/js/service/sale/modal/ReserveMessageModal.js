import {LayerModal} from "../../../common/modal/LayerModal";
import Popup from "../../../../css/popup.module.css"
import {cm, cmc} from "../../../utils/cm";
import {useObjectArrayInputField} from "../../../hook/useObjectArrayInputField";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import {LMD} from "../../../common/LMD";

export function ReserveMessageModal(props){
    const arrayInputField = useObjectArrayInputField(RESERVE_INPUT)
    const modal = useModal()

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Reserve_Message)
    }


    const openReserveDateModal =(index)=>{
        modal.openModal(ModalType.LAYER.Reserve_Date, {
            subject: arrayInputField.get(index, 'subject'),
            onSubmit: (type, date)=>{
                arrayInputField.put(index, 'reserve_type', type)
                arrayInputField.put(index, 'reserve_date', date)
            }
        })
    }

    const submit = ()=>{
        if(props.onSubmit){
            const body = arrayInputField.input.filter(v=>v.checked).map(v=>{
                return {
                    msg_tp: v.msg_tp,
                    rsv_tp: v.rsv_tp,
                    rsv_dt: v.rsv_dt
                }
            })
            props.onSubmit(body);
            close();
        }
    }


    return (
        <LayerModal >
            <div className={cm(Popup.popup, Popup.active)} style={
                {
                    top: '80px',
                    maxWidth: '548px'
                }
            }>
                {/*활성화시 active 추가 -->*/}
                <div className={Popup.popup_title}>연락 전송 등록</div>
                <div className={Popup.popup_text}>전송하고 싶은 문자를 선택해주세요.</div>

                <form className={Popup.transfer}>
                    <div className={Popup.popup_cont}>
                        <div className={cmc(Popup.ta_r)}>
                            <div className={cmc(Popup.check_box)}>
                                <input type="checkbox" id="check_"/>
                                <label htmlFor="check_">고객 맞춤 추천</label>
                            </div>
                        </div>

                        <ul className={Popup.popup_check_list}>
                            {
                                arrayInputField.length() > 0 && arrayInputField.input.map((v,i)=>{
                                    return <ReserveItem index={i} arrayInputField={arrayInputField} onDateClick={()=>{
                                        openReserveDateModal(i)
                                    }}/>
                                })
                            }

                        </ul>
                    </div>

                    <div className={cm(Popup.popup_btn_box, Popup.half)}>
                        <button type="button" className={`btn_grey ${cmc(Popup.btn)}`} onClick={submit}>건너뛰기</button>
                        <button type="button" className={`btn_blue ${cmc(Popup.btn)}`} onClick={submit}>저장</button>
                    </div>
                </form>

                <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
            </div>
        </LayerModal>
    )
}

function ReserveItem({index, arrayInputField, onDateClick}){
    const toggleCheck = ()=>{
        arrayInputField.put(index, 'checked', !arrayInputField.input[index].checked ?? false)
    }

    return (
        <li className={Popup.li}>
            <input type="checkbox" name={`rsv_check${index}`} className={Popup.check_inp}  checked={arrayInputField.get(index, 'checked')}/>
            <label htmlFor={`rsv_check${index}`} className={Popup.check_label} onClick={toggleCheck}>{LMD.rsv_msg_tp[arrayInputField.get(index, 'msg_tp')]}</label>
            <div className={Popup.transfer_box}>
                <button type="button" className={cmc(Popup.btn, Popup.btn_small)}>미리보기</button>
                <input type="text" className={`inp ${cm(Popup.inp)} transfer_inp`} value={arrayInputField.get(index, 'reserve_date')} placeholder='날짜 설정' readOnly
                       onClick={onDateClick}/>
                {/*value 있을 경우 entered 추가 -->*/}
            </div>
        </li>
    )
}

const RESERVE_INPUT = [
    {
        checked: false,
        msg_tp: 0,
        rsv_tp: 0,
        rsv_dt: '2024-07-01'
    },
    {
        checked: false,
        msg_tp: 1,
        rsv_tp: 1,
        rsv_dt: '2021-12-11'
    },
    {
        checked: false,
        msg_tp: 2,
        rsv_tp: 0,
        rsv_dt: '2023-11-04'
    },
    {
        checked: false,
        msg_tp: 3,
        rsv_tp: 0,
        rsv_dt: '2024-07-15'
    }
]
