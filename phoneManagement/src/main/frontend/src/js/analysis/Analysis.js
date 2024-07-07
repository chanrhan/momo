import Graph from "../../css/graph.module.css"
import Layout from "../../css/layout.module.css"
import {cm, cmc} from "../utils/cm";
import {GraphSummaryCard} from "./module/GraphSummaryCard";
import graphImg1 from "../../images/graph_img1.png"
import {TabList} from "../common/module/TabList";
import {useState} from "react";
import {GraphBarItem} from "./module/GraphBarItem";
import {GraphBarCard} from "./module/GraphBarCard";
import {DataGraph} from "./DataGraph";
import {Statistics} from "./Statistics";
import useInputField from "../hook/useInputField";

export function Analysis(){
    const inputField = useInputField([
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
                        inputField.getInput('menu') === 0 && <div className={cmc(Graph.tab, Graph.type2)}>
                            <TabList name='range' inputField={inputField} values={
                                ['개인', '매장', '회사']
                            }/>
                        </div>
                    }


                    <div className={Graph.graph_head_group}>
                        {
                            inputField.getInput('menu') === 0 && <div className={cmc(Graph.tab, Graph.type3)}>
                                <TabList name='user' inputField={inputField} values={
                                    ['김모모', '나모모', '다모모']
                                }/>
                            </div>
                        }

                        <input type="text" className="inp date" placeholder="날짜 선택"/>
                        <button type="button" className="btn_all">전체 보기</button>
                    </div>
                </div>

                {
                    inputField.getInput('menu') === 0 ? <DataGraph/> : <Statistics/>
                }
            </div>

        </div>
    )
}