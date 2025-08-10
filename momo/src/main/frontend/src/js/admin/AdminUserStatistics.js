import Layout from "../../css/layout.module.css";
import Board from "../../css/board.module.css";
import {cm, cmc} from "../utils/cm";
import {MoreOptionLayer} from "../common/module/MoreOptionLayer";
import {SelectItem} from "../common/module/SelectLayer";
import {BoardTable, Btbody, Btd, Bth, Bthead} from "../service/board/BoardTable";
import useModal from "../hook/useModal";
import useApi from "../hook/useApi";
import {useEffect, useState} from "react";
import {DateUtils} from "../utils/DateUtils";

export function AdminUserStatistics(){
    const modal = useModal()
    const today = new Date();
    const {aligoApi} = useApi()

    const [keyword, setKeyword] = useState("")
    const [items, setItems] = useState([])
    const [totalCnt, setTotalCnt] = useState(0)

    const [checkedMsg, setCheckedMsg] = useState([])

    useEffect(() => {
        getSMSList()
    }, []);

    const checkMsg = index=>{
        const copy = [...checkedMsg]
        copy[index] = !copy[index]
        setCheckedMsg(copy)
    }

    const getSMSList = ()=>{
        const body = {
            page: 1,
            pageSize: 50,
            startDate: DateUtils.dateToStringYYMMdd(today),
            limitDay: 1
        }
        aligoApi.getSMSList(body).then(({data})=>{
            if(data){
                console.table(data)
                if(data.list)
                    setItems(data.list);
            }
        })
    }

    return (
        <div className={Layout.sub} style={{
            paddingLeft: '10px'
        }}>
            <div className={Layout.sub_head}>
                <h2 className={Layout.sub_title}>알리고 문자(SMS) 발송 내역</h2>
            </div>


            <div className={`${Board.board} board_list`}>
                <div className={Board.board_head}>
                    <form>
                        <div className={Board.board_head_group}>
                        </div>
                        <div className={Board.board_head_group}>
                            <div className={Board.board_count}>
                                <span className={Board.count_text}>전체 <em
                                    className={Board.em}>{items ? items.length : 0}</em>건</span>
                                {/*<span className={Board.count_text}><em*/}
                                {/*    className={Board.em}>{totalCnt}</em>건</span>*/}
                            </div>

                            {/*<div className={Board.board_search}>*/}
                            {/*    <input className={Board.input} type="search" value={keyword} onChange={e => {*/}
                            {/*        setKeyword(e.target.value)*/}
                            {/*    }} title="검색" id="board_search"*/}
                            {/*           placeholder="이름, 전화번호, 식별번호 검색"/>*/}
                            {/*    <button className={Board.button} type="button">검색</button>*/}
                            {/*</div>*/}

                        </div>
                    </form>
                </div>

                <BoardTable style={{
                    overflowY: 'auto'
                }}>
                    <Bthead>
                        {/*<Bth checkbox/>*/}
                        <Bth>메세지 ID</Bth>
                        <Bth>문자타입</Bth>
                        <Bth>발송상태</Bth>
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
                                    <Btd>{v.mid}</Btd>
                                    <Btd>{v.type}</Btd>
                                    <Btd>{v.sms_count >= 1 ? "발송완료":"발송실패"}</Btd>
                                    <Btd>{v.reg_date}</Btd>
                                </tr>
                            })
                        }
                    </Btbody>
                </BoardTable>
            </div>
        </div>
    )
}