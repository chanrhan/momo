import Board from "../../css/board.module.css"
import Layout from "../../css/layout.module.css"
import {TabList} from "../common/module/TabList";
import {BoardTable, Btbody, Bth, Bthead} from "../service/board/BoardTable";
import {AdminTableData} from "./module/AdminTableData";
import useValidateInputField from "../hook/useValidateInputField";

export function Administrator(){
    const inputField = useValidateInputField();

    return (
        <div className={Layout.sub}>
            <div className={Layout.sub_head}>
                <h2 className={Layout.sub_title}>관리자 페이지</h2>
            </div>

            <div className={Layout.sub_tab}>
                <TabList name='user_st' inputField={inputField} theme={Layout} values={
                    ['일반회원','정지회원','탈퇴회원']
                }/>
            </div>

            <div className={`${Board.board} board_list`}>
                <div className={Board.board_head}>
                    <form>
                        <div className={Board.board_head_group}>
                            <input type="text" className="inp date entered" placeholder="날짜 선택" value="최근 30일"/>
                            {/*입력시 entered 추가-->*/}
                            <button type="button" className="btn_all">전체 보기</button>
                        </div>
                        <div className={Board.board_head_group}>
                            <div className={Board.board_count}>
                                <span className={Board.count_text}>전체 <em className={Board.em}>1,123</em>건</span>
                                <span className={Board.count_text}><em className={Board.em}>3</em>건</span>
                            </div>

                            <div className={Board.board_search}>
                                <input className={Board.input} type="search" title="검색" id="board_search" placeholder="이름, 전화번호, 식별번호 검색"/>
                                <button className={Board.button} type="submit">검색</button>
                            </div>
                        </div>
                    </form>
                </div>

                <BoardTable>
                    <Bthead>
                        <Bth className="ta_c" checkbox></Bth>
                        <Bth>No</Bth>
                        <Bth>가입채널</Bth>
                        <Bth>이름</Bth>
                        <Bth className="ta_c">이메일</Bth>
                        <Bth className="ta_c">휴대폰 번호</Bth>
                        <Bth className="ta_c">사업자 등록</Bth>
                        <Bth className="ta_c">가입일</Bth>
                        <Bth className="ta_c">최근 로그인</Bth>
                        <Bth className="ta_c">직급</Bth>
                        <Bth className="ta_c">관리</Bth>
                    </Bthead>
                    <Btbody br>
                        <AdminTableData/>
                        <AdminTableData/>
                    </Btbody>
                </BoardTable>
            </div>
        </div>
    )
}