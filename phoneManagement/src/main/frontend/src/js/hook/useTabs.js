import {useState} from "react";

export function useTabs(size){
    const [tabs, setTabs] = useState(new Array((size ? size : 1)).fill(0))

    const setTab = (index, value)=>{
        const copy = [...tabs];
        copy[index] = value;
        setTabs(copy);
    }

    const get = (index)=>{
        return tabs[index];
    }

    return {
        tabs,
        get,
        setTab
    }
}