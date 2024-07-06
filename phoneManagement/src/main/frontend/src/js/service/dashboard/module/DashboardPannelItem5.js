import {cm} from "../../../utils/cm";
import Dashboard from "../../../../css/dashboard.module.css";

export function DashboardPannelItem5({}){
    return (
        <li className={cm(Dashboard.panel_item)}>
            <div className={cm(Dashboard.panel_item_head)}>
                <input type="text" className={cm(Dashboard.panel_item_text)}/>
                <button type="button" className={cm(Dashboard.panel_item_del)}>삭제</button>
            </div>
            <div className={cm(Dashboard.panel_item_body)}>
                <button type="button" className={cm(Dashboard.panel_item_add)}>추가</button>
            </div>
        </li>
    )
}