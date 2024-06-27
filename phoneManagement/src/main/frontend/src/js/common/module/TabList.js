import {cmc} from "../../utils/cm";
import Graph from "../../../css/graph.module.css";
import {useState} from "react";
import Layout from "../../../css/layout.module.css";
import {Link} from "react-router-dom";

export function TabList({tab, index=0, theme, itemNames=[]}){

    return (
        <ul className={`tab_list ${theme && theme['tab_list']}`}>
            {
                itemNames && itemNames.map((v,i)=> {
                    return <li key={i} className={`tab_item ${theme && theme['tab_item']} ${tab.get(index) === i && `active ${theme && theme['active']}`}`}>
                        <button type="button" className={`tab_btn ${theme && theme['tab_btn']}`} onClick={()=>{
                            tab.setTab(index, i);
                        }}>{v}</button>
                    </li>
                })
            }
        </ul>
    )
}
