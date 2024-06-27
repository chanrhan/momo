import {BoardTable} from "../board/BoardTable";
import Board from "../../../css/board.module.css"
import {cm} from "../../utils/cm";
import profileImg1 from "../../../images/profile_img1.jpg"
import {PromiseOptionItem} from "./module/PromiseOptionItem";
import {PromiseItem} from "./module/PromiseItem";

export function PromiseBoardTable(){
    return (
        <BoardTable>
            <div className={Board.promise}>
                <form>
                    <ul className={Board.promise_list}>
                        <PromiseItem/>
                        <PromiseItem/>
                        <PromiseItem/>
                        <PromiseItem/>
                        <PromiseItem/>
                        <PromiseItem/>
                        <PromiseItem/>
                    </ul>
                </form>
            </div>

            {/*<div className="view_more">*/}
            {/*    <button type="button" className="view_more_btn">더 보기</button>*/}
            {/*</div>*/}
        </BoardTable>
    )
}