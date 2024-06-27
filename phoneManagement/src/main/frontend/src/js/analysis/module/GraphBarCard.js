import Graph from "../../../css/graph.module.css";
import {cm} from "../../utils/cm";
import {GraphBarItem} from "./GraphBarItem";

export function GraphBarCard({title, children}){
    return (
        <div className={cm(Graph.graph4, Graph.div)}>
            <div className={Graph.graph_top}>
                <div className={Graph.graph_title}>{title}</div>
            </div>

            <div className={Graph.graph_bar}>
                <ul className="bar_list">
                    {children}
                </ul>
            </div>
        </div>
    )
}