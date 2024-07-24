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

export function Analysis(){
    const {userApi} = useApi();
    const userInfo = useSelector(state=>state.userReducer)

    const inputField = useValidateInputField([
        {
            key: 'menu',
            value: 0
        },
        {
            key: 'range',
            value: 0
        },
        {
            key: 'user',
            value: 0
        }
    ]);

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

    return (
        <div className={Layout.sub}>

            <div className={Graph.graph}>
                <div className={Graph.graph_head}>
                    <div className={`${cmc(Graph.tab)} type1`}>
                        <TabList name='menu' inputField={inputField} values={
                            ['그래프', '통계']
                        }/>
                    </div>

                    {
                        inputField.get('menu') === 0 && <div className={cmc(Graph.tab, Graph.type2)}>
                            <TabList name='range' inputField={inputField} values={
                                (userInfo.role === 1) ? ['개인', '매장'] : ['개인']
                            }/>
                        </div>
                    }


                    <div className={Graph.graph_head_group}>
                        {
                            inputField.get('menu') === 0 && <div className={cmc(Graph.tab, Graph.type3)}>
                                <TabList name='user' inputField={inputField} values={staffList}/>
                            </div>
                        }

                        <input type="text" className="inp date" placeholder="날짜 선택"/>
                        <button type="button" className="btn_all">전체 보기</button>
                    </div>
                </div>

                {
                    inputField.get('menu') === 0 ? <DataGraph/> : <Statistics/>
                }
            </div>

        </div>
    )
}