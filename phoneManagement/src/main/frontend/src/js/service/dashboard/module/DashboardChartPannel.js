import {cm} from "../../../utils/cm";
import Dashboard from "../../../../css/dashboard.module.css";
import {LineChartInstance} from "../../../analysis/module/LineChartInstance";


export function DashboardChartPannel({title, tooltips, labels, data, active, children}){
    return (
        <div className={cm(Dashboard.chart_panel, `${active && Dashboard.active}`)}>
            {/*활성화시 active 추가 */}
            <div className={cm(Dashboard.chart_map)} >
                <LineChartInstance color='blue' tooltips={tooltips} labels={labels} data={data}/>
            </div>

            <div className={cm(Dashboard.chart_panel_tab)}>
                <ul className="tab_list">
                    {children}
                </ul>
            </div>
        </div>
    )
}