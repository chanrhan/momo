import Dashboard from "../../../css/dashboard.module.css";
import {DashboardPanelItem1} from "./module/DashboardPanelItem1";
import {cm} from "../../utils/cm";
import {DashboardPanelItem2} from "./module/DashboardPanelItem2";
import {DashboardChart} from "./module/DashboardChart";
import {DashboardPannelItem4} from "./module/DashboardPannelItem4";
import {DashboardInfo} from "./module/DashboardInfo";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import useApi from "../../hook/useApi";
import {DateUtils} from "../../utils/DateUtils";
import {NumberUtils} from "../../utils/NumberUtils";
import {ObjectUtils} from "../../utils/objectUtil";
import {DashboardPostImage} from "./module/DashboardPostImage";
import {useNavigate} from "react-router-dom";
import {MonthSelectModal} from "../../common/modal/menu/MonthSelectModal";

const SUMMARY_NAMES = [
    '무선','인터넷','TV','총 이익','평균 이익'
]

const RATIO_NAMES = [
    '카드','세컨','부가서비스'
]

const WIP_NAMES = [
    '중고폰','카드','결합','지원','고객약속'
]

const TASK_URL = [
    'used-device',
    'card',
    'comb',
    'support',
    'promise'
]

export function DashboardMain(){
    const {saleApi} = useApi();
    const nav = useNavigate();

    const userInfo = useSelector(state=>state.userReducer);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const day = today.getDate();

    const [date, setDate] = useState(today)

    const [summary, setSummary] = useState(new Array(5).fill({
        value: 0,
        pct: 0
    }))

    const [saleRatio, setSaleRatio] = useState(new Array(3).fill({
        value: 0,
        total: 0,
        pct: 0
    }))

    // work in process
    const [wip, setWip] = useState(new Array(5).fill(0))

    useEffect(() => {
        getSummary()
        getSaleRaio()
        getWorkInProcess()
    }, [userInfo, date]);

    const getSummary = async ()=>{
        const prevDate = new Date(date)
        prevDate.setMonth(date.getMonth()-1)
        const prev = DateUtils.dateToStringYYMM(prevDate)
        const curr = DateUtils.dateToStringYYMM(date)

        await saleApi.getSummary(prev, curr).then(({status,data})=>{
            if(status === 200 && data){
                setSummary(data)
            }
        })
    }

    const getSaleRaio = async ()=>{
        await saleApi.getSaleRatio(DateUtils.dateToStringYYMM(date)).then(({status,data})=>{
            if(status === 200 && data){
                setSaleRatio(data)
            }
        })
    }

    const getWorkInProcess = async ()=>{
        await saleApi.getWorkInProcess().then(({status,data})=>{
            if(status === 200 && data){
                setWip(data)
            }
        })
    }

    const selectDate = (year, month)=>{
        const newDate = new Date()
        newDate.setFullYear(year)
        newDate.setMonth(month-1)
        setDate(newDate)
    }

    const setNextMonth = ()=>{
        const newDate = new Date(date);
        DateUtils.addMonth(newDate, 1);
        setDate(newDate)
    }

    const setPrevMonth = ()=>{
        const newDate = new Date(date);
        DateUtils.subMonth(newDate, 1);
        setDate(newDate)
    }

    // 승인 대기중일 때 아래 페이지 표출
    // if(true){
    //     return <WaitingApproval/>
    // }

    return (
        <div className={cm(Dashboard.dashboard)}>
            <div className={cm(Dashboard.dashboard_panel, Dashboard.div)}>
                <div className={cm(Dashboard.panel_head)}>
                    <span className={cm(Dashboard.panel_greeting, Dashboard.span)}>안녕하세요, {userInfo.name} {userInfo.nickname} 님 !</span>
                </div>
                <div className={cm(Dashboard.panel_body)}>
                    <div className={Dashboard.current_month_box}>
                        <div className={Dashboard.panel_date_box}>
                        <span className={cm(Dashboard.panel_standard)}>
                            <span className={cm(Dashboard.span)}>
                                <span className={Dashboard.btn_left_arrow} onClick={setPrevMonth}></span>
                                <MonthSelectModal onSelect={selectDate}>
                                    <div className={Dashboard.date_inp}>
                                        <span className={Dashboard.text_blue}>{date.getFullYear()}</span>년 <span
                                        className={Dashboard.text_blue}>{(date.getMonth() + 1).toString().padStart(2, 0)}</span>월
                                    </div>
                                </MonthSelectModal>
                                <span className={Dashboard.btn_right_arrow} onClick={setNextMonth}></span>
                                {/*{today.getFullYear()}년*/}
                                {/*{today.getMonth() + 1}월*/}
                            </span> 매장 기준
                        </span>
                        </div>
                        <div className={Dashboard.panel_group}>
                            <div className={cm(Dashboard.panel, Dashboard.n1)}>
                                <ul className={Dashboard.panel_list}>
                                    {
                                        summary && summary.map((v, i) => {
                                            if (ObjectUtils.isEmpty(v)) {
                                                return null;
                                            }
                                            return <DashboardPanelItem1 key={i} index={i} title={SUMMARY_NAMES[i]}
                                                                        num={i < 3 ? v.value : NumberUtils.toPrice(summary[i].value)}
                                                                        per={v.per} price={i > 2} onClick={() => {
                                                nav('/service/analysis')
                                            }}/>
                                        })
                                    }
                                </ul>
                            </div>
                            <div className={cm(Dashboard.panel, Dashboard.n2)}>
                                <ul className={cm(Dashboard.panel_list)}>
                                    {
                                        saleRatio && saleRatio.map((v, i) => {
                                            if (ObjectUtils.isEmpty(v)) {
                                                return null;
                                            }
                                            return <DashboardPanelItem2 key={i} title={RATIO_NAMES[i]}
                                                                        value={v.value} total={v.total} per={v.per}
                                                                        onClick={() => {
                                                                            nav('/service/analysis')
                                                                        }}/>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>


                    <div className={cm(Dashboard.panel_group)}>
                        <div className={cm(Dashboard.panel, Dashboard.n3)}>
                            <DashboardChart userInfo={userInfo}/>
                        </div>
                        <div className={cm(Dashboard.panel, Dashboard.n4)}>
                            <div className={cm(Dashboard.panel_name)}>미완료 업무</div>
                            <ul className={cm(Dashboard.panel_list)}>
                                {
                                    wip && wip.map((v, i) => {
                                        if (ObjectUtils.isEmpty(v)) {
                                            return null
                                        }
                                        return <DashboardPannelItem4 key={i} title={WIP_NAMES[i]}
                                                                     value={v} onClick={() => {
                                            nav(`/service/task/${TASK_URL[i]}`)
                                        }}/>
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                    <DashboardPostImage/>
                </div>

            </div>

            <DashboardInfo/>

        </div>
    )
}