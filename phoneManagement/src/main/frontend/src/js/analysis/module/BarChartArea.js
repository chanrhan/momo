import {cm, cmc} from "../../utils/cm";
import Graph from "../../../css/graph.module.css";
import {TabList} from "../../common/module/TabList";
import {BarChartInstance} from "./BarChartInstance";
import {useEffect, useState} from "react";
import useApi from "../../hook/useApi";
import {DateUtils} from "../../utils/DateUtils";
import {ObjectUtils} from "../../utils/objectUtil";
import DataNotFound from "../../../images/empty_folder_shine.png";

export function BarChartArea({fromDate, toDate, userId}){
    const {saleApi} = useApi();
    const [tab, setTab] = useState(0)

    const [data, setData] = useState(null)

    const [labels, setLabels] = useState(null)

    useEffect(() => {
        getGraph();
        switch (tab){
            case 0:
                setLabels(['10대 미만','10대','20대','30대','40대','50대','60대','70대 이상'])
                break
            case 1:
                setLabels(['월','화','수','목','금','토','일'])
        }
    }, [tab, fromDate, userId]);

    const getGraph = async ()=>{

        const body = {
            user_id: userId,
            from_ymd: DateUtils.dateToStringYYMMdd(fromDate),
            to_ymd: DateUtils.dateToStringYYMMdd(toDate)
        }

        // console.table(body)

        await saleApi.getCtCountBySelectType(tab, body).then(({status,data})=>{
            if(status === 200 && data){
                console.table(data)
                setData(data)
            }
        })
    }

    const isEmptyData = ()=>{
        if(!data){
            return true;
        }
        for(const v of data){
            if(v !== 0){
                return false;
            }
        }
        return true;
    }

    return (
        <div className={cm(Graph.graph4, Graph.div)}>
            <div className={Graph.graph_top}>
                <div className={`${cmc(Graph.tab, Graph.type4)} ta_r`}>
                    <TabList value={tab} onChange={setTab} values={
                        ['나이별','요일별']
                    }/>
                </div>
            </div>

            <div className={Graph.graph_box}>
                {
                    isEmptyData() && <>
                        <img className={Graph.img} src={DataNotFound} alt=""/>
                    </>
                }
                <BarChartInstance labels={labels} color={`#4781ff`}
                                  hoverColor={`#88adff`} data={data}
                                  yAxisCallback={v=>{
                                      if (!Number.isInteger(v)) {
                                          return;
                                      }
                                      return `${Math.round(v)}개`

                                  }} />


            </div>
        </div>
    )
}