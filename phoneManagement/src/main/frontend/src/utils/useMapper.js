import {fuzzyMatcher} from "./fuzzyMatcher";
import {RegexUtils} from "./regex";

export const useMapper = (type)=> {
    return {
        matchMap: (data)=>{
            let result;
            switch (type){
                case 'cust_gd':
                    return mappingToGender(data);
                case 'cust_tel':
                    return mappingToTel(data);
                case 'cust_cd':
                    return mappingToIdentifyCode(data);
                case 'ph_md':
                    return matchPhoneModel(data);
                case 'sec_md':
                    return matchSecondModel(data);
            }
        },
        types: (type)=>{
            switch (type){
                case 'cust_gd':
                    return [
                        '법인',
                        '남',
                        '여'
                    ]
                case 'cust_tel':
                    return [
                        '010-0000-0000'
                    ]
                case 'cust_cd':
                    return [
                        '000000000'
                    ]
                // case 'ph_md':
                //     return matchPhoneModel(data);
                // case 'sec_md':
                //     return matchSecondModel(data);
            }
        }
    }
}



const mappingToGender = (data)=>{
    if(/^(male|m|남자|남성)$|남/i.test(data)){
        return '남'
    }

    if(/^(female|f|여자|여성)$|여/i.test(data)){
        return '여'
    }

    if(/법/.test(data)){
        return '법인'
    }

    return null;
}

const mappingToTel = (data)=>{
    let str = data.toString();
    if(str.charAt(0) !== '0'){
        str = '0' + str;
    }
    const result = str.replaceAll(/[\s-]/g, '');
    if(/^(0[0-9]{2,3})?[0-9]{3,4}[0-9]{3,4}$/.test(result)){
        return result;
    }

    return null;
}

const mappingToIdentifyCode = (data)=>{
    let str = data.toString();
    const result = str.replaceAll(/[\s-ㄱ-ㅎㅏ-ㅣ가-힣]/g, '')
    if(/^[0-9]{7,11}$/.test(result)){
        return result;
    }

    return null;
}

const matchPhoneModel = (data)=>{

}

const matchSecondModel = (data)=>{

}