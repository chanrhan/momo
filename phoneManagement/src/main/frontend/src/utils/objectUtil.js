
export function isEmpty(value){
    return value === null || value.length === 0;
}

export const isAllEmptyInMap = (map)=>{
    // if(isEmpty(map)){
    //     return true;
    // }
    for(const key in map){
        if(!isEmpty(map[key])){
            return false;
        }
    }
    return true;
}

export const convertArrayToString = (arr)=>{
    let str = '';
    arr.map((value)=>{
        str += (value) ? '1' : '0';
    })
    return str;
}