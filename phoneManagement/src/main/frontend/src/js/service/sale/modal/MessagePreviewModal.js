import {LayerModal} from "../../../common/modal/LayerModal";
import Popup from "../../../../css/popup.module.css"
import useApi from "../../../hook/useApi";
import {useState} from "react";


export function MessagePreviewModal(props){

    return (
        <LayerModal {...props} top={120} maxWidth={500}>
            <div className={Popup.message_preview_cont}>
                <div className={Popup.sender_box}>
                    <span className={Popup.sender_icon}>

                    </span>
                    <span className={Popup.sender_name}>
                        모모(Momo)
                    </span>

                    <div className={Popup.chat_box}>
                        <span className={Popup.chat_box_tail}>

                    </span>
                        <div className={Popup.chat_message}>
                            {props.content}
                        </div>
                    </div>
                </div>
            </div>
        </LayerModal>
    )
}