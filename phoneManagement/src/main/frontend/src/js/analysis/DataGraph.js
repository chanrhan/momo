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

const ITEM_NAMES = [
    '무선','인터넷','TV','총 이익','개인 평균 마진','중고 개통','세컨'
]

export function DataGraph({userId, date}){
    const {saleApi} = useApi();
    const [summary, setSummary] = useState(null)

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
                console.table(data)
                setSummary(data)
            }
        })
    }

    let fromDate = new Date(date)
    fromDate.setDate(1)
    const monthInfo = DateUtils.getMonthInfo(fromDate.getFullYear(), fromDate.getMonth());
    let toDate = new Date(date)
    toDate.setDate(monthInfo.totalDays);


    return (
        <div className={Graph.graph_panel}>

            <div className={Graph.graph1}>
                <div className={Graph.graph_scroll}>
                    <ul className={Graph.graph_list}>
                        {
                            summary && summary.map((v, i) => {
                                return <GraphSummaryCard index={i} title={ITEM_NAMES[i]}
                                                         value={v.value ?? 0}
                                                         price={i >= 3 && i <= 4}
                                                         per={v.per}
                                                         data={v.list && JSON.parse(v.list)}/>
                            })
                        }
                    </ul>
                </div>
            </div>

            <div className={Graph.graph_group} style={{
                marginTop: '25px'
            }}>
                <LineChartArea date={date} userId={userId}/>
            </div>

            <div className={cm(Graph.graph_group, Graph.graph4_group)}>
                <BarChartArea fromDate={fromDate} toDate={toDate} userId={userId}/>
                <SliderChartArea fromDate={fromDate} toDate={toDate} userId={userId}/>
                <PieChartArea fromDate={fromDate} toDate={toDate} userId={userId}/>

            </div>


        </div>
    )
}