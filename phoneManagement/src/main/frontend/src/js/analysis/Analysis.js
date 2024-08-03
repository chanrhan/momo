import Graph from "../../css/graph.module.css"
import Layout from "../../css/layout.module.css"
import {cm, cmc} from "../utils/cm";
import {GraphSummaryCard} from "./module/GraphSummaryCard";
import graphImg1 from "../../images/graph_img1.png"
import {TabList} from "../common/module/TabList";
import {useEffect, useState} from "react";
import {GraphBarItem} from "./module/GraphBarItem";
import {GraphBarCard} from "./module/GraphBarCard";
import {DataGraph} from "./DataGraph";
import {Statistics} from "./Statistics";
import useValidateInputField from "../hook/useValidateInputField";
import useApi from "../hook/useApi";
import {useSelector} from "react-redux";
import {MonthSelectLayer} from "../common/modal/menu/MonthSelectLayer";
import {DateUtils} from "../utils/DateUtils";

export function Analysis(){
    const {userApi} = useApi();
    const userInfo = useSelector(state=>state.userReducer)

    const [tab1, setTab1 ] = useState(0)
    const [tab2, setTab2 ] = useState(0)
    const [tab3, setTab3 ] = useState(0)

    const today = new Date();
    const [keydate, setKeydate] = useState(DateUtils.formatYYMM(today.getFullYear(),today.getMonth()+1))

    const [staffList, setStaffList] = useState([])

    useEffect(() => {
        getInnerStaff();
    }, []);

    const getInnerStaff = async ()=>{
        const {role} = userInfo;
        if(role === 1){
            await userApi.getInnerStaffName().then(({status,data})=>{
                if(status === 200 && data){
                    setStaffList(data)
                }
            })
        }else{
            setStaffList([userInfo.name])
        }
    }

    const selectDate = (year,month)=>{
        setKeydate(DateUtils.formatYYMM(year,month))
    }

    return (
        <div className={Layout.sub}>

            <div className={Graph.graph}>
                <div className={Graph.graph_head}>
                    <div className={`${cmc(Graph.tab)} type1`}>
                        <TabList value={tab1} onChange={setTab1} values={
                            ['그래프', '통계']
                        }/>
                    </div>

                    {
                        tab1 === 0 && (
                            <div className={cmc(Graph.tab, Graph.type2)}>
                                <TabList value={tab2} onChange={setTab2} values={
                                    (userInfo.role === 1) ? ['개인', '매장'] : ['개인']
                                }/>
                            </div>
                        )
                    }


                    <div className={Graph.graph_head_group}>
                        {
                            tab1 === 0 && <div className={cmc(Graph.tab, Graph.type3)}>
                                <TabList value={tab3} onChange={setTab3} values={staffList}/>
                            </div>
                        }

                        <MonthSelectLayer onSelect={selectDate}>
                            <input type="text" className="inp date" value={keydate}
                                   placeholder="날짜 선택" readOnly/>
                        </MonthSelectLayer>
                        <button type="button" className="btn_all">전체 보기</button>
                    </div>
                </div>
                {
                    tab1 === 0 ? <DataGraph/> : <Statistics date={keydate}/>
                }
            </div>

        </div>
    )
}