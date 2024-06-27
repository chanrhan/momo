import {cm} from "../../../utils/cm";
import Dashboard from "../../../../css/dashboard.module.css";

export function DashboardScheduleItem({color, text}){
    return (
        <li className={cm(Dashboard.schedule_item)}>
            <span className={cm(Dashboard.schedule_mark, Dashboard[color])}></span>
            <span className={cm(Dashboard.schedule_text)}>{text}</span>
            <button type="button" className={cm(Dashboard.schedule_del)}>삭제</button>
        </li>
    )
}