import Calendar from "../../../css/calendar.module.css"
import {cm} from "../../utils/cm";

export function CalendarDetail({content, color, username, date}){
    return (
        <tr>
            <td className={Calendar.td}><span className={cm(Calendar.stat, `${Calendar[color]}`)}>예약 안됨</span>{username}</td>
            <td className={Calendar.td}>D-125</td>
            <td className={Calendar.td}>{content}</td>
            <td className={Calendar.td}>
                <button type="button" className="btn_kakao">전송</button>
            </td>
        </tr>
    )
}