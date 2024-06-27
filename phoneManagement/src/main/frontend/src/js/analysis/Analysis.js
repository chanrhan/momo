import Graph from "../../css/graph.module.css"
import Layout from "../../css/layout.module.css"
import {cm, cmc} from "../utils/cm";
import {GraphSummaryCard} from "./module/GraphSummaryCard";
import graphImg1 from "../../images/graph_img1.png"
import {TabList} from "../common/module/TabList";
import {useState} from "react";
import {GraphBarItem} from "./module/GraphBarItem";
import {GraphBarCard} from "./module/GraphBarCard";
import {useTabs} from "../hook/useTabs";
import {DataGraph} from "./DataGraph";
import {Statistics} from "./Statistics";

export function Analysis(){
    const tab = useTabs(3);

    return (
        <div className={Layout.sub}>

            <div className={Graph.graph}>
                <div className={Graph.graph_head}>
                    <div className={`${cmc(Graph.tab)} type1`}>
                        <TabList tab={tab} index={0} itemNames={
                            ['그래프', '통계']
                        }/>
                    </div>

                    {
                        tab.get(0) === 0 && <div className={cmc(Graph.tab, Graph.type2)}>
                            <TabList tab={tab} index={1} itemNames={
                                ['개인', '매장', '회사']
                            }/>
                        </div>
                    }


                    <div className={Graph.graph_head_group}>
                        {
                            tab.get(0) === 0 && <div className={cmc(Graph.tab, Graph.type3)}>
                                <TabList tab={tab} index={2} itemNames={
                                    ['김모모', '나모모', '다모모']
                                }/>
                            </div>
                        }

                        <input type="text" className="inp date" placeholder="날짜 선택"/>
                        <button type="button" className="btn_all">전체 보기</button>
                    </div>
                </div>

                {
                    tab.get(0) === 0 ? <DataGraph/> : <Statistics/>
                }
            </div>

        </div>
    )
}