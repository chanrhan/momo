import {LayerModal} from "../../../common/modal/LayerModal";
import Popup from "../../../../css/popup.module.css"
import useApi from "../../../hook/useApi";
import {useEffect, useState} from "react";


export function MessagePreviewModal(props){
    const {msgApi} = useApi()
    const [content, setContent] = useState("")

    useEffect(() => {
        getAlimtalkTemplateContent()
    }, []);

    const getAlimtalkTemplateContent = ()=>{
        if(!props.sale_id || !props.tpl_code){
            return
        }
        msgApi.getAlimtalkTemplateContent(props.sale_id, props.tpl_code).then(({data})=>{
            setContent(data)
        })
    }

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
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </LayerModal>
    )
}