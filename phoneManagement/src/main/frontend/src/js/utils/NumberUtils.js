import {ObjectUtils} from "./objectUtil";

export const NumberUtils = {
    toPrice: (value: number)=>{
        if(ObjectUtils.isEmpty(value)){
            return '0';
        }
        return value.toLocaleString();
    },
    sum: (arr: [])=>{
        let rst = 0;
        arr.forEach(v=>{
            rst += v;
        })
        return rst;
    },
    toNumber: (value)=>{
        if(ObjectUtils.isEmpty(value) || Number.isNaN(value)){
            return 0;
        }
        return Number(value);
    }

}

