import {LayerModal} from "../../../common/modal/LayerModal";
import Popup from "../../../../css/popup.module.css"
import {cm, cmc} from "../../../utils/cm";
import {useObjectArrayInputField} from "../../../hook/useObjectArrayInputField";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import {ObjectUtils} from "../../../utils/objectUtil";
import {useEffect, useState} from "react";
import useApi from "../../../hook/useApi";

export function MessageSendModal(props){
    const {msgApi, gmdApi} = useApi()
    const templateField = useObjectArrayInputField();
    // console.table(arrayInputField.input)
    const modal = useModal()

    const [errors, setErrors] = useState([])
    const [reservedMessages, setReservedMessages] = useState([])

    useEffect(() => {
        getMessageTemplate()
    }, []);

    const getMessageTemplate = async ()=>{
        const body = {
            shop_id: props.shop_id,
            sale_id: props.sale_id,
        }
        msgApi.getMessageTemplateList(body).then(({data})=>{
            console.table(data)
            templateField.putAll(data)
        })
    }

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Reserve_Message)
    }

    // 예약 일자 모달창
    const openReserveDateModal =(index)=>{
        modal.openModal(ModalType.LAYER.Reserve_Date, {
            subject: templateField.get(index, 'subject'),
            actv_dt: props.actv_dt,
            onSubmit: ({dday, rsv_tp, rsv_dt})=>{
                templateField.put(index, 'dday', dday)
                templateField.put(index, 'rsv_tp', rsv_tp)
                templateField.put(index, 'rsv_dt', rsv_dt)
                const copy = [...errors]
                copy[index] = false;
                setErrors(copy)
            }
        })
    }

    const submit = ()=>{
        // modal.openModal(ModalType.SNACKBAR.Alert, {
        //     msg: "준비 중인 기능입니다"
        // })
        // return;
        const errorList = [...errors]; // 에러
        let isError = false;
        let body = templateField.input.filter((v,i)=>{
            if(v.checked && ObjectUtils.isEmpty(v.rsv_dt)){
                errorList[i] = true;
                isError = true;
            }
            return v.checked && v.rsv_dt
        }).map(v=>{
            return {
                tpl_id: v.tpl_id,
                dday: v.dday,
                rsv_tp: v.rsv_tp,
                rsv_dt: v.rsv_dt
            }
        })

        if(isError){
            console.table(errorList)
            setErrors(errorList)
            return;
        }

        if(props.sale_id){
            if(!ObjectUtils.isEmptyArray(body)){
                msgApi.sendAlimtalk({
                    sale_id: props.sale_id,
                    rsv_msg_list: body
                }).then(({status,data})=>{
                    if(status === 200 && data){
                        modal.openModal(ModalType.SNACKBAR.Info, {
                            msg: "수정되었습니다."
                        })
                    }

                })
            }

        }else{
            if(props.onSubmit){
                props.onSubmit(body);
            }
            close();
        }
        close();
    }

    // const deleteMsgList = async (list)=>{
    //     let result = true;
    //     if(!ObjectUtils.isEmptyArray(list)){
    //         await rsvMsgApi.deleteReserveMsg({
    //             sale_id: props.sale_id,
    //             rsv_msg_list: list
    //         }).then(({status,data})=>{
    //             if(status !== 200 || !data){
    //
    //                 result = false;
    //             }
    //         })
    //     }
    //     return result;
    // }


    return (
        <LayerModal {...props} top={50} maxWidth={548}>
                {/*활성화시 active 추가 -->*/}
                <div className={Popup.popup_title}>예약 메세지 등록</div>
                <div className={Popup.popup_text}>전송할 메세지와 예약 날짜를 선택해주세요.</div>

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
                                templateField.length() > 0 && templateField.input.map((v,i)=>{
                                    if(ObjectUtils.isEmpty(v)){
                                        return null
                                    }
                                    return <ReserveItem index={i} error={errors[i]} inputField={templateField} onDateClick={()=>{
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

function ReserveItem({index, error, inputField, onDateClick}){
    const modal = useModal();

    const msgSendState = inputField.get(index, 'msg_st');

    const openMessagePreviewModal = ()=>{
        modal.openModal(ModalType.LAYER.Message_Preview, {
            content: inputField.get(index, "content")
        })
    }

    const toggleCheck = ()=>{
        if(msgSendState === 1){
            return;
        }
        inputField.put(index, 'checked', !inputField.input[index].checked ?? false)
    }

    const value = inputField.get(index, 'rsv_dt')

    const isChecked = inputField.input[index].checked;


    const isDisabled = ()=>{
        return `${!isChecked && Popup.disable}`
    }

    const getMessageStateBox = ()=>{
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
                   onClick={toggleCheck}>{inputField.get(index, "title")}</label>
            {
                getMessageStateBox()
            }
            <div className={Popup.transfer_box}>
                <button type="button" className={`${cmc(Popup.btn, Popup.btn_small)}`} disabled={!isChecked}
                        onClick={openMessagePreviewModal}>
                    미리보기
                </button>
                <input type="text"
                       className={`inp ${cm(Popup.inp, `${!ObjectUtils.isEmpty(value) && Popup.entered} ${isDisabled()}`, `${error && Popup.error}`)} transfer_inp`}
                       value={value} placeholder='날짜 설정' readOnly
                       disabled={!isChecked}
                       onClick={onDateClick}/>
                {/*value 있을 경우 entered 추가 -->*/}
            </div>
        </li>
    )
}

