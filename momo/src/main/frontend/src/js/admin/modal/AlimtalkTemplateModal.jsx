import {LayerModal} from "../../common/modal/LayerModal";
import Admin from "../../../css/admin.module.css"
import {EditableInput} from "../../common/inputbox/EditableInput";
import {useEffect, useState} from "react";
import useApi from "../../hook/useApi";
import {DebouncedInput} from "../../common/inputbox/DebouncedInput";
import {cm} from "../../utils/cm";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import {ObjectUtils} from "../../utils/objectUtil";

const Init_NewData = {
    grp_code :0,
    title : "새 템플릿명",
    tpl_code : 0,
    description: ""
}

export function AlimtalkTemplateModal(props){
    const modal = useModal()
    const [keyword, setKeyword] = useState("")
    const [edit, setEdit] = useState(false)
    const [newData, setNewData] = useState(Init_NewData)
    const [items, setItems] = useState([])
    const {msgApi} = useApi()

    useEffect(() => {
        getAlimtalkTemplate()
    }, []);

    const getAlimtalkTemplate = ()=>{
        msgApi.getMessageTemplateAll(keyword).then(({data})=>{
            setItems(data)
        })
    }


    const addTemplate = ()=>{
        if(!newData){
            return;
        }
        msgApi.addAlimtalkTemplate(newData).then(({data})=>{
            if(data){
                modal.openModal(ModalType.SNACKBAR.Info, {
                    msg: "템플릿이 추가되었습니다."
                })
                getAlimtalkTemplate()
            }
        })
        setEdit(false)
        setNewData(Init_NewData)
    }

    const updateTemplate = (id, key, value)=>{
        const body = {
            tpl_id: id,
            [key] : value
        }
        msgApi.updateAlimtalkTemplate(body).then(({data})=>{
            if(data){
                getAlimtalkTemplate()
            }
        })
    }

    const handleChange = (key, value)=>{
        setNewData(prev=>{
            const copy = {...prev}
            copy[key] = value
            return copy;
        })
    }
    //
    // // 실제 등록된 템플릿 내용을 불러와서 매핑시키는 함수
    // const reloadTemplate = ()=>{
    //
    // }

    return (
        <LayerModal {...props} maxWidth={700} height={600} top={45}>
            <div className={Admin.alimtalk_tpl}>
                <div className={Admin.header_cont}>
                    <div className={Admin.title}>알림톡 템플릿 관리</div>
                    <span className={Admin.description}>모모에서 사용될 템플릿명과 알리고에 등록한 템플릿 코드를 연결하세요</span>
                </div>
                <div className={Admin.option_header_group}>
                    <div className={Admin.left}>
                        {/*<button className={Admin.btn_reload} onClick={reloadTemplate}>*/}
                        {/*</button>*/}
                        {
                            edit ? <>
                                <button className={cm(Admin.btn_add, Admin.submit)} onClick={addTemplate}>완료
                                </button>
                                <button className={cm(Admin.btn_add, Admin.cancel)} onClick={() => {
                                    setEdit(false)
                                    setNewData(Init_NewData)
                                }}>취소
                                </button>
                            </> : <button className={Admin.btn_add} onClick={() => {
                                setEdit(true)
                            }}>템플릿 추가</button>
                        }

                    </div>
                    <div className={Admin.right}>
                        <DebouncedInput type="text" className={Admin.inp_search} value={keyword} onChange={e => {
                            setKeyword(e.target.value)
                        }} onDebounced={() => {
                            getAlimtalkTemplate()
                        }} delay={450}/>
                        <span className={Admin.count_text}>총 <span>{items ? items.length : 0}</span>개</span>
                    </div>
                </div>
                <div className={Admin.list_header}>
                    <span className={Admin.grp_code}>그룹코드</span>
                    <span className={Admin.name}>템플릿명</span>
                    <span className={Admin.tpl_code}>템플릿코드</span>
                    <span className={Admin.description}>설명</span>
                    <span className={Admin.status}>상태</span>
                </div>
                <div className={Admin.body_cont}>
                    {
                        edit && <div className={cm(Admin.list_item, Admin.new_data)}>
                            <EditableInput value={newData.grp_code} boxClass={Admin.grp_code} onSubmit={v=>handleChange("grp_code",v)}/>
                            <EditableInput value={newData.title} boxClass={Admin.name} onSubmit={v=>handleChange("title",v)}/>
                            <EditableInput value={newData.tpl_code} boxClass={Admin.tpl_code} onSubmit={v=>handleChange("tpl_code",v)}/>
                            <EditableInput value={newData.description} boxClass={Admin.description} onSubmit={v=>handleChange("description",v)}/>
                        </div>
                    }
                    {
                        items && items.map((v, i) => {
                            return (
                                <div key={i} className={Admin.list_item}>
                                    <EditableInput value={v.grp_code} boxClass={Admin.grp_code} onSubmit={val=>{
                                        updateTemplate(v.tpl_id, "grp_code", val);
                                    }}/>
                                    <EditableInput value={v.title} boxClass={Admin.name} onSubmit={val=>{
                                        updateTemplate(v.tpl_id, "title", val);
                                    }}/>
                                    <EditableInput value={v.tpl_code} boxClass={Admin.tpl_code} onSubmit={val=>{
                                        updateTemplate(v.tpl_id, "tpl_code", val);
                                    }}/>
                                    <EditableInput value={v.description} boxClass={Admin.description} onSubmit={val=>{
                                        updateTemplate(v.tpl_id, "description", val);
                                    }}/>
                                    <span className={Admin.status_box}>
                                        <span className={cm(Admin.status_icon, `${ObjectUtils.isEmpty(v.content) ? Admin.red : Admin.green}`)}></span>
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </LayerModal>
    )
}