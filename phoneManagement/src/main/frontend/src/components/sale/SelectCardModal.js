import {LayerModal} from "../modal/LayerModal";
import useModal from "../../hook/useModal";
import {ModalType} from "../modal/ModalType";
import ChoiceButtonBox from "../common/inputbox/ChoiceButtonBox";
import useValidation from "../../hook/useValidation";

function SelectCardModal(props){
    const modal = useModal();

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Select_Card)
    }

    return (
        <LayerModal width={props.width} height={props.height}>
            <div className='d-flex flex-column justify-content-center align-items-start ms-5 mt-3'>
                <div className='mt-3'>
                    <h4>카드명</h4>
                    <ChoiceButtonBox valid={props.valid} name='card_id' btn_class='secondary'
                                     items={['현대카드', '국민카드', '하나카드', '삼성카드']}/>
                </div>
                <div className='mt-3'>
                    <h4>카드 유형</h4>
                    <ChoiceButtonBox valid={props.valid} name='card_tp' btn_class='secondary'
                                     items={['DC', '할부']}/>
                </div>
                <div className='mt-3'>
                    <h4>진행 상황</h4>
                    <ChoiceButtonBox valid={props.valid} name='card_st' btn_class='secondary'
                                     items={['신청전', '신청완료', '등록완료']}/>
                </div>
                <div className='mt-4'>
                    <button className='btn btn-outline-primary' onClick={close}>취소</button>
                    <button className='btn btn-primary ms-2'>확인</button>
                </div>
            </div>
        </LayerModal>
    )
}

export default SelectCardModal;