import {LayerModal} from "../LayerModal";
import useModal from "../../../hook/useModal";
import {ModalType} from "../ModalType";
import Popup from "../../../../css/popup.module.css";
import {useState} from "react";

export function ImagePreviewModal(props){
    const modal = useModal()

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Image_Preview)
    }

    return (
        <LayerModal>
            <div className={Popup.popup} style={
                {
                    top: '60px',
                    maxWidth: `${props.width ?? 500}px`,
                    maxHeight: `${props.height ?? 500}px`,
                }
            }>
                <div className={Popup.popup_title}>사진 미리보기</div>
                {
                    props.src && <img src={props.src} alt=""/>
                }
                <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
            </div>
        </LayerModal>
    )
}