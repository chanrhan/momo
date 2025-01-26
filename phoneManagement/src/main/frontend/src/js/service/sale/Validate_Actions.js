import {RegexUtils} from "../../utils/regex";

export const Validate_Actions = [
    { // 개통날짜 (ActvDt)
        replace: (str: string)=>{
            return str.replaceAll(/[년월/]/g,'-').replaceAll(' ','')
        },
        test: (str: string)=>{
            return RegexUtils.date(str);
        },
        mapping: (str: string)=>{
            return "2024-12-21"
        }
    },
    { // 이름 (Name)
        replace: (str: string)=>{
            return str;
        },
        test: (str: string)=>{
            return false;
        },
        mapping: (str: string)=>{
            return null;
        }
    },
    { // 휴대폰번호 (Tel)
        replace: (str: string)=>{
            return str;
        },
        test: (str: string)=>{
            return false;
        },
        mapping: (str: string)=>{
            return null;
        }
    },
    { // 식별번호 (Code)
        replace: (str: string)=>{
            return str;
        },
        test: (str: string)=>{
            return false;
        },
        mapping: (str: string)=>{
            return null;
        }
    },
    { // 모델명 (Device)
        replace: (str: string)=>{
            return str;
        },
        test: (str: string)=>{
            return false;
        },
        mapping: (str: string)=>{
            return null;
        }
    },
    { // 총 이익 (cms)
        replace: (str: string)=>{
            return str;
        },
        test: (str: string)=>{
            return false;
        },
        mapping: (str: string)=>{
            return null;
        }
    },
    { // 판매자 (Seller)
        replace: (str: string)=>{
            return str;
        },
        test: (str: string)=>{
            return false;
        },
        mapping: (str: string)=>{
            return null;
        }
    }
]