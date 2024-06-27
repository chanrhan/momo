import Board from "../../../../css/board.module.css";
import {cm} from "../../../utils/cm";
import profileImg1 from "../../../../images/profile_img1.jpg";
import {PromiseOptionItem} from "./PromiseOptionItem";

export function PromiseItem({}){
    return (
        <li className={Board.promise_item}>
            <div className="promise_box">
                <div className={Board.promise_profile}>
                    <div className={cm(Board.profile_img, Board.div)}><img className={Board.img} src={profileImg1}
                                                                           alt="프로필 이미지"/></div>
                    <div className={cm(Board.profile_text, Board.div)}>
                        <div className={Board.profile_name}>김모모<span className={Board.span}>20.01.01</span></div>
                        <ul className={Board.profile_info}>
                            <li className={Board.li}><span className={Board.span}>개통일</span>2024.04.01</li>
                            <li className={Board.li}><span className={Board.span}>연락처</span>010-1234-5678</li>
                        </ul>
                    </div>
                </div>
                <div className={Board.promise_option}>
                    <div className={Board.option_scroll}>
                        <ul className="option_list">
                            <PromiseOptionItem content='S24U 디바이스 케이스'/>
                            <PromiseOptionItem content='S24U 디바이스 케이스'/>
                            <PromiseOptionItem content='S24U 디바이스 케이스'/>
                            <PromiseOptionItem content='S24U 디바이스 케이스'/>
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