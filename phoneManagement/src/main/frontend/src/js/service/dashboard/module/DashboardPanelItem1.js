import Dashboard from "../../../../css/dashboard.module.css";
import {cm} from "../../../utils/cm";

export function DashboardPanelItem1({title, num, per, down}){
    return (
        <li className={cm(Dashboard.panel_item)}>
            <div className={Dashboard.panel_title}>{title}</div>
            <div className={Dashboard.panel_num}><span className={Dashboard.span}>{num}</span>대</div>
            <div className={`${Dashboard.panel_per} ${!down ? Dashboard.up : Dashboard.down}`}><span
                className={`${Dashboard.per_arrow}`}>{!down ? "▲" : "▼"}</span> {per}%<span
                className={cm(Dashboard.per_text)}>(전월 대비)</span></div>
        </li>
    )
}