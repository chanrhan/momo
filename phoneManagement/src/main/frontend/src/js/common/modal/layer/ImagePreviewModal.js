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
        <LayerModal top={props.top} maxWidth={1000} maxHeight={700}>
            {/*<div className={Popup.popup} style={*/}
            {/*    {*/}
            {/*        top: `${60+props.top}px`,*/}
            {/*        maxWidth: `${props.width ?? 500}px`,*/}
            {/*        maxHeight: `${props.height ?? 500}px`,*/}
            {/*    }*/}
            {/*}>*/}
            {/*</div>*/}
            <div className={Popup.popup_title}>사진 미리보기</div>
            <div className={Popup.preview_img_box} style={{
                width: `${props.width * 1}px`,
                height: `${props.height}px`
            }}>
                {
                    props.src && <img className={Popup.img} src={props.src} alt="" />
                }
            </div>
            <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
        </LayerModal>
    )
}