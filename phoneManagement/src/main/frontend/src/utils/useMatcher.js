import {fuzzyMatcher} from "./fuzzyMatcher";

export const useMatcher = (type)=> {
    return {
        match: (data)=>{
            let result;
            switch (type){
                case 'cust_gd':
                    return matchGender(data);
                case 'cust_tel':
                    return matchTel(data);
                case 'cust_cd':
                    return matchBirthOrBusinessCode(data);
                case 'ph_md':
                    return matchPhoneModel(data);
                case 'sec_md':
                    return matchSecondModel(data);
            }
        },
        types: (type)=>{
            switch (type){
                case 'cust_gd':
                    return GENDER;
                // case 'cust_tel':
                //     return matchTel(data);
                // case 'cust_cd':
                //     return matchBirthOrBusinessCode(data);
                // case 'ph_md':
                //     return matchPhoneModel(data);
                // case 'sec_md':
                //     return matchSecondModel(data);
            }
        }
    }
}

const GENDER = [
    '법인',
    '남',
    '여'
]

const matchGender = (data)=>{
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

const matchTel = (data)=>{

}

const matchBirthOrBusinessCode = (data)=>{

}

const matchPhoneModel = (data)=>{

}

const matchSecondModel = (data)=>{

}