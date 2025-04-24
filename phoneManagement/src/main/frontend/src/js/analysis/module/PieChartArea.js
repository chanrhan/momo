import Graph from "../../../css/graph.module.css";
import {cm, cmc} from "../../utils/cm";
import {TabList} from "../../common/module/TabList";
import React, {useEffect, useState} from "react";
import {PieChartInstance} from "./PieChartInstance";
import useApi from "../../hook/useApi";
import {DateUtils} from "../../utils/DateUtils";
import {LMD} from "../../common/LMD";
import {ObjectUtils} from "../../utils/objectUtil";

export function PieChartArea({fromDate, toDate, userId}){
    const {saleApi} = useApi()
    const [tab, setTab] = useState(0)

    const [data, setData] = useState(null)
    const [labels, setLabels] = useState(null)

    useEffect(() => {
        getItems();
    }, [fromDate, userId, tab]);

    const getItems = async ()=>{

        const body = {
            user_id: userId,
            from_ymd: DateUtils.dateToStringYYMMdd(fromDate),
            to_ymd: DateUtils.dateToStringYYMMdd(toDate)
        }

        await saleApi.getRatio(tab, body).then(({status,data})=>{
            if(status === 200 && data){
                // console.table(data)
                const count = JSON.parse(data.cnt)
                const type = JSON.parse(data.type)
                const per = JSON.parse(data.per)

                if(data.cnt){
                    setData(count)
                }
                if(data.type){
                    let std = []
                    switch (tab){
                        case 0:
                            std = LMD.istm
                            break;
                        case 1:
                            std = LMD.maker
                            break;
                        case 2:
                            std = LMD.ct_actv_tp
                            break
                        case 3:
                            std = LMD.gender
                            break
                    }
                    setLabels(type.map((v,i)=>{
                        return `${std[v]} ${count[i]}개 (${per[i]}%)`
                    }))
                }
            }
        })
    }

    const isDataEmpty = ()=>{
        if(ObjectUtils.isEmpty(data)){
            return true;
        }
        for(const d of data){
            if(d != 0){
                return false;
            }
        }
        return true;
    }

    return (
        <div className={cm(Graph.graph4, Graph.div)}>
            <div className={Graph.graph_top}>
                <div className={`${cmc(Graph.tab, Graph.type4)} ta_r`}>
                    <TabList value={tab} onChange={setTab} values={['할부', '제조사','개통유형','성별']}/>
                </div>
            </div>

            <div className={Graph.graph_box}>
                {
                    !isDataEmpty() ? <PieChartInstance labels={labels}
                                                                   data={data} x_axis_disabled y_axis_disabled/>
                        : <div className={Graph.img_not_found}>
                        </div>
                }

            </div>
        </div>
    )
}