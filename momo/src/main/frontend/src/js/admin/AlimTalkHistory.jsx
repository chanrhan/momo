import Layout from "../../css/layout.module.css";
import Board from "../../css/board.module.css";
import {BoardTable, Btbody, Btd, Bth, Bthead} from "../service/board/BoardTable";
import {cm, cmc} from "../utils/cm";
import useModal from "../hook/useModal";
import {ModalType} from "../common/modal/ModalType";
import {useEffect, useState} from "react";
import useApi from "../hook/useApi";
import {MoreOptionLayer} from "../common/module/MoreOptionLayer";
import {SelectItem} from "../common/module/SelectLayer";
import {TabList} from "../common/module/TabList";

const MSG_STATE = [
    Board.grey,
    Board.green,
    Board.red
]

export function AlimTalkHistory(){
    const modal = useModal()
    const {msgApi} = useApi();

    const [tab, setTab] = useState(0)

    const [keyword, setKeyword] = useState("")
    const [items, setItems] = useState([])
    const [totalCnt, setTotalCnt] = useState(0)

    const [checkedMsg, setCheckedMsg] = useState([])

    useEffect(() => {
        getAlimtalkHistoryList()
    }, []);

    const getAlimtalkHistoryList = ()=>{
        const body = {

        }
        msgApi.getAlimtalkHistoryList(body).then(({data})=>{
            console.table(data)
            if(data && data.list){
                setItems(data.list)
            }else{
                setItems(null)
            }
        })
    }

    const checkMsg = index=>{
        const copy = [...checkedMsg]
        copy[index] = !copy[index]
        setCheckedMsg(copy)
    }

    const openAlimtalkTemplateModal = ()=>{

    }

    return (
        <>
            <div className={Board.board_head}>
                <form>
                    <div className={Board.board_head_group}>
                    </div>
                    <div className={Board.board_head_group}>
                        <div className={Board.board_count}>
                                <span className={Board.count_text}>전체 <em
                                    className={Board.em}>{items ? items.length : 0}</em>건</span>
                            <span className={Board.count_text}><em
                                className={Board.em}>{totalCnt}</em>건</span>
                        </div>

                        <div className={Board.board_search}>
                            <input className={Board.input} type="search" value={keyword} onChange={e => {
                                setKeyword(e.target.value)
                            }} title="검색" id="board_search"
                                   placeholder="이름, 전화번호, 식별번호 검색"/>
                            <button className={Board.button} type="button">검색</button>
                        </div>
                        <button onClick={openAlimtalkTemplateModal} type="button"
                                className={`btn_blue ${cmc(Board.btn, Board.btn_medium)}`}>알림톡 템플릿 관리
                        </button>
                        <div className={`select_box ${cm(Board.board_btn_box)}`}>
                            <MoreOptionLayer cssModule={Board}>
                                {/*<SelectItem onClick={deleteMessage}>예약문자 삭제</SelectItem>*/}
                            </MoreOptionLayer>
                        </div>

                    </div>
                </form>
            </div>

            <BoardTable style={{
                overflowY: 'auto'
            }}>
                <Bthead>
                    {/*<Bth checkbox/>*/}
                    <Bth>상태</Bth>
                    <Bth>ID</Bth>
                    <Bth>문자구분</Bth>
                    <Bth>발신번호</Bth>
                    <Bth>예약일</Bth>
                    <Bth>등록일</Bth>
                </Bthead>
                <Btbody br>
                    {
                        items && items.map((v, i) => {
                            return <tr className={Board.tr} key={i}>
                                {/*<Btd checkbox checked={checkedMsg[i]} onCheck={() => {*/}
                                {/*    checkMsg(i);*/}
                                {/*}}/>*/}
                                <Btd>{v.reserve_state}</Btd>
                                <Btd>{v.mid}</Btd>
                                <Btd>{v.type}</Btd>
                                <Btd>{v.sender}</Btd>
                                <Btd>{v.reserve_date}</Btd>
                                <Btd>{v.regdate}</Btd>
                                {/*<Btd>*/}
                                {/*    <button type="button"*/}
                                {/*            className={`btn_grey btn_small btn_line ${cmc(Board.btn)}`}*/}
                                {/*            onClick={() => {*/}

                                {/*            }}>예약 취소*/}
                                {/*    </button>*/}
                                {/*</Btd>*/}
                            </tr>
                        })
                    }
                </Btbody>
            </BoardTable>
        </>
    )
}