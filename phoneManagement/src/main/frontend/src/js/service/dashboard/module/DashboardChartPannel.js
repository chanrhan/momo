import {cm} from "../../../utils/cm";
import Dashboard from "../../../../css/dashboard.module.css";

export function DashboardChartPannel({title, active, children}){
    return (
        <div className={cm(Dashboard.chart_panel, `${active && Dashboard.active}`)}>
            {/*활성화시 active 추가 */}
            <div className={cm(Dashboard.chart_map)}>{title} 영역</div>

            <div className={cm(Dashboard.chart_panel_tab)}>
                <ul className="tab_list">
                    {children}
                </ul>
            </div>
        </div>
    )
}