import Dashboard from "../../../css/dashboard.module.css";
import {DashboardPanelItem1} from "./module/DashboardPanelItem1";
import {cm} from "../../utils/cm";
import {DashboardPanelItem2} from "./module/DashboardPanelItem2";
import {DashboardChart} from "./module/DashboardChart";
import {DashboardPannelItem4} from "./module/DashboardPannelItem4";
import {DashboardPannelItem5} from "./module/DashboardPannelItem5";
import {DashboardInfo} from "./module/DashboardInfo";
import {WaitingApproval} from "../../layout/WaitingApproval";

export function DashboardMain(){


    // 승인 대기중일 때 아래 페이지 표출
    // if(true){
    //     return <WaitingApproval/>
    // }

    return (
        <div className={cm(Dashboard.dashboard)}>
            <div className={cm(Dashboard.dashboard_panel, Dashboard.div)}>
                <div className={cm(Dashboard.panel_head)}>
                    <span className={cm(Dashboard.panel_greeting, Dashboard.span)}>안녕하세요, 박상인 점장 님 !</span>
                    <span className={cm(Dashboard.panel_standard, Dashboard.span)}>2024년 4월 <span className={cm(Dashboard.span)}>매장</span> 기준</span>
                </div>
                <div className={cm(Dashboard.panel_body)}>
                    <div className={Dashboard.panel_group}>
                        <div className={cm(Dashboard.panel, Dashboard.n1)}>
                            <ul className={Dashboard.panel_list}>
                                <DashboardPanelItem1 title='무선' num='9' per='1.2'/>
                                <DashboardPanelItem1 title='인터넷' num='9' per='1.2'/>
                                <DashboardPanelItem1 title='TV' num='9' per='1.2'/>
                                <DashboardPanelItem1 title='총 이익' num='9' per='1.2'/>
                                <DashboardPanelItem1 title='평균 이익' num='9' per='1.2' down/>
                            </ul>
                        </div>
                        <div className={cm(Dashboard.panel, Dashboard.n2)}>
                            <ul className={cm(Dashboard.panel_list)}>
                                <DashboardPanelItem2 title='카드' num='3/2' per='40'/>
                                <DashboardPanelItem2 title='세컨' num='3/2' per='40'/>
                                <DashboardPanelItem2 title='부가서비스' num='3/2' per='40' />
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
                                <DashboardPannelItem4 title='카드' num='3/2' per='40'/>
                                <DashboardPannelItem4 title='카드' num='3/2' per='40'/>
                                <DashboardPannelItem4 title='카드' num='3/2' per='40'/>
                                <DashboardPannelItem4 title='카드' num='3/2' per='40'/>
                                <DashboardPannelItem4 title='카드' num='3/2' per='40'/>
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