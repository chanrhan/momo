import Layout from "../../css/layout.module.css";
import Board from "../../css/board.module.css";
import {BoardTable, Btbody, Btd, Bth, Bthead} from "../service/board/BoardTable";
import {ProfileTableColumn} from "../service/sale/module/ProfileTableColumn";
import profileImg1 from "../../images/profile_img1.jpg";
import {NumberUtils} from "../utils/NumberUtils";
import {cm, cmc} from "../utils/cm";
import useModal from "../hook/useModal";
import {ModalType} from "../common/modal/ModalType";
import {useEffect, useState} from "react";
import useApi from "../hook/useApi";
import {MoreOptionLayer} from "../common/module/MoreOptionLayer";
import {SelectItem} from "../common/module/SelectLayer";

const MSG_STATE = [
    Board.grey,
    Board.green,
    Board.red
]

export function AdminMessage(){
    const modal = useModal()
    const {rsvMsgApi} = useApi()

    const [keyword, setKeyword] = useState("")
    const [items, setItems] = useState([])
    const [totalCnt, setTotalCnt] = useState(0)

    const [checkedMsg, setCheckedMsg] = useState([])

    useEffect(() => {
        getReservedMessage();
    }, [keyword]);

    const getReservedMessage = ()=>{
        rsvMsgApi.getReserveMsgAll({
            keyword: keyword
        }).then(({data})=>{
            if(data.total_cnt){
                setTotalCnt(data.total_cnt)
            }else{
                setTotalCnt(0)
            }
            let length = 0;
            if(data.list){
                const parsed = JSON.parse(data.list)
                setItems(parsed);
                // console.table(parsed)
                length = parsed.length;

            }else{
                setItems(null);
            }
            setCheckedMsg(new Array(length).fill(false))
        })
    }

    const openMessageTemplateModal = ()=>{
        modal.openModal(ModalType.LAYER.Admin_Message_Template)
    }


    const checkMsg = index=>{
        const copy = [...checkedMsg]
        copy[index] = !copy[index]
        setCheckedMsg(copy)
    }

    const deleteMessage = ()=>{
        const body = checkedMsg.map((v,i)=>{
            if(!v){
                return null;
            }
            const msg = items[i];
            return {
                shop_id : msg.shop_id,
                sale_id : msg.sale_id,
                rsv_dt : msg.rsv_dt,
                msg_id : msg.msg_id
            }
        }).filter(v=>v);

        // console.table(body)
        // return;

        rsvMsgApi.deleteReserveMsg(body).then((data)=>{
            if(data){

                modal.openModal(ModalType.SNACKBAR.Info, {
                    msg: "삭제되었습니다"
                })
                getReservedMessage()
            }
        })
    }

    return (
        <div className={Layout.sub} style={{
            paddingLeft: '10px'
        }}>
            <div className={Layout.sub_head}>
                <h2 className={Layout.sub_title}>문자 예약 내역</h2>
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
                                    <SelectItem onClick={deleteMessage}>예약문자 삭제</SelectItem>
                                </MoreOptionLayer>
                            </div>

                        </div>
                    </form>
                </div>

                <BoardTable style={{
                    overflowY: 'auto'
                }}>
                    <Bthead>
                        <Bth checkbox/>
                        <Bth>발송상태</Bth>
                        <Bth>매장명</Bth>
                        <Bth>전화번호</Bth>
                        <Bth>문자템플릿</Bth>
                        <Bth>고객이름</Bth>
                        <Bth>요청날짜</Bth>
                        <Bth>요청아이디</Bth>
                        {/*<Bth>관리</Bth>*/}
                    </Bthead>
                    <Btbody br>
                        {
                            items && items.map((v, i) => {
                                return <tr className={Board.tr} key={i}>
                                    <Btd checkbox checked={checkedMsg[i]} onCheck={()=>{
                                        checkMsg(i);
                                    }}/>
                                    <Btd>
                                        <div className={Board.msg_state_box}>
                                            <span className={cm(Board.msg_state_icon, `${MSG_STATE[v.msg_st]}`)}>

                                            </span>
                                        </div>
                                    </Btd>
                                    <Btd>{v.shop_nm}</Btd>
                                    <Btd>{v.cust_tel}</Btd>
                                    <Btd>{v.template_title}</Btd>
                                    <Btd>{v.cust_nm}</Btd>
                                    <Btd>{v.req_dt}</Btd>
                                    <Btd>{v.req_id}</Btd>
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
            </div>
        </div>
    )
}