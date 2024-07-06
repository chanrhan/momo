import ChoiceButtonBox from "../../../common/inputbox/ChoiceButtonBox";
import {LayerModal} from "../../../common/modal/LayerModal";
import InputBox from "../../../common/inputbox/InputBox";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";

function SelectCombMainModal(props){
    const modal = useModal();

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Select_Comb)
    }

    return (
        <LayerModal width={props.width} height={props.height}>
            <div className='d-flex flex-column justify-content-center align-items-start ms-5 mt-3'>
                <div className='mt-3'>
                    <InputBox name='comb_id' valid={props.valid} subject='결합명'/>
                </div>
                <div className='mt-3'>
                    <InputBox type='file' name='comb_docs' valid={props.valid} subject='필요 서류'/>
                </div>
                <div className='mt-3'>
                    <h4>오더 유형</h4>
                    <ChoiceButtonBox valid={props.valid} name='comb_order_tp' btn_class='secondary'
                                     items={['신규 결합', '회선 추가', '결합 변경']}/>
                </div>
                <div className='mt-3'>
                    <h4>진행 상황</h4>
                    <ChoiceButtonBox valid={props.valid} name='comb_st' btn_class='secondary'
                                     items={['변경전', '서류요청완료', '변경완료']}/>
                </div>
                <div className='mt-4'>
                    <button className='btn btn-outline-primary' onClick={close}>취소</button>
                    <button className='btn btn-primary ms-2'>확인</button>
                </div>
            </div>
        </LayerModal>
    )
}

export default SelectCombMainModal;