import {cm, cmc} from "../../utils/cm";
import Graph from "../../../css/graph.module.css";
import {TabList} from "../../common/module/TabList";
import {BarChartInstance} from "./BarChartInstance";
import {useEffect, useState} from "react";
import useApi from "../../hook/useApi";
import {DateUtils} from "../../utils/DateUtils";

export function GraphBox3({date}){
    const {saleApi} = useApi();
    const [tab, setTab] = useState(0)

    const [graphData, setGraphData] = useState(null)

    useEffect(() => {
        getGraph();
    }, [tab]);

    const getGraph = async ()=>{
        let fromDate = new Date(date)
        fromDate.setMonth(fromDate.getMonth()-1);
        fromDate.setDate(1)
        let toDate = new Date(date)
        toDate.setDate(0)

        const body = {
            from_ymd: DateUtils.dateToStringYYMMdd(fromDate),
            to_ymd: DateUtils.dateToStringYYMMdd(toDate)
        }

        await saleApi.getAvgMarginGraphBySelectType(tab, body).then(({status,data})=>{
            if(status === 200 && data){
                // console.table(data)
                setGraphData(data)
            }
        })
    }

    return (
        <div className={cm(Graph.graph3, Graph.div)}>
            <div className={Graph.graph_top}>
                <div className={Graph.graph_title}>평균 마진</div>
                <div className={cmc(Graph.tab, Graph.type4)}>
                    <TabList value={tab} onChange={setTab} values={
                        ['나이', '성별', '제조자', '개통구분', '할부']
                    }/>
                </div>
            </div>

            <div className={Graph.graph_box}>
                <BarChartInstance color={`#4781ff`} hoverColor={`#88adff`} data={graphData} x_axis_disabled
                                  y_axis_disabled/>
            </div>
        </div>
    )
}