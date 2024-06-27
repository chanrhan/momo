import {cm} from "../../../utils/cm";
import Dashboard from "../../../../css/dashboard.module.css";

export function DashboardPanelItem2({title, num, per, down}){
    return (
        <li className={cm(Dashboard.panel_item)}>
            <span className={cm(Dashboard.panel_title, Dashboard.span)}>{title}</span>
            <span className={cm(Dashboard.panel_num, Dashboard.span)}>{num}</span>
            <span className={cm(Dashboard.panel_per, Dashboard.span,  `${!down ? Dashboard.up : Dashboard.down}`)}><span
                className={Dashboard.span}>{per}</span>%</span>
        </li>
    )
}