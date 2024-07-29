import Dashboard from "../../../css/dashboard.module.css";
import {DashboardPanelItem1} from "./module/DashboardPanelItem1";
import {cm} from "../../utils/cm";
import {DashboardPanelItem2} from "./module/DashboardPanelItem2";
import {DashboardChart} from "./module/DashboardChart";
import {DashboardPannelItem4} from "./module/DashboardPannelItem4";
import {DashboardPannelItem5} from "./module/DashboardPannelItem5";
import {DashboardInfo} from "./module/DashboardInfo";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import useApi from "../../hook/useApi";
import {DateUtils} from "../../utils/DateUtils";
import {useObjectArrayInputField} from "../../hook/useObjectArrayInputField";
import {NumberUtils} from "../../utils/NumberUtils";

export function DashboardMain(){
    const {saleApi} = useApi();

    const userInfo = useSelector(state=>state.userReducer);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const day = today.getDate();

    const [summary, setSummary] = useState(new Array(5).fill({
        value: 0,
        pct: 0
    }))

    const [totalSaleCount, setTotalSaleCount ] = useState(0)
    const [saleRatio, setSaleRatio] = useState(new Array(3).fill({
        value: 0,
        total: 0,
        pct: 0
    }))

    // work in process
    const [wip, setWip] = useState(new Array(5).fill({
        value: 0,
        total: 0,
        pct: 0
    }))

    useEffect(() => {
        getSummary()
        getSaleRaio()
        getWorkInProcess()
    }, []);

    const getSummary = async ()=>{
        const prev = DateUtils.formatYYMM(year, month-1);
        const curr = DateUtils.formatYYMM(year,month)

        await saleApi.getSummary(prev, curr).then(({status,data})=>{
            if(status === 200 && data){
                setSummary(data)
            }
        })
    }

    const getSaleRaio = async ()=>{
        await saleApi.getSaleRatio(DateUtils.formatYYMM(year,month)).then(({status,data})=>{
            if(status === 200 && data){
                setSaleRatio(data)
            }
        })
    }

    const getWorkInProcess = async ()=>{
        await saleApi.getWorkInProcess(DateUtils.formatYYMM(year,month)).then(({status,data})=>{
            if(status === 200 && data){
                setWip(data)
            }
        })
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
                    <span className={cm(Dashboard.panel_standard, Dashboard.span)}>{today.getFullYear()}년 {today.getMonth()+1}월 <span className={cm(Dashboard.span)}>매장</span> 기준</span>
                </div>
                <div className={cm(Dashboard.panel_body)}>
                    <div className={Dashboard.panel_group}>
                        <div className={cm(Dashboard.panel, Dashboard.n1)}>
                            <ul className={Dashboard.panel_list}>
                                <DashboardPanelItem1 title='무선' num={summary[0].value} per={summary[0].pct}/>
                                <DashboardPanelItem1 title='인터넷'  num={summary[1].value} per={summary[1].pct}/>
                                <DashboardPanelItem1 title='TV'  num={summary[2].value} per={summary[2].pct}/>
                                <DashboardPanelItem1 title='총 이익' num={NumberUtils.toPrice(summary[3].value)} per={summary[3].pct} price/>
                                <DashboardPanelItem1 title='평균 이익' num={NumberUtils.toPrice(summary[4].value)} per={summary[4].pct} price/>
                            </ul>
                        </div>
                        <div className={cm(Dashboard.panel, Dashboard.n2)}>
                            <ul className={cm(Dashboard.panel_list)}>
                                <DashboardPanelItem2 title='카드' value={saleRatio[0].value} total={saleRatio[0].total} per={saleRatio[0].pct}/>
                                <DashboardPanelItem2 title='세컨' value={saleRatio[1].value} total={saleRatio[1].total} per={saleRatio[1].pct}/>
                                <DashboardPanelItem2 title='부가서비스' value={saleRatio[2].value} total={saleRatio[2].total} per={saleRatio[2].pct}/>
                            </ul>
                        </div>
                    </div>

                    <div className={cm(Dashboard.panel_group)}>
                        <div className={cm(Dashboard.panel, Dashboard.n3)}>
                            <DashboardChart/>
                        </div>
                        <div className={cm(Dashboard.panel, Dashboard.n4)}>
                            <div className={cm(Dashboard.panel_name)}>미완료 업무</div>
                            <ul className={cm(Dashboard.panel_list)}>
                                <DashboardPannelItem4 title='중고폰' value={wip[0].value} total={wip[0].total} per={wip[0].pct}/>
                                <DashboardPannelItem4 title='카드' value={wip[1].value} total={wip[1].total} per={wip[1].pct}/>
                                <DashboardPannelItem4 title='결합' value={wip[2].value} total={wip[2].total} per={wip[2].pct}/>
                                <DashboardPannelItem4 title='지원' value={wip[3].value} total={wip[3].total} per={wip[3].pct}/>
                                <DashboardPannelItem4 title='고객약속' value={wip[4].value} total={wip[4].total} per={wip[4].pct}/>
                            </ul>
                        </div>
                    </div>

                    <div className={cm(Dashboard.panel_group)}>
                        <div className={cm(Dashboard.panel, Dashboard.n5)}>
                            <button type="button" className="btn btn_blue btn_small btn_add_icon">추가</button>
                            <ul className={cm(Dashboard.panel_list)}>
                                <DashboardPannelItem5/>
                                <DashboardPannelItem5/>
                                <DashboardPannelItem5/>
                                <DashboardPannelItem5/>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            <DashboardInfo/>

        </div>
    )
}