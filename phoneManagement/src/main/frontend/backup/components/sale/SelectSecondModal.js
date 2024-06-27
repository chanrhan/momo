import useModal from "../../hook/useModal";
import {ModalType} from "../../../src/js/common/modal/ModalType";
import {LayerModal} from "../../../src/js/common/modal/LayerModal";
import SearchBox from "../../../src/js/common/inputbox/SearchBox";
import useApi from "../../hook/useApi";

function SelectSecondModal(props){
    const modal = useModal();
    const {gmdApi} = useApi();

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Select_Second)
    }

    const search = async (keyword)=>{
        // console.log(typeof gmdApi.getDevice);
        return await gmdApi.getDevice(keyword);
    }

    const select = result=>{
        props.valid.setInput(prev=>({
            ...prev,
            'sec_md': result['device_md']
        }));
        close();
    }


    return (
        <LayerModal width={props.width} height={props.height}>
            <div className='d-flex flex-column justify-content-center align-items-start ms-5 mt-3'>
                <div>
                    <SearchBox thead={['단말가명', '모델명']} tbody={['device_md','device_nm']} onSearch={search} onSelect={select}/>
                </div>
                <div className='mt-4'>
                    <button className='btn btn-outline-primary' onClick={close}>취소</button>
                    <button className='btn btn-primary ms-2'>확인</button>
                </div>
            </div>
        </LayerModal>
    )
}

export default SelectSecondModal;