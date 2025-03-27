import {LayerModal} from "../../common/modal/LayerModal";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import Popup from "../../../css/popup.module.css"
import useApi from "../../hook/useApi";
import {useEffect, useState} from "react";
import {ObjectUtils} from "../../utils/objectUtil";
import {cm} from "../../utils/cm";

const INIT_TITLE_NAME = "새 문자 템플릿"

export function MessageTemplateModal(props){
    const {gmdApi} = useApi()
    const modal = useModal()

    const [templates, setTemplates] = useState(null)
    const [selected, setSelected] = useState(-1)
    const [editMode, setEditMode] = useState(false)

    const [currTitle, setCurrTitle] = useState("")
    const [currContent, setCurrContent] = useState("")

    const [prevIndex, setPrevIndex] = useState(null)

    useEffect(() => {
        getTemplates()
    }, []);

    useEffect(() => {
        if(!editMode && templates){

            const temp = templates[selected]
            if(temp){
                setCurrTitle(temp.title)
                setCurrContent(temp.content)
            }
        }
    }, [selected, templates]);


    const getTemplates = async ()=>{
        await gmdApi.getMessageTemplate().then(({status,data})=>{
            if(status === 200 && !ObjectUtils.isEmpty(data)){
                // console.table(data)
                setTemplates(data);
                if(selected >= data.length){
                    setSelected(data.length-1);
                }
            }
        })
    }

    const addTemplate = ()=>{
        if(editMode){
            return;
        }
        if(selected === -1 || !checkModification(selected)){
            setCurrTitle(INIT_TITLE_NAME)
            setCurrContent("")
            setEditMode(true)
            setSelected(-1)
        }
    }

    const selectTemplate = (i)=>{
        if(i === selected){
            return;
        }
        if((!editMode && selected === -1) || !checkModification(i)){
            changeTemplate(i)
        }
    }

    const checkModification = (i)=>{
        if(editMode || isChanged()){
            const added = editMode;
            console.log(i)
            modal.openModal(ModalType.MENU.Confirm, {
                msg: "변경사항을 저장하지 않았습니다. 저장하시겠습니까?",
                top: 250,
                left: 700,
                btn_color: "#4781ff",
                btn_submit_name: "저장",
                // btn_cancel_name: "저장 안함",
                onSubmit: ()=>{
                    if(isTitleOrContentEmpty()){
                        return;
                    }
                    updateTemplate().then(()=>{
                        if(!added){
                            console.log('change: '+ i)
                            setSelected(i)
                        }
                    })
                    // changeTemplate(i + (selected === -1 ? 1 : 0))
                }
            })
            return true;
        }
        return false;
    }

    const changeTemplate = (i)=>{
        setSelected(i)
        setEditMode(false)
        // else if(templates){
        //     setCurrTitle(templates[i].title)
        //     setCurrContent(templates[i].content)
        // }
    }

    const handleInputTitle = (e: InputEvent)=>{
        setCurrTitle(e.target.value)
    }

    const handleInputContent = (e: InputEvent)=>{
        setCurrContent(e.target.value)
    }

    const isChanged = ()=>{
        if(!templates){
            return false;
        }
        const temp = templates[selected];
        return (currTitle !== temp.title) || (currContent !== temp.content)
    }

    const isTitleOrContentEmpty = ()=>{
        if(ObjectUtils.isEmpty(currTitle) || ObjectUtils.isEmpty(currContent)){
            modal.openModal(ModalType.SNACKBAR.Warn, {
                msg: "제목과 내용을 입력해주세요."
            })
            return true;
        }
        return false;
    }

    const insertTemplate =async ()=>{
        await gmdApi.insertMessageTemplate({
            title: currTitle,
            content: currContent
        }).then(({status,data})=>{
            if(status === 200 && data){
                modal.openModal(ModalType.SNACKBAR.Info, {
                    msg: "추가되었습니다."
                })
                setSelected(0)
                setEditMode(false)
                getTemplates()
            }
        })
    }

    const updateTemplate = async ()=>{
        // console.table({
        //     ...templates[selected],
        //     title: currTitle,
        //     content: currContent
        // })
        await gmdApi.updateMessageTemplate({
            id: templates[selected].msg_id,
            title: currTitle,
            content: currContent
        }).then(({status,data})=>{
            if(status === 200 && data){
                modal.openModal(ModalType.SNACKBAR.Info, {
                    msg: "수정되었습니다."
                })
                getTemplates()
            }
        })
    }


    const submit = async ()=>{
        if(isTitleOrContentEmpty()){
            return;
        }

        if(editMode){
            insertTemplate()
        }else{
            updateTemplate()
        }
    }

    const deleteTemplate = ()=>{
        modal.openModal(ModalType.MENU.Confirm, {
            msg: "정말로 삭제하시겠습니까?",
            top: 250,
            left: 700,
            btn_submit_name: "삭제",
            btn_color: '#ff4949',
            onSubmit: ()=>{
                gmdApi.deleteMessageTemplate(templates[selected].msg_id).then(({status,data})=>{
                    if(status === 200 && data){
                        modal.openModal(ModalType.SNACKBAR.Info, {
                            msg: "삭제되었습니다."
                        })
                        getTemplates()
                    }
                })
            }
        })
    }

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Admin_Message_Template)
    }

    return (
        <LayerModal {...props} maxWidth={1045} top={45}>
            <div className={Popup.main_cont}>
                <div className={Popup.header_group}>

                </div>
                <div className={Popup.template_box}>
                    <div className={Popup.title_cont}>
                        <div className={Popup.btn_box}>
                            <button className={Popup.btn_add} onClick={addTemplate}>문자 템플릿 추가</button>
                        </div>

                        <ul className={Popup.title_list}>
                            {
                                editMode && (
                                    <li key={0} className={cm(Popup.title_box, Popup.selected)} onClick={() => {
                                        // selectTemplate(-1)
                                    }}>
                                        <p className={Popup.title}>
                                            {currTitle}
                                        </p>
                                    </li>
                                )
                            }
                            {
                                templates && templates.map((v, i) => {
                                    return (
                                        <li key={i + 1}
                                            className={cm(Popup.title_box, `${i === selected && Popup.selected}`)}
                                            onClick={() => {
                                                selectTemplate(i)
                                            }}>
                                            <p className={Popup.title}>
                                                {selected === i ? currTitle : v.title}
                                            </p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className={Popup.content_box}>
                        <div className={Popup.title}>
                            <input type="text" className={Popup.title_inp}
                                   placeholder="문자 템플릿 제목을 입력해주세요."
                                   value={currTitle}
                                   onChange={handleInputTitle} disabled={!editMode && (templates === null || selected === -1)}/>
                        </div>
                        <div className={Popup.option_header}>

                        </div>
                        <div className={Popup.content_area}>
                            <div className={Popup.description}>
                                문자 템플릿 내용
                            </div>
                            <textarea className={Popup.content_text}
                                      re
                                      value={currContent}
                                      onChange={handleInputContent} disabled={!editMode && (templates === null || selected === -1)}>

                            </textarea>
                        </div>
                        <div className={Popup.option_box}>
                            {
                                selected >= 0 &&
                                <button type='button' className={Popup.btn} onClick={deleteTemplate}>삭제</button>
                            }
                            <button type='button' className={Popup.btn}
                                    onClick={submit}>{selected === -1 ? "완료" : "수정"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </LayerModal>
    )
}