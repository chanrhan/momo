import {MenuModal} from "../modal/MenuModal";

import Popup from "../../../css/popup.module.css"
import User from "../../../css/user.module.css"
import {cm, cmc} from "../../utils/cm";
import {useEffect, useRef, useState} from "react";
import useModal from "../../hook/useModal";
import {ModalType} from "../modal/ModalType";
import useApi from "../../hook/useApi";

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
    const [buttonName, setButtonName] = useState('선택없음')

    const {gmdApi} = useApi();

    const [keyword, setKeyword] = useState('')

    const [items, setItems] = useState(null)
    const [boxWidth, setBoxWidth] = useState(150)

    useEffect(() => {
        if(initValue){
            setButtonName(initValue)
        }
    }, [initValue]);


    useEffect(() => {
        getItems();
    }, [keyword]);


    useEffect(() => {
        setKeyword('')
    }, [active]);


    useEffect(() => {
        let maxLength = 12;
        if(items){
            items.forEach((v,i)=>{
                if(v.name.length > maxLength){
                    maxLength = v.name.length
                }
            })
        }
        if(maxLength !== 0){
            setBoxWidth(maxLength * 18)
        }
    }, [items]);

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
                setItems(data);
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
                name: items[id-1].name
            })
        }
        setButtonName(items[id-1].name)
        setActive(false);
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
                     width: `${boxWidth}px`
                 }}
                 ref={componentRef} >
                <input type="text" className={cm(Popup.select_inp)}
                       value={keyword}
                       onChange={e => {
                           setKeyword(e.target.value)
                       }}
                       placeholder="옵션 검색"/>
                <div className={cm(Popup.select_layer, Popup.active)}>
                    <div className={Popup.layer_title}>옵션 추가하기</div>
                    <ul className="layer_list">
                        {
                            items && items.map((v, i) => {
                                return <LayerItem key={i} content={v.name} onClick={() => {
                                    selectItem(i, v.id);
                                }}/>
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

function MoreItem({}) {
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
                <div className={Popup.more_inp}>
                    <input type="text" className={`inp ${cm(Popup.inp, User.inp)}`}/>
                    <span className={Popup.more_icon}></span>
                </div>
                <button type="button" className={Popup.more_del}>삭제</button>
            </div>
        </>
    )
}