import Popup from "../../../../css/popup.module.css"
import User from "../../../../css/user.module.css"
import {cm, cmc} from "../../../utils/cm";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import {LayerModal} from "../../../common/modal/LayerModal";
import {useState} from "react";
import {DateSelectModal} from "../../../common/modal/menu/DateSelectModal";
import {DateUtils} from "../../../utils/DateUtils";

export function ReserveDateModal(props){
    const modal = useModal()
    const [reserveDate, setReserveDate] = useState('')


    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Reserve_Date)
    }

    const setDate = (year,month, day)=>{
        setReserveDate(DateUtils.formatYYMMdd(year,month, day))
    }

    const submit = ()=>{
        if(props.onSubmit){
            props.onSubmit();
            close();
        }
    }


    return (
        <LayerModal>
            <div className={cm(Popup.popup, Popup.active)} style={
                {
                    top: '130px'
                }
            }>
                {/*활성화시 active 추가 -->*/}
                <div className={Popup.popup_title}>예약 날짜 설정</div>

                <form className={Popup.reservation}>
                    <div className={Popup.popup_cont}>
                        <ul className="reservation_List">
                            <li className={Popup.reservation_item}>
                                <DateSelectModal rootClassName={Popup.reservation_date} onSelect={setDate}>
                                    <input type="text" className={cmc(Popup.inp)} value={reserveDate} placeholder="직접입력" readOnly/>
                                    <button type="button" className={Popup.date_btn}>달력</button>
                                </DateSelectModal>
                            </li>
                            <li className={cm(Popup.reservation_item, Popup.reservation_text)}>
                                <span>D +</span>
                                <input type="text" className={cmc(Popup.inp)}/>
                                <span>일</span>
                            </li>
                            <li className={cm(Popup.reservation_item, Popup.reservation_text)}>
                                <span>M +</span>
                                <input type="text" className={cmc(Popup.inp)}/>
                                <span>월</span>
                            </li>
                            <DdayItem/>
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

function DdayItem({content}){
    return (
        <li className={cm(Popup.reservation_item, Popup.reservation_button)}>
            <button type="button" className={Popup.reservation_btn}>{content}</button>
        </li>
    )
}