import {LayerModal} from "../../common/modal/LayerModal";
import Popup from "../../../css/popup.module.css"
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";

export function SelectSheetModal(props){
    const modal = useModal();

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Select_Sheet)
    }

    const submit = (index)=>{
        if(props.onSubmit){
            props.onSubmit(index)
        }
        close();
    }

    return (
        <LayerModal {...props} top={150} maxWidth={450}>
            <div className={Popup.select_sheet_body}>
                <div className={Popup.header_group}>
                    <div className={Popup.title}>
                        시트 선택
                    </div>
                    <div className={Popup.description}>
                        업로드할 시트를 선택해 주세요
                    </div>
                </div>
                <div className={Popup.sheet_cont}>
                    <ul className={Popup.sheet_list}>
                        {
                            props.sheets && props.sheets.map((v,i)=>{
                                return (
                                    <li className={Popup.sheet_item} onClick={()=>{
                                        submit(i)
                                    }}>
                                        {v}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={Popup.btn_box}>
                    <button type='button' className={Popup.btn_cancel} onClick={close}>취소</button>
                </div>
            </div>
        </LayerModal>
    )
}