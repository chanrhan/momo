import {MenuModal} from "../modal/MenuModal";

import Popup from "../../../css/popup.module.css"
import User from "../../../css/user.module.css"
import {cm, cmc} from "../../utils/cm";
import {useEffect, useRef, useState} from "react";
import useModal from "../../hook/useModal";
import {ModalType} from "../modal/ModalType";
import useApi from "../../hook/useApi";
import {useObjectArrayInputField} from "../../hook/useObjectArrayInputField";
import {ObjectUtils} from "../../utils/objectUtil";
import useUserInfo from "../../hook/useUserInfo";

export const DYNAMIC_TYPE = {
    sup_div: 0,
    add_div: 1,
    comb_tp: 2,
    exsvc: 3,
    internet: 4,
    tv: 5
}


export function DynamicSelectLayer({initValue, provider, type, onClick}){
    const [active, setActive] = useState(false);
    const componentRef = useRef(null)
    const onclickRef = useRef()
    const userInfo = useUserInfo();

    const [buttonName, setButtonName] = useState('선택없음')

    const {gmdApi} = useApi();

    const [keyword, setKeyword] = useState('')

    const [orgCount, setOrgCount] = useState(0)

    // const [items, setItems] = useState(null)
    const [boxWidth, setBoxWidth] = useState(150)
    const [boxHeight, setBoxHeight] = useState(250)

    const inputField = useObjectArrayInputField({
        name: ''
    }, null)


    useEffect(() => {
        if(initValue){
            setButtonName(initValue)
        }
    }, [initValue]);


    useEffect(() => {
        if(active){
            getItems();
        }
    }, [keyword, active]);


    useEffect(() => {
        setKeyword('')
    }, [active]);


    useEffect(() => {
        let maxLength = 12;
        if(inputField.input){
            inputField.input.forEach((v,i)=>{
                if(v.name.length > maxLength){
                    maxLength = v.name.length
                }
            })
        }
        if(maxLength !== 0){
            setBoxWidth(maxLength * 18)
        }
    }, [inputField]);

    const getItems = async ()=>{
        // console.log(type)
        let res = null;
        switch (type){
            case 0:
                res = await gmdApi.getSupportDiv(keyword);
                break;
            case 1:
                res = await gmdApi.getAddDiv(keyword);
                break;
            case 2:
                res = await gmdApi.getCombTp(keyword);
                break;
            case 3:
                res = await gmdApi.getExtraService(keyword, provider)
                break;
            case 4:
                res = await gmdApi.getInternetPlan(keyword, provider)
                break;
            case 5:
               res = await gmdApi.getTvPlan(keyword, provider)
                break;
        }

        if(res !== null){
            const {status,data} = res;
            if(status === 200 && data){
                // console.table(data)
                inputField.setInput(data)
                setOrgCount(data.length)
                // setItems(data);
            }
        }
    }


    useEffect(() => {
        if(active){
            attachOnClick();
        }else{
            detachOnClick()
        }
    }, [active]);

    const attachOnClick = ()=>{
        if(window.onclick){
            onclickRef.current = window.onclick;
        }
        const timer = setTimeout(()=>{
            window.onclick = e=>{
                // e.preventDefault()
                if(componentRef.current && !componentRef.current.contains(e.target)){
                    setActive(false)
                    // detachOnClick();
                }
            }
            clearTimeout(timer);
        }, 10)
    }

    const detachOnClick = ()=>{
        if(window.onclick){
            const timer = setTimeout(()=>{
                window.onclick = onclickRef.current;
                onclickRef.current = null;
                clearTimeout(timer)
            }, 10)
        }
    }

    const selectItem = (index, id)=>{
        if(onClick){
            onClick({
                id: id,
                name: inputField.get(id-1, 'name')
            })
        }
        setButtonName(inputField.get(id-1, 'name'))
        setActive(false);
    }

    const onUpdate = (e)=>{
        // if(inputField.isEmpty(i, 'name')) {
        //     inputField.removeItem(i)
        //     return;
        // }
        add(e);
    }

    const clearEmptyObject = ()=>{
        const copy = inputField.input.filter(v=>v.name)
        inputField.setInput(copy)
    }

    const add = async (e: Event)=>{
        const body = inputField.input.filter((v,i)=>v.name && i>=orgCount).map(v=>{
            return {
                provider: userInfo.provider,
                name: v.name
            }
        })
        // console.table(body)
        clearEmptyObject()
        if(ObjectUtils.isEmptyArray(body)){
            return;
        }
        let res = null;
        switch (type){
            case 0:
                res = await gmdApi.insertSupportDivAll(body);
                break;
            case 1:
                res = await gmdApi.insertAddDivAll(body);
                break;
            case 2:
                res = await gmdApi.insertCombTpAll(body);
                break;
            case 3:
                res = await gmdApi.insertExsvcAll(body)
                break;
            case 4:
                res = await gmdApi.insertInternetPlanAll(body)
                break;
            case 5:
                res = await gmdApi.insertTvPlanAll(body)
                break;
        }

        if(res !== null){
            const {status,data} = res;
            if(status === 200 && data){
                console.log(data)
                getItems();
                // e.blur();
            }
        }
    }


    return (
        <>
            <button type="button" className={Popup.dynamic_btn}
                    onClick={() => {
                        setActive(!active)
                    }}>{buttonName}
            </button>
            <div className={cm(Popup.select_box2, `${active && Popup.active}`)}
                 style={{
                     width: `${boxWidth}px`,
                     // height: `${boxHeight}px`,
                     // overflowY: 'scroll'
                 }}
                 ref={componentRef} >
                <input type="text" className={cm(Popup.select_inp)}
                       value={keyword}
                       onChange={e => {
                           setKeyword(e.target.value)
                       }}
                       placeholder="옵션 검색"/>
                <div className={cm(Popup.select_layer, Popup.active)}>
                    <button type='button' className={Popup.layer_title} onClick={inputField.addItem}>옵션 추가하기</button>
                    <ul className="layer_list" style={{
                        overflowY: "scroll",
                        height: `${boxHeight}px`
                    }}>
                        {
                            inputField.input && inputField.input.map((v, i) => {
                                return <li key={i} className={cm(Popup.layer_item)}>
                                    <span className={Popup.layer_type}></span>
                                    <input type="text" className={Popup.layer_btn}
                                           value={v.name}
                                           placeholder='입력해주세요'
                                           autoFocus={i >= orgCount && i === inputField.length()-1}
                                           onClick={e=>{
                                               if(i >= orgCount) {
                                                   e.stopPropagation()
                                               }else {
                                                   selectItem(i, v.id)
                                               }
                                           }}
                                           // onBlur={onUpdate}
                                           onKeyDown={e=>{
                                               if(e.keyCode === 13) {
                                                   onUpdate(e)
                                               }
                                           }}
                                           onChange={e=>{
                                                inputField.put(i, 'name', e.target.value)
                                           }} readOnly={i < orgCount}/>
                                    {/*<button type="button" className={Popup.layer_btn} onClick={() => {*/}
                                    {/*    selectItem(i, v.id);*/}
                                    {/*}}>{v.name}</button>*/}
                                    <MoreItem/>
                                </li>
                                // <LayerItem key={i} content={v.name} onClick={() => {
                                //     selectItem(i, v.id);
                                // }}/>
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

function LayerItem({content, active, onClick}) {
    return (
        <li className={cm(Popup.layer_item, `${active && Popup.active}`)}>
            <span className={Popup.layer_type}></span>
            <button type="button" className={Popup.layer_btn} onClick={onClick}>{content}</button>
            <MoreItem/>
        </li>
    )
}

export function MoreItem({}) {
    const [active, setActive] = useState(false);

    const componentRef = useRef(null)
    const onclickRef = useRef()

    useEffect(() => {
        if (active) {
            attachOnClick();
        } else {
            detachOnClick()
        }
    }, [active]);

    const attachOnClick = () => {
        if (window.onclick) {
            onclickRef.current = window.onclick;
        }

        const timer = setTimeout(() => {
            window.onclick = e => {
                // e.preventDefault()
                if(componentRef.current && !componentRef.current.contains(e.target)){
                    setActive(false)
                    // detachOnClick();
                }
            }
            clearTimeout(timer);
        }, 10);
    }

    const detachOnClick = ()=>{
        if(window.onclick){
            const timer = setTimeout(()=>{
                window.onclick = onclickRef.current;
                onclickRef.current = null;
                clearTimeout(timer)
            }, 10)
        }
    }

    return (
        <>
            <button type="button" className={Popup.layer_more_btn} onClick={() => {
                setActive(!active)
            }}>더보기
            </button>
            <div className={cm(Popup.layer_more, `${active && Popup.active}`)} ref={componentRef}>
                {/*활성화시 active 추가 -->*/}
                {/*<div className={Popup.more_inp}>*/}
                {/*    <input type="text" className={`inp ${cm(Popup.inp, User.inp)}`}/>*/}
                {/*    <span className={Popup.more_icon}></span>*/}
                {/*</div>*/}
                <button type="button" className={Popup.more_del}>삭제</button>
            </div>
        </>
    )
}