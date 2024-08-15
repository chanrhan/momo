import Dashboard from "../../../../css/dashboard.module.css"
import {cm} from "../../../utils/cm";
import {DashboardChartTabItem} from "./DashboardChartTabItem";
import {DashboardChartPannel} from "./DashboardChartPannel";
import {TabList} from "../../../common/module/TabList";
import {useEffect, useState} from "react";
import useValidateInputField from "../../../hook/useValidateInputField";
import useApi from "../../../hook/useApi";
import {DateUtils} from "../../../utils/DateUtils";
import {NumberUtils} from "../../../utils/NumberUtils";

const DATE_TYPE = [
    'd','w','m'
]

export function DashboardChart({userInfo}){
    // const tab = useTabs(2);
    const {saleApi} = useApi();
    const [tab1, setTab1] = useState(0)
    const [tab2, setTab2 ] = useState(0)

    const [amount, setAmount] = useState(0)
    const [isPrice, setIsPrice] = useState(false)
    const [isInclined, setIsInclined] = useState(true)

    const [graphData, setGraphData] = useState(null)
    const [graphLabel, setGraphLabel] = useState(null)
    const [graphTooltip, setGraphTooltip] = useState(null)

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const day = today.getDate();


    useEffect(() => {
        getChangeAmount();
    }, [userInfo,tab1]);

    useEffect(() => {
        getGraph(20)
    }, [userInfo,tab1, tab2]);

    const getChangeAmount = async ()=>{
        const body = {
            prev_from_ymd: DateUtils.formatYYMMdd(year, month-1, 1),
            prev_to_ymd: DateUtils.formatYYMMdd(year, month-1, day),
            curr_from_ymd: DateUtils.formatYYMMdd(year, month, 1),
            curr_to_ymd: DateUtils.formatYYMMdd(year, month, day),
        }

        let rst = null;
        if(tab1 < 3){
            switch (tab1){
                case 0:
                    rst = await saleApi.getCtChangeAmount(body);
                    break;
                case 1:
                    rst = await saleApi.getInternetChangeAmount(body);
                    break;
                case 2:
                    rst = await saleApi.getTvChangeAmount(body);
                    break;
            }
            if(rst != null){
                const {status,data} = rst;
                if(status === 200){
                    setIsInclined(data > 0);
                    setIsPrice(false)
                    setAmount(data)
                }
            }
        }else{
            switch (tab1){
                case 3:
                    rst = await saleApi.getTotalCmsChangeAmount(body);
                    break;
                case 4:
                    rst = await saleApi.getAvgCmsChangeAmount(body);
                    break;
            }


            if(rst != null){
                const {status,data} = rst;
                if(status === 200){
                    setIsInclined(data > 0);
                    setIsPrice(true)
                    setAmount(NumberUtils.toPrice(data))
                }
            }
        }

    }

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

        switch (tab1){
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
        <div className={cm(Dashboard.panel_chart)}>
            <p className={cm(Dashboard.chart_text)}>{month-1}월 1일 ~ {month-1}월 {day}일 실적 대비<br/>{amount}{isPrice ? '원':'대'} {isInclined ? '늘었어요':'줄었어요'}.</p>

            <div className={cm(Dashboard.chart_tab)}>
                <TabList name='tab1'
                         value={tab1}
                         onChange={setTab1}
                         theme={Dashboard}
                         values={
                    ['무선','인터넷','TV','총이익','평균이익']
                }/>
            </div>

            <div className={cm(Dashboard.chart_panel_wrap)}>
                <DashboardChartPannel title='무선' tooltips={graphTooltip} labels={graphLabel} data={graphData} active>
                    <TabList name='tab2'
                             value={tab2}
                             onChange={setTab2}
                             theme={Dashboard}
                             values={
                        ['일별','주별','월별']
                             }
                    />
                </DashboardChartPannel>
                <DashboardChartPannel title='TV'>
                    <DashboardChartTabItem tabName='일별' active/>
                    <DashboardChartTabItem tabName='주별'/>
                    <DashboardChartTabItem tabName='월별'/>
                </DashboardChartPannel>
                <DashboardChartPannel title='인터넷'>
                    <DashboardChartTabItem tabName='일별' active/>
                    <DashboardChartTabItem tabName='주별'/>
                    <DashboardChartTabItem tabName='월별'/>
                </DashboardChartPannel>
                <DashboardChartPannel title='총 이익'>
                    <DashboardChartTabItem tabName='일별' active/>
                    <DashboardChartTabItem tabName='주별'/>
                    <DashboardChartTabItem tabName='월별'/>
                </DashboardChartPannel>
                <DashboardChartPannel title='평균 이익'>
                    <DashboardChartTabItem tabName='일별' active/>
                    <DashboardChartTabItem tabName='주별'/>
                    <DashboardChartTabItem tabName='월별'/>
                </DashboardChartPannel>

            </div>
        </div>
    )
}