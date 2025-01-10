import {LayerModal} from "../../../common/modal/LayerModal";
import Popup from "../../../../css/popup.module.css"
import {cm, cmc} from "../../../utils/cm";
import {useObjectArrayInputField} from "../../../hook/useObjectArrayInputField";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import {LMD} from "../../../common/LMD";
import {ObjectUtils} from "../../../utils/objectUtil";
import {useEffect, useState} from "react";
import useApi from "../../../hook/useApi";
import {writeFileAsync} from "xlsx";

export function ReserveMessageModal(props){
    const {rsvMsgApi} = useApi()
    const arrayInputField = useObjectArrayInputField({
        checked: false,
        msg_tp: null
    }, RESERVE_INPUT)
    // console.table(arrayInputField.input)
    const modal = useModal()

    const [orgData, setOrgData] = useState(null)

    useEffect(() => {
        if(props.sale_id){
            getReservedMessage();
        }
    }, []);

    const getReservedMessage = ()=>{
        rsvMsgApi.getReserveMsgBySale(props.sale_id).then(({status,data})=>{
            if(status === 200 && !ObjectUtils.isEmpty(data)){
                // console.table(data)
                setOrgData(data)
                arrayInputField.setInput(prev=>{
                    const typeList = data.map(v=>v.msg_tp);
                    return [...prev].map(v=>{
                        const find = typeList.indexOf(v.msg_tp);
                        if(find !== -1){
                            v.rsv_dt = data[find].rsv_dt;
                            v.rsv_tp = data[find].rsv_tp
                            v.msg_st = data[find].msg_st;
                            v.checked = true;
                        }
                        return v;
                    })
                })
            }
        })
    }

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Reserve_Message)
    }



    const openReserveDateModal =(index)=>{
        console.log(props.actv_dt)
        modal.openModal(ModalType.LAYER.Reserve_Date, {
            subject: arrayInputField.get(index, 'subject'),
            actv_dt: props.actv_dt,
            onSubmit: ({dday, rsv_tp, rsv_dt})=>{
                console.log(`dday: ${dday} rsv_tp: ${rsv_tp} rsv_dt: ${rsv_dt}`)
                arrayInputField.put(index, 'dday', dday)
                arrayInputField.put(index, 'rsv_tp', rsv_tp)
                arrayInputField.put(index, 'rsv_dt', rsv_dt)
            }
        })
    }

    const submit = ()=>{
        let body = arrayInputField.input.filter(v=>{
            return v.checked && v.rsv_dt
        }).map(v=>{
            return {
                msg_tp: v.msg_tp,
                dday: v.dday,
                rsv_tp: v.rsv_tp,
                rsv_dt: v.rsv_dt
            }
        })
        if(props.sale_id){
            const msgTypeList = orgData?.map(v=>v.msg_tp) ?? []
            const deleteList = [];
            body = arrayInputField.input.filter(v=>{
                if(msgTypeList.includes(v.msg_tp) || !v.checked || !v.rsv_dt){
                    if(!v.checked && msgTypeList.includes(v.msg_tp)){
                        deleteList.push(v);
                    }
                    return false;
                }

                return true;
            })

            // console.table(deleteList)
            // console.table(body)
            // return;

            deleteMsgList(deleteList).then((cond)=>{
                if(cond){
                    if(!ObjectUtils.isEmptyArray(body)){
                        rsvMsgApi.insertReserveMsg({
                            sale_id: props.sale_id,
                            rsv_msg_list: body
                        }).then(({status,data})=>{
                            if(status === 200 && data){
                                modal.openModal(ModalType.SNACKBAR.Info, {
                                    msg: "수정되었습니다."
                                })
                            }
                        })
                    }else{
                        modal.openModal(ModalType.SNACKBAR.Info, {
                            msg: "수정되었습니다."
                        })
                    }
                }
                close();
            })


        }else{
            if(props.onSubmit){
                props.onSubmit(body);
            }
            close();
        }

    }

    const deleteMsgList = async (list)=>{
        let result = true;
        if(!ObjectUtils.isEmptyArray(list)){
            await rsvMsgApi.deleteReserveMsg({
                sale_id: props.sale_id,
                rsv_msg_list: list
            }).then(({status,data})=>{
                if(status !== 200 || !data){

                    result = false;
                }
            })
        }
        return result;
    }


    return (
        <LayerModal {...props} top={50} maxWidth={548}>
                {/*활성화시 active 추가 -->*/}
                <div className={Popup.popup_title}>연락 전송 등록</div>
                <div className={Popup.popup_text}>전송하고 싶은 문자를 선택해주세요.</div>

                <form className={Popup.transfer}>
                    <div className={Popup.popup_cont}>
                        <div className={cmc(Popup.ta_r)}>
                            {/*<div className={cmc(Popup.check_box)}>*/}
                            {/*    <input type="checkbox" id="check_"/>*/}
                            {/*    <label htmlFor="check_">고객 맞춤 추천</label>*/}
                            {/*</div>*/}
                        </div>

                        <ul className={Popup.popup_check_list}>
                            {
                                arrayInputField.length() > 0 && arrayInputField.input.map((v,i)=>{
                                    return <ReserveItem index={i} inputField={arrayInputField} onDateClick={()=>{
                                        openReserveDateModal(i)
                                    }}/>
                                })
                            }

                        </ul>
                    </div>

                    <div className={cm(Popup.popup_btn_box, `${!props.sale_id && Popup.half}`)}>
                        {
                            !props.sale_id && <button type="button" className={`btn_grey ${cmc(Popup.btn)}`}
                                    onClick={submit}>건너뛰기</button>
                        }
                        <button type="button" className={`btn_blue ${cmc(Popup.btn)}`} onClick={submit}>저장</button>
                    </div>
                </form>

                <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
        </LayerModal>
    )
}

function ReserveItem({index, inputField, onDateClick}){
    const toggleCheck = ()=>{
        inputField.put(index, 'checked', !inputField.input[index].checked ?? false)
    }

    const value = inputField.get(index, 'rsv_dt')

    const isChecked = inputField.input[index].checked;


    const isDisabled = ()=>{
        return `${!isChecked && Popup.disable}`
    }

    const getMessageStateBox = ()=>{
        const msgSendState = inputField.get(index, 'msg_st');
        switch (msgSendState){
            case 1:
                return (
                    <div className={cm(Popup.msg_st, Popup.reserved)}>예약됨</div>
                )
            case 2:
                return (
                    <div className={cm(Popup.msg_st, Popup.completed)}>전송 완료</div>
                )
        }
    }

    return (
        <li className={Popup.li}>
            <input type="checkbox" name={`rsv_check${index}`} className={Popup.check_inp}
                   checked={inputField.get(index, 'checked')}/>
            <label htmlFor={`rsv_check${index}`}
                   className={`${Popup.check_label} ${isDisabled()}`}
                   onClick={toggleCheck}>{LMD.rsv_msg_tp[inputField.get(index, 'msg_tp')]}</label>
            {
                getMessageStateBox()
            }
            <div className={Popup.transfer_box}>
                <button type="button" className={`${cmc(Popup.btn, Popup.btn_small)}`} disabled={!isChecked}>미리보기
                </button>
                <input type="text"
                       className={`inp ${cm(Popup.inp, `${!ObjectUtils.isEmpty(value) && Popup.entered} ${isDisabled()}`)} transfer_inp`}
                       value={value} placeholder='날짜 설정' readOnly
                       disabled={!isChecked}
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
        rsv_dt: ''
    },
    {
        checked: false,
        msg_tp: 1,
        rsv_tp: 1,
        rsv_dt: ''
    },
    {
        checked: false,
        msg_tp: 2,
        rsv_tp: 0,
        rsv_dt: ''
    },
    {
        checked: false,
        msg_tp: 3,
        rsv_tp: 0,
        rsv_dt: ''
    }
]
