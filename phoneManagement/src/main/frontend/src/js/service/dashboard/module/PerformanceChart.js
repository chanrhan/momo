import {cm} from "../../../utils/cm";
import Dashboard from "../../../../css/dashboard.module.css";
import {LineChartInstance} from "../../../analysis/module/LineChartInstance";
import {DateUtils} from "../../../utils/DateUtils";
import {useEffect, useState} from "react";
import useApi from "../../../hook/useApi";
import {TabList} from "../../../common/module/TabList";
import {NumberUtils} from "../../../utils/NumberUtils";
import {value} from "lodash/seq";
import {LMD} from "../../../common/LMD";
import {MultiLineChartInstance} from "../../../analysis/module/MultiLineChartInstance";

const DATE_TYPE = [
    'd','w','m'
]

export function PerformanceChart({userInfo, categoryTab, chartClassName, pannelClassName}){
    console.log(`tab:${categoryTab}`)
    const {saleApi} = useApi();
    const [tab2, setTab2] = useState(0) // 일별, 주별, 월별

    const [graphData, setGraphData] = useState([])
    const [graphLabel, setGraphLabel] = useState(null)
    const [graphTooltip, setGraphTooltip] = useState(null)

    useEffect(() => {
        getGraph(20)
    }, [userInfo, categoryTab, tab2]);

    const getGraph = async (range)=>{
        let fromDate = new Date();
        let toDate = new Date();
        // toDate.setDate(toDate.getDate());

        switch (tab2){
            case 0:
                fromDate.setDate(fromDate.getDate()-range)
                // setGraphLabel(getDayLabelArray(fromDate, toDate))
                break;
            case 1:
                fromDate.setDate(fromDate.getDate()-(7*(range-2))-(toDate.getDay()))
                // setGraphLabel(getWeekLabelArray(fromDate, toDate))
                break;
            case 2:
                fromDate.setMonth(fromDate.getMonth()-range)
                // setGraphLabel(getMonthLabelArray(fromDate, toDate))
                break;
        }

        const body = {
            from_ymd: DateUtils.dateToStringYYMMdd(fromDate),
            to_ymd: DateUtils.dateToStringYYMMdd(toDate)
        }
        let rst = null;

        switch (categoryTab){
            case LMD.cat_type.CT: // 무선
                rst = await saleApi.getCtGraphByDateType(DATE_TYPE[tab2], body);
                break;
            case LMD.cat_type.WT: // 인터넷
                rst = await saleApi.getInternetGraphByDateType(DATE_TYPE[tab2], body);
                break;
            // case LMD.cat_type.WT: // TV
            //     rst = await saleApi.getTvGraphByDateType(DATE_TYPE[tab2], body);
            //     break;
            case LMD.cat_type.TOTAL_MARGIN: // 총 이익
                rst = await saleApi.getMarginGraphByDateType(DATE_TYPE[tab2], body);
                break;
            case LMD.cat_type.AVG_MARGIN: // 평균 이익
                rst = await saleApi.getAvgMarginGraphByDateType(DATE_TYPE[tab2], body);
                break;
        }

        if(rst != null){
            const {status, data}  = rst;
            if(status === 200 && data){
                console.table(data.value1);
                if(data.value){
                    setGraphData([JSON.parse(data.value)])
                }else if(data.value1 && data.value2){
                    setGraphData([
                        JSON.parse(data.value1),
                        JSON.parse(data.value2)
                    ])
                }
                if(data.date){
                    const dateList: Array = JSON.parse(data.date)

                    setGraphLabel(getLabelArray(dateList))
                    setGraphTooltip(dateList)
                }
            }
        }
    }
    const getLabelArray = (dateArray)=>{
        const labels = [];
        for(const idx in dateArray){
            const d = new Date(dateArray[idx]);
            switch (tab2){
                case 0:
                    labels[idx] = `${d.getMonth()+1}/${d.getDate()}`
                    break;
                case 1:
                    labels[idx] = `${d.getMonth()+1}/${d.getDate()}`
                    break;
                case 2:
                    labels[idx] = `${d.getMonth()+1}월`
                    break;
            }
        }
        return labels;
    }

    return (
        <>
            <div className={chartClassName}>
                <MultiLineChartInstance tooltip_disabled color='blue'
                                   tooltips={graphTooltip} labels={graphLabel}
                                   data={graphData} yAxisCallback={v=>{
                                       if(!Number.isInteger(v)) {
                                           return;
                                       }
                                       if(categoryTab < 3) {
                                           return `${Math.round(v)}개`
                                       }
                                       return `${NumberUtils.toPrice(v)}원`
                }}/>
            </div>

            <div className={pannelClassName}>
                <ul className="tab_list">
                    {/*{children}*/}
                    <TabList name='tab2'
                             value={tab2}
                             onChange={setTab2}
                             theme={Dashboard}
                             values={
                                 ['일별', '주별', '월별']
                             }
                    />
                </ul>
            </div>
        </>
    )
}