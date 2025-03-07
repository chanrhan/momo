import Graph from "../../css/graph.module.css";
import {cm, cmc} from "../utils/cm";
import {GraphSummaryCard} from "./module/GraphSummaryCard";
import {SliderChartArea} from "./module/SliderChartArea";
import useApi from "../hook/useApi";
import {useEffect, useState} from "react";
import {DateUtils} from "../utils/DateUtils";
import {LineChartArea} from "./module/LineChartArea";
import {BarChartArea} from "./module/BarChartArea";
import {PieChartArea} from "./module/PieChartArea";
import {MonthSelectModal} from "../common/modal/menu/MonthSelectModal";

const ITEM_NAMES = [
    '무선','인터넷','TV','카드','부가서비스','총 이익','개인 평균 마진','중고 개통','세컨'
]

export function DataGraph({userId}){
    const {saleApi} = useApi();
    const [summary, setSummary] = useState(null)
    const today = new Date();

    const [date, setDate] = useState(DateUtils.formatYYMM(today.getFullYear(),today.getMonth()+1))

    let fromDate = new Date(date)
    fromDate.setDate(1)
    const monthInfo = DateUtils.getMonthInfo(fromDate.getFullYear(), fromDate.getMonth());
    let toDate = new Date(date)
    toDate.setDate(monthInfo.totalDays);

    useEffect(() => {
        getGraphSummary(6)
    }, [userId, date]);


    const getGraphSummary = async (range)=>{
        let toDt = new Date(date);
        let fromDate = new Date(toDt);
        DateUtils.subMonth(fromDate, range);
        // fromDate.setMonth(toDt.getMonth()+1-range)
        fromDate.setDate(1)

        const body = {
            user_id: userId,
            from_ymd: DateUtils.dateToStringYYMMdd(fromDate),
            to_ymd: DateUtils.dateToStringYYMMdd(toDt),
        }
        // console.table(body)
        await saleApi.getGraphSummary(body).then(({status,data})=>{
            if(status === 200 && data){
                // console.table(data)
                setSummary(data)
            }
        })
    }



    const selectDate = (year,month)=>{
        setDate(DateUtils.formatYYMM(year,month))
    }


    return (
        <div className={Graph.graph_panel}>
            <div className={Graph.graph_group} style={{
                marginBottom: '20px'
            }}>
                <LineChartArea userId={userId}/>
            </div>

            <div className={Graph.graph_group} style={{
                marginBottom: '-24px',
                textAlign: "right",
            }}>
                <MonthSelectModal onSelect={selectDate}>
                    <input type="text" className="inp date" value={date}
                           placeholder="날짜 선택" readOnly/>
                </MonthSelectModal>
                <button type="button" className="btn_all" style={{
                    marginLeft: 0
                }}>전체 보기</button>
            </div>

            <div className={Graph.graph1} >
                <div className={Graph.graph_scroll}  style={{
                    marginTop: '44px'
                }}>
                    <ul className={Graph.graph_list}>
                        {
                            summary && summary.map((v, i) => {
                                return <GraphSummaryCard key={i} index={i} title={ITEM_NAMES[i]}
                                                         value={v.value ?? 0}
                                                         price={i >= 5 && i <= 6}
                                                         per={v.per}
                                                         // data={v.list && JSON.parse(v.list)}
                                />
                            })
                        }
                    </ul>
                </div>
            </div>

            <div className={cm(Graph.graph_group, Graph.graph4_group)}>
                <BarChartArea fromDate={fromDate} toDate={toDate} userId={userId}/>
                <SliderChartArea fromDate={fromDate} toDate={toDate} userId={userId}/>
                <PieChartArea fromDate={fromDate} toDate={toDate} userId={userId}/>

            </div>


        </div>
    )
}