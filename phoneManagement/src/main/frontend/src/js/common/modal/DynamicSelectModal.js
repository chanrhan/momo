import {MenuModal} from "./MenuModal";
import {cm} from "../../utils/cm";
import Popup from "../../../css/popup.module.css";
import {useEffect, useRef, useState} from "react";
import useUserInfo from "../../hook/useUserInfo";
import useApi from "../../hook/useApi";
import {useObjectArrayInputField} from "../../hook/useObjectArrayInputField";
import {MouseEventUtils} from "../../utils/MouseEventUtils";
import {ModalType} from "./ModalType";
import useModal from "../../hook/useModal";
import {ObjectUtils} from "../../utils/objectUtil";
import {EditableAddButton} from "../module/EditableAddButton";

export const DYNAMIC_TYPE = {
    device: 0,
    sec_device: 1,
    ct_plan: 2,
    internet_plan: 3,
    tv_plan: 4,
    exsvc: 5,
    sup_div: 6,
    add_div: 7,
    comb_tp: 8
}

export function DynamicSelectModal(props){
    const modal = useModal();
    const {gmdApi} = useApi();

    const [keyword, setKeyword] = useState('')
    const [orgCount, setOrgCount] = useState(0)

    const [boxWidth, setBoxWidth] = useState(150)
    const [boxHeight, setBoxHeight] = useState(100)

    const scrollRef = useRef()

    const inputField = useObjectArrayInputField({
        name: ''
    }, null)

    const [selected, setSelected] = useState(null) // 옵션 버튼 클릭 중인 인덱스

    const [inpFocus, setInpFocus] = useState(null) // 수정 모드, 입력 필드 포커싱 인덱스
    const prevFocus = useRef(null)
    const focusRef = useRef([])

    useEffect(() => {
        setKeyword('')
    }, []);

    useEffect(() => {
        getItems();
    }, [keyword]);


    useEffect(() => {
        let maxLength = 12;
        if(inputField.input){
            inputField.input.forEach((v,i)=>{
                if(v.name.length > maxLength){
                    maxLength = v.name.length
                }
            })
            setBoxHeight(inputField.length() * 36 + 44 + 16);
        }
        if(maxLength !== 0){
            setBoxWidth(maxLength * 18)
        }
    }, [inputField]);

    useEffect(() => {
        // console.table(scrollRef.current.style)
        const target = scrollRef.current;
        if(props.scrollable === false){
            target.style.pointerEvents = 'none'
        }else if(props.scrollable === true){
            target.style.pointerEvents = 'auto'
        }
    }, [props.scrollable]);

    useEffect(() => {
        if(prevFocus.current !== null && inpFocus === null){
            onUpdate(prevFocus.current)
        }
        if(inpFocus){
            focusRef.current[inpFocus].focus();
        }
        return ()=>{
            prevFocus.current = inpFocus
        }
    }, [inpFocus]);

    const close = ()=>{
        modal.closeModal(ModalType.MENU.Dynamic_Select)
    }

    const getItems = async ()=>{
        // console.log(props.type)
        // console.log(props.provider)
        await gmdApi.getData(props.type, keyword, props.provider).then(({status,data})=>{
            if(status === 200 && data){
                if(data.list){
                    // console.table(data)
                    const parsed = JSON.parse(data.list)
                    // console.table(parsed)
                    inputField.setInput(parsed)
                    setOrgCount(parsed.length)
                }else{
                    inputField.putAll([{
                        name: ''
                    }])
                    setOrgCount(0)
                }

            }
        })
    }

    const selectItem = (index, id)=>{
        if(props.onSubmit){
            props.onSubmit({
                id: id,
                name: inputField.get(index, 'name')
            })
        }
        close()
    }

    const onUpdate = (i)=>{
        if(i < orgCount){
            updateItem(i)
        }else{
            insertAll();
        }
    }

    const clearEmptyObject = ()=>{
        const copy = inputField.input.filter(v=>v.name)
        inputField.setInput(copy)
    }

    const addItem = async (v)=>{
        if(ObjectUtils.isEmpty(v)){
            return;
        }

        await gmdApi.insert(props.type, {
            provider: props.provider,
            name: v
        }).then(({status, data})=>{
            if(status === 200 && data){
                getItems();
                setTimeout(()=>{
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }, 50)
            }
        })
    }

    const insertAll = async ()=>{
        const body = inputField.input.filter((v,i)=>v.name && i>=orgCount).map(v=>{
            return {
                provider: props.provider,
                name: v.name
            }
        })
        // console.table(body)
        clearEmptyObject()
        if(ObjectUtils.isEmptyArray(body)){
            return;
        }
        await gmdApi.insertAll(props.type, body).then(({status,data})=>{
            if(status === 200 && data){
                getItems();
                setInpFocus(null)
                setSelected(null)
            }
        })
    }

    const deleteItem = async (id)=>{
        await gmdApi.deleteAll(props.type, [id]).then(({status,data})=>{
            if(status === 200 && data){
                getItems();
                setInpFocus(null)
                setSelected(null)
                // e.blur();
            }
        })
    }

    const updateItem = async (i)=>{
        const body = {
            ...inputField.input[i],
            provider: props.provider
        }
        console.table(body)
        // return;
        await gmdApi.updateItem(props.type, body).then(({status,data})=>{
            if(status === 200 && data){
                getItems();
                setInpFocus(null)
                setSelected(null)
            }
        })
    }

    const openMoreModal = (e, i, id)=>{
        const {top, left} = MouseEventUtils.getAbsolutePos(e);

        setSelected(i)

        modal.openModal(ModalType.MENU.More_Option, {
            top: top-10,
            left: left - 150,
            onSubmit: (action)=>{
                if(action === 0){ // 수정
                    setInpFocus(i)
                }else if(action === 1){ // 삭제
                    deleteItem(id)
                }
                setSelected(null)
            }
        })
    }

    return (
        <MenuModal modalRef={props.modalRef} top={props.top} left={props.left}>
            <div className={cm(Popup.select_box2, Popup.active)}
                  onClick={e=>{
                setInpFocus(null)
            }}>
                <input type="text" className={cm(Popup.select_inp)} style={{
                    width: `${props.width ?? 160}px`,
                    lineHeight: `${props.height ?? 40}px`
                }}
                       value={keyword}
                       onChange={e => {
                           setKeyword(e.target.value)
                       }}
                       placeholder="옵션 검색"/>
                <div className={cm(Popup.select_layer, Popup.active)} style={{
                    width: `${boxWidth}px`,
                }} >
                    {/*<button type='button' className={Popup.layer_title} onClick={addItem}>옵션 추가하기</button>*/}
                    <ul className="layer_list" ref={scrollRef} style={{
                        overflowY: "scroll",
                        height: `${boxHeight}px`,
                        maxHeight: '400px'
                    }}>
                        {
                            inputField.input && inputField.input.map((v, i) => {
                                return <li key={i} className={cm(Popup.layer_item, `${selected === i && Popup.active} ${inpFocus === i && Popup.focus_input}`)}>
                                    <span className={Popup.layer_type}></span>
                                    <input type="text" className={Popup.layer_btn}
                                           value={v.name}
                                           maxLength={20}
                                           placeholder='입력해주세요'
                                           ref={v=>{
                                               focusRef.current[i] = v
                                           }}
                                           // autoFocus={i === inputFocus}
                                           onClick={e => {
                                               console.log(`click ${i} ${inpFocus}`)
                                               if (i === inpFocus) {
                                                   e.stopPropagation()
                                               } else if(inpFocus !== null){
                                                   setInpFocus(null)

                                               }else {
                                                   e.stopPropagation()
                                                   selectItem(i, v.id)
                                               }
                                           }}
                                           onKeyDown={e => {
                                               if (inpFocus === i && e.key === 'Enter') {
                                                   setInpFocus(null)
                                               }
                                           }}
                                           onChange={e => {
                                               inputField.put(i, 'name', e.target.value)
                                           }} readOnly={i !== inpFocus}/>
                                    <button type="button" className={Popup.layer_more_btn} onClick={(e) => {
                                        openMoreModal(e, i, v.id)
                                    }}>더보기
                                    </button>
                                </li>
                            })
                        }
                    </ul>
                    <div className={Popup.dynamic_add_box}>
                        <EditableAddButton inpClassName={Popup.add_inp}
                                           btnClassName={Popup.add_btn}
                                           value='옵션 추가하기' onUpdate={addItem}/>
                    </div>
                </div>
            </div>
        </MenuModal>
    )
}