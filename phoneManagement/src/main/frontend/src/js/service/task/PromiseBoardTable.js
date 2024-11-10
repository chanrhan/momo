import {BoardTable} from "../board/BoardTable";
import Board from "../../../css/board.module.css"
import {cm, cmc} from "../../utils/cm";
import profileImg1 from "../../../images/profile_img1.jpg"
import {PromiseOptionItem} from "./module/PromiseOptionItem";
import {useEffect, useRef, useState} from "react";
import useApi from "../../hook/useApi";
import {useObjectArrayInputField} from "../../hook/useObjectArrayInputField";
import {ObjectUtils} from "../../utils/objectUtil";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import {EditableAddButton} from "../../common/module/EditableAddButton";

export function PromiseBoardTable({onLoad, items, onChangeState, onSelectSale}){
    return (
        <div className='board_body'>
            <div className={Board.promise}>
                <form>
                    <ul className={Board.promise_list}>
                        {
                            items && items.map((v,i)=>{
                                return <PromiseItem onLoad={onLoad} key={i} onClick={()=>{
                                    onSelectSale(v.sale_id)
                                }} item={v} onUpdate={onChangeState}/>
                            })
                        }
                    </ul>
                </form>
            </div>

            {/*<div className="view_more">*/}
            {/*    <button type="button" className="view_more_btn">더 보기</button>*/}
            {/*</div>*/}
        </div>
    )
}

function PromiseItem({onLoad, item, onUpdate, onClick}){
    const {saleApi} = useApi()
    const focusRef = useRef([])
    const [editContent, setEditContent] = useState('')

    const nextIndex = item.pm_list ? item.pm_list.length: -1;
    const [focusIndex, setFocusIndex] = useState(-1);

    const scrollRef = useRef(null)

    useEffect(() => {
        if(focusIndex !== -1){
            if(focusIndex < nextIndex){
                setEditContent(item.pm_list[focusIndex].content ?? '');
            }
            focusRef.current[focusIndex].focus();
        }
    }, [focusIndex]);

    // useEffect(() => {
    //     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    // }, [item.pm_list]);

    const update = async (id)=>{
        setFocusIndex(-1)
        if(ObjectUtils.isEmpty(editContent)){
            return;
        }
        await saleApi.updatePromiseContent({
            sale_id: item.sale_id,
            pm_id: id,
            content: editContent
        }).then(({status,data})=>{

            if(status === 200 && data){
                // modal.openModal(ModalType.SNACKBAR.Info, {
                //     msg: '추가되었습니다.'
                // })
                onLoad();
                setEditContent('')
            }
        })
    }

    const add = async(v)=>{
        setFocusIndex(-1)
        if(ObjectUtils.isEmpty(v)){
            return;
        }

        await saleApi.addPromiseContent({
            sale_id: item.sale_id,
            content: v
        }).then(({status,data})=>{
            if(status === 200 && data){
                // modal.openModal(ModalType.SNACKBAR.Info, {
                //     msg: '추가되었습니다.'
                // })
                onLoad();
                setTimeout(()=>{
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }, 50)

            }
        })
    }

    return (
        <li className={Board.promise_item} >
            <div className={Board.promise_box} onClick={onClick}>
                <div className={Board.promise_profile}>
                    <div className={cm(Board.profile_img, Board.div)}>
                        {/*<img className={Board.img} src={img} alt="프로필 이미지"/>*/}
                    </div>
                    <div className={cm(Board.profile_text, Board.div)}>
                        <div className={Board.profile_name}>{item.cust_nm}<span className={Board.span}>{item.cust_cd}</span></div>
                        <ul className={Board.profile_info}>
                            <li className={Board.li}><span className={Board.span}>개통일</span>{item.actv_dt}</li>
                            <li className={Board.li}><span className={Board.span}>연락처</span>{item.cust_tel}</li>
                        </ul>
                    </div>
                </div>
                <div className={Board.promise_option} onClick={e=>{
                    e.stopPropagation()
                }}>
                    <div className={Board.option_scroll} ref={scrollRef} >
                        <ul className="option_list">
                            {
                                item.pm_list && item.pm_list.map((v,i)=> {
                                    return <li key={i} className={Board.option_item} draggable={true}>
                                        <div className={cm(Board.radio_box)}>
                                            <input type="checkbox" className={Board.check_inp} name="radio" id={`pr_${i}`}
                                                   checked={v.checked} readOnly/>
                                            <label htmlFor={`pr_${i}`} className={Board.check_label}
                                                   onClick={() => {
                                                       onUpdate({
                                                           sale_id: item.sale_id,
                                                           state: (v.checked) ? 0 : 1,
                                                           pm_id: v.pm_id
                                                   })
                                                   }}></label>
                                            <input type="text" className={Board.check_text}
                                                   value={focusIndex === i ? editContent : v.content}
                                                   onChange={e=>{
                                                       setEditContent(e.target.value);
                                                   }}
                                                   onClick={()=>{
                                                       setFocusIndex(i);
                                                   }}
                                                   ref={e=>{
                                                       focusRef.current[i] = e;
                                                   }}
                                                   onBlurCapture={()=>{
                                                       update(v.pm_id);
                                                   }}
                                                   onKeyDown={e=>{
                                                       if(e.key === 'Enter') {
                                                           update(v.pm_id)
                                                       }
                                                   }}
                                                   readOnly={focusIndex !== i}/>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    <div className={Board.option_add} >
                        <EditableAddButton inpClassName={Board.add_inp}
                                           btnClassName={Board.add_btn}
                                           value='약속 추가하기' onUpdate={v=>{
                                               add(v);
                        }}/>
                    {/*    {*/}
                    {/*        focusIndex === nextIndex ? (*/}
                    {/*            <input type="text" className={Board.add_inp} placeholder='약속 추가하기'*/}
                    {/*                   onBlurCapture={e=>{*/}
                    {/*                       add(e.target.value)*/}
                    {/*                   }} onKeyDown={e=>{*/}
                    {/*                        if(e.key == 'Enter') {*/}
                    {/*                            add(e.target.value)*/}
                    {/*                        }*/}
                    {/*                    }}*/}
                    {/*                   ref={e=>{*/}
                    {/*                       focusRef.current[nextIndex] = e;*/}
                    {/*            }}/>*/}
                    {/*        ) : <button type='button' onClick={() => {*/}
                    {/*                setFocusIndex(nextIndex)*/}
                    {/*            }}  className={Board.add_btn}>약속 추가하기*/}
                    {/*            </button>*/}
                    {/*}*/}
                    </div>
                </div>
                {/*<button type="button" className={`btn_blue ${cm(Board.btn, Board.btn_medium, Board.btn_promise)}`}>완료</button>*/}
            </div>
        </li>
    )
}