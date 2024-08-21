import {cm} from "../../../utils/cm";
import Dashboard from "../../../../css/dashboard.module.css";
import {LineChartInstance} from "../../../analysis/module/LineChartInstance";
import {DateUtils} from "../../../utils/DateUtils";
import {useEffect, useState} from "react";
import useApi from "../../../hook/useApi";
import {TabList} from "../../../common/module/TabList";

const DATE_TYPE = [
    'd','w','m'
]

export function PerformanceChart({userInfo, categoryTab, chartClassName, pannelClassName}){
    const {saleApi} = useApi();
    const [tab2, setTab2] = useState(0)

    const [graphData, setGraphData] = useState(null)
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
                setGraphLabel(getDayLabelArray(fromDate, toDate))
                break;
            case 1:
                fromDate.setDate(fromDate.getDate()-(range*7))
                setGraphLabel(getWeekLabelArray(fromDate, toDate))
                break;
            case 2:
                fromDate.setMonth(fromDate.getMonth()-range)
                setGraphLabel(getMonthLabelArray(fromDate, toDate))
                break;
        }

        const body = {
            from_ymd: DateUtils.dateToStringYYMMdd(fromDate),
            to_ymd: DateUtils.dateToStringYYMMdd(toDate)
        }
        let rst = null;

        switch (categoryTab){
            case 0:
                rst = await saleApi.getCtGraphByDateType(DATE_TYPE[tab2], body);
                break;
            case 1:
                rst = await saleApi.getInternetGraphByDateType(DATE_TYPE[tab2], body);
                break;
            case 2:
                rst = await saleApi.getTvGraphByDateType(DATE_TYPE[tab2], body);
                break;
            case 3:
                rst = await saleApi.getMarginGraphByDateType(DATE_TYPE[tab2], body);
                break;
            case 4:
                rst = await saleApi.getAvgMarginGraphByDateType(DATE_TYPE[tab2], body);
                break;
        }

        if(rst != null){
            const {status, data}  = rst;
            if(status === 200 && data){
                if(data.value){
                    setGraphData(JSON.parse(data.value))
                }
                if(data.date){
                    setGraphTooltip(JSON.parse(data.date))
                }
            }
        }
    }

    const getDayLabelArray = (fromDate, toDate)=>{
        const startDate = new Date(fromDate);
        const endDate = new Date(toDate);

        let arr = [];
        while(startDate < endDate){
            // const year = startDate.getFullYear() - 2000;
            const month = startDate.getMonth()+1;
            const day = startDate.getDate();
            arr.push(`${month}/${day}`);
            startDate.setDate(day+1);
        }
        // console.table(arr)
        return arr;
    }

    const getWeekLabelArray = (fromDate, toDate)=>{
        const startDate = new Date(fromDate);
        const endDate = new Date(toDate);

        let arr = [];
        while(startDate <= endDate){
            const {month, weekOfMonth} = DateUtils.getMonthAndWeek(startDate.getFullYear(), DateUtils.getYearWeek(startDate))
            arr.push(`${month}월 ${weekOfMonth}주`);
            startDate.setDate(startDate.getDate()+7);
        }
        // console.table(arr)
        return arr;
    }

    const getMonthLabelArray = (fromDate, toDate)=>{
        const startDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), 1);
        const endDate = new Date(toDate.getFullYear(), toDate.getMonth(), 1);
        // console.log(startDate)
        // console.log(endDate)

        let arr = [];
        while(startDate < endDate){
            // const year = startDate.getFullYear();
            const month = startDate.getMonth()+1;
            arr.push(`${month}월`);
            startDate.setMonth(month);
        }
        // console.table(arr)
        return arr;
    }

    return (
        <>
            <div className={chartClassName}>
                <LineChartInstance tooltip_disabled color='blue' tooltips={graphTooltip} labels={graphLabel} data={graphData}/>
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