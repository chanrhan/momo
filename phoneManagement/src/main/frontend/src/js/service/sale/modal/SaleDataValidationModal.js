import useModal from "../../../hook/useModal";
import DEFAULT_HEADERS from "../../../test/DEFAULT_HEADERS";
import {useEffect, useState} from "react";
import {useMapper} from "../../../utils/useMapper";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import {ObjectUtils} from "../../../utils/objectUtil";
import {SAMPLE_PHONE_MODEL} from "../../../test/SAMPLE_DATA";
import {ModalType} from "../../../common/modal/ModalType";
import {LayerModal} from "../../../common/modal/LayerModal";
import {RegexUtils} from "../../../utils/regex";
import Popup from "../../../../css/popup.module.css"
import {cm} from "../../../utils/cm";
import {Validate_Actions} from "../../bulk_upload/Validate_Actions";

const GENDER = [
    '남',
    '여',
    '법인'
]

const COLUMNS = [
    '개통날짜','이름','전화번호','식별번호','모델명','총 이익','판매자'
]

const NULL_VALUE = "빈 값"

const SUCCESS = 0;
const MAPPED = 1;
const ERROR = 2;

function SaleDataValidationModal(props){
    const modal = useModal();
    const [defaultValue, setDefaultValue] = useState(0);

    const [tab, setTab] = useState(0)

    const [orgData, setOrgData] = useState()

    const [result, setResult] = useState([])

    useEffect(() => {
        if(props.data){
            validate();
        }
    }, []);


    // 2차원 배열 데이터의 행열을 서로 바꾸기
    const transpose = data => data.reduce(
        (result, row) => row.map((_, i) => [...(result[i] || []), row[i]]),
        []
    );

    const validate = ()=>{
        const res = [];
        const d = props.data.filter((arr, i)=>{
            for(const item of arr){
                if(!ObjectUtils.isEmpty(item)){
                    return true;
                }
            }
            return false;
        })
        const transposedData = transpose(d)
        setOrgData(transposedData)

        for(let i=0;i<COLUMNS.length;++i){
            res.push(checkError(i, transposedData[i]));
        }
        setResult(res)
    }

    const checkError = (type, arr: Array<string>)=>{
        let res = {};

        for(const i in arr){
            let item = arr[i];
            let state = SUCCESS
            let newData = NULL_VALUE;
            if(ObjectUtils.isEmpty(item)){
                state = ERROR;
            }else{
                const replaced = Validate_Actions[type].replace(item);
                // if(res[replaced]){
                //     res[replaced].from.push(item);
                //     continue;
                // }

                if(Validate_Actions[type].test(replaced)){
                    newData = replaced;
                }else{
                    // 최대한 변환해보는 로직
                    const mapped = Validate_Actions[type].mapping(item);
                    if(mapped && Validate_Actions[type].test(mapped)){
                        newData = mapped;
                        state = MAPPED;
                    }else{
                        state = ERROR;
                    }
                }
            }
            if(res[newData]){
                res[newData].state = Math.max(res[newData].state, state);
                res[newData].from.push(i);
            }else{
                res[newData] = {
                    from: [i],
                    state: state
                }
            }
        }
        return res;
    }

    const getTotalCount = ()=>{
        let count = 0;
        for(let i=0;i<COLUMNS.length;++i){
            count += getCountExclusive(i, SUCCESS);
        }
        return count;
    }

    const getCount = (state)=>{
        if(!result[tab]){
            return 0;
        }

        const filtered = Object.keys(result[tab]).filter(key=>result[tab][key].state === state);
        let len = 0;
        for(const key of filtered){
            const {from} = result[tab][key];
            len += from.length;
        }
        return len;
    }

    const getCountExclusive = (index, state)=>{
        if(!result[index]){
            return 0;
        }

        const filtered = Object.keys(result[index]).filter(key=>result[index][key].state !== state);
        let len = 0;
        for(const key of filtered){
            const {from} = result[index][key];
            len += from.length;
        }
        return len;
    }

    const getEmptyCount = ()=>{
        if(!result[tab]){
            return 0;
        }
        return result[tab][NULL_VALUE].from.filter(index=>!orgData[tab][index]).length;
    }

    const getMappedOrErrorColumns = ()=>{
        return result.map((v: Array,i)=>{
            return {
                index: i,
                count: getCountExclusive(tab, SUCCESS)
            }
        }).filter(v=>v.count > 0)
    }

    const cancel = ()=>{
        modal.closeModal(ModalType.LAYER.SaleData_Validation)
    }

    const confirm = ()=>{
        if(props.onConfirm){
            result.map(arr=>{

            })
            const data = transpose(result);
            console.table(data)
            return;
            props.onConfirm(data);
        }
        // modal.closeModal(ModalType.LAYER.SaleData_Validation)
    }


    // 열 잠금 기능도 있으면 좋을듯?

    return (
        <LayerModal {...props} top={20} maxWidth={690}>
            <div className={Popup.validate_cont}>
                <div className={Popup.validate_body}>
                    <div className={Popup.header_group}>
                        <div className={Popup.title}>유효성 검사</div>
                        <div className={Popup.description}>
                            데이터 유형과 일치하지 않는 값이 총 <span className={Popup.num}> {getTotalCount()}</span>개 발견되었습니다
                        </div>
                    </div>

                    <div className={Popup.validate_group}>
                        <div className={Popup.tab_list}>
                            {
                                getMappedOrErrorColumns().map(({index, count})=> {
                                    return <button className={cm(Popup.tab_btn, `${tab === index && Popup.active}`)}
                                                   onClick={()=>{
                                        setTab(index)
                                    }}>{COLUMNS[index]} ({count})</button>
                                })
                            }

                        </div>
                        {
                            getCount(1) > 0 && (
                                <>
                                    <div className={Popup.text}>임의로 변경한 데이터 <span className={Popup.num}>{getCount(1)}</span>개
                                    </div>
                                    <div className={Popup.replaced_group}>
                                        <ul className={Popup.data_list}>
                                            {
                                                result[tab] && Object.keys(result[tab]).map((key, i) => {
                                                    const {from, state} = result[tab][key];
                                                    if (ObjectUtils.isEmpty(key) || state !== MAPPED) {
                                                        return;
                                                    }
                                                    return (
                                                        <div className={Popup.data_row}>
                                                            <span className={Popup.org_data}>{orgData[tab][from[0]]}</span>
                                                            <span className={Popup.right_arrow}></span>
                                                            <span className={Popup.mapped_data}>{key}</span>
                                                            {/*<button className={Popup.btn_replace}>적용</button>*/}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </ul>
                                        <div className={Popup.btn_box}>
                                            <button className={Popup.btn_apply_all}>모두 적용</button>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        {
                            getCount(2) > 0 && (
                                <>
                                    <div className={Popup.text}>
                                        변경하지 못한 데이터 <span className={Popup.num}>
                                        {getCount(2)}
                                        </span>개 (빈 값 <span className={Popup.num}>{getEmptyCount()}</span>개)
                                    </div>

                                    <div className={Popup.non_replaced_group}>
                                        <ul className={Popup.data_list}>
                                            {
                                                result[tab] && Object.keys(result[tab]).map((key, i) => {
                                                    const {state, from} = result[tab][key];
                                                    if (ObjectUtils.isEmpty(key) || state !== ERROR) {
                                                        return;
                                                    }
                                                    return from && (
                                                        from.map(index => {
                                                            return orgData[tab][index] && (
                                                                <div className={Popup.data_row}>
                                                                    <span className={Popup.err_data}>{orgData[tab][index]}</span>
                                                                </div>
                                                            )
                                                        })
                                                    )
                                                })
                                            }
                                        </ul>
                                        <div className={Popup.btn_box}>
                                            <button className={Popup.btn_remove_all}>모두 삭제</button>
                                        </div>
                                    </div>
                                </>
                            )
                        }

                    </div>
                </div>
                <div className={Popup.btn_box}>
                    <button className={cm(Popup.btn, Popup.btn_cancel)} onClick={cancel}>취소</button>
                    <button className={cm(Popup.btn, Popup.btn_submit)} onClick={confirm}>확인</button>
                </div>
            </div>
        </LayerModal>
    )
}

function ValueSelector({type, value}) {
    // console.log(`type: ${type}`)
    switch (type) {
        case 'ph_md':
            return SAMPLE_PHONE_MODEL[value];
        default:
            return value;
    }
}

export default SaleDataValidationModal;