import Board from "../../../css/board.module.css"
import Layout from "../../../css/layout.module.css"
import {cm} from "../../utils/cm";
import {Link} from "react-router-dom";
import {BiPackage} from "react-icons/bi";
import {BoardTable, Btbody, Bth, Bthead} from "../board/BoardTable";
import {TaskTableData} from "./module/TaskTableData";
import {useState} from "react";
import {TaskBoardTable} from "./module/TaskBoardTable";
import {PromiseBoardTable} from "./PromiseBoardTable";
import {TabList} from "../../common/module/TabList";
import useInputField from "../../hook/useInputField";

export function Task(){
    const inputField = useInputField();

    return (
        <div className={Layout.sub}>
            <div className={Layout.sub_head}>
                <h2 className={Layout.sub_title}>고객관리</h2>
            </div>

            <div className={Layout.sub_tab}>
                <TabList name='category' inputField={inputField} theme={Layout} values={
                    ['중고폰','카드','결합','지원','고객약속']
                }/>
                {
                    inputField.getInput('category') === 4 && (
                        <button className={`btn_blue ${cm(Board.btn_medium, Board.btn)} btn_add`}>약속 추가</button>
                    )
                }
            </div>

            <div className={`${Board.board} board_list`}>
                <div className={Board.board_head}>
                    <form>
                        <div className={Board.board_head_group}>
                                <span className="switch">
                                    <input type="checkbox" id="switch1" className="switch_inp" checked/>
                                    <label htmlFor="switch1"><span>on/off</span></label>
                                </span>
                            <span className="switch_text">미완료 고객 보기</span>
                        </div>
                        <div className={Board.board_head_group}>
                            <div className={Board.board_count}>
                                <span className={Board.count_text}>전체 <em className={Board.em}>1,123</em>건</span>
                                <span className={Board.count_text}><em className={Board.em}>3</em>건</span>
                            </div>

                            <div className={Board.board_search}>
                                <input type="search" className={Board.input} title="검색" id="board_search" placeholder="이름, 전화번호, 식별번호 검색"/>
                                <button type="submit" className={Board.button}>검색</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="board_body">
                    {
                        inputField.getInput('category') >= 0 && inputField.getInput('category') < 4 ? (
                            <TaskBoardTable category={inputField.getInput('category')}/>
                        ) : <PromiseBoardTable/>
                    }


                    <div className="view_more">
                        <button type="button" className="view_more_btn">더 보기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}