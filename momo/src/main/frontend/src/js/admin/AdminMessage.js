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
import {SMSHistory} from "./SmsHistory";
import {AlimTalkHistory} from "./AlimTalkHistory";

const MSG_STATE = [
    Board.grey,
    Board.green,
    Board.red
]

export function AdminMessage(){
    const modal = useModal()
    const {msgApi} = useApi()

    const [tab, setTab] = useState(0)

    const [keyword, setKeyword] = useState("")
    const [items, setItems] = useState([])
    const [totalCnt, setTotalCnt] = useState(0)

    const [checkedMsg, setCheckedMsg] = useState([])

    useEffect(() => {

    }, [keyword]);

    const routeTab = ()=>{
        switch (tab){
            case 0:
                return <SMSHistory/>
            case 1:
                return <AlimTalkHistory/>
        }
        return null;
    }

    return (
        <div className={Layout.sub} style={{
            paddingLeft: '10px'
        }}>
            <div className={Layout.sub_head}>
                <h2 className={Layout.sub_title}>문자/알림톡 관리</h2>
            </div>

            <div className={Layout.sub_tab}>
                <TabList name='user_st' value={tab} onChange={setTab} theme={Layout} values={
                    ['문자','알림톡']
                }/>
            </div>

            <div className={`${Board.board} board_list`}>
                {routeTab()}
            </div>
        </div>
    )
}