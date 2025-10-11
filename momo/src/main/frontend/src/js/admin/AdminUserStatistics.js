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
    const {msgApi} = useApi()

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
        msgApi.getSMSList(body).then(({data})=>{
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
                <h2 className={Layout.sub_title}>(미정)</h2>
            </div>



        </div>
    )
}