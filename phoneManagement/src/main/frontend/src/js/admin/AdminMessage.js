import Layout from "../../css/layout.module.css";
import Board from "../../css/board.module.css";
import {BoardTable, Btbody, Btd, Bth, Bthead} from "../service/board/BoardTable";
import {ProfileTableColumn} from "../service/sale/module/ProfileTableColumn";
import profileImg1 from "../../images/profile_img1.jpg";
import {NumberUtils} from "../utils/NumberUtils";
import {cmc} from "../utils/cm";
import useModal from "../hook/useModal";
import {ModalType} from "../common/modal/ModalType";

export function AdminMessage(){
    const modal = useModal()

    const openMessageTemplateModal = ()=>{
        modal.openModal(ModalType.LAYER.Admin_Message_Template)
    }

    return (
        <div className={Layout.sub} style={{
            paddingLeft: '10px'
        }}>
            <div className={Layout.sub_head}>
                <h2 className={Layout.sub_title}>문자 관리</h2>
            </div>


            <div className={`${Board.board} board_list`}>
                <div className={Board.board_head}>
                    <form>
                        <div className={Board.board_head_group}>
                            <button onClick={openMessageTemplateModal} type="button"
                                    className={`btn_blue ${cmc(Board.btn, Board.btn_medium)}`}>문자 템플릿 관리                            </button>
                            <div className={Board.board_count}>
                                {/*<span className={Board.count_text}>전체 <em className={Board.em}>{totalCount}</em>건</span>*/}
                                {/*<span className={Board.count_text}><em*/}
                                {/*    className={Board.em}>{items ? items.length : 0}</em>건</span>*/}
                            </div>

                            <div className={Board.board_search}>
                                {/*<input className={Board.input} type="search" value={keywowrd} onChange={e => {*/}
                                {/*    setKeyword(e.target.value)*/}
                                {/*}} title="검색" id="board_search"*/}
                                {/*       placeholder="이름, 전화번호, 식별번호 검색"/>*/}
                                {/*<button className={Board.button} type="button">검색</button>*/}
                            </div>

                        </div>
                    </form>
                </div>

                <BoardTable style={{
                    overflowY: 'auto'
                }}>
                    <Bthead>
                        <Bth>매장명</Bth>
                        <Bth>대표명</Bth>
                        <Bth>사업자번호</Bth>
                        <Bth>주소</Bth>
                        <Bth>연락처</Bth>
                        <Bth>총 실적</Bth>
                        <Bth>마지막 판매일보</Bth>
                        <Bth>가입일</Bth>
                    </Bthead>
                    <Btbody br>
                        {/*{*/}
                        {/*    items && items.map((v, i) => {*/}
                        {/*        return <tr className={Board.tr} key={i}>*/}
                        {/*            /!*<Btd checkbox/>*!/*/}
                        {/*            /!*<Btd>{i+1}</Btd>*!/*/}
                        {/*            <Btd>{v.shop_nm}</Btd>*/}
                        {/*            /!*<Btd>{v.id}</Btd>*!/*/}
                        {/*            <ProfileTableColumn name={v.reps_nm}*/}
                        {/*                                src={profileImages ? profileImages[i] : profileImg1}/>*/}
                        {/*            <Btd>{v.br_no}</Btd>*/}
                        {/*            <Btd>{v.shop_addr}</Btd>*/}
                        {/*            <Btd>{v.shop_tel}</Btd>*/}
                        {/*            <Btd className="ta_r">{NumberUtils.toPrice(v.total_cms)}원</Btd>*/}
                        {/*            <Btd>{v.last_sale_dt}</Btd>*/}
                        {/*            <Btd>{v.regi_dt}</Btd>*/}
                        {/*            /!*<Btd className="ta_c">*!/*/}
                        {/*            /!*    <a href="#" className="btn btn_grey btn_small btn_line">관리</a>*!/*/}
                        {/*            /!*</Btd>*!/*/}
                        {/*        </tr>*/}
                        {/*    })*/}
                        {/*}*/}
                    </Btbody>
                </BoardTable>
            </div>
        </div>
    )
}