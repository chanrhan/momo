
export const ObjectUtils = {
    isEmpty(value){
        return value === null || value === undefined || Object.keys(value).length === 0 || value.length === 0;
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
    }
}
