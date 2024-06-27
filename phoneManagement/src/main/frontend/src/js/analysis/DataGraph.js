import Layout from "../../css/layout.module.css";
import Graph from "../../css/graph.module.css";
import {cm, cmc} from "../utils/cm";
import {TabList} from "../common/module/TabList";
import {GraphSummaryCard} from "./module/GraphSummaryCard";
import graphImg1 from "../../images/graph_img1.png";
import {GraphBarCard} from "./module/GraphBarCard";
import {GraphBarItem} from "./module/GraphBarItem";
import {useTabs} from "../hook/useTabs";

export function DataGraph(){
    const tab = useTabs(4);

    return (
        <div className={Graph.graph_panel}>

            <div className={Graph.graph1}>
                <div className="graph_scroll">
                    <ul className={Graph.graph_list}>
                        <GraphSummaryCard title='무선' num='9' per='1.2' img={graphImg1} inclination='down'/>
                        <GraphSummaryCard title='유선' num='9' per='1.2' img={graphImg1}/>
                        <GraphSummaryCard title='인터넷' num='9' per='1.2' img={graphImg1} inclination='up'/>
                    </ul>
                </div>
            </div>

            <div className={Graph.graph_group}>

                <div className={cm(Graph.graph2, Graph.div)}>
                    <div className={Graph.graph_top}>
                        <div className={`${cmc(Graph.tab)} type1`}>
                            <TabList tab={tab} index={0} itemNames={
                                ['개별', '합산']
                            }/>
                        </div>
                        <div className={cmc(Graph.tab, Graph.type4)}>
                            <TabList tab={tab} index={1} itemNames={
                                ['무선', '인터넷', 'TV', '총이익', '평균마진']
                            }/>
                        </div>
                    </div>

                    <div className={Graph.graph_box}>그래프 영역</div>

                    <div className={cmc(Graph.tab, Graph.type5)}>
                        <TabList tab={tab} index={2} theme={Graph} itemNames={
                            ['1일', '1주', '1개월', '3개월', '6개월', '1년']
                        }/>
                    </div>
                </div>

                <div className={cm(Graph.graph3, Graph.div)}>
                    <div className={Graph.graph_top}>
                        <div className={Graph.graph_title}>평균 마진</div>
                        <div className={cmc(Graph.tab, Graph.type4)}>
                            <TabList tab={tab} index={3} itemNames={
                                ['나이', '성별', '제조자', '개통구분', '할부']
                            }/>
                        </div>
                    </div>

                    <div className={Graph.graph_box}>그래프 영역</div>
                </div>

            </div>

            <div className={cm(Graph.graph_group, Graph.graph4_group)}>
                <GraphBarCard title='개통 모델'>
                    <GraphBarItem text='갤럭시 S24U' per='80'/>
                    <GraphBarItem text='갤럭시 S24U' per='80'/>
                    <GraphBarItem text='갤럭시 S24U' per='80'/>
                    <GraphBarItem text='갤럭시 S24U' per='80'/>
                </GraphBarCard>
                <GraphBarCard title='개통 요금제'>
                    <GraphBarItem text='갤럭시 S24U' per='80'/>
                </GraphBarCard>
                <GraphBarCard title='세컨'>
                    <GraphBarItem text='갤럭시 S24U' per='80'/>
                </GraphBarCard>

            </div>

        </div>
    )
}