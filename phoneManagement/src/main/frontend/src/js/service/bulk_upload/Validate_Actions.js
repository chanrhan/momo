import {RegexUtils} from "../../utils/regex";
import {StringUtils} from "../../utils/StringUtils";

export const Validate_Actions = [
    { // 개통날짜 (ActvDt)
        test: (str: string)=>{
            return RegexUtils.date(str);
        },
        replace: (str: string)=>{
            const patterns = [
                /(\d{4})[-/.]?(\d{1,2})[-/.]?(\d{1,2})/, // YYYY-MM-DD, YYYY/MM/DD, YYYY.MM.DD, YYYYMMDD
                /(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/, // YYYY년 MM월 DD일 (공백 포함/미포함)
                /(\d{1,2})\/(\d{1,2})\/(\d{4})/ // MM/DD/YYYY (미국식)
            ];

            for (let pattern of patterns) {
                const match = str.match(pattern);
                if (match) {
                    let [_, year, month, day] = match;

                    // 미국식 날짜 처리 (MM/DD/YYYY -> YYYY-MM-DD)
                    if (pattern === patterns[2]) {
                        [month, day, year] = [year, month, day];
                    }

                    month = month.padStart(2, '0');
                    day = day.padStart(2, '0');

                    return `${year}-${month}-${day}`;
                }
            }

            return str;
        }
    },
    { // 이름 (Name)
        test: (str: string)=>{
            return str.length <= 20
        },
        replace: (str: string)=>{
            return str;
        }
    },
    { // 휴대폰번호 (Tel)
        test: (str: string)=>{
            const regex1 = /^[0-1][0-9]{2}-\d{3,4}-\d{3,4}$/
            const regex2 = /^[0-9]{4}-[0-9]{4}$/
            return regex1.test(str) || regex2.test(str);
        },
        replace: (str: string)=>{
            let replaced = str;
            const r1 = str.replaceAll("-","");
            if(/^[0-9]{11}$/.test(r1)){
                replaced = r1.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
            }else if(/^[0-9]{10}$/.test(r1)){
                replaced = r1.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
            }else if(/^[0-9]{8}$/.test(r1)){
                replaced = r1.replace(/(\d{4})(\d{4})/, '$1-$2')
            }
            return replaced;
        }
    },
    { // 식별번호 (Code)
        test: (str: string)=>{
            const regex = /^[0-9]{5,8}$/
            return regex.test(str);
        },
        replace: (str: string)=>{
            return str;
        }
    },
    { // 모델명 (Device)
        test: (str: string, dataset: Array)=>{
            for(const {id, name, code} of dataset){
                if(str === name || str === code){
                    return true;
                }
            }
            return false;
        },
        replace: (str: string)=>{
            return str;
        },
        mapping: (str:string, dataset: Array<Object>)=>{
            let selectedId = null;
            let selectedName = null;
            let list: Array<Object> = [];

            for(const i in dataset){
                // const similarity = StringUtils.levenshteinCompare(str, dataset[i].name);
                const replaced1 = StringUtils.replaceDeviceNameToKorean(str)
                const replaced2 = StringUtils.replaceDeviceNameToKorean(dataset[i].name);
                const sim1 = StringUtils.getJaroWinklerDistance(replaced1, dataset[i].name);
                const sim2 = StringUtils.getJaroWinklerDistance(str, replaced2)
                const similarity = Math.floor(Math.max(sim1, sim2) * 100);
                // console.log(similarity)
                list.push({
                    index: i,
                    similarity: similarity
                });
            }
            // console.table(list)
            list = list.sort((v1, v2)=>v2.similarity - v1.similarity).slice(0, 3);
            // console.table(list)
            // console.log(str)
            // console.table(list.map(v=>{
            //     return {
            //         name: dataset[v.index].name,
            //         similarity: v.similarity
            //     }
            // }))
            if(list[0].similarity > 50){
                const top = list[0].index;
                selectedId = dataset[top].id;
                selectedName = dataset[top].name
            }

            return {
                id: selectedId,
                name: selectedName,
                recommends: list
            }
        },
    },
    { // 총 이익 (cms)
        test: (str: string)=>{
            const regex = /^\d{1,3}(,\d{3})*$/
            return regex.test(str)
        },
        replace: (str: string)=>{
            str = str.replace(/[\s원]/g,"").replaceAll(",","")
            return Number(str)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
    },
    { // 판매자 (Seller)
        test: (str: string)=>{
            return false;
        },
        replace: (str: string)=>{
            return str;
        },
        mapping: (str:string, dataset: Array<Object>)=>{
            for(const data of dataset){
                if(str === data.name){
                    return {
                        id: data.id,
                        name: data.name
                    }
                }
            }
            return {
                id: null,
                name: str
            }
        }
    }
]