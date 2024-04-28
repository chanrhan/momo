import useModal from "../../hook/useModal";
import {ModalType} from "../modal/ModalType";
import {LayerModal} from "../modal/LayerModal";
import SearchBox from "../common/inputbox/SearchBox";

function SelectGreenPhoneModal(props){
    const modal = useModal();

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Select_GreenPhone)
    }

    return (
        <LayerModal width={props.width} height={props.height}>
            <div className='d-flex flex-column justify-content-center align-items-start ms-5 mt-3'>
                <div>
                    <SearchBox thead={['단말가명','모델명']}/>
                </div>
                <div className='mt-4'>
                    <button className='btn btn-outline-primary' onClick={close}>취소</button>
                    <button className='btn btn-primary ms-2'>확인</button>
                </div>
            </div>
        </LayerModal>
    )
}

export default SelectGreenPhoneModal;