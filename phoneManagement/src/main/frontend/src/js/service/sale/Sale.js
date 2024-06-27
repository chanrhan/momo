import Board from "../../../css/board.module.css"
import Layout from "../../../css/layout.module.css"
import {cm, cmc} from "../../utils/cm";
import {BoardTable, Btbody, Btd, Bth, Bthead} from "../board/BoardTable";
import {SaleTableData} from "./module/SaleTableData";

export function Sale(){
    return (
        <div className={cm(Layout.sub)}>
            <div className={cm(Layout.sub_head)}>
                <h2 className={cm(Layout.sub_title)}>판매일보</h2>
            </div>

            <div className={cm(Board.board, "board_list")}>
                <div className={cm(Board.board_head)}>
                    <form>
                        <div className={cm(Board.board_head_group)}>
                            <input type="text" className="inp date" placeholder="날짜 선택"/>
                            <button type="button" className="btn_all">전체 보기</button>
                        </div>
                        <div className={cm(Board.board_head_group)}>
                            <div className={cm(Board.board_count)}>
                                <span className={cm(Board.count_text)}>전체 <em
                                    className={cm(Board.em)}>1,123</em>건</span>
                                <span className={cm(Board.count_text)}><em className={cm(Board.em)}>3</em>건</span>
                            </div>

                            <button type="button" className={cm(Board.board_filter_btn)}>필터</button>

                            <div className={cm(Board.board_search)}>
                                <input type="search" title="검색" id="board_search" className={cm(Board.input)}
                                       placeholder="이름, 전화번호, 식별번호 검색"/>
                                <button type="submit" className={cm(Board.button)}>검색</button>
                            </div>

                            <div className={cm(Board.board_btn_box)}>
                                <button type="button" className={cm(Board.board_btn, Board.board_filter)}>필터</button>
                            </div>

                            <div className={cm(Board.board_btn_box)}>
                                <button type="button" className={cm(Board.board_btn, Board.board_more)}>더보기</button>
                            </div>

                            <button type="button"
                                    className={`btn_blue ${cmc(Board.btn, Board.btn_medium)}`}>고객 추가
                            </button>
                        </div>
                    </form>
                </div>

                <BoardTable caption='판매일보 테이블 - 선택, 메인 구분, 개통날짜, 이름, 휴대폰 번호, 식별 번호, 모델명, 총 이익, 담당자, 예약 정보 제공'
                            colgroup={
                                <>
                                    <col style={{width: "42px"}}/>
                                    <col span="8"/>
                                    <col style={{width: "90px"}}/>
                                </>
                            }>
                    <Bthead>
                        <Bth varName='check2' checkbox/>
                        <Bth>메인 구분</Bth>
                        <Bth sort>개통 날짜</Bth>
                        <Bth>이름</Bth>
                        <Bth>휴대폰 번호</Bth>
                        <Bth>식별 번호</Bth>
                        <Bth sort>모델명</Bth>
                        <Bth sort>총 이익</Bth>
                        <Bth sort>담당자</Bth>
                        <Bth>예약</Bth>
                    </Bthead>
                    <Btbody br>
                        <SaleTableData/>
                        <SaleTableData/>
                    </Btbody>
                </BoardTable>

                <div className="view_more">
                    <button type="button" className="view_more_btn">더 보기</button>
                </div>
            </div>
        </div>
    )
}