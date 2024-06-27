import {LayerModal} from "../../../src/js/common/modal/LayerModal";
import useModal from "../../hook/useModal";
import {ModalType} from "../../../src/js/common/modal/ModalType";
import SearchBox from "../../../src/js/common/inputbox/SearchBox";
import useApi from "../../hook/useApi";

function SelectExsvcModel(props){
    const modal = useModal();
    const {gmdApi} = useApi();

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Select_Exsvc)
    }

    const search = async (keyword)=>{
        return await gmdApi.getExtraService(keyword);
    }

    const select = result=>{
        props.valid.setInput(prev=>({
            ...prev,
            'exsvc_id': result['exsvc_id']
        }))
        close();
    }

    return (
        <LayerModal width={props.width} height={props.height}>
            <div className='d-flex flex-column justify-content-center align-items-start ms-5 mt-3'>
                <div>
                    <SearchBox thead={['부가서비스명']} tbody={['exsvc_nm']} onSearch={search} onSelect={select}/>
                </div>
                <div className='mt-4'>
                    <button className='btn btn-outline-primary' onClick={close}>취소</button>
                    <button className='btn btn-primary ms-2'>확인</button>
                </div>
            </div>
        </LayerModal>
    )
}

export default SelectExsvcModel;