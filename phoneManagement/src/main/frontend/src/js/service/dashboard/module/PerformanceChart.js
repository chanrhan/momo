import Dashboard from "../../../../css/dashboard.module.css";
import {DateUtils} from "../../../utils/DateUtils";
import {useEffect, useState} from "react";
import useApi from "../../../hook/useApi";
import {TabList} from "../../../common/module/TabList";
import {NumberUtils} from "../../../utils/NumberUtils";
import {LMD} from "../../../common/LMD";
import {MultiLineChartInstance} from "../../../analysis/module/MultiLineChartInstance";
import Graph from "../../../../css/graph.module.css";

const DATE_TYPE = [
    'd','w','m'
]

const Y_AXIS_TICKS_PER = 20;

export function PerformanceChart({userInfo, categoryTab, chartClassName, pannelClassName, date}){
    // console.log(`tab:${categoryTab}`)
    const {saleApi} = useApi();
    const [dateTab, setDateTab] = useState(0) // 일별, 주별, 월별

    const [graphData, setGraphData] = useState([])
    const [graphLabel, setGraphLabel] = useState(null)
    const [graphTooltip, setGraphTooltip] = useState(null)

    const [yAxisTicksUnit, setYAxisTicksUnit] = useState(1)

    const today = new Date();

    useEffect(() => {
        getGraph(20)
    }, [userInfo, categoryTab, dateTab, date]);

    const getGraph = async (range)=>{
        let toDate = new Date(date);
        toDate.setDate(today.getDate())
        let fromDate = new Date(date);

        if(!DateUtils.equalYM(today, toDate)){
            fromDate.setDate(1)
            const monthInfo = DateUtils.getMonthInfo(fromDate.getFullYear(), fromDate.getMonth());
            switch (dateTab){
                case 0:
                    // fromDate.setDate(fromDate.getDate()-range)
                    toDate.setDate(monthInfo.totalDays)
                    // setGraphLabel(getDayLabelArray(fromDate, toDate))
                    break;
                case 1:
                    // fromDate.setDate(fromDate.getDate()-(7*(6-2))-(toDate.getDay()))
                    // DateUtils.addWeek(toDate, monthInfo.totalWeek);
                    toDate.setDate(monthInfo.totalDays)
                    // setGraphLabel(getWeekLabelArray(fromDate, toDate))
                    break;
                case 2:
                    // fromDate.setMonth(fromDate.getMonth()-5)
                    DateUtils.addMonth(toDate, 6);
                    const monthInfo2 = DateUtils.getMonthInfo(toDate.getFullYear(), toDate.getMonth());
                    toDate.setDate(monthInfo2.totalDays);
                    // setGraphLabel(getMonthLabelArray(fromDate, toDate))
                    break;
            }
        }else{
            toDate.setDate(today.getDate())
            fromDate.setDate(today.getDate())
            switch (dateTab){
                case 0:
                    // fromDate.setDate(fromDate.getDate()-range)
                    DateUtils.subDate(fromDate, range);
                    // setGraphLabel(getDayLabelArray(fromDate, toDate))
                    break;
                case 1:
                    // fromDate.setDate(fromDate.getDate()-(7*(6-2))-(toDate.getDay()))
                    DateUtils.subWeek(fromDate, 6);
                    // setGraphLabel(getWeekLabelArray(fromDate, toDate))
                    break;
                case 2:
                    // fromDate.setMonth(fromDate.getMonth()-5)
                    DateUtils.subMonth(fromDate, 6);
                    fromDate.setDate(1)
                    // setGraphLabel(getMonthLabelArray(fromDate, toDate))
                    break;
            }
        }


        const body = {
            from_ymd: DateUtils.dateToStringYYMMdd(fromDate),
            to_ymd: DateUtils.dateToStringYYMMdd(toDate)
        }
        let rst = null;

        switch (categoryTab){
            case LMD.cat_type.CT: // 무선
                rst = await saleApi.getCtGraphByDateType(DATE_TYPE[dateTab], body);
                break;
            case LMD.cat_type.WT: // 인터넷
                rst = await saleApi.getInternetGraphByDateType(DATE_TYPE[dateTab], body);
                break;
            // case LMD.cat_type.WT: // TV
            //     rst = await saleApi.getTvGraphByDateType(DATE_TYPE[tab2], body);
            //     break;
            case LMD.cat_type.TOTAL_MARGIN: // 총 이익
                rst = await saleApi.getMarginGraphByDateType(DATE_TYPE[dateTab], body);
                break;
            case LMD.cat_type.AVG_MARGIN: // 평균 이익
                rst = await saleApi.getAvgMarginGraphByDateType(DATE_TYPE[dateTab], body);
                break;
        }

        if(rst != null){
            const {status, data}  = rst;
            let unit = 1;
            if(status === 200 && data){
                // console.table(data.value1);
                if(data.value){
                    const parsed = JSON.parse(data.value)
                    setGraphData([parsed])

                    unit = Math.max(...parsed) / Y_AXIS_TICKS_PER;
                }else if(data.value1 && data.value2){
                    const parsed1 = JSON.parse(data.value1)
                    const parsed2 = JSON.parse(data.value2)
                    unit = Math.max(...parsed1, ...parsed2) / Y_AXIS_TICKS_PER;

                    setGraphData([
                        parsed1,
                        parsed2
                    ])
                }
                if(data.date){
                    const parsed: Array = JSON.parse(data.date)

                    setGraphLabel(getLabelArray(parsed))
                    setGraphTooltip(parsed)
                }
                if(unit > 10000){
                    unit = Math.ceil(unit /= 10000) * 10000;
                }
                unit = Math.ceil(unit)
                setYAxisTicksUnit(unit);

            }
        }
    }
    const getLabelArray = (dateArray)=>{
        const labels = [];
        for(const idx in dateArray){
            const d = new Date(dateArray[idx]);
            switch (dateTab){
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

    const onCreateTooltip = (titleLines, dataPoints)=>{
        let minWidth = 80
        switch (categoryTab){
            case LMD.cat_type.CT:
                minWidth = 90;
                break;
            case LMD.cat_type.WT:
                minWidth = 100;
                break;
            case LMD.cat_type.TOTAL_MARGIN:
                minWidth = 120;
                break;
            case LMD.cat_type.AVG_MARGIN:
                minWidth = 120;
                break;
        }
        return (
            <div className={Graph.tooltip_box} style={{
                minWidth: `${minWidth}px`
            }}>
                <div className={Graph.tooltip_title}>
                    {titleLines.map((title, i) => {
                        if(dateTab !== 2){
                            const tokDate = title.split('/');
                            return (
                                <div key={i}>{tokDate[0]}월 {tokDate[1]}일</div>
                            )
                        }else{
                            return (
                                <div key={i}>{title}</div>
                            )
                        }


                    })}
                </div>
                <div className={Graph.tooltip_body}>
                    {dataPoints.map(({formattedValue, datasetIndex}, i) => {
                        let index = categoryTab;
                        let unit = "개"
                        if(categoryTab === 1){
                            if(datasetIndex === 0){
                                index = 1;
                            }else{
                                index = 2;
                            }
                        }
                        else if(categoryTab > 1){
                            index += 1;
                            unit = "원"
                        }

                        return (
                            <div key={i} className={Graph.value_text}>
                                <span className={Graph.color_box} style={{
                                    backgroundColor: `${datasetIndex === 0 ? 'rgb(57,113,253)' : 'rgb(252,87,87)'}`
                                }}></span>
                                {LMD.cat_names[index]}
                                <span className={Graph.num}>{formattedValue}{unit}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
    return (
        <>
            <div className={chartClassName}>
                <MultiLineChartInstance tooltip_disabled color='blue'
                                        tooltips={graphTooltip} labels={graphLabel}
                                        data={graphData} yAxisCallback={v => {
                    if (!Number.isInteger(v) || v % yAxisTicksUnit !== 0) {
                        return;
                    }
                                       if(categoryTab < 2) {
                                           return `${Math.round(v)}개`
                                       }
                                       return `${NumberUtils.toPrice(v)}원`
                }} onCreateTooltip={onCreateTooltip}/>
            </div>

            <div className={pannelClassName}>
                <ul className="tab_list">
                    {/*{children}*/}
                    <TabList name='tab2'
                             value={dateTab}
                             onChange={setDateTab}
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