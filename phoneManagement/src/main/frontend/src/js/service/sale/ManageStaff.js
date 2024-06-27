import Board from "../../../css/board.module.css"
import Layout from "../../../css/layout.module.css"
import {cm} from "../../utils/cm";
import {StaffTableData} from "./module/StaffTableData";
import {BoardTable, Btbody, Bth, Bthead} from "../board/BoardTable";


export function ManageStaff(){
    return (
        <div className={cm(Layout.sub)}>
            <div className={cm(Layout.sub_head)}>
                <h2 className={cm(Layout.sub_title)}>직원 현황</h2>
                <button type="button" className={`btn btn_blue ${cm(Board.btn_medium)} ${Layout.sub_head_btn}`}>저장하기</button>
            </div>

            <div className={cm(Board.board, "board_list")}>
                <div className={cm(Board.board_head)}>
                    <form>
                        <div className={cm(Board.board_head_group)}>
                            <div className={cm(Board.board_count)}>
                                <span className={cm(Board.count_text)}>전체 <em className={cm(Board.em)}>1,123</em>건</span>
                                <span className={cm(Board.count_text)}><em className={cm(Board.em)}>3</em>건</span>
                            </div>
                        </div>

                        <div className={cm(Board.board_head_group)}>
                            <div className={cm(Board.board_search)}>
                                <input type="search" title="검색" id="board_search" placeholder="이름, 전화번호, 식별번호 검색" className={cm(Board.input)}/>
                                <button type="submit" className={cm(Board.button)}>검색</button>
                            </div>
                        </div>
                    </form>
                </div>

                <BoardTable caption='직원 현황 테이블 - 선택, 이름, 소속매장, 권한, 승인요청 정보 제공'
                colgroup={
                    <>
                        <col style={{width: "42px"}}/>
                        <col/>
                        <col/>
                        <col/>
                        <col style={{width: "150px"}}/>
                    </>
                }>
                    <Bthead>
                        <Bth checkbox/>
                        <Bth>이름</Bth>
                        <Bth>소속매장</Bth>
                        <Bth>권한</Bth>
                        <Bth>승인요청</Bth>
                    </Bthead>
                    <Btbody>
                        <StaffTableData/>
                        <StaffTableData/>
                    </Btbody>
                </BoardTable>

                <div className="view_more">
                    <button type="button" className="view_more_btn">더 보기</button>
                </div>
            </div>
        </div>
    )
}