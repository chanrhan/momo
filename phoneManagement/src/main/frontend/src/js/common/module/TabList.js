import {cmc} from "../../utils/cm";
import Graph from "../../../css/graph.module.css";
import {useEffect, useMemo, useState} from "react";
import Layout from "../../../css/layout.module.css";
import {Link} from "react-router-dom";
import {ObjectUtils} from "../../utils/objectUtil";

export function TabList({name, inputField, className, theme, values}){
    // const [selected, setSelected] = useState(0);
    useMemo(() => {
        if(ObjectUtils.isEmpty(inputField.getInput(name))){
            inputField.put(name, 0);
        }
    }, []);

    const select = (i)=>{
        inputField.put(name, i);
        // setSelected(i);
    }

    if(typeof inputField !== "object"){
        return null;
    }

    return (
        <ul className={`tab_list ${theme && theme['tab_list']} ${className}`}>
            {
                values && values.map((v,i)=> {
                    return <li key={i} className={`tab_item ${theme && theme['tab_item']} ${inputField.getInput(name) === i && `active ${theme && theme['active']}`}`}>
                        <button type="button" className={`tab_btn ${theme && theme['tab_btn']}`} onClick={()=>{
                            select(i)
                        }}>{v}</button>
                    </li>
                })
            }
        </ul>
    )
}
