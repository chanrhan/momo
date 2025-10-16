import Popup from "../../../../css/popup.module.css"
import {cm, cmc} from "../../../utils/cm";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import {LayerModal} from "../../../common/modal/LayerModal";
import {useState} from "react";
import {DateSelectModule} from "../../../common/modal/menu/DateSelectModule";
import {DateUtils} from "../../../utils/DateUtils";
import {useObjectInputField} from "../../../hook/useObjectInputField";

export function ReserveDateModal(props){
    const today = new Date()
    const modal = useModal()
    const inputField = useObjectInputField();
    const [isFromToday, setIsFromToday] = useState(true);
    const [selected, setSelected] = useState(0)

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Reserve_Date)
    }

    const setDate = (year,month, day)=>{
        const today = new Date();
        // if(year < today.getFullYear() || month < today.getMonth()+1 || day < today.getDate()){
        //     modal.openModal(ModalType.SNACKBAR.Warn,{
        //         msg: "기준 날짜 이후의 날짜는 선택할 수 없습니다!"
        //     })
        //     return;
        // }
        inputField.put('rsv_dt', DateUtils.formatYYMMdd(year,month, day));
        setSelected(0)
    }


    const submit = ()=>{
        if(props.onSubmit){
            const rsv_tp = selected <= 2 ? selected : 3;
            let rsv_dt = '';
            let dday = 0;

            if(selected === 0){
                rsv_dt = inputField.get('rsv_dt')
                if(isFromToday){
                    dday = DateUtils.dateDiffFromToday(rsv_dt)
                }else{
                    dday = DateUtils.dateDiff(props.actv_dt, rsv_dt)
                }
            }else {
                const rd = isFromToday ? new Date() : new Date(props.actv_dt);
                // console.log(props.actv_dt)
                // console.log(rd)
                if (selected === 1 || selected >= 3) {
                    if (selected === 1) {
                        dday = Number(inputField.get('dday_tp_d'));
                    } else {
                        dday = DDAY_ITEMS[selected-3]
                        // console.log(`dday: ${dday}`)
                    }
                    rd.setDate(rd.getDate() + dday);
                    rsv_dt = DateUtils.formatYYMMdd(rd.getFullYear(), rd.getMonth() + 1, rd.getDate())
                } else if (selected === 2) {
                    dday = Number(inputField.get('dday_tp_m'));
                    const afterDate = new Date(rd);
                    afterDate.setMonth(rd.getMonth() + dday);
                    const dplus = DateUtils.dateDiff(rd, afterDate);
                    rd.setDate(rd.getDate() + dplus);
                    rsv_dt = DateUtils.formatYYMMdd(rd.getFullYear(), rd.getMonth() + 1, rd.getDate())
                }
            }

            const rsvDt = new Date(rsv_dt)
            // 당일 예약이고, 현재 시간이 22시 이후라면, 예약날짜를 익일 09시로 조정
            if(DateUtils.equalYMd(today, rsvDt) && today.getHours() >= 22){
                DateUtils.addDate(rsvDt, 1)
                rsv_dt = DateUtils.dateToStringYYMMdd(rsvDt)
            }

            props.onSubmit({
                rsv_tp: rsv_tp,
                rsv_dt: rsv_dt,
                dday: dday
            });
            close();
        }
    }

    const handleBlock = (year, month, day)=>{
        const date = new Date(DateUtils.formatYYMMdd(year, month,day));
        let diff = 0;
        if(isFromToday){
            diff =  DateUtils.dateDiffFromToday(date);
        }else{
            diff = DateUtils.dateDiff(new Date(props.actv_dt), date)
        }
        return diff < -1;
    }

    return (
        <LayerModal {...props} top={30}>
            <div className={Popup.popup_title}>예약 날짜 설정</div>
            <div className={Popup.reservation}>
                <div className={Popup.popup_cont}>
                    <div className={Popup.description}>
                        예약 문자는 예약일 기준 09시에 발송됩니다.
                        {
                            selected === 1 &&
                            <span>당일에 예약할 경우, 30분 후 발송되며 <br/>22시 이후에는 고객 편의를 위해 익일 09시에 발송됩니다.</span>
                        }

                    </div>
                    <div className={Popup.popup_head_box}>
                            <span className={cm(Popup.today_switch)}>
                                    <input type="checkbox" name='completed' className={`switch_inp ${Popup.input}`}
                                           checked={isFromToday}/>
                                    <label htmlFor="completed" className={Popup.label} onClick={()=>{
                                        setIsFromToday(!isFromToday)
                                    }}><span className={Popup.span}>on/off</span></label>
                            </span>
                    </div>
                    <ul className="reservation_List" style={{
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        maxHeight: '380px'
                    }}>
                        <li key={0} className={cm(Popup.reservation_item)}>
                            <div className={Popup.reservation_radio}>
                                <input type="radio" name='rsv_radio_0' className={Popup.input}
                                       checked={selected === 0}/>
                                <label htmlFor="rsv_radio_0" className={Popup.label}>선택</label>
                            </div>
                            <DateSelectModule rootClassName={Popup.reservation_date}
                                              onSelect={setDate}
                                              blockCallback={handleBlock}
                            >
                                <input type="text" className={cmc(Popup.inp)} value={inputField.get('rsv_dt')}
                                       placeholder="직접입력"
                                       readOnly/>
                                <button type="button" className={Popup.date_btn}>달력</button>
                            </DateSelectModule>
                        </li>
                        <li key={1} className={cm(Popup.reservation_item, Popup.reservation_text)}
                            onClick={() => {
                                setSelected(1)
                            }}>
                            <div className={Popup.reservation_radio}>
                                <input type="radio" name="rsv_radio_1" className={Popup.input} checked={selected === 1}/>
                                <label htmlFor="rsv_radio_1" className={Popup.label}>선택</label>
                            </div>
                            <span>D +</span>
                            <input type="text" name='dday_tp_d' className={cmc(Popup.inp)}
                                   value={inputField.get('dday_tp_d')}
                                   onChange={inputField.handleInput}/>
                            <span>일</span>
                        </li>
                        <li key={2} className={cm(Popup.reservation_item, Popup.reservation_text)}
                            onClick={() => {
                                setSelected(2)
                            }}>
                            <div className={Popup.reservation_radio}>
                                <input type="radio" name="rsv_radio_2" className={Popup.input} checked={selected === 2}/>
                                <label htmlFor="rsv_radio_2" className={Popup.label}>선택</label>
                            </div>
                            <span>M +</span>
                            <input type="text" name='dday_tp_m' className={cmc(Popup.inp)}
                                   value={inputField.get('dday_tp_m')}
                                   onChange={inputField.handleInput}/>
                            <span>월</span>
                        </li>
                        {
                            DDAY_ITEMS && DDAY_ITEMS.map((_, i) => {
                                return <DdayItem selected={selected} index={i + 3} onClick={() => {
                                    setSelected(i + 3)
                                }}/>
                            })
                        }
                    </ul>
                </div>

                <div className={Popup.popup_btn_box}>
                    <button type="button" className={`btn_blue ${cmc(Popup.btn)}`} onClick={submit}>저장</button>
                </div>
            </div>

            <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
        </LayerModal>
    )
}

function DdayItem({index, checked, onClick, selected}){
    return (
        <li key={index} className={cm(Popup.reservation_item, Popup.reservation_button)} onClick={onClick}>
            <div className={Popup.reservation_radio}>
                <input type="radio" name={`rsv_radio_${index}`} className={Popup.input} checked={selected === index}/>
                <label htmlFor={`rsv_radio_${index}`} className={Popup.label}>선택</label>
            </div>
            <button type="button" className={Popup.reservation_btn}>D+{DDAY_ITEMS[index - 3]}</button>
        </li>
    )
}

const DDAY_ITEMS = [
    1, 125, 183, 200
]