import {cm} from "../../../utils/cm";
import Dashboard from "../../../../css/dashboard.module.css";
import {LineChartInstance} from "../../../analysis/module/LineChartInstance";

const LABEL_SAMPLE = [
    '일별','주별','월별'
]

const CHART_DATA_SAMPLE = [
    20, 50, 30, 10, 60
]

export function DashboardChartPannel({title, active, children}){
    return (
        <div className={cm(Dashboard.chart_panel, `${active && Dashboard.active}`)}>
            {/*활성화시 active 추가 */}
            <div className={cm(Dashboard.chart_map)}>
                <LineChartInstance color='blue' labels={LABEL_SAMPLE} data={CHART_DATA_SAMPLE}/>
            </div>

            <div className={cm(Dashboard.chart_panel_tab)}>
                <ul className="tab_list">
                    {children}
                </ul>
            </div>
        </div>
    )
}