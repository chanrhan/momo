import Layout from "../../css/layout.module.css";
import Graph from "../../css/graph.module.css";
import {cm, cmc} from "../utils/cm";
import {TabList} from "../common/module/TabList";
import {GraphSummaryCard} from "./module/GraphSummaryCard";
import graphImg1 from "../../images/graph_img1.png";
import {GraphBarCard} from "./module/GraphBarCard";
import {GraphBarItem} from "./module/GraphBarItem";
import useValidateInputField from "../hook/useValidateInputField";
import {LineChartInstance} from "./module/LineChartInstance";
import {BarChartInstance} from "./module/BarChartInstance";
import useApi from "../hook/useApi";
import {useEffect, useState} from "react";
import {DateUtils} from "../utils/DateUtils";
import {NumberUtils} from "../utils/NumberUtils";
import {GraphBox2} from "./module/GraphBox2";
import {GraphBox3} from "./module/GraphBox3";

const ITEM_NAMES = [
    '무선','인터넷','TV','총 이익','개인 평균 마진','중고 개통','세컨'
]

export function DataGraph(){
    const {saleApi} = useApi();

    const toDate = new Date();

    const [summary, setSummary] = useState(null)

    useEffect(() => {
        getGraphSummary(6);
    }, []);


    const getGraphSummary = async (range)=>{
        let fromDate = new Date();
        fromDate.setMonth(fromDate.getMonth()+1-range)
        fromDate.setDate(1)
        let toDt = new Date(toDate);
        const body = {
            from_ymd: DateUtils.dateToStringYYMMdd(fromDate),
            to_ymd: DateUtils.dateToStringYYMMdd(toDt),
        }
        await saleApi.getGraphSummary(body).then(({status,data})=>{
            if(status === 200 && data){
                // console.table(data)
                setSummary(data)
            }
        })
    }



    return (
        <div className={Graph.graph_panel}>

            <div className={Graph.graph1}>
                <div className="graph_scroll">
                    <ul className={Graph.graph_list}>
                        {
                            summary && summary.map((v,i)=>{
                                return  <GraphSummaryCard title={ITEM_NAMES[i]}
                                                          value={v.value}
                                                          price={i >=3 && i<=4}
                                                          per={v.per}
                                                          data={v.list && JSON.parse(v.list)}/>
                            })
                        }
                    </ul>
                </div>
            </div>

            <div className={Graph.graph_group}>
                <GraphBox2 date={toDate}/>
                <GraphBox3 date={toDate}/>
            </div>

            <div className={cm(Graph.graph_group, Graph.graph4_group)}>
                <GraphBarCard title='개통 모델'>
                    <GraphBarItem text='갤럭시 S24U' per='80'/>
                    <GraphBarItem text='갤럭시 S24U' per='80'/>
                    <GraphBarItem text='갤럭시 S24U' per='80'/>
                    <GraphBarItem text='갤럭시 S24U' per='80'/>
                </GraphBarCard>
                <GraphBarCard title='개통 요금제'>
                    <GraphBarItem text='갤럭시 S24U' per='80'/>
                </GraphBarCard>
                <GraphBarCard title='세컨'>
                    <GraphBarItem text='갤럭시 S24U' per='80'/>
                </GraphBarCard>

            </div>

        </div>
    )
}