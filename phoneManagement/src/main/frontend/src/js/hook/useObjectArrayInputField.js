import {useState} from "react";
import {ObjectUtils} from "../utils/objectUtil";

export function useObjectArrayInputField(init, arr){
    let copyArr = [];
    if(arr && typeof arr === "object"){
        for(const v of arr){
            copyArr.push({...v});
        }
    }
    const [input, setInput] = useState(!ObjectUtils.isEmptyArray(arr) ? copyArr : init ? [{...init}] : null);

    const length = ()=>{
        return input.length;
    }

    const get = (index, key)=>{
        if(!input || !input[index] || index >= input.length){
            return ''
        }
        return input[index][key] ?? ''
    }

    const putAll = (arr)=>{
        setInput(arr)
    }

    const put = (index, key, value)=>{
        // console.log(`put: ${index} ${key} ${value}`)
        const copy = [...input];
        // const copy2 = {...copy[index]};
        // copy2[key] = value;
        // copy[index] = copy2;
        copy[index][key] = value;
        setInput(copy);
    }

    const addItem = ()=>{
        if(!input){
            setInput([init])
            return;
        }
        const copy = [...input]
        copy.push(init ? {...init} : {})
        setInput(copy)
    }

    const removeItem = (index)=>{
        const copy = [...input]
        copy.splice(index,1)
        setInput(copy)
    }

    return {
        input,
        setInput,
        length,
        get,
        put,
        putAll,
        addItem,
        removeItem
    }
}