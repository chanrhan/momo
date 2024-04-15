import {getType} from "@reduxjs/toolkit";

export const ObjectUtils = {
    isEmpty(value){
        const result = value === null || value === undefined || value.length === 0;
        if(result){
            return true;
        }
        if(typeof value === 'object'){
            return  Object.keys(value).length === 0;
        }
        return false;
    },
    isEmptyMap(map){
        for(const key in map){
            if(!ObjectUtils.isEmpty(map[key])){
                return false;
            }
        }
        return true;
    },
    convertBooleanArrayToString(arr){
        let str = '';
        arr.map((value)=>{
            str += (value) ? '1' : '0';
        })
        return str;
    },
    toggleOf
}

function toggleOf(arr, index){
    for(let i in arr){
        arr[i] = (i == index);
    }
}
