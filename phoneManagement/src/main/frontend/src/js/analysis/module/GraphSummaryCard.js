import {cm} from "../../utils/cm";
import Graph from "../../../css/graph.module.css";
import PropTypes from "prop-types";

export const GraphSummaryCard = ({title, num, per, img, inclination})=>{
    let arrow = '-';
    switch(inclination){
        case 'up':
            arrow = '▲';
            break;
        case 'down':
            arrow = '▼';
            break;
    }
    return (
        <li className={cm(Graph.graph_item, `${inclination && Graph[inclination]}`)}>
            <div className={Graph.graph_title}>{title}</div>
            <div className={Graph.graph_count}><span className={Graph.span}>{num}</span>대</div>
            <div className={Graph.graph_per}><span className={Graph.span}>{arrow}</span> {per}% (전월대비)</div>
            <div className={Graph.graph_box}><img src={img}
                                                  alt="그래프 영역 샘플"/></div>
        </li>
    )
}

GraphSummaryCard.prototype = {
    title: PropTypes.string,
    num: PropTypes.number,
    per: PropTypes.any,
    img: PropTypes.any,
    inclination: PropTypes.oneOf(["up","down"])
};
