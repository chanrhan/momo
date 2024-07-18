import Dashboard from "../../../../css/dashboard.module.css"
import {cm} from "../../../utils/cm";
import {DashboardChartTabItem} from "./DashboardChartTabItem";
import {DashboardChartPannel} from "./DashboardChartPannel";
import {TabList} from "../../../common/module/TabList";
import {useState} from "react";
import useValidateInputField from "../../../hook/useValidateInputField";

export function DashboardChart(){
    // const tab = useTabs(2);
    const inputField = useValidateInputField();

    return (
        <div className={cm(Dashboard.panel_chart)}>
            <p className={cm(Dashboard.chart_text)}>3월 1일 ~ 3월 11일 실적 대비<br/>121,000원 늘었어요.</p>

            <div className={cm(Dashboard.chart_tab)}>
                <TabList name='tab1'
                         inputField={inputField}
                         theme={Dashboard}
                         values={
                    ['무선','인터넷','TV','총이익','평균이익']
                }/>
            </div>

            <div className={cm(Dashboard.chart_panel_wrap)}>
                <DashboardChartPannel title='차트' active>
                    <TabList name='tab2'
                             inputField={inputField}
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