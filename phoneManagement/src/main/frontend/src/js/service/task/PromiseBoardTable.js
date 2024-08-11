import {BoardTable} from "../board/BoardTable";
import Board from "../../../css/board.module.css"
import {cm, cmc} from "../../utils/cm";
import profileImg1 from "../../../images/profile_img1.jpg"
import {PromiseOptionItem} from "./module/PromiseOptionItem";
import {useEffect, useState} from "react";
import useApi from "../../hook/useApi";

export function PromiseBoardTable({profileImages, items, onChangeState, onSelectSale}){

    return (
        <div className='board_body'>
            <div className={Board.promise}>
                <form>
                    <ul className={Board.promise_list}>
                        {
                            items && items.map((v,i)=>{
                                return <PromiseItem img={profileImages ? profileImages[i] : profileImg1} key={i} onClick={()=>{
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

function PromiseItem({img, item, onUpdate, onClick}){
    return (
        <li className={Board.promise_item} onClick={onClick}>
            <div className="promise_box">
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
                    <div className={Board.option_scroll}>
                        <ul className="option_list">
                            {
                                item.pm_list && item.pm_list.map((v,i)=> {
                                    return <li key={i} className={Board.option_item} draggable={true}>
                                        <div className={cmc(Board.radio_box)}>
                                            <input type="radio" name="radio" id={`pr_${i}`} disabled={v.checked}/>
                                            <label htmlFor={`pr_${i}`} className={Board.form_label}
                                                   onClick={() => {
                                                       onUpdate(item.sale_id, (v.checked) ? 0 : 1, v.pm_id)
                                                   }}>{v.content}</label>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    <div className={Board.option_add}>
                        <button type="button" className={Board.add_btn}>추가</button>
                        <input type="text" className={cm(Board.inp)} placeholder="단계 추가"/>
                    </div>
                </div>
                <button type="button" className={`btn_blue ${cm(Board.btn, Board.btn_medium, Board.btn_promise)}`}>완료</button>
            </div>
        </li>
    )
}