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
import {DateUtils} from "../utils/DateUtils";

const MSG_STATE = [
    Board.grey,
    Board.green,
    Board.red
]

export function SMSHistory(){
    const modal = useModal()
    const {msgApi} = useApi()
    const today = new Date()

    const [tab, setTab] = useState(0)

    const [keyword, setKeyword] = useState("")
    const [items, setItems] = useState([])
    const [totalCnt, setTotalCnt] = useState(0)

    const [checkedMsg, setCheckedMsg] = useState([])

    useEffect(() => {
        getSMSList();
    }, [keyword]);

    const getSMSList = ()=>{
        // const body = {
        //     page: 1,
        //     pageSize: 50,
        //     startDate: DateUtils.dateToStringYYMMdd(today),
        //     limitDay: 1
        // }
        // msgApi.getSMSList(body).then(({data})=>{
        //     if(data){
        //         // console.table(data)
        //         if(data.list)
        //             setItems(data.list);
        //     }
        // })
    }


    const openMessageTemplateModal = ()=>{
        modal.openModal(ModalType.SNACKBAR.Alert, {
            msg: "준비 중인 기능입니다. 나중에 다시 시도해 주세요."
        })
        // modal.openModal(ModalType.LAYER.Admin_Message_Template)
    }

    const checkMsg = index=>{
        const copy = [...checkedMsg]
        copy[index] = !copy[index]
        setCheckedMsg(copy)
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
                        <button onClick={openMessageTemplateModal} type="button"
                                className={`btn_blue ${cmc(Board.btn, Board.btn_medium)}`}>문자 템플릿 관리
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
                    <Bth>메세지 ID</Bth>
                    <Bth>문자타입</Bth>
                    <Bth>요청날짜</Bth>
                    {/*<Bth>관리</Bth>*/}
                </Bthead>
                <Btbody br>
                    {
                        items && items.map((v, i) => {
                            return <tr className={Board.tr} key={i}>
                                {/*<Btd checkbox checked={checkedMsg[i]} onCheck={() => {*/}
                                {/*    checkMsg(i);*/}
                                {/*}}/>*/}
                                <Btd>{v.sms_count >= 1 ? "발송완료":"발송실패"}</Btd>
                                <Btd>{v.mid}</Btd>
                                <Btd>{v.type}</Btd>
                                <Btd>{v.reg_date}</Btd>
                            </tr>
                        })
                    }
                </Btbody>
            </BoardTable>
        </>
    )
}